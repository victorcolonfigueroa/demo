// pages/edit-recipe/[slug].tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getRecipebySlug, updateRecipe } from "@/app/actions/recipes"; // Ensure these functions are defined
import { Recipe } from "@/lib/props/types";

const EditRecipe = () => {
  const router = useRouter();
  const { slug } = router.query; // Get the recipe slug from the URL
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      if (slug) {
        const recipeData = await getRecipebySlug(slug as string);
        setRecipe(recipeData);
        if (recipeData) {
          setTitle(recipeData.title);
          setIngredients(recipeData.ingredients.join(", "));
          setInstructions(recipeData.instructions.join("\n"));
        }
      }
    };

    fetchRecipe();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!title || !ingredients || !instructions) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await updateRecipe(slug as string, {
        title,
        ingredients: ingredients.split(",").map((ingredient) => ingredient.trim()),
        instructions: instructions.split("\n"),
      });
      router.push(`/recipes/${slug}`); // Redirect after successful update
    } catch (err) {
      console.error(err);
      setError("Failed to update recipe. Please try again.");
    }
  };

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Edit Recipe</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="title">
            Recipe Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded w-full px-3 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="ingredients">
            Ingredients (comma-separated)
          </label>
          <input
            type="text"
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="border rounded w-full px-3 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="instructions">
            Instructions (one per line)
          </label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="border rounded w-full px-3 py-2"
            rows={4}
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Update Recipe
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;