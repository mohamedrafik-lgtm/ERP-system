const FormField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-2 group/field">
    <label className="
      text-sm font-semibold
      text-gray-700
      transition-all duration-300
      group-hover/field:text-gray-900
      flex items-center gap-2
    ">
      <span className="
        w-1 h-1 rounded-full
        bg-blue-400 opacity-0
        transition-all duration-300
        group-hover/field:opacity-100
        group-hover/field:w-2
      "></span>
      {label}
    </label>
    {children}
  </div>
);
export default FormField