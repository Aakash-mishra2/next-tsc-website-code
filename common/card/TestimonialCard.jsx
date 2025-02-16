import Link from "next/link";
import Image from "next/image";
import CardHoc from "../../UI/CardHoc";
import { AiFillStar } from "react-icons/ai";

const TestimonialCard = ({ product }) => {
  const items = new Array(Math.round(product?.rating)).fill(null);
  return (
    <div className="pt-4 mx-2 pb-4 bg-slate-50 px-2">
      <CardHoc className="bg-white p-5">
        <figure className="flex justify-center">
          <Image
            className={`rounded-t-md object-cover w-full aspect-square ${
              product?.isRight && "object-right"
            }`}
            src={product?.imageUrl}
            alt={product.productName}
            width={400}
            height={400}
            priority
          />
        </figure>
        <figcaption className="flex flex-col justify-center items-center">
          <div className="text-center">
            <h3 className="text-base font-bold pb-3 pt-5">{product?.title}</h3>
            <p className="text-sm leading-5 italic">
              &quot;{product?.description}&quot;
            </p>
            <p className="text-sm pt-1">- {product?.name}</p>
          </div>
          <div className="flex gap-1 pt-2 pb-3">
            {items.map((_item, i) => {
              return <AiFillStar key={i} size={20} color="yellowGreen" />;
            })}
          </div>
          <Link
            href={product?.productSlug}
            className="text-sm md:text-base bg-lime-950 text-white rounded-full font-semibold px-4 py-1 shadow-md"
          >
            Shop {product?.productName}
          </Link>
        </figcaption>
      </CardHoc>
    </div>
  );
};

export default TestimonialCard;
