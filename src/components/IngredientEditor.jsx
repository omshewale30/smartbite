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

    return (
        <VStack spacing={4} align="stretch">
            <Text fontWeight="bold">Recognized Ingredients:</Text>
            {recognizedIngredients.map((item, index) => (
                <HStack key={index} justify="space-between">
                    <Text>{item}</Text>
                    <IconButton
                        aria-label="Delete ingredient"
                        icon={<HiTrash />}
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteIngredient(index)}
                    />
                </HStack>
            ))}
            <HStack>
                <Input
                    value={newIngredient}
                    onChange={(e) => setNewIngredient(e.target.value)}
                    placeholder="Add another ingredient"
                    size="sm"
                />
                <Button size="sm" onClick={addIngredient}>
                    Add
                </Button>
            </HStack>
            <Button
                colorScheme="green"
                onClick={handleRecipeGenerate}
                isDisabled={!recognizedIngredients.length}
            >
                Generate Recipe
            </Button>
        </VStack>
    );
}