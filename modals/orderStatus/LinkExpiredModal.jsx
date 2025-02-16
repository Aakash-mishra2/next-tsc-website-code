import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/common";

const LinkExpired = () => {
  const router = useRouter();
  return (
    <div className="w-[20rem] md:w-96 lg:w-[28rem] mx-auto p-5">
      <figure className="flex justify-center mb-5">
        <Image
          width={100}
          height={100}
          priority
          src={
            "https://storage.googleapis.com/ayuvya_images/product_image/cart_expired_assetimageother_17april2024.png"
          }
          alt="Cart Expired"
        />
      </figure>
      <figcaption className="text-center text-lg text-slate-500">
        <h2 className="text-4xl mb-3 text-slate-600">Cart Expired</h2>
        <p>Your Cart Is Having Abondonment Issue.</p>
        <p>Please Recreate Your Order.</p>
        <div className="flex justify-center gap-3 my-5">
          <Button
            className="px-8 py-2 text-white bg-slate-400 hover:bg-slate-400/80 text-lg rounded-full"
            handler={() => handleClose()}
          >
            Home
          </Button>
          <Button
            className="px-8 py-2 text-white bg-slate-400 hover:bg-slate-400/80 text-lg rounded-full"
            handler={() => router.push("/collection/ayurvedic-products")}
          >
            Recreate
          </Button>
        </div>
      </figcaption>
    </div>
  );
};

export default LinkExpired;
