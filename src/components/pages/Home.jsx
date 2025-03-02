import { Box, Heading, Text, Spinner } from "@chakra-ui/react";
import IngredientInput from "/src/components/IngredientInput.jsx";
import RecipeCard from "/src/components/RecipeCard.jsx";
import { useState } from "react";

function Home() {
    const [recipes, setRecipes] = useState(null);
    const [loading, setLoading] = useState(false);

    return (
        <Box p={5} maxW="600px" mx="auto">
            <Heading as="h1" size="xl" color="green.600" mb={4}>
                smArtbIte
            </Heading>
            <Text mb={6}>Enter ingredients for healthy recipe ideas.</Text>
            <IngredientInput setRecipes={setRecipes} setLoading={setLoading} />
            {loading && <Spinner size="lg" />}
            {
                recipes && (
                    <RecipeCard recipe={recipes} />
                )
            }

        </Box>
    );
}

export default Home;