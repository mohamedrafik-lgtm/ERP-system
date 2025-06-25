import { UseFormRegister, Path, FieldErrors } from "react-hook-form";
import { IAddStudent, IRequist } from "@/interface";

type InputProps = {
  register: UseFormRegister<IRequist>;
  required?: boolean;
  data: IAddStudent[];
  errors: FieldErrors<IRequist>;
};

export const StudentInformation = ({ register, required = true, data, errors }: InputProps) => {
  return data.map((itm, idx) => (
    <div key={idx} className="flex flex-col space-y-2">
      <label htmlFor={itm.id} className="mb-2 ">{itm.label} {required && <span className="text-red-500">*</span>}</label>
      
      {itm.type === "select" && itm.options ? (
        <select
          id={itm.id}
          {...register(itm.name as Path<IRequist>, { 
            required: required ? `${itm.label} مطلوب` : false,
          })}
          className="rounded-md p-2 bg-white w-full placeholder-black/20"
          defaultValue={1}
        >
          <option value="">{itm.placeholder}</option>
          {itm.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={itm.type}
          id={itm.id}
          placeholder={itm.placeholder}
          {...register(itm.name as Path<IRequist>, { required: required ? `${itm.label} مطلوب` : false })}
          className="rounded-md p-2 bg-white w-full placeholder-black/20"
        />
      )}
      
      {errors[itm.name as Path<IRequist>]?.message && (
        <p className="text-red-400 text-sm">
          {errors[itm.name as Path<IRequist>]?.message?.toString()}
        </p>
      )}
    </div>
  ));
};
