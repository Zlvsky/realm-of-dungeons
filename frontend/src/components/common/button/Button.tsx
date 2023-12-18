import buttonBg from "../../../assets/images/buttonStock.png";

interface ButtonInterface {
  textColor?: string;
  bgColor?: string;
  py?: string;
  size?: "sm" | "md" | "lg" | "full";
  font?: "normal" | "semibold" | "bold";
  children: any;
  disabled?: boolean;
  type?: any;
  onSubmit?: any;
  onClick?: any;
}

function Button({
  textColor,
  bgColor,
  size,
  py,
  font,
  disabled,
  ...rest
}: ButtonInterface) {
  return (
    <button
      disabled={disabled}
      style={{backgroundImage: `url(${buttonBg})`}}
      className={`text-${textColor} py-${py} font-sans bg-center bg-no-repeat bg-contain px-12 flex items-center justify-center gap-1 tracking-wider`}
      {...rest}
    />
  );
}

Button.defaultProps = {
  textColor: "white",
  bgColor: "accent",
  py: "4",
  size: "lg",

};

export default Button;
