import Image from "next/image";
import CardHoc from "../../UI/CardHoc";

const IngredientCard = ({ imageUrl, description, title }) => {
  return (
    <CardHoc className="w-1/3">
      <div className="">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="">{description}</p>
      </div>
      <Image
        width={100}
        height={100}
        priority
        src={imageUrl}
        alt=""
        className="w-32 rounded-full"
      />
    </CardHoc>
  );
};

export default IngredientCard;
