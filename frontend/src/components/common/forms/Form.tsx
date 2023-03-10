import React from "react";
import Button from "../button/Button";

interface FormInterface {
  id?: string;
  formArr?: any[];
  submitBtn?: any;
  onSubmit?: any;
  redirect?: any;
  buttonSize?: "sm" | "md" | "lg" | "full";
  buttonPy?: string;
  disabled?: boolean;
  children: JSX.Element | JSX.Element[];
}

function Form({
  id,
  submitBtn,
  buttonSize,
  buttonPy,
  onSubmit,
  disabled,
  children,
}: FormInterface) {
  return (
    <form
      id={id}
      className="pt-1 "
      onSubmit={(e: any) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="mb-4">{children}</div>
      <div className="flex justify-center pt-1 mt-10 mb-4 pb-1">
        <Button
          type="submit"
          disabled={disabled}
          py={buttonPy}
          size={buttonSize}
        >
          {submitBtn}
        </Button>
      </div>
    </form>
  );
}

export default Form;
