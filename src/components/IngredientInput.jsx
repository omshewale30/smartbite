import { Box, Input, Button, VStack, Text } from "@chakra-ui/react";
import {
    FileUploadList,
    FileUploadRoot,
    FileUploadTrigger,
} from "@/components/ui/file-upload"
import { HiUpload, HiTrash } from "react-icons/hi";
import { fetchRecipes } from "../services/api";
import { useState } from "react";

function IngredientInput({ setRecipes, setLoading }) {
    const [ingredients, setIngredients] = useState("");
    const [image, setImage] = useState(null);
    const [recognizedIngredients, setRecognizedIngredients] = useState([]);
    const [newIngredients, setNewIngredients] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let data;

            if (image) {
                data = new FormData();
                data.append("image", image);
            }
            else if (ingredients) {
                data = JSON.stringify({ ingredients });
            }
            else {
                throw new Error("No ingredients or image provided");
            }
            const recipeData = await fetchRecipes(data, !!image);
            setRecipes(recipeData); // Ensure this sets a valid object
        } catch (error) {
            console.error("API Error:", error);
            setRecipes(null); // Reset on error
        }
        setLoading(false);
        setImage(null); // Reset image
        setIngredients(""); // Reset ingredients
    };

    const handleRecipeGenerate = async () => {
        e.preventDefault();
        setLoading(true);
        try{
            const finalIngredients = recognizedIngredients.join(",");
            const recipeData = await fetchRecipes(finalIngredients, false);
            setRecipes(recipeData);
        }catch (error){
            console.error("API Error:", error);
            setRecipes(null);

        }
        setLoading(false);
    }

    const addIngredient = () => {
        if(newIngredients.trim()){
            setRecognizedIngredients([...recognizedIngredients, newIngredients.trim()]);
            setNewIngredients("");
        }
    }

    const deleteIngredient = (index) => {
        setRecognizedIngredients(recognizedIngredients.filter((_, i) => i !== index));
    }

    return (
        <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
                <Input
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    placeholder="e.g., chicken, spinach, quinoa"
                    disabled={image} // Disable text if image is selected
                />
                <Text>OR</Text>
                <FileUploadRoot>
                    <FileUploadTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            onChange={(e) => setImage(e.target.files[0])} // Capture file here
                            as="label" // Acts as a label for the hidden input
                        >
                            <HiUpload /> Upload Image
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                disabled={ingredients}
                                onChange={(e) => setImage(e.target.files[0])} // Backup for direct input
                            />
                        </Button>
                    </FileUploadTrigger>
                    <FileUploadList /> {/* Displays uploaded files if component supports it */}
                </FileUploadRoot>
                <Button type="submit" colorScheme="green" isDisabled={!ingredients && !image}>
                    Generate
                </Button>
            </VStack>
        </form>
    );
}

export default IngredientInput;