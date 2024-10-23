"use client";

import { getRecipes } from "@/app/actions/recipes";
import React, { useEffect, useState } from "react";
import { Recipe } from "@/lib/props/types";
import RecipeLoader from "./common/recipeLoader";
import Loader from "./common/loader";
import Link from "next/link";

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
      <h1 className="text-3xl text-yellow-600">Recipe List</h1>
      <ul className="w-full">
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
    </div>
  );
};

export default RecipeList;
