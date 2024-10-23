import RecipeCard from "@/components/recipe-card";
import React from "react";

const page = ({ params: { slug } }: { params: { slug: string } }) => {
  return (
    <div>
      <RecipeCard slug={slug} />
    </div>
  );
};

export default page;
