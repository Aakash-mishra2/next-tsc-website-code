import Image from "next/image";
import upi from "../../../public/assets/icons/svg/upi.svg";
import cash from "../../../public/assets/icons/svg/cash.svg";
import bank from "../../../public/assets/icons/svg/bank.svg";
import gpay from "../../../public/assets/icons/svg/gpay.png";
import paytm from "../../../public/assets/icons/svg/paytm.svg";
import phonePe from "../../../public/assets/icons/svg/phonepe.svg";
import maestro from "../../../public/assets/icons/svg/maestro.svg";
import mastercard from "../../../public/assets/icons/svg/mastercard.svg";

export default function PaymentCards({ confirm }) {
  return (
    <>
      <div
        className={`grid ${
          confirm ? "grid-cols-7" : "grid-cols-8"
        } justify-center items-center gap-1`}
      >
        <Image
          src={bank}
          width={80}
          height={80}
          className="object-contain w-fit p-[2px]"
          alt="Bank Image"
        />
        <Image
          src={maestro}
          width={80}
          height={80}
          className="object-contain w-fit"
          alt="Maestro Image"
        />
        <Image
          src={upi}
          width={80}
          height={80}
          className="object-contain w-fit"
          alt="UPI Image"
        />
        <Image
          src={gpay}
          width={80}
          height={80}
          className="object-contain w-fit"
          alt="Google Pay Image"
        />
        <Image
          src={paytm}
          width={80}
          height={80}
          className="object-contain w-fit"
          alt="Paytm Image"
        />
        <Image
          src={phonePe}
          width={80}
          height={80}
          className="object-contain w-fit"
          alt="PhonePe Image"
        />
        <Image
          src={mastercard}
          width={80}
          height={80}
          className="object-contain w-fit"
          alt="Master Card Image"
        />
        {!confirm && (
          <Image
            src={cash}
            width={80}
            height={80}
            className="object-contain w-fit p-1"
            alt="Cash Image"
          />
        )}
      </div>
      {!confirm && (
        <Image
          priority
          unoptimized
          width={100}
          height={100}
          src={
            "https://storage.googleapis.com/ayuvya_images/product_image/trust_banner_1may2024.png "
          }
          alt="Trust Icons Image"
          className="w-full mt-6 object-contain"
        />
      )}
    </>
  );
}
