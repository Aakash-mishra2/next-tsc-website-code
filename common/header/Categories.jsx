import Link from "next/link";
import { Fragment } from "react";
import { categoryData } from "@/data/categoryDescription";

const Categories = () => {
  const categories = categoryData?.results;
  return (
    <div className="hidden lg:flex gap-6 text-xs">
      <div className="hover:scale-110 transition ease-in duration-200">
        {categories.length > 0 && (
          <Link href="/collection/ayurvedic-products">ALL PRODUCTS</Link>
        )}
      </div>
      {categories.map((category) => {
        const sub_url = `/${
          category?.category_slug === "nutrition"
            ? "category/natural-health-care"
            : category?.category_slug === "skin-care"
            ? "category/ayurvedic-skin-care"
            : category?.type + "/" + category?.category_slug
        }`;
        return (
          <Fragment key={category.id}>
            {category?.show_on_header && (
              <div className="hover:scale-110 transition-transform duration-300">
                <Link href={sub_url}>
                  {category.category_name.toUpperCase()}
                </Link>
              </div>
            )}
          </Fragment>
        );
      })}
      <div className="hover:scale-110 transition-transform duration-300">
        <Link href="/blog">BLOGS</Link>
      </div>
    </div>
  );
};

export default Categories;
