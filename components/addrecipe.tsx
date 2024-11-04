"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import { addRecipe } from "@/app/actions/recipes"; // Make sure this function is defined to handle adding recipes

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!title || !ingredients || !instructions) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      // Prepare the recipe data
      const recipeData = {
        title,
        ingredients: ingredients.split(",").map((ingredient) => ingredient.trim()),
        instructions,
        image,
      };

      // Call the function to add the recipe
      await addRecipe(recipeData);
      router.push("/"); // Redirect to the main page or recipe list after adding
    } catch (err) {
      console.error(err);
      setError("Failed to add recipe. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Add a New Recipe</h1>
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
            Instructions
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

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="image">
            Image (optional)
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="border rounded w-full px-3 py-2"
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;