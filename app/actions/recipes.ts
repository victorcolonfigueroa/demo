//basic supabase fetch func
//crud- post, get, get all, edit,  delete
// //const { data: notes } = await supabase.from("notes").select();
// fetchAll
// const {data:note} = await supabase.from("notes").select().eq(id)
"use server";
import { createClient } from "@/utils/supabase/client";
import { getSession } from "../actions";
import { Recipe } from "@/lib/props/types";

const supabase = createClient();

export async function createRecipe(recipe: {
  title: string;
  description: string;
  instructions: string[];
  ingredients: string[];
  photos: string[];
}) {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("recipes")
    .insert({ ...recipe, creator_id: session.user.id })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getRecipes(): Promise<Recipe[] | null> {
  const { data, error } = await supabase.from("recipes").select("*");

  if (error) throw error;
  return data;
}
export async function getRecipebyId(id: string): Promise<Recipe | null> {
  const { data, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw console.log(error);

  return data;
}

export async function getRecipebySlug(slug: string): Promise<Recipe | null> {
  const { data, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw console.log(error);

  return data;
}

export async function updateRecipe(
  id: string,
  recipe: Partial<{
    title: string;
    description: string;
    instructions: string[];
    ingredients: string[];
    photos: string[];
  }>
) {
  const session = await supabase;
  if (!session) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("recipes")
    .update(recipe)
    .eq("id", id)
    .eq("creator_id", session.auth.getUser().then((user) => user.data.user?.id))
    .select()
    .single();

  if (error) throw error;
}

export async function searchRecipes(query: string) {
  const { data, error } = await supabase
    .from("recipes")
    .select("*")
    .or("title.ilike.%${query}%,description.ilike.%${query}%");

  if (error) throw error;
  return data;
}
