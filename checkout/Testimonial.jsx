import { AiFillStar } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

// import required modules
import { Autoplay } from "swiper/modules";
import { testimonialCheckout } from "@/data/testimonial";

const Testimonial = () => {
  return (
    <div className="mt-5 rounded-md cursor-none lg:cursor-pointer">
      <Swiper
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {testimonialCheckout.map((item) => (
          <SwiperSlide key={item.id} className="flex flex-col text-center">
            <div className="bg-[#fbf8ec] h-full p-3 rounded-md flex flex-col text-center">
              <div className="flex gap-1 justify-center">
                <AiFillStar size={30} color="#ffd700" />
                <AiFillStar size={30} color="#ffd700" />
                <AiFillStar size={30} color="#ffd700" />
                <AiFillStar size={30} color="#ffd700" />
                <AiFillStar size={30} color="#ffd700" />
              </div>
              <p className="mb-2 mt-5 text-sm xss:text-lg text-slate-500">
                {item?.customer_feedback}
              </p>
              <p className="font-semibold text-slate-700">
                - {item?.customer_name}
              </p>
            </div>
            {/*<div className="flex justify-between items-start my-2">
              <div className="flex flex-col gap-2 justify-center items-center w-1/3">
                <Image
                  width={100}
                  height={100}
                  src={COD}
                  style={{ width: "5rem" }}
                  alt="Cash On Delivery"
                />
                <p className="text-sm">Cash On Delivery</p>
              </div>
              <div className="flex flex-col gap-2 justify-center items-center w-1/3">
                <Image
                  width={100}
                  height={100}
                  src={Herbal}
                  style={{ width: "5rem" }}
                  alt="100% Herbal Products"
                />
                <p className="text-sm">100% Herbal Products</p>
              </div>
              <div className="flex flex-col gap-2 justify-center items-center w-1/3">
                <Image
                  width={100}
                  height={100}
                  src={Trusted}
                  style={{ width: "5rem" }}
                  alt="Trusted by 5 Lakh+ Customers"
                />
                <p className="text-sm">Trusted by 10 Lakh+ Customers</p>
              </div>
        </div>*/}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;
