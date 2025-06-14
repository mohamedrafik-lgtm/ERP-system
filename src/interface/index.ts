import React from "react";
export interface IAddStudent{
    name:string,
    type:string,
    placeholder:string,
    label:string,
    id:string,
    pattrn?:RegExp
}
export interface FilterButtonProps {
  label: string;
  options: string[];
  onSelect: (value: string) => void;
}
export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    url: string;
    name: string;
    className?: string;
}