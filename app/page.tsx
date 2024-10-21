import Hero from "@/components/hero";
import RecipeTable from "@/components/recipe-table";

export default async function Index() {
  return (
    <>
      <Hero />
      <main className="flex-1 flex flex-col gap-6 px-4">
        <RecipeTable />
      </main>
    </>
  );
}
