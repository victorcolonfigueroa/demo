"use client";

import { getRecipe, getRecipes } from "@/app/actions/recipes";
import React, { useEffect, useState } from "react";

const RecipeTable = () => {
  //   const [title, setTitle] = useState("");
  //   const [description, setDescription] = useState("");

  // fetch only one recipe
  //   const [recipe, setRecipe] = useState({
  //     id: "d77c773d-ae69-4b3f-8965-b21951b80e44",
  //     title: "",
  //     description: "",
  //     instructions: [],
  //     ingredients: [],
  //     photos: [],
  //   });

  const [recipes, setRecipes] = useState([
    {
      id: "",
      title: "",
      description: "",
      instructions: [],
      ingredients: [],
      photos: [],
    },
  ]);

  useEffect(() => {
    // const fetchRecipe = async () => {
    //   const recipeData = await getRecipe(recipe.id);
    //   console.log(recipeData);
    //   setRecipe(recipeData);
    // };

    // fetchRecipe();

    const fetchRecipes = async () => {
      const recipesData = await getRecipes();

      setRecipes(recipesData);
    };
    fetchRecipes();
  }, []);

  return (
    <>
      <h1 className="text-xl font-bold text-blue-900">Recipe Table</h1>
      <table className="w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Instructions</th>
            <th>Ingredients</th>
            <th>Photos</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td>{recipe.title}</td>
            <td>{recipe.description}</td>
            <td>
              <ul>
                {recipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
            </td>
            <td>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </td>
            <td>
              <ul>
                {recipe.photos &&
                  recipe.photos.map((photo, index) => (
                    <li key={index}>{photo}</li>
                  ))}
              </ul>
            </td>
          </tr> */}
          {recipes.map((recipe) => (
            <tr key={recipe.id}>
              {/* <td className="truncate text-wrap max-w-16 ">{recipe.id}</td> */}
              <td>{recipe.title}</td>
              <td>{recipe.description}</td>
              <td>
                <ul>
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {recipe.photos &&
                    recipe.photos.map((photo, index) => (
                      <li key={index}>{photo}</li>
                    ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default RecipeTable;
{
  /* <p>{title}</p>
      <p>{description}</p>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="title">Description</label>
        <input
          type="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div> */
}
