"use client";

import { getRecipebySlug } from "@/app/actions/recipes";
import { Recipe } from "@/lib/props/types";
import React, { useEffect, useState } from "react";
import Loader from "./common/loader";
import Back from "./common/back";
import Image from "next/image";
import Link from "next/link"; // Import Link for navigation
import { Edit } from "lucide-react";

interface RecipeCardProps {
  slug: string;
}

const RecipeCard = ({ slug }: RecipeCardProps) => {
  const [recipe, setRecipe] = useState<Recipe>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeData = await getRecipebySlug(slug);
        if (!recipeData) throw new Error("Recipe not found");
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
      <div>
        <Back />
      </div>
      <h3 className="text-5xl w-full text-center font-semibold">{recipe.title}</h3>
      <div className="max-w-4xl mx-auto my-8 bg-slate-800 rounded-lg shadow-lg overflow-hidden">
        <Image
          className="w-full object-contain"
          src={recipe.photos[0]}
          alt={recipe.title}
          width={800}
          height={400}
        />
        <div className="p-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">
              {recipe.rating} ★ ({recipe.reviews} reviews)
            </span>
            {/* Edit Button */}
            <Link href={`/edit-recipe/${slug}`}>
              <button className="ml-4 p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 flex items-center">
                <Edit className="w-4 h-4 mr-1" /> Edit
              </button>
            </Link>
          </div>
          <p className="mt-2 text-white">{recipe.description}</p>

          {/* Ingredients Section */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Ingredients</h3>
            <ul className="list-disc list-inside mt-2 text-white">
              {recipe.ingredients?.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          {/* Instructions Section */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Instructions</h3>
            <ol className="list-decimal list-inside mt-2 text-white space-y-2">
              {recipe.instructions?.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>

          {/* Additional Information */}
          <div className="mt-4 flex justify-between text-white">
            <span><strong>Prep Time:</strong> {recipe.prepTime} mins</span>
            <span><strong>Cook Time:</strong> {recipe.cookTime} mins</span>
            <span><strong>Servings:</strong> {recipe.servings}</span>
            <span><strong>Calories:</strong> {recipe.calories}</span>
          </div>

          {/* Tags Section */}
          <div className="mt-4">
            {recipe.tags?.map((tag) => (
              <span key={tag} className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;