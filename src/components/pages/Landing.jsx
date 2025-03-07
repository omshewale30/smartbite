"use client"

import {
    Box,
    Button,
    Container,
    Flex,
    Grid,
    Heading,
    HStack,
    Icon,
    Text,
    Separator,
    VStack,
} from "@chakra-ui/react"

import ScrollLink from "@/components/ScrollLink.jsx";
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import backgroundImg from "/bg_image.jpeg"
import { FaAppleAlt, FaBrain, FaUtensils } from "react-icons/fa"
import {useColorModeValue} from "@chakra-ui/system";

// Create motion components with Chakra
const MotionBox = motion(Box)
const MotionText = motion(Text)

function Landing() {
    return (
        <Box minH="100vh">
            {/* Navbar */}
            <Flex
                as="nav"
                align="center"
                justify="space-between"
                wrap="wrap"
                w="100%"
                p={4}
                bg={useColorModeValue("whiteAlpha.800", "gray.800")}
                color={useColorModeValue("gray.800", "white")}
                position="fixed"
                top={0}
                zIndex={10}
                backdropFilter="blur(10px)"
                boxShadow="sm"
            >
                <Flex align="center">
                    <Heading size="md" letterSpacing="tight">
                        sm
                        <Text as="span" color="#F6E05E">
                            A
                        </Text>
                        rtb
                        <Text as="span" color="#F6E05E">
                            I
                        </Text>
                        te
                    </Heading>
                </Flex>

                <HStack gap={10} display={{ base: "none", md: "flex" }} justify="space-between">
                    <ScrollLink to="features" fontWeight= "medium">Features</ScrollLink>
                    <ScrollLink to="about" fontWeight= "medium">About the Developer</ScrollLink>
                    <Text fontWeight="medium">Recipes</Text>
                </HStack>

                <Button
                    as={Link}
                    to="/home"
                    size="sm"
                    bg="#2F855A"
                    color="white"
                    _hover={{ bg: "#276749" }}
                    display={{ base: "none", md: "inline-flex" }}
                >
                    Get Started
                </Button>
            </Flex>

            {/* Hero Section */}
            <Box h="100vh" display="flex" alignItems="center" justifyContent="center" position="relative" overflow="hidden">
                {/* Background Image with Overlay */}
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bgImage={`url(${backgroundImg})`}
                    bgPos="center"
                    bgSize="cover"
                    bgRepeat="no-repeat"
                    _after={{
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bg: "blackAlpha.600",
                        zIndex: 1,
                    }}
                />

                {/* Content */}
                <Container maxW="container.xl" position="relative" zIndex={2}>
                    <VStack spacing={6} textAlign="center" px={{ base: 4, md: 0 }}>
                        <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            <Heading
                                as="h1"
                                fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
                                fontWeight="extrabold"
                                letterSpacing="tight"
                                color="white"
                                textShadow="0 2px 10px rgba(0, 0, 0, 0.3)"
                                lineHeight="1.2"
                            >
                                sm
                                <Text as="span" color="#F6E05E" fontSize={{ base: "1.2em", md: "1.3em" }}>
                                    A
                                </Text>
                                rtb
                                <Text as="span" color="#F6E05E" fontSize={{ base: "1.2em", md: "1.3em" }}>
                                    I
                                </Text>
                                te
                            </Heading>
                        </MotionBox>

                        <MotionText
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            fontSize={{ base: "xl", md: "2xl" }}
                            color="whiteAlpha.900"
                            maxW="700px"
                            fontStyle="italic"
                            textShadow="0 1px 3px rgba(0, 0, 0, 0.2)"
                            mb={8}
                        >
                            "Bite into Health with AI-Powered Creativity"
                        </MotionText>

                        <MotionBox
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            display="flex"
                            flexDir={{ base: "column", sm: "row" }}
                            gap={4}
                            mt={10}
                        >
                            <Button
                                as={Link}
                                to="/home"
                                size="lg"
                                height="60px"
                                px={8}
                                fontSize="lg"
                                bg="#2F855A"
                                color="white"
                                _hover={{
                                    bg: "#276749",
                                    transform: "translateY(-5px)",
                                    boxShadow: "xl",
                                }}
                                _active={{ transform: "scale(0.98)" }}
                                boxShadow="lg"
                                transition="all 0.3s ease"
                                borderRadius="full"
                            >
                                Start Cooking Smart
                            </Button>
                            <Button
                                size="lg"
                                height="60px"
                                px={8}
                                fontSize="lg"
                                variant="outline"
                                color="white"
                                borderColor="white"
                                _hover={{
                                    bg: "whiteAlpha.200",
                                    transform: "translateY(-5px)",
                                    boxShadow: "xl",
                                }}
                                _active={{ transform: "scale(0.98)" }}
                                transition="all 0.3s ease"
                                borderRadius="full"
                            >
                                Learn More
                            </Button>
                        </MotionBox>
                    </VStack>
                </Container>
            </Box>

            {/* Features Section */}
            <Box id="features" bg={useColorModeValue("gray.50", "gray.900")} py={20}>
                <Container maxW="container.xl">
                    <VStack gap={16}>
                        <VStack spacing={4} textAlign="center">
                            <Heading as="h2" size="2xl" color={useColorModeValue("gray.700", "white")}>
                                Cook Smarter, Not Harder
                            </Heading>
                            <Text fontSize="xl" color={useColorModeValue("gray.600", "gray.400")} maxW="800px">
                                Our AI-powered platform transforms your cooking experience with personalized recipes, nutritional
                                insights, and creative meal planning.
                            </Text>
                        </VStack>

                        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={10} width="100%">
                            {/* Feature 1 */}
                            <VStack
                                spacing={4}
                                p={8}
                                bg={useColorModeValue("white", "gray.800")}
                                borderRadius="xl"
                                boxShadow="lg"
                                transition="all 0.3s ease"
                                _hover={{ transform: "translateY(-5px)", boxShadow: "xl" }}
                            >
                                <Box p={4} borderRadius="full" bg="#2F855A" color="white">
                                    <Icon as={FaBrain} w={8} h={8} />
                                </Box>
                                <Heading as="h3" size="lg" color={useColorModeValue("gray.800", "white")}>
                                    AI-Powered Recipes
                                </Heading>
                                <Text textAlign="center" color={useColorModeValue("gray.600", "gray.400")}>
                                    Get personalized recipe recommendations based on your preferences, dietary needs, and available
                                    ingredients.
                                </Text>
                            </VStack>

                            {/* Feature 2 */}
                            <VStack
                                spacing={4}
                                p={8}
                                bg={useColorModeValue("white", "gray.800")}
                                borderRadius="xl"
                                boxShadow="lg"
                                transition="all 0.3s ease"
                                _hover={{ transform: "translateY(-5px)", boxShadow: "xl" }}
                            >
                                <Box p={4} borderRadius="full" bg="#F6E05E" color="gray.800">
                                    <Icon as={FaAppleAlt} w={8} h={8} />
                                </Box>
                                <Heading as="h3" size="lg" color={useColorModeValue("gray.800", "white")}>
                                    Nutritional Insights
                                </Heading>
                                <Text textAlign="center" color={useColorModeValue("gray.600", "gray.400")}>
                                    Track your nutritional intake with detailed analysis of each meal and personalized health
                                    recommendations.
                                </Text>
                            </VStack>

                            {/* Feature 3 */}
                            <VStack
                                spacing={4}
                                p={8}
                                bg={useColorModeValue("white", "gray.800")}
                                borderRadius="xl"
                                boxShadow="lg"
                                transition="all 0.3s ease"
                                _hover={{ transform: "translateY(-5px)", boxShadow: "xl" }}
                            >
                                <Box p={4} borderRadius="full" bg="#2F855A" color="white">
                                    <Icon as={FaUtensils} w={8} h={8} />
                                </Box>
                                <Heading as="h3" size="lg" color={useColorModeValue("gray.800", "white")}>
                                    Zero Waste Cooking
                                </Heading>
                                <Text textAlign="center" color={useColorModeValue("gray.600", "gray.400")} >
                                    Snap a picture of your refrigerator, and we'll suggest recipes based on the ingredients you have.
                                </Text>
                            </VStack>
                        </Grid>

                        <Button
                            as={Link}
                            to="/home"
                            size="md"

                            bg="#2F855A"
                            color="white"
                            _hover={{
                                bg: "#276749",
                                transform: "translateY(-2px)",
                                boxShadow: "lg",
                            }}
                            px={8}
                            fontSize="sm"
                            borderRadius="full"
                        >
                            More features coming soon...
                        </Button>
                    </VStack>
                </Container>
            </Box>
            <Separator variant="solid" colorPalette = "red" size = "xl" />

            <Box id="about" bg={useColorModeValue("gray.50", "gray.900")} py={20}>
                <Container maxW="container.xl">
                    <VStack gap={16}>
                        <VStack gap={4} textAlign="center">
                            <Heading as="h2" size="2xl" color={useColorModeValue("gray.700", "white")}>
                                About the Developer
                            </Heading>
                            <Text fontSize="l" color={useColorModeValue("gray.600", "gray.400")} maxW="800px">
                                Hi, I’m Om! I’m passionate about fitness and believe that what we fuel our bodies with matters just as much as how we move them. For me, cooking at home is a game-changer—it’s where I can control every ingredient, tailor meals to my goals, and cut down on waste. That’s where smArtbIte’s image feature shines: snap a pic of what’s in your fridge, and it transforms those odds and ends into something delicious, no food left behind. I built this app to make healthy, home-cooked meals effortless and personalized for you—whether you’re tweaking recipes to fit your diet or just trying to use what’s on hand. With smArtbIte, you’ll save time, reduce waste, and enjoy food that’s good for you and the planet.
                            </Text>
                        </VStack>
                        <Button
                            as={Link}
                            to="https://om-shewale.onrender.com/"
                            size="lg"
                            mt={10}
                            bg="#F6E05E"
                            color="white"
                            _hover={{

                                transform: "translateY(-2px)",
                                boxShadow: "lg",
                            }}
                            px={8}
                            height="60px"
                            fontSize="lg"
                            borderRadius="full"
                        >
                            <Text color="#276749"> Visit My Portfolio</Text>
                        </Button>
                    </VStack>
                </Container>
            </Box>

            {/* Footer */}
            <Box bg={useColorModeValue("gray.100", "gray.800")} py={10}>
                <Container maxW="container.xl">
                    <Flex
                        direction={{ base: "column", md: "row" }}
                        justify="space-between"
                        align={{ base: "center", md: "flex-start" }}
                        textAlign={{ base: "center", md: "left" }}
                    >
                        <VStack align={{ base: "center", md: "flex-start" }} mb={{ base: 6, md: 0 }}>
                            <Heading size="md" mb={2} color={useColorModeValue("gray.800", "white")}>
                                sm
                                <Text as="span" color="#F6E05E">
                                    A
                                </Text>
                                rtb
                                <Text as="span" color="#F6E05E">
                                    I
                                </Text>
                                te
                            </Heading>
                            <Text color={useColorModeValue("gray.600", "gray.400")}>
                                © {new Date().getFullYear()} All rights reserved
                            </Text>
                        </VStack>

                        <HStack spacing={8}>
                            <VStack align={{ base: "center", md: "flex-start" }}>
                                <Text fontWeight="bold">Product</Text>
                                <Text color={useColorModeValue("gray.600", "gray.400")}>Features</Text>
                                <Text color={useColorModeValue("gray.600", "gray.400")}>Pricing</Text>
                                <Text color={useColorModeValue("gray.600", "gray.400")}>FAQ</Text>
                            </VStack>

                            <VStack align={{ base: "center", md: "flex-start" }}>
                                <Text fontWeight="bold">Company</Text>
                                <Text color={useColorModeValue("gray.600", "gray.400")}>About</Text>
                                <Text color={useColorModeValue("gray.600", "gray.400")}>Blog</Text>
                                <Text color={useColorModeValue("gray.600", "gray.400")}>Contact</Text>
                            </VStack>
                        </HStack>
                    </Flex>
                </Container>
            </Box>
        </Box>
    )
}

export default Landing

