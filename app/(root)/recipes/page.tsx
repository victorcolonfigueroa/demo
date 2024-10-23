import Loader from "@/components/common/loader";
import RecipeList from "@/components/recipe-list";
import React, { Suspense } from "react";

const page = () => {
  return (
    <>
      <section>
        <Suspense
          fallback={
            <div>
              <Loader />
            </div>
          }
        >
          <RecipeList />
        </Suspense>
      </section>
    </>
  );
};

export default page;
