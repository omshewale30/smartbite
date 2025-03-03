import {Box, Button, Heading, Spacer, Text, VStack} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import backgroundImg from "/bg_image.jpeg";

function Landing() {
    return (
        <Box
            minH="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgImage = {`url(${backgroundImg})`}
            bgPos={"center"}
            bgBlendMode= {"multiply"}
            bgColor="gray"
            bgRepeat={"no-repeat"}
            bgSize={"cover"}
        >
            <VStack textAlign="center">
                <Heading
                    as="h1"
                    p = "10"
                    fontSize={{ base: "4xl", md: "6xl" }}
                    fontWeight="extrabold"
                    letterSpacing="tight"
                    color="white"
                    textShadow="0 2px 4px rgba(0, 0, 0, 0.2)"
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
                <Text
                    fontSize={{ base: "lg", md: "xl" }}
                    color="whiteAlpha.900"
                    maxW="600px"
                    fontStyle="italic"
                    textShadow="0 1px 3px rgba(0, 0, 0, 0.1)"
                >
                    "Bite into Health with AI-Powered Creativity"
                </Text>
                <Spacer p={10} />
                <Button
                    as={Link}
                    to="/home"
                    size="lg"
                    bg="#2F855A"
                    color="white"
                    _hover={{
                        bg: "#2F855A",
                        transform: "scale(1.05)",
                        boxShadow: "xl",
                    }}
                    _active={{ transform: "scale(0.95)" }}
                    boxShadow="lg"
                    px="8"
                    transition="all 0.3s ease"
                >
                    Start Cooking Smart
                </Button>
            </VStack>
        </Box>
    );
}

export default Landing;