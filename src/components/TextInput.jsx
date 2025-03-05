import { HStack, Input, Button, IconButton, VStack } from "@chakra-ui/react";
import { HiMicrophone } from "react-icons/hi";
import { useState, useRef, useEffect } from "react";
import { fetchRecipes } from "../services/api";

export default function TextInput({ setRecipes, setLoading, imageSelected }) {
    const [ingredients, setIngredients] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const recognitionRef = useRef(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.lang = "en-US";
            recognitionRef.current.onresult = (event) => {
                const transcript = Array.from(event.results)
                    .map((result) => result[0].transcript)
                    .join("");
                setIngredients(transcript);
            };
            recognitionRef.current.onerror = (event) => {
                console.error("Speech Recognition Error:", event.error);
                setIsRecording(false);
            };
            recognitionRef.current.onend = () => setIsRecording(false);
        }
        return () => {
            if (recognitionRef.current) recognitionRef.current.stop();
        };
    }, []);

    const toggleRecording = () => {
        if (!recognitionRef.current) {
            alert("Speech recognition is not supported in this browser.");
            return;
        }
        if (isRecording) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.start();
            setIsRecording(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (!ingredients) throw new Error("No ingredients provided");
            const recipeData = await fetchRecipes(JSON.stringify({ ingredients }), false);
            setRecipes(recipeData);
        } catch (error) {
            console.error("API Error:", error);
            setRecipes(null);
        }
        setLoading(false);
        setIngredients("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
                <HStack w="full">
                    <Input
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        placeholder="e.g., chicken, spinach, quinoa"
                        disabled={imageSelected}
                    />
                    <IconButton
                        icon={<HiMicrophone />}
                        colorScheme={isRecording ? "red" : "green"}
                        onClick={toggleRecording}
                        aria-label="Toggle voice input"
                        isDisabled={imageSelected}
                    />
                </HStack>
                <Button type="submit" colorScheme="green" isDisabled={!ingredients || imageSelected}>
                    Generate Recipe
                </Button>
            </VStack>
        </form>
    );
}