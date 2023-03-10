import React from "react";
import classNames from "classnames";

interface InputInterface {
  label: string;
  name: string;
  type: string;
  placeholder?: any;
  value?: string | number;
  required?: boolean;
  onChange?: any;
  inputClassName?: string;
  divClassName?: string;
  maxLength?: any;
  onKeyPress?: any;
  error?: any;
}

const Input = ({
  label,
  name,
  type,
  placeholder,
  value,
  inputClassName,
  divClassName,
  required,
  error,
  ...rest
}: InputInterface) => {
  return (
    <div className={classNames("relative flex flex-col", divClassName)}>
      <label htmlFor={name} className="font-sans text-primary font-medium">
        {label}
      </label>
      <input
        className={classNames(
          `bg-bgBrown border border-borderBrown border-t-borderTopBrown font-sans placeholder-primary text-primary block w-full py-3 px-4 focus-visible:outline-none`,
          inputClassName
        )}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        type={type}
        {...rest}
        required={required}
      />
      {error && (
        <p className="text-error text-sm font-semibold pl-2">{error}</p>
      )}
    </div>
  );
};

Input.defaultProps = {
  inputClassName: "mt-4",
  type: "text"
};

export default Input;
