import classNames from "classnames";
import React from "react";

interface CheckboxInterface {
  required?: boolean;
  children: any;
  checked?: true | false;
  onChange?: any;
  id: string;
  disabled?: true | false;
}

function Checkbox({
  children,
  required,
  checked,
  id,
  disabled,
  ...rest
}: CheckboxInterface) {
  return (
    <div className="flex align-center items-center mt-4">
      <div className="flex flex-col relative">
        <label
          htmlFor={id}
          className={classNames("relative", {
            "cursor-pointer": disabled === false || disabled === undefined,
            "cursor-not-allowed": disabled === true,
          })}
        >
          <input
            id={id}
            type="checkbox"
            className={classNames(
              "checkBox-input h-4 w-4 border p-2 rounded-sm check-1 z-10",
              {
                "border-lightGrey":
                  disabled === false || disabled === undefined,
                "border-gray-600": disabled === true,
              }
            )}
            required={required}
            disabled={disabled}
            {...rest}
          />
          <div className="checkBox-content h-2.5 w-2.5 absolute bg-darkBlue bottom-2.5 left-1 check-1 opacity-0 rounded-sm transition-opacity z-0"></div>
        </label>
      </div>

      <label
        htmlFor={id}
        className={classNames("ml-2 -mt-1 text-sm text-left text-primary font-sans")}
      >
        {children}
      </label>
    </div>
  );
}

export default Checkbox;
