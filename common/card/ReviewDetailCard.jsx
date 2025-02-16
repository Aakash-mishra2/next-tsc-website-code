import Image from "next/image";
import { useState } from "react";
import { RxDoubleArrowRight } from "react-icons/rx";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import ProgressBarWithStars from "../custom/ProgressBarWithStars";

const ReviewDetailCard = ({ review }) => {
  const [detail, showDetail] = useState(false);
  const [isActive, setActive] = useState(false);
  const reviewStr =
    "First I do not usually write reviews although I want to help people buying this product too because I am very happy with my results so far. In January this year, I decided that I should get healthier and lose weight because it was taking a bad effect on my energy levels. After watching fruits and veggies go bad in the fridge, I starting looking at faster ways to get those good nutrients in my body. I have been using Fit&Slim for 4 months now as a substitute to lunch. I am 7kgs lighter now and I have a lot more energy. All the good stuff I'm putting in my body with just 1 glass is helping me lose a healthy amount of weight.";
  const date = new Date(review?.date);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleString("en-US", options);
  return (
    <div className="py-8 border-b border-b-gray-200 flex flex-col md:flex-row">
      <figure className="w-full md:w-1/2">
        <Image
          width={100}
          height={100}
          priority
          src={
            "https://storage.googleapis.com/ayuvya_images/product_image/beautiful_woman_purple_sweater_skirt_testimonial_17april2024.webp"
          }
          alt={review.review_title}
        />
      </figure>
      <figcaption className="w-full md:w-1/2 py-4 md:py-0 md:px-6 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <ProgressBarWithStars iconSize={25} noOfStar={5} />
          <p className="text-sm text-gray-500">
            {review?.date && formattedDate}
          </p>
        </div>
        <div className="flex justify-start items-center gap-5">
          <h2 className="text-md font-semibold">{review.review_owner}</h2>
          {review.verified && (
            <p className="bg-slate-500 text-white rounded-full px-2 py-1 w-fit text-center font-bold text-xs">
              VERIFIED
            </p>
          )}
        </div>
        <p>Lost 7kgs Already Wow</p>
        <p className="text-xl">
          {reviewStr.length > 200 && !detail ? (
            <>
              {reviewStr.slice(0, 200) + ".... "}{" "}
              <span
                className="cursor-none lg:cursor-pointer text-md text-red-500 hover:underline hover:underline-offset-2"
                onClick={() => showDetail(true)}
              >
                Read More
              </span>
            </>
          ) : (
            <>
              {reviewStr}{" "}
              {reviewStr.length > 200 && (
                <span
                  className="cursor-none lg:cursor-pointer text-md text-red-500 hover:underline hover:underline-offset-2"
                  onClick={() => showDetail(false)}
                >
                  Read Less
                </span>
              )}
            </>
          )}
        </p>
        <div className="flex items-center justify-between text-sm">
          <p>143 people found this helpful</p>
          <p className="flex items-center gap-2">
            Was this Helpful?
            <span className="cursor-none lg:cursor-pointer">
              {isActive ? (
                <AiFillHeart size={18} onClick={() => setActive(false)} />
              ) : (
                <AiOutlineHeart size={18} onClick={() => setActive(true)} />
              )}
            </span>
          </p>
        </div>
        <div className="my-2 border border-gray-300 p-4 rounded shadow-md">
          <p className="flex justify-start items-center gap-2">
            <RxDoubleArrowRight size={22} />
            <span className="text-lg font-semibold">Ayuvya Replied:</span>
          </p>
          <p className="py-2">
            Hi Sharikh ,thank you for choosing Ayuvya in your fitness journey.
            Your transformation is commendable. Keep it up. Take care, have fun
            :)
          </p>
        </div>
      </figcaption>
    </div>
  );
};

export default ReviewDetailCard;
