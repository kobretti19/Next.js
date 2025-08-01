import { getMeal } from "@/lib/meals";
import { notFound } from "next/navigation";
import classes from "./page.module.css";
import Image from "next/image";

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const meal = await getMeal(params.mealSlug);

  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary, // ✅ fixed typo: was `summry`
  };
}

// Page component
export default async function MealDetailsPage({ params }) {
  const meal = await getMeal(params.mealSlug); // ✅ added await

  if (!meal) {
    notFound();
  }

  // ✅ Avoid mutating original object
  const instructionsHtml = meal.instructions.replace(/\n/g, "<br />");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>

      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: instructionsHtml,
          }}
        ></p>
      </main>
    </>
  );
}
