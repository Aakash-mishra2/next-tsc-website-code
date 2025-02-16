import Image from "next/image";
import Button from "../Button";
import CardHoc from "../../UI/cardHoc";
import { Link } from "react-router-dom";

const BlogCardIOS = ({ product, isBlogPage, marginVertical }) => {
  return (
    <Link href={`/blog/${product?.slug}`}>
      <CardHoc
        className={`
      bg-white relative cursor-none lg:cursor-pointer ${marginVertical}`}
      >
        <span className="absolute bg-black text-white top-0 left-0 opacity-50 px-4 py-1 rounded-tl-md rounded-br-md">
          {product?.category == null ? "New" : product?.category.category}
        </span>
        <figure className="w-68 aspect-square">
          <Image
            width={100}
            height={100}
            priority
            className="rounded-t-md object-cover"
            src={product?.blog_image}
            alt=""
          />
        </figure>
        <figcaption className="min-h-[13rem] lg:min-h-[12rem] p-3">
          <h2 className="text-lg pb-3 font-bold">{product?.blog_title}</h2>
          <div className="text-base md:text-lg">
            {product?.blog_description.slice(0, 75)}
          </div>
          {product?.blog_description.length > 75 && (
            <div className="flex justify-center my-2">
              <Button className="bg-black h-10 w-28 text-white rounded-lg">
                <span className="flex justify-center w-full h-full items-center">
                  Read More
                </span>
              </Button>
            </div>
          )}
        </figcaption>
      </CardHoc>
    </Link>
  );
};

export default BlogCardIOS;
