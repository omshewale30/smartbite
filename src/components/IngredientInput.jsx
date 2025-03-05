import { VStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import TextInput from "./TextInput";
import ImageInput from "./ImageInput";
import IngredientEditor from "./IngredientEditor";

function IngredientInput({ setRecipes, setLoading }) {
    const [recognizedIngredients, setRecognizedIngredients] = useState([]);
    const [ingredients, setIngredients] = useState(""); // For text input
    const [image, setImage] = useState(null); // For image input




    return (
        <VStack gap={6}>
            {!recognizedIngredients.length ? (
                <>
                    <TextInput
                        setRecipes={setRecipes}
                        setLoading={setLoading}
                        imageSelected={!!image}
                    />
                    <Text fontSize="2xl" color="gray.500"
                    fontWeight="bold"
                    >OR</Text>
                    <ImageInput
                        setRecognizedIngredients={setRecognizedIngredients}
                        setLoading={setLoading}
                        textEntered={!!ingredients}
                    />
                </>
            ) : (
                <IngredientEditor
                    recognizedIngredients={recognizedIngredients}
                    setRecognizedIngredients={setRecognizedIngredients}
                    setRecipes={setRecipes}
                    setLoading={setLoading}
                />
            )}
        </VStack>
    );
}

export default IngredientInput;