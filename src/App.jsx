import { useState } from "react";
import IngredientForm from "./components/IngredientForm";
import RecipeDisplay from "./components/RecipeDisplay";
import { generateRecipe } from "./api/recipeApi";

export default function App() {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (ingredients) => {
    setLoading(true);
    setRecipe(null);

    try {
      const result = await generateRecipe(ingredients);
      setRecipe(result);
    } catch (err) {
      alert("Error generating recipe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <h1>Recipe Generator</h1>
      <IngredientForm onGenerate={handleGenerate} />
      {loading && <p>Generating recipe...</p>}
      <RecipeDisplay recipe={recipe} />
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px",
    fontFamily: "Arial"
  }
};