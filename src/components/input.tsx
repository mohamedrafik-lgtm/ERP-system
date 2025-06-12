import React from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type:string,
  name?: string;
  className?: string;
  placeholder?: string;
  id?: string;
}

export const Input: React.FC<IProps> = ({
  name,
  className = "",
  placeholder = "",
  id,
  type,
  ...rest
}) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      className={`px-4 py-2 border  outline-none ${className}`}
      {...rest}
    />
  );
};
