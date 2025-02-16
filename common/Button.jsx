import { hexToRGB } from "@/api/events";
import CircularLoader from "./CircularLoader";

export const Button = ({
  id,
  type,
  theme,
  handler,
  disabled,
  children,
  className,
  hideLoader,
  staticLoaderTheme,
}) => {
  return (
    <button
      id={id}
      onClick={handler}
      disabled={disabled}
      type={type || "button"}
      style={{ backgroundColor: theme && `${hexToRGB(`${theme}`, 1)}` }}
      className={`flex justify-center gap-1 items-center cursor-none lg:cursor-pointer transition-all ease-in-out duration-300 ${className}`}
    >
      {children}{" "}
      {!hideLoader && disabled && (
        <CircularLoader
          theme={staticLoaderTheme ?? theme}
          classes="min-h-[20px] min-w-[20px] h-5 w-5"
        />
      )}
    </button>
  );
};

export default Button;
