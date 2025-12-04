"use client";

/**
 * Certificate Client Wrapper (Client Component)
 * Handles client-side functionality (RTK Query)
 */

import { useGetStudentQuery } from "@/lip/features/student/student";
import { LoadingSpinner, PrintButton } from "@/components/shared";
import { CertificateHeader } from "./CertificateHeader";
import { TraineeInfo } from "./TraineeInfo";
import { SignatureSection } from "./SignatureSection";
import { formatDateLong } from "@/utils/formatters";

interface CertificateClientProps {
  traineeId: number;
}

export function CertificateClient({ traineeId }: CertificateClientProps) {
  const { data: trainee, isLoading, error } = useGetStudentQuery({ id: traineeId });
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  if (error || !trainee) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center">
          <h3 className="text-xl font-bold text-red-600 mb-2">حدث خطأ</h3>
          <p className="text-gray-600 mb-4">لم يتم العثور على بيانات المتدرب</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-white">
      <PrintButton label="طباعة الإفادة" position="fixed" />
      <div className="max-w-4xl mx-auto p-12" dir="rtl">
        <div className="bg-white p-16">
        <CertificateHeader 
          photoUrl={trainee.photoUrl}
          traineeName={trainee.nameAr}
        />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-gray-900 mb-2">تشهد / طيبة للعلوم المنصورة... بأن</h1>
        </div>
        
        <TraineeInfo 
          nameAr={trainee.nameAr}
          nationalId={trainee.nationalId}
          programName={trainee.program?.nameAr || 'مساعد خدمات صحية'}
        />
        
        <div className="text-center mb-12">
          <p className="text-xl text-gray-800 leading-relaxed mb-6">
            لا يوجد لدينا مانع من تدريب المتدرب لديكم دون أدنى مسئولية على المركز
          </p>
          <p className="text-xl text-gray-800 leading-relaxed">
            مع أمانينا بقبوله في نسبة الحضور والالتزام و مستوى المتدرب المعنى
          </p>
        </div>
        
        <div className="text-right mb-12">
          <p className="text-2xl font-bold text-gray-900">
            تحريراً في: {formatDateLong(new Date())}
          </p>
        </div>
        
          <SignatureSection />
        </div>
      </div>
      
      <style jsx global>{`
        @media print {
          body { background: white; }
          .print\\:hidden { display: none !important; }
          @page { margin: 1.5cm; size: A4; }
        }
      `}</style>
    </div>
  );
}