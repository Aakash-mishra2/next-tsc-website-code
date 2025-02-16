import topLeftImage from "../../../public/assets/images/about/flower-1.png";
import topRightImage from "../../../public/assets/images/about/flower-2.webp";
import centerLeftImage from "../../../public/assets/images/about/flower-3.webp";
import centerRightImage from "../../../public/assets/images/about/flower-3.webp";
import Image from "next/image";

export default function FlowerMovingBG({theme}) {
  return (
    <>
      <div className="absolute w-full h-full top-0 left-0 -z-10" style={{backgroundColor: `#${theme}`}}>
        <Image
          width={1000}
          height={100}
          src={topLeftImage}
          alt=""
          className={`absolute max-w-md h-auto w-40 -top-4 -left-20 lg:w-52 animate-flower`}
        />
        <Image
          width={1000}
          height={100}
          src={topRightImage}
          alt=""
          className={`absolute max-w-md h-auto w-40 -top-4 -right-14 lg:w-52 animate-flower`}
        />
        <Image
          width={1000}
          height={100}
          src={centerLeftImage}
          alt=""
          className={`absolute max-w-md h-auto w-40 -left-14 -bottom-4 lg:w-52 -scale-x-100 `}
        />
        <Image
          width={1000}
          height={100}
          src={centerRightImage}
          alt=""
          className={`absolute max-w-md h-auto w-40 -right-14 lg:w-52 -bottom-4 animate-flower`}
        />
      </div>
    </>
  );
}
