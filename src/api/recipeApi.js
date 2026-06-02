const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5001";

export async function generateRecipe(ingredients) {
  const response = await fetch(`${API_BASE}/generate-recipe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients })
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Failed to generate recipe: ${response.status} ${text}`);
  }

  return response.json();
}