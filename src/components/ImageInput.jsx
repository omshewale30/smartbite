import { Box, Button, VStack, Image } from "@chakra-ui/react";
import {
    FileUploadList,
    FileUploadRoot,
    FileUploadTrigger,
} from "@/components/ui/file-upload";
import { HiUpload } from "react-icons/hi";
import { useState, useEffect } from "react";
import { fetchIngredients } from "../services/api";

export default function ImageInput({ setRecognizedIngredients, setLoading, textEntered }) {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        return () => {
            if (imagePreview) URL.revokeObjectURL(imagePreview);
        };
    }, [imagePreview]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (!image) throw new Error("No image provided");
            const formData = new FormData();
            formData.append("image", image);
            const data = await fetchIngredients(formData, true);
            setRecognizedIngredients(data.ingredients.split(", ").map(item => item.trim()));
        } catch (error) {
            console.error("API Error:", error);
            setRecognizedIngredients([]);
        }
        setLoading(false);
        setImage(null);
        setImagePreview(null);
    };

    return (
        <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
                <FileUploadRoot>
                    <FileUploadTrigger asChild>
                        <Button variant="outline" size="sm" as="label">
                            <HiUpload /> Upload Image
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                disabled={textEntered}
                                onChange={handleImageChange}
                            />
                        </Button>
                    </FileUploadTrigger>
                    <FileUploadList />
                </FileUploadRoot>
                {imagePreview && (
                    <Box mt={4}>
                        <Image
                            src={imagePreview}
                            alt="Uploaded preview"
                            maxH="300px"
                            borderRadius="md"
                            boxShadow="md"
                        />
                    </Box>
                )}
                <Button type="submit" colorScheme="green" isDisabled={!image || textEntered}>
                    Recognize Ingredients
                </Button>
            </VStack>
        </form>
    );
}