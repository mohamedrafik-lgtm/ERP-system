/**
 * Signature Section Component (Server Component)
 * Displays signature lines for officials
 */

export function SignatureSection() {
  return (
    <div className="grid grid-cols-3 gap-12 mt-20">
      <div className="text-center">
        <div className="border-t-4 border-gray-800 pt-3 mb-2"></div>
        <p className="font-bold text-lg text-gray-900">مدير المركز</p>
        <p className="text-sm text-gray-600">مركز تدريب موثق</p>
      </div>
      <div className="text-center">
        <div className="border-t-4 border-gray-800 pt-3 mb-2"></div>
        <p className="font-bold text-lg text-gray-900">شئون المتدربين</p>
      </div>
      <div className="text-center">
        <div className="border-t-4 border-gray-800 pt-3 mb-2"></div>
        <p className="font-bold text-lg text-gray-900">مسئول البرنامج</p>
      </div>
    </div>
  );
}