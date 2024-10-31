"use client";

import { getRecipes } from "@/app/actions/recipes";
import React, { useEffect, useState } from "react";
import { Recipe } from "@/lib/props/types";
import RecipeLoader from "./common/recipeLoader";
import Loader from "./common/loader";
import Link from "next/link";
// import AddRecipe from "./common/add";

const RecipeList = () => {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipesData = await getRecipes();
        setRecipes(recipesData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );
  return (
    <div>
      <h1 className="text-5xl text-yellow-600">Recipe List</h1>
      <ul className="w-full text-3xl">
        {recipes ? (
          recipes.map((recipe) => (
            <li key={recipe.id}>
              <Link href={`/recipes/${recipe.slug}`}>{recipe.title}</Link>
            </li>
          ))
        ) : (
          <li className="my-2">
            <RecipeLoader />
          </li>
        )}
      </ul>
      {/* <div className="flex justify-between items-center">
      <Link href="/new-recipe">
        <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg mt-4">
          Add Recipe
        </button>
      </Link>
        </div> */}
    </div>
  );
};

export default RecipeList;
