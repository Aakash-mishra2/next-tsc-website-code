import Link from "next/link";
import Image from "next/image";
import CardHoc from "../../UI/CardHoc";

const BlogCard = ({ product, isBlogPage, marginVertical }) => {
  const category_slug =
    product.category && product.category.split(" ").join("-").toLowerCase();

  const url =
    product?.blog_shop_url && product?.blog_shop_url.includes("/blog/")
      ? product?.blog_shop_url
      : `/blog/${category_slug}/${product?.slug}`;
  return (
    <CardHoc
      className={`
      bg-white cursor-none relative lg:cursor-pointer ${marginVertical}`}
    >
      {isBlogPage && (
        <span className="absolute bg-black text-white left-0 top-0 opacity-60 px-4 py-1 rounded-tl-md rounded-br-md">
          {product?.category}
        </span>
      )}
      <Link href={url}>
        <figure className="rounded-t-md pb-0">
          <Image
            className={`rounded-t-md object-cover h-full ${
              isBlogPage ? "lg:h-64" : ""
            }`}
            src={product?.blog_image}
            alt={product?.blog_title}
            width={500}
            height={500}
            priority
          />
        </figure>
      </Link>
      <figcaption
        className={`${isBlogPage ? "" : "text-center"} px-3 pb-4 pt-2`}
      >
        <Link href={url}>
          <h2 className="text-xl line-clamp-2 text-left">
            {product?.blog_title}
          </h2>
        </Link>
        {/*{isBlogPage && (
          <div className="flex items-center gap-3">
            <span className="py-1">{product?.date}</span>
            {socialLink ? (
              <Share
                showSocialLink={showSocialLink}
                blogTitle={product?.blog_title}
              />
            ) : (
              <FaShareAlt
                size={18}
                className="text-blue-500"
                onMouseEnter={() => showSocialLink(true)}
              />
            )}
          </div>
            )}*/}
        {/*!isBlogPage && (
          <div className="flex justify-center">
            <Button
              handler={() => router.push(url)}
              className="bg-black h-12 w-32 text-white rounded-lg"
            >
              <span className="flex justify-center w-full h-full items-center">
                Read More
              </span>
            </Button>
          </div>
        )*/}
        {isBlogPage && (
          <div className="break-after-all">
            {product?.blog_description.length > 100
              ? product?.blog_description.slice(0, 100) + "..."
              : product?.blog_description.slice(0, 100)}
          </div>
        )}
      </figcaption>
    </CardHoc>
  );
};

export default BlogCard;
