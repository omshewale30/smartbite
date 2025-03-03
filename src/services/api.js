export const fetchRecipes = async (data, isImage = false) => {
    try {
        const response = await fetch("http://localhost:5000/recipes", {
            method: "POST",
            headers: isImage ? {} : { "Content-Type": "application/json" },
            body: data,
        });
        if (!response.ok) throw new Error("Failed to fetch recipes");
        return await response.json();
    } catch (error) {
        console.error("Fetch Error:", error);
        return null;
    }
};

export const fetchIngredients = async (data) => {
    try {
        const response = await fetch("http://localhost:5000/ingredients", {
            method: "POST",
            body: data,
        });
        if (!response.ok) throw new Error("Failed to fetch ingredients");
        return await response.json();
    } catch (error) {
        console.error("Fetch Error:", error);
        return null;
    }
};