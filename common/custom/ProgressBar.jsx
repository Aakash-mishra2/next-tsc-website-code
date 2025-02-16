const ProgressBar = ({ percent, reviewCount }) => {
  return (
    <div className="flex gap-5 items-center">
      <div className="bg-slate-200 w-1/2 md:w-2/3 h-4 rounded-[4px]">
        <div
          className="bg-yellow-300 w-1/2 md:w-2/3 h-4 rounded-[4px]"
          style={{ width: percent + "%" }}
        ></div>
      </div>
      <span className="flex gap-2">
        <span>{percent}%</span>
        <span>({reviewCount})</span>
      </span>
    </div>
  );
};

export default ProgressBar;
