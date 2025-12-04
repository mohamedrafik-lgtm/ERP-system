"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { 
  AcademicCapIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

interface TrainingProgram {
  id: number;
  nameAr: string;
  nameEn: string;
  price: number;
  description: string | null;
  numberOfClassrooms: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface TrainingProgramsResponse {
  success: boolean;
  programs: TrainingProgram[];
}

export default function DeliveryTrackingPage() {
  const router = useRouter();
  const [programs, setPrograms] = useState<TrainingProgram[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    setIsLoading(true);
    try {
      const token = Cookies.get('access_token') || Cookies.get('auth_token');
      const response = await fetch('http://localhost:4000/api/training-programs', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('فشل في جلب البرامج');
      }

      const data: TrainingProgramsResponse = await response.json();
      setPrograms(data.programs);
    } catch (error) {
      toast.error('حدث خطأ في تحميل البرامج');
      console.error('Error fetching programs:', error);
    }
    setIsLoading(false);
  };

  const filteredPrograms = programs.filter(program =>
    program.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
    program.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProgramClick = (programId: number) => {
    router.push(`/DeliveryTracking/${programId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">تتبع التسليم</h1>
              <p className="text-gray-600">اختر البرنامج التدريبي لعرض سجلات التسليم</p>
            </div>
            <button
              onClick={fetchPrograms}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <ArrowPathIcon className="w-5 h-5" />
              تحديث
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="بحث عن برنامج..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Programs Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredPrograms.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            لا توجد برامج
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program) => (
              <button
                key={program.id}
                onClick={() => handleProgramClick(program.id)}
                className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6 hover:border-blue-500 hover:shadow-xl transition-all text-right group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                    <AcademicCapIcon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-blue-600 transition-colors">
                      {program.nameAr}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{program.nameEn}</p>
                    {program.description && (
                      <p className="text-sm text-gray-500 line-clamp-2">{program.description}</p>
                    )}
                    <div className="mt-3 flex items-center gap-4 text-sm">
                      <span className="text-gray-600">
                        💰 {program.price.toLocaleString()} جنيه
                      </span>
                      <span className="text-gray-600">
                        🏫 {program.numberOfClassrooms} فصل
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}