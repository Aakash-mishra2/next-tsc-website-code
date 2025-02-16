import Image from "next/image";

const Platforms = ({ product }) => {
  return (
    <figure className="w-36 aspect-auto">
      <Image
        width={100}
        height={100}
        alt={product?.id}
        placeholder="blur"
        src={product?.image_url}
        className="mix-blend-multiply"
        blurDataURL={product?.image_url && product?.image_url.toString()}
      />
    </figure>
  );
};

export default Platforms;
