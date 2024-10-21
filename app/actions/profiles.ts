"use server";

import { createClient } from "@/utils/supabase/client";
import { getSession } from "../actions";

const supabase = createClient();

export async function updateProfile(profile: {
  first_name?: string;
  last_name?: string;
  username?: string;
}) {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("users")
    .update(profile)
    .eq("id", session.user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
}

export async function searchUsers(query: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .or(
      "first_name.ilike.%${query}%,last_name.ilike.%${query}%,user_name.ilike.%${query}%"
    );

  if (error) throw error;
  return data;
}
