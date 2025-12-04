/**
 * Trainee Information Component (Server Component)
 * Displays trainee details in certificate format
 */

interface TraineeInfoProps {
  nameAr: string;
  nationalId: string;
  programName: string;
}

export function TraineeInfo({ nameAr, nationalId, programName }: TraineeInfoProps) {
  return (
    <div className="space-y-6 mb-12">
      <div className="flex items-center justify-between py-3 border-b-2 border-gray-300">
        <span className="text-xl font-bold text-gray-900">المتدرب/</span>
        <span className="text-xl text-gray-800">{nameAr}</span>
      </div>
      
      <div className="flex items-center justify-between py-3 border-b-2 border-gray-300">
        <span className="text-xl font-bold text-gray-900">مقيد لدينا :</span>
        <span className="text-xl text-gray-800">بالعام التدريبي 2025/2026</span>
      </div>
      
      <div className="flex items-center justify-between py-3 border-b-2 border-gray-300">
        <span className="text-xl font-bold text-gray-900">الرقم القومي:</span>
        <span className="text-xl text-gray-800 font-mono">{nationalId}</span>
      </div>
      
      <div className="flex items-center justify-between py-3 border-b-2 border-gray-300">
        <span className="text-xl font-bold text-gray-900">الدولة:</span>
        <span className="text-xl text-gray-800">EG</span>
      </div>
      
      <div className="flex items-center justify-between py-3 border-b-2 border-gray-300">
        <span className="text-xl font-bold text-gray-900">برنامج:</span>
        <span className="text-xl text-gray-800">{programName}</span>
      </div>
    </div>
  );
}