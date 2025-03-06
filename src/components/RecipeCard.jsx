import {
    Box,
    Heading,
    Text,
    VStack,
    HStack,
    Badge,
    Icon,
    Grid,
    GridItem,
    Separator
} from "@chakra-ui/react"


import { FaFire, FaLeaf, FaBreadSlice, FaOilCan } from "react-icons/fa"
import {useColorModeValue} from "@chakra-ui/system";

function RecipeCard({ recipe }) {
    const bgColor = useColorModeValue("white", "gray.800")
    const borderColor = useColorModeValue("gray.200", "gray.700")
    const primaryColor = "#2F855A" // Green color from the main theme
    const accentColor = "#F6E05E" // Yellow color from the main theme

    return (
        <Box
            bg={bgColor}
            borderWidth="1px"
            borderColor={borderColor}
            borderRadius="xl"
            overflow="hidden"
            boxShadow="md"
            _hover={{
                transform: "translateY(-4px)",
                boxShadow: "xl",
            }}
            transition="all 0.3s ease"
        >
            {/* Recipe Name and Badge */}
            <Box bg={accentColor} p={4} color="white">
                <HStack justify="space-between" align="center">
                    <Heading size="lg" color = "gray.700">{recipe.name} </Heading>
                    <Badge colorScheme="yellow" fontSize="0.8em" p={1} borderRadius="full">
                        AI Generated
                    </Badge>
                </HStack>
            </Box>

            {/* Recipe Content */}
            <VStack align="stretch" spacing={6} p={6}>
                {/* Nutritional Information */}
                <Box>
                    <Heading size="sm" mb={3} color={useColorModeValue("gray.600", "gray.400")}>
                        Nutritional Information
                    </Heading>
                    <Grid templateColumns="repeat(4, 1fr)" gap={4}>
                        <GridItem>
                            <NutritionStat
                                icon={FaFire}
                                label="Calories"
                                value={`${recipe.calories} kcal`}
                                accentColor={accentColor}
                            />
                        </GridItem>
                        <GridItem>
                            <NutritionStat icon={FaLeaf} label="Protein" value={recipe.nutrition.protein} accentColor={accentColor} />
                        </GridItem>
                        <GridItem>
                            <NutritionStat
                                icon={FaBreadSlice}
                                label="Carbs"
                                value={recipe.nutrition.carbs}
                                accentColor={accentColor}
                            />
                        </GridItem>
                        <GridItem>
                            <NutritionStat icon={FaOilCan} label="Fat" value={recipe.nutrition.fat} accentColor={accentColor} />
                        </GridItem>
                    </Grid>
                </Box>

                <Separator />

                {/* Recipe Steps */}
                <Box>
                    <Heading size="sm" mb={3} color={useColorModeValue("gray.600", "gray.400")}>
                        Cooking Instructions
                    </Heading>
                    <VStack align="stretch" spacing={3}>
                        {recipe.steps
                            .split("\n") // Split on newlines
                            .map((step) => step.trim()) // Remove leading/trailing whitespace
                            .filter((step) => step) // Remove empty lines
                            .map((step, index) => (
                                <HStack key={index} align="flex-start">
                                    <Box
                                        minWidth="24px"
                                        height="24px"
                                        borderRadius="full"
                                        bg={primaryColor}
                                        color="white"
                                        fontSize="sm"
                                        fontWeight="bold"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        mt={1}
                                    >
                                        {index + 1}
                                    </Box>
                                    <Text color="gray.900">
                                        {step.endsWith(".") ? step : `${step}.`} {/* Ensure each step ends with a period */}
                                    </Text>
                                </HStack>
                            ))}
                    </VStack>
                </Box>
            </VStack>
        </Box>
    )
}

function NutritionStat({ icon, label, value, accentColor }) {
    return (
        <VStack align="center" spacing={1}>
            <Icon as={icon} boxSize={6} color={accentColor} />
            <Text fontSize="sm" fontWeight="bold" color={useColorModeValue("gray.600", "gray.400")}>
                {label}
            </Text>
            <Text fontSize="md" fontWeight="bold" color="gray.900">
                {value}
            </Text>
        </VStack>
    )
}

export default RecipeCard

