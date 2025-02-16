"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/common";

const Cancelled = ({ details }) => {
  const router = useRouter();
  return (
    <div className="h-screen flex flex-col justify-center items-center mx-auto p-2">
      <figure className="flex justify-center mb-5">
        <Image
          width={100}
          height={100}
          priority
          src={
            "https://storage.googleapis.com/ayuvya_images/product_image/warning_assetimageother_17april2024.png"
          }
          alt="Warning"
        />
      </figure>
      <figcaption className="text-center text-lg text-slate-500">
        <h2 className="text-4xl mb-3 text-slate-600">Warning!</h2>
        <p>Your Order Is Already Cancelled.</p>
        <p>Product: {details?.product_name}</p>
        <p>Order Id: {details?.get_order_id}</p>
        <p>Amount: {details?.amount}</p>
        <div className="flex justify-center my-5">
          <Button
            className="px-8 py-2 text-white bg-slate-400 hover:bg-slate-400/80 text-lg rounded-full"
            handler={() => router.replace("/")}
          >
            Home
          </Button>
        </div>
      </figcaption>
    </div>
  );
};

export default Cancelled;
