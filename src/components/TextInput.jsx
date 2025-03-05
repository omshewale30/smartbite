import { VStack, Input, Button, Stack, createListCollection } from "@chakra-ui/react";
import {
    SelectContent,
    SelectItem,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from "@/components/ui/select"; // Adjust path if needed\
import { useState } from "react";
import { fetchRecipes } from "../services/api";

import {useColorModeValue} from "@chakra-ui/system";

const dietaryOptions = createListCollection({
    items: [
        { label: "Vegan", value: "vegan" },
        { label: "Vegetarian", value: "vegetarian" },
        { label: "Gluten-Free", value: "gluten-free" },
        { label: "Low-Carb", value: "low-carb" },
        { label: "Dairy-Free", value: "dairy-free" },
    ],
});

export default function TextInput({ setRecipes, setLoading, imageSelected }) {
    const [ingredients, setIngredients] = useState("");
    const [dietaryRestriction, setDietaryRestriction] = useState("");
    const accentColor = "#F6E05E"; // Yellow color from landing pa
    const primaryColor = "#2F855A"; // Green color from landing page

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (!ingredients) throw new Error("No ingredients provided");
            const payload = { ingredients };
            if (dietaryRestriction) payload.dietaryRestriction = dietaryRestriction;
            const recipeData = await fetchRecipes(JSON.stringify(payload), false);
            setRecipes(recipeData);
        } catch (error) {
            console.error("API Error:", error);
            setRecipes(null);
        }
        setLoading(false);
        setIngredients("");
        setDietaryRestriction("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
                <Stack w="full">
                    <SelectRoot
                        collection={dietaryOptions}
                        value={dietaryRestriction ? [dietaryRestriction] : []}
                        onValueChange={(details) => setDietaryRestriction(details.value[0] || "")}
                        disabled={imageSelected}
                        color={primaryColor}
                        fontWeight="bold"
                    >
                        <SelectTrigger>
                            <SelectValueText placeholder="Select dietary restriction (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                            {dietaryOptions.items.map((option) => (
                                <SelectItem key={option.value} item={option}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </SelectRoot>
                </Stack>
                <Input
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    placeholder="e.g., chicken, spinach, quinoa"
                    disabled={imageSelected}
                    color="gray.700"
                />
                <Button colorPalette="yellow" disabled={!ingredients || imageSelected} variant="solid" type="submit">
                    Generate Recipe
                </Button>
            </VStack>
        </form>
    );
}