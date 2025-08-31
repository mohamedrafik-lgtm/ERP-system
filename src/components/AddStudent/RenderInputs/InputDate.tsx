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
    <div className="relative">
      <input
        type="date"
        {...register(name)}
        className={`
          w-full
          px-3 py-2
          bg-white
          border rounded-md
          text-sm text-gray-900
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${error ? 'border-red-500' : 'border-gray-300'}
          [&::-webkit-calendar-picker-indicator]:opacity-100
          [&::-webkit-calendar-picker-indicator]:cursor-pointer
          [&::-webkit-datetime-edit]:rtl
          [&::-webkit-datetime-edit-fields-wrapper]:p-0
          [&::-webkit-datetime-edit-text]:text-gray-500
          [&::-webkit-datetime-edit-text]:px-1
          [&::-webkit-datetime-edit-month-field]:text-gray-900
          [&::-webkit-datetime-edit-day-field]:text-gray-900
          [&::-webkit-datetime-edit-year-field]:text-gray-900
          [&::-webkit-datetime-edit-month-field:hover]:bg-gray-100
          [&::-webkit-datetime-edit-day-field:hover]:bg-gray-100
          [&::-webkit-datetime-edit-year-field:hover]:bg-gray-100
          [&::-webkit-datetime-edit-month-field:hover]:rounded
          [&::-webkit-datetime-edit-day-field:hover]:rounded
          [&::-webkit-datetime-edit-year-field:hover]:rounded
        `}
      />
    </div>
    {error && (
      <p className="mt-1.5 text-sm text-red-500">
        {error}
      </p>
    )}
  </FormField>
);

export default InputDate;