"use client";
import { getRecipebySlug } from "@/app/actions/recipes";
import { Recipe } from "@/lib/props/types";
import React, { useEffect, useState } from "react";
import Loader from "./common/loader";

interface RecipeCardProps {
  slug: string;
}

const RecipeCard = ({ slug }: RecipeCardProps) => {
  const [recipe, setRecipe] = useState<Partial<Recipe> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeData = await getRecipebySlug(slug);
        setRecipe(recipeData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, []);

  if (loading || !recipe)
    return (
      <div>
        <Loader />
      </div>
    );

  return (
    <div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img className="w-full" src={recipe.photo} alt={recipe.title} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{recipe.title}</div>
          <p className="text-gray-700 text-base">{recipe.description}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          {recipe.tags?.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="px-6 py-4">
          <ul>
            <li>
              <strong>Prep Time:</strong> {recipe.prepTime} mins
            </li>
            <li>
              <strong>Cook Time:</strong> {recipe.cookTime} mins
            </li>
            <li>
              <strong>Servings:</strong> {recipe.servings}
            </li>
            <li>
              <strong>Calories:</strong> {recipe.calories}
            </li>
            <li>
              <strong>Rating:</strong> {recipe.rating} / 5 ({recipe.reviews}{" "}
              reviews)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
