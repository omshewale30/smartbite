import { Box, Heading, Text } from "@chakra-ui/react";
import { Stat } from "@chakra-ui/react"

function RecipeCard({ recipe }) {

    return (
        <Box mt={6} p={4} borderWidth="1px" borderRadius="md">
            <Heading size="md" mb={2}>{recipe.name}</Heading>
            <Text mb={4}>{recipe.steps}</Text>
            <Stat.Root>
                <Stat.Label>Calories</Stat.Label>
                <Stat.ValueText>{recipe.calories} kcal</Stat.ValueText>
            </Stat.Root>
            <Stat.Root>
                <Stat.Label>Protein</Stat.Label>
                <Stat.ValueText>{recipe.nutrition.protein}</Stat.ValueText>
            </Stat.Root>
            <Stat.Root>
                <Stat.Label>Carbs</Stat.Label>
                <Stat.ValueText>{recipe.nutrition.carbs}</Stat.ValueText>
            </Stat.Root>
            <Stat.Root>
                <Stat.Label>Fat</Stat.Label>
                <Stat.ValueText>{recipe.nutrition.fat}</Stat.ValueText>
            </Stat.Root>
        </Box>
    );
}
export default RecipeCard;