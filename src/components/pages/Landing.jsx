import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Landing() {
    return (
        <Box textAlign="center" py={20}>
            <Heading as="h1" size="2xl" color="green.600" mb={4}>
                smArtbIte
            </Heading>
            <Text fontSize="xl" mb={6}>
                Your AI-powered companion for healthy, delicious recipes.
            </Text>
            <Button as={Link} to="/home" colorScheme="green" size="lg">
                Get Started
            </Button>
        </Box>
    );
}

export default Landing;