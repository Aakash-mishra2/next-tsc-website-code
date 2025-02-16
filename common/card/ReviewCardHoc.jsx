import Image from "next/image";
import { Ratings } from "@/components/staticproduct";

export default function ReviewCardHoc({ review }) {
  return (
    <div
      className="bg-white h-auto w-full relative rounded-lg shadow-lg"
      style={{
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      }}
    >
      <div className="bg-white">
        <figure className="rounded-t-xl">
          {review.image && (
            <Image
              alt="new"
              height={200}
              width={400}
              src={review.image}
              className="object-cover rounded-t-xl w-full h-auto"
            />
          )}
        </figure>
        <div
          className="absolute -top-4 bg-white mx-auto z-10 left-0 right-0 w-fit rounded-full px-4 py-1"
          style={{
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        >
          <Ratings iconSize={18} noOfStar={5} starColor={"FDE047"} />
        </div>
        <figcaption className="p-4 my-2 relative">
          <div className="flex gap-4 py-4 items-center">
            <span className="bg-gray-100 rounded-full aspect-square text-2xl h-8 w-8 text-center">
              {review.review_owner.charAt(0)}
            </span>
            {review.review_owner}
          </div>
          <p>{review.review_description}</p>
        </figcaption>
      </div>
    </div>
  );
}
