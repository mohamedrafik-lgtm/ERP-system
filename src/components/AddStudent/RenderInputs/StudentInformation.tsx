import { UseFormRegister, Path } from "react-hook-form";
import { IAddStudent, IFormValues } from "@/interface";

type InputProps = {
  register: UseFormRegister<IFormValues>;
  required?: boolean;
  data: IAddStudent[];
};

export const StudentInformation = ({ register, required, data }: InputProps) => {
  return data.map((itm, idx) => (
    <div key={idx} className="flex flex-col space-y-2">
      <label htmlFor={itm.id} className="mb-2 text-white">{itm.label}</label>
      <input
        type={itm.type}
        id={itm.id}
        placeholder={itm.placeholder}
        {...register(itm.name as Path<IFormValues>, { required })}
        className="rounded-md p-2 bg-white/20 w-full text-white placeholder-white/70"
      />
    </div>
  ));
};
