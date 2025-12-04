"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Cookies from "js-cookie";
import { 
  ArrowRightIcon,
  MagnifyingGlassIcon,
  CubeIcon,
  CheckCircleIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

interface StudyMaterial {
  id: string;
  name: string;
  nameEn: string | null;
  description: string | null;
  programId: number;
  linkedFeeId: number | null;
  quantity: number;
  isActive: boolean;
  createdBy: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  program: {
    id: number;
    nameAr: string;
    nameEn: string;
  };
  linkedFee: {
    id: number;
    name: string;
    amount: number;
  } | null;
  _count: {
    deliveries: number;
  };
}

interface StudyMaterialsResponse {
  materials: StudyMaterial[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export default function ProgramStudyMaterialsPage() {
  const router = useRouter();
  const params = useParams();
  const programId = params.programId as string;

  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchMaterials();
  }, [programId]);

  const fetchMaterials = async () => {
    setIsLoading(true);
    try {
      const token = Cookies.get('access_token') || Cookies.get('auth_token');
      const response = await fetch(
        `http://localhost:4000/api/study-materials?programId=${programId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('فشل في جلب البيانات');
      }

      const data: StudyMaterialsResponse = await response.json();
      setMaterials(data.materials);
      setPagination(data.pagination);
    } catch (error) {
      toast.error('حدث خطأ في تحميل البيانات');
      console.error('Error fetching materials:', error);
    }
    setIsLoading(false);
  };

  const filteredMaterials = (materials || []).filter(material => {
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return (
        material.name.toLowerCase().includes(searchLower) ||
        (material.nameEn && material.nameEn.toLowerCase().includes(searchLower))
      );
    }
    return true;
  });

  const programName = materials[0]?.program.nameAr || 'البرنامج';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors mb-4"
          >
            <ArrowRightIcon className="w-5 h-5" />
            رجوع للبرامج
          </button>
          <div className="text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">تسليم الأدوات - {programName}</h1>
            <p className="text-gray-600">اختر الأداة الدراسية لبدء عملية التسليم</p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="البحث في الأدوات الدراسية..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-4 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
              />
            </div>
            <button
              onClick={fetchMaterials}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              بحث
            </button>
          </div>
        </div>

        {/* Materials Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredMaterials.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            لا توجد أدوات دراسية
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((material) => (
              <button
                key={material.id}
                onClick={() => router.push(`/DeliveryTracking/${programId}/${material.id}`)}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl hover:border-blue-500 transition-all text-right w-full"
              >
                {/* Icon and Navigation */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <ArrowRightIcon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="p-3 bg-green-100 rounded-xl">
                    <CubeIcon className="w-8 h-8 text-green-600" />
                  </div>
                </div>

                {/* Material Info */}
                <div className="text-right mb-4">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{material.name}</h3>
                  {material.nameEn && (
                    <p className="text-sm text-gray-600">{material.nameEn}</p>
                  )}
                </div>

                {/* Fee Badge */}
                <div className="mb-4">
                  {material.linkedFee ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                      ✅ يتطلب سداد رسوم
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      <CheckCircleIcon className="w-4 h-4" />
                      مجاني - لا يتطلب سداد رسوم
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">تم التسليم:</p>
                    <p className="text-xl font-bold text-blue-600">{material._count.deliveries}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">الكمية المتاحة:</p>
                    <p className="text-xl font-bold text-green-600">{material.quantity}</p>
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