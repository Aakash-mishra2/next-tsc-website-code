const CircularLoader = ({ classes, theme }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        style={{ borderTopColor: theme ? `#${theme}` : "#3498db" }}
        className={`loader ease-linear rounded-full border-2 border-t-2 border-gray-200 ${
          classes ? classes : "min-h-[20px] min-w-[20px] h-5 w-5"
        }`}
      ></div>
    </div>
  );
};

export default CircularLoader;
