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
      className={`text-${textColor} bg-${bgColor} py-${py} px-14 flex items-center justify-center gap-1 rounded-md font-${font}`}
      {...rest}
    />
  );
}

Button.defaultProps = {
  textColor: "white",
  bgColor: "accent",
  py: "3",
  size: "lg",
  font: "semibold",
};

export default Button;
