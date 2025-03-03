import { Box, Heading, Text, Spinner } from "@chakra-ui/react";
import IngredientInput from "/src/components/IngredientInput.jsx";
import RecipeCard from "/src/components/RecipeCard.jsx";
import { useState } from "react";



function Home() {
    const [recipes, setRecipes] = useState(null);
    const [loading, setLoading] = useState(false);

    return (
        <Box
            p={{ base: 4, md: 8 }} // Increased padding for breathing room

            mx="auto"
            minH="100vh" // Full height for centering
            display="flex"
            flexDirection="column"
            alignItems="center"


            mt={4} // Margin from top
        >
            <Heading
                as="h1"
                size={{ base: "2xl", md: "3xl" }} // Larger, responsive title
                color="red.700"
                mb={4}
                fontWeight="extrabold"
                letterSpacing="tight"
                textAlign="center"
            >
                sm
                <Text as="span" color="red.500">
                    A
                </Text>
                rtb
                <Text as="span" color="red.500">
                    I
                </Text>
                te
            </Heading>
            <Text
                fontSize={{ base: "md", md: "lg" }}
                color="gray.600"
                mb={8}
                textAlign="center"
                maxW="500px"
                fontWeight="medium"
            >
                Discover healthy recipes tailored to your ingredients with AI magic.
            </Text>
            <IngredientInput setRecipes={setRecipes} setLoading={setLoading} />
            {loading && (
                <Spinner
                    size="xl"
                    color="green.500"
                    thickness="4px"
                    speed="0.65s"
                    mt={6}
                />
            )}
            {recipes && (
                <Box mt={8} w="full">
                    <RecipeCard recipe={recipes} />
                </Box>
            )}
        </Box>
    );
}
export default Home;