import ProgressBar from "./ProgressBar";
import { AiFillStar } from "react-icons/ai";

const ProgressBarWithStars = ({
  iconSize,
  percent,
  noOfStar,
  reviewCount,
  className,
}) => {
  const coloredIcons = new Array(noOfStar).fill(null);
  const uncoloredIcons = new Array(5 - noOfStar).fill(null);

  return (
    <div className={`flex gap-5 items-center ${className ? className : ""}`}>
      <div className="flex">
        {coloredIcons.map((item, i) => {
          return <AiFillStar key={i} size={iconSize} color="#ffd700" />;
        })}
        {uncoloredIcons.map((item, i) => {
          return (
            <AiFillStar key={i} size={iconSize} className="text-slate-200" />
          );
        })}
      </div>
      {(percent || percent === 0) && (
        <div className="w-full">
          <ProgressBar percent={percent} reviewCount={reviewCount} />
        </div>
      )}
    </div>
  );
};

export default ProgressBarWithStars;
