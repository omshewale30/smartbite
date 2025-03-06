import { VStack, Text, HStack, IconButton, Input, Button } from "@chakra-ui/react";
import { HiTrash } from "react-icons/hi";
import { useState } from "react";
import { fetchRecipes } from "../services/api";

export default function IngredientEditor({ recognizedIngredients, setRecognizedIngredients, setRecipes, setLoading }) {
    const [newIngredient, setNewIngredient] = useState("");
    const [dietaryRestriction, setDietaryRestriction] = useState("");

    const addIngredient = () => {
        if (newIngredient.trim()) {
            setRecognizedIngredients([...recognizedIngredients, newIngredient.trim()]);
            setNewIngredient("");
        }
    };

    const deleteIngredient = (index) => {
        setRecognizedIngredients(recognizedIngredients.filter((_, i) => i !== index));
    };

    const handleRecipeGenerate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const finalIngredients = recognizedIngredients.join(", ");

            if (!finalIngredients) throw new Error("No ingredients selected");
            const payload = { ingredients: finalIngredients };
            if (dietaryRestriction) {
                payload.dietaryRestriction = dietaryRestriction;
            }
            const recipeData = await fetchRecipes(JSON.stringify(payload), false);
            setRecipes(recipeData);
        } catch (error) {
            console.error("API Error:", error);
            setRecipes(null);
        }
        setLoading(false);
        setRecognizedIngredients([]);
        setDietaryRestriction("");
    };
    const textColor = "gray.800";

    return (
        <VStack spacing={4} align="stretch">
            <Text fontWeight="bold" color = {textColor}>Recognized Ingredients:</Text>
            {recognizedIngredients.map((item, index) => (
                <HStack key={index} justify="space-between">
                    <Text color ={textColor}>{item}</Text>
                    <IconButton
                        aria-label="Delete ingredient"
                        size="sm"

                        onClick={() => deleteIngredient(index)}
                    >
                        <HiTrash />
                    </IconButton>

                </HStack>
            ))}
            <HStack>
                <Input
                    value={newIngredient}
                    onChange={(e) => setNewIngredient(e.target.value)}
                    placeholder="Add another ingredient"
                    size="sm"
                    color = {textColor}
                />
                <Button size="sm" colorPalette = "gray" onClick={addIngredient} variant="surface">
                     Add
                </Button>
            </HStack>
            <Button
                colorPalette="yellow"
                onClick={handleRecipeGenerate}
                disabled={!recognizedIngredients.length}
            >
                Generate Recipe
            </Button>
        </VStack>
    );
}