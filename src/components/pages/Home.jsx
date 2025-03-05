"use client"

import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Icon,
    Text,
    Spinner,
    VStack,
    HStack,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import IngredientInput from "/src/components/IngredientInput.jsx"
import RecipeCard from "/src/components/RecipeCard.jsx"
import { useState } from "react"
import { FaArrowLeft, FaUtensils } from "react-icons/fa"
import {useColorModeValue} from "@chakra-ui/system";

// Create motion components with Chakra
const MotionBox = motion(Box)
const MotionFlex = motion(Flex)

function Home() {
    const [recipes, setRecipes] = useState(null)
    const [loading, setLoading] = useState(false)

    const bgColor = useColorModeValue("gray.50", "gray.900")
    const cardBgColor = useColorModeValue("white", "gray.800")
    const primaryColor = "#2F855A" // Green color from landing page
    const accentColor = "#F6E05E" // Yellow color from landing page
    const textColor = useColorModeValue("gray.700", "gray.200") //Added this line

    return (
        <Box minH="100vh" bg={bgColor} py={{ base: 6, md: 12 }} px={{ base: 4, md: 8 }}>
            {/* Navigation */}
            <Container maxW="container.xl" mb={8}>
                <Button
                    as={Link}
                    to="/"
                    leftIcon={<FaArrowLeft />}
                    variant="ghost"
                    color={primaryColor}
                    _hover={{ bg: `${primaryColor}10` }}
                    size="sm"
                >
                    Back to Landing
                </Button>
            </Container>

            <Container maxW="container.md">
                <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    {/* Header */}
                    <VStack spacing={4} mb={10}>
                        <Heading
                            as="h1"
                            size={{ base: "2xl", md: "3xl" }}
                            color={primaryColor}
                            fontWeight="extrabold"
                            letterSpacing="tight"
                            textAlign="center"
                        >
                            sm
                            <Text as="span" color={accentColor} fontSize={{ base: "1.1em", md: "1.2em" }}>
                                A
                            </Text>
                            rtb
                            <Text as="span" color={accentColor} fontSize={{ base: "1.1em", md: "1.2em" }}>
                                I
                            </Text>
                            te
                        </Heading>
                        <Text
                            fontSize={{ base: "lg", md: "xl" }}
                            color={useColorModeValue("gray.600", "gray.400")}
                            textAlign="center"
                            maxW="600px"
                            fontWeight="medium"
                        >
                            Discover healthy recipes tailored to your ingredients with AI magic.
                        </Text>
                    </VStack>

                    {/* Main Content Card */}
                    <Box bg={cardBgColor} borderRadius="xl" boxShadow="lg" overflow="hidden" mb={10}>
                        {/* Ingredient Input Section */}
                        <Box p={{ base: 6, md: 8 }}>
                            <VStack spacing={4} align="stretch">
                                <HStack>
                                    <Icon as={FaUtensils} color={primaryColor} boxSize={5} />
                                    <Heading as="h2" size="md" color={textColor}>
                                        {" "}
                                        {/* Changed this line */}
                                        Enter Your Ingredients
                                    </Heading>
                                </HStack>
                                <Text color={useColorModeValue("gray.600", "gray.400")} fontSize="sm">
                                    List the ingredients you have, and we'll create personalized recipe suggestions.
                                </Text>
                                <Box mt={2}>
                                    <IngredientInput setRecipes={setRecipes} setLoading={setLoading} />
                                </Box>
                            </VStack>
                        </Box>
                    </Box>

                    {/* Loading State */}
                    {loading && (
                        <MotionBox
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                            py={10}
                        >
                            <Box
                                position="relative"
                                width="80px"
                                height="80px"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color={primaryColor} size="xl" />
                                <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
                                    <Icon as={FaUtensils} color={accentColor} boxSize={6} />
                                </Box>
                            </Box>
                            <Text mt={4} fontWeight="medium" color={useColorModeValue("gray.600", "gray.400")}>
                                Cooking up your recipes...
                            </Text>
                        </MotionBox>
                    )}

                    {/* Recipe Results */}
                    {recipes && (
                        <MotionBox
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            mt={8}
                        >
                            <Box bg={cardBgColor} borderRadius="xl" boxShadow="lg" overflow="hidden">
                                <Box bg={primaryColor} py={3} px={6} color="white">
                                    <Heading as="h3" size="md">
                                        Your Personalized Recipe
                                    </Heading>
                                </Box>
                                <Box p={{ base: 4, md: 6 }}>
                                    <RecipeCard recipe={recipes} />
                                </Box>
                            </Box>
                        </MotionBox>
                    )}
                </MotionBox>
            </Container>
        </Box>
    )
}

export default Home

