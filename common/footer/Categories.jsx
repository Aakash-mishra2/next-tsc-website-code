import Link from "next/link";

const Categories = ({ categories }) => {
  return (
    <>
      {categories && (
        <div className="bg-black flex flex-col justify-center items-center p-3">
          <p className="text-white text-md lg:text-lg text-center lg:text-left flex flex-wrap justify-center items-center px-4 md:px-6 lg:px-10 gap-x-4 gap-y-2">
            {categories.map((category, idx) => {
              const sub_url = `/${
                category?.category_slug === "nutrition"
                  ? "category/natural-health-care"
                  : category?.category_slug === "skin-care"
                  ? "category/ayurvedic-skin-care"
                  : category?.type + "/" + category?.category_slug
              }`;
              return (
                <Link key={idx} href={sub_url}>
                  • {category.category_name}
                </Link>
              );
            })}
          </p>
        </div>
      )}
    </>
  );
};

export default Categories;
