import Link from "next/link";
import Image from "next/image";
import NewsLetterForm from "../forms/NewsLetterForm";

const LeftSide = () => {
  return (
    <div className="flex flex-col text-center lg:text-left w-full lg:w-1/2 lg:border-r lg:px-16">
      <figure className="w-48 lg:w-72 m-auto lg:m-0">
        <Link href="/">
          <Image
            width={350}
            loading="lazy"
            height={114}
            alt="Ayuvya logo"
            src="https://storage.googleapis.com/ayuvya_images/product_image/ayuvyawhite_logo_17april2024_3.webp"
          />
        </Link>
      </figure>
      <figcaption className="pb-8">
        {/*<p className="text-3xl lg:text-4xl pt-5 lg:pt-3">Get 5% off!</p>*/}
        <NewsLetterForm />
      </figcaption>
    </div>
  );
};

export default LeftSide;
