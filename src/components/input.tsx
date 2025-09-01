import React, { memo } from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  className?: string;
  placeholder?: string;
  id?: string;
}

const InputComponent = React.forwardRef<HTMLInputElement, IProps>(
  ({ type, className = "", placeholder = "", id, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        id={id}
        placeholder={placeholder}
        className={`px-4 py-2 border outline-none ${className}`}
        {...rest}
      />
    );
  }
);

InputComponent.displayName = "Input";

export const Input = memo(InputComponent);
