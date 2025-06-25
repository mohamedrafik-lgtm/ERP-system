export const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 space-y-4">
    <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">{title}</h2>
    {children}
  </div>
);