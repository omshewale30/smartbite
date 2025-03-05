import {Box, Input, Button, VStack, Text, HStack, IconButton, Spacer, Image} from "@chakra-ui/react";
import {
    FileUploadList,
    FileUploadRoot,
    FileUploadTrigger,
} from "@/components/ui/file-upload"
import { HiUpload, HiTrash } from "react-icons/hi";
import {fetchIngredients, fetchRecipes} from "../services/api";
import {useEffect, useState} from "react";

function IngredientInput({ setRecipes, setLoading }) {
    const [ingredients, setIngredients] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [recognizedIngredients, setRecognizedIngredients] = useState([]);
    const [newIngredient, setNewIngredient] = useState("");

    const handleTextSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if(!ingredients) throw new Error("No ingredients provided");
            const recipeData = await fetchRecipes(JSON.stringify({ingredients}), false);
            setRecipes(recipeData);
        }catch (error){
            console.error("API Error:", error);
            setRecipes(null);
        }
        setLoading(false);
        setIngredients("");
    }
    const handleImageSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if(!image) throw new Error("No image provided");
            const formData = new FormData();
            formData.append("image", image);
            const data = await fetchIngredients(formData, true);
            setRecognizedIngredients(data.ingredients.split(",").map((item) => item.trim()));
        } catch (error) {
            console.error("API Error:", error);
            setRecognizedIngredients([]);
        }
        setLoading(false);
        setImage(null);
    };

    const handleRecipeGenerate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            const finalIngredients = recognizedIngredients.join(",");
            if(!finalIngredients) throw new Error("No ingredients provided");

            const recipeData = await fetchRecipes(JSON.stringify({ingredients:finalIngredients}), false);
            setRecipes(recipeData);
        }catch (error){
            console.error("API Error:", error);
            setRecipes(null);

        }
        setLoading(false);
        setRecognizedIngredients([]);
    }

    const addIngredient = () => {
        if(newIngredient.trim()){
            setRecognizedIngredients([...recognizedIngredients, newIngredient.trim()]);
            setNewIngredient("");
        }
    }

    const deleteIngredient = (index) => {
        setRecognizedIngredients(recognizedIngredients.filter((_, i) => i !== index));
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file){
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }
    useEffect(() => {
        return () => {
            if(imagePreview){
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    return (
        <VStack gap ={10}>
            {!recognizedIngredients.length ? (
                <>
                <form onSubmit={handleTextSubmit}>
                    <VStack gap={4}>
                        <Text
                            fontWeight="bold"
                            fontSize="lg"
                            color="black"

                        >Enter Ingredients:</Text>
                        <Input
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                            placeholder="e.g., chicken, spinach, quinoa"
                            disabled={image}
                            p={5}
                            size="lg"

                        />
                        <Button type="submit" isDisabled={!ingredients || image}>
                            Generate Recipe
                        </Button>
                    </VStack>
                </form>
                <Text
                    color="gray.500"
                    fontWeight="bold"
                    fontSize="3xl"
                >OR</Text>
                <form onSubmit={handleImageSubmit}>
                    <VStack gap={4}
                        alignitems="center">
                        <FileUploadRoot pl ={4}
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        disabled={ingredients}>
                            <FileUploadTrigger asChild>
                                <Button
                                    variant="subtle"
                                    size="sm"
                                    as="label"
                                >
                                    <HiUpload /> Upload Image
                                </Button>
                            </FileUploadTrigger>
                            <FileUploadList />
                        </FileUploadRoot>
                        {imagePreview && (
                            <Box>
                                <Image
                                    src={imagePreview}
                                    alt="Uploaded Image"
                                    h="300px"
                                    w="300px"
                                    fit="contain"

                                />
                            </Box>
                        )}
                        <Button type="submit" colorScheme="green" isDisabled={!image || ingredients}>
                            Recognize Ingredients
                        </Button>
                    </VStack>
                </form>
        </>
            ) : (
                <VStack spacing={4} align="stretch">
                    <Text fontWeight="bold">Recognized Ingredients:</Text>
                    {recognizedIngredients.map((item, index) => (
                        <HStack key={index} justify="space-between">
                            <Text>{item}</Text>
                            <IconButton
                                aria-label="Delete ingredient"
                                icon={<HiTrash />}
                                size="sm"
                                variant="ghost"
                                onClick={() => deleteIngredient(index)}
                            />
                        </HStack>
                    ))}
                    <HStack>
                        <Input
                            value={newIngredient}
                            onChange={(e) => setNewIngredient(e.target.value)}
                            placeholder="Add another ingredient"
                            size="sm"
                        />
                        <Button size="sm" onClick={addIngredient}>
                            Add
                        </Button>
                    </HStack>
                    <Button
                        colorScheme="green"
                        onClick={handleRecipeGenerate}
                        isDisabled={!recognizedIngredients.length}
                    >
                        Generate Recipe
                    </Button>
                </VStack>
            )}
        </VStack>
    );
}

export default IngredientInput;