import { defineConfig, createSystem } from "@chakra-ui/react";

// Define keyframes for the gradient animation
const gradientShift = {
    "0%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
    "100%": { backgroundPosition: "0% 50%" },
};

const config = defineConfig({
    theme: {
        // Custom color tokens
        tokens: {
            colors: {
                smartbiteGreen: "#2F855A", // Health-inspired green
                smartbiteTeal: "#319795",  // Balanced teal
                smartbiteBlue: "#3182CE",  // Tech/AI blue
                smartbiteHighlight: "#F6E05E", // AI emphasis yellow
            },
        },
        // Keyframes for animations
        keyframes: {
            gradientShift,
        },
        // Global styles
        globalCss: {
            body: {
                bg: "gray.50",
                color: "gray.800",
                margin: 0,
                padding: 0,
            },
        },
    },
    // Optional: CSS variable prefix
    cssVarsPrefix: "chakra",
});

export default createSystem(config);