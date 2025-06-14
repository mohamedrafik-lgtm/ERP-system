import React from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  name?: string;
  className?: string;
  placeholder?: string;
  id?: string;
}

export const Input = React.forwardRef<HTMLInputElement, IProps>(
  ({ type, name, className = "", placeholder = "", id, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        className={`px-4 py-2 border outline-none ${className}`}
        {...rest}
      />
    );
  }
);

Input.displayName = "Input";
