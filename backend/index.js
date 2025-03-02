const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");

const multer = require("multer");
const fs = require("fs").promises;


const {
    VertexAI,
    HarmBlockThreshold,
    HarmCategory,
} = require("@google-cloud/vertexai");


const app = express();
app.use(cors()); // Allows frontend to connect
app.use(express.json({limit:"10mb"})); // Parses JSON requests

const upload = multer({ dest: "uploads/", limits: { fileSize: 10 * 1024 * 1024 } });

// Vertex AI Setup
const project = "studied-brand-452423-t6"; // Replace with your Google Cloud project ID
const location = "us-central1";
const textModel = "gemini-1.0-pro";
const visionModel = "gemini-1.0-pro-vision";

const vertexAI = new VertexAI({
    project,
    location,
    googleAuthOptions: {
        keyFilename: "./studied-brand-452423-t6-8170f48f7874.json", // Path to your service account key
    },
});
const textGenerativeModel = vertexAI.getGenerativeModel({
    model: textModel,
    safetySettings: [
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ],
    generationConfig: { maxOutputTokens: 256 },
    systemInstruction: {
        role: "system",
        parts: [{ text: "You are a healthy cooking expert." }],
    },
});

const visionGenerativeModel = vertexAI.getGenerativeModel({
    model: visionModel,
});

// Function to clean Markdown from response
function cleanJsonResponse(text) {
    // Remove ```json and ``` markers
    const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return cleaned;
}

// Extract ingredients from image
async function getIngredientsFromImage(imagePath) {
    try {
        const imageBuffer = await fs.readFile(imagePath);
        const base64Image = imageBuffer.toString("base64");

        const prompt = "Identify the ingredients visible in this fridge/ingredients image. Return a comma-separated list (e.g., 'chicken, spinach, quinoa').";

        const request = {
            contents: [{
                role: 'user',
                parts: [
                    { text: prompt }, // Text prompt comes FIRST
                    {
                        inlineData: {
                            data: base64Image,
                            mimeType: "image/jpeg", // or "image/png"
                        },
                    },
                ],
            }],
        };

        const response = await visionGenerativeModel.generateContent(request);
        const ingredients = response.response.candidates[0].content.parts[0].text;
        return ingredients;

    } catch (error) {
        console.error("Error in getIngredientsFromImage:", error);
        throw error; // Re-throw the error to be caught by the main handler
    }
}

app.post("/recipes",upload.single("image") , async (req, res) => {
    let ingredients = req.body.ingredients;

    try {
        if (req.file) {
            ingredients = await getIngredientsFromImage(req.file.path);
            await fs.unlink(req.file.path); // Delete the image
        }
        console.log("Ingredients:", ingredients);

    if (!ingredients) {
        return res.status(400).json({ error: "No ingredients provided" });
    }


    const prompt = `
      Suggest a healthy recipe using these ingredients: ${ingredients}.
      Format the response as JSON with:
      - name: string
      - steps: string
      - calories: number
      - nutrition: object with protein, carbs, fat (as strings with units)
      Provide only the JSON object, no extra text or markdown.
    `;
        const response = await textGenerativeModel.generateContent(prompt);
        console.log("LLM Response:", response);

        const recipeText = response.response.candidates[0].content.parts[0].text;
        console.log("Recipe Text:", recipeText);
        const cleanText = cleanJsonResponse(recipeText); // Clean the response
        const recipe = JSON.parse(cleanText); // Gemini should return JSON based on prompt
        res.json(recipe);
    } catch (error) {

        console.error("VertexAI Error:", error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));