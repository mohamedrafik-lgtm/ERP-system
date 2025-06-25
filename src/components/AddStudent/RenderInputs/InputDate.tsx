import { IStudentRequest } from "@/interface";
import FormField from "../FormField";

const InputDate = ({
  label,
  name,
  register,
  error,
}: {
  label: string;
  name: keyof IStudentRequest;
  register: any;
  error?: string;
}) => (
  <FormField label={label}>
    <input
      type="date"
      {...register(name)}
      className={`w-full border rounded-md px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        error ? 'border-red-500' : 'border-gray-300'
      }`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </FormField>
);

export default InputDate