"use client";
import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  Users,
  Target,
  TrendingUp,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Award,
  BarChart3,
  PieChart,
  Activity,
  RefreshCw,
  Edit,
  MoreVertical,
  Eye,
  Download,
  Filter,
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  BookOpen,
  GraduationCap,
  Star,
  Zap,
  ArrowLeft
} from "lucide-react";
import { useGetMarketingEmployeeByIdQuery } from "@/lip/features/marketers/marketersApi";
import { MarketingEmployeeDetailResponse, Trainee, MarketingTarget } from "@/types/marketing-employee-detail.types";
import { EditMarketingEmployeeModal } from "@/components/Marketing/EditMarketingEmployeeModal";

const MarketingEmployeeDetail = () => {
  const params = useParams();
  const router = useRouter();
  const employeeId = parseInt(params.id as string);

  const [activeTab, setActiveTab] = useState<"overview" | "trainees" | "targets" | "performance">("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch marketing employee details
  const { data: employee, isLoading, error, refetch } = useGetMarketingEmployeeByIdQuery(employeeId);

  // Filter trainees based on search
  const filteredTrainees = useMemo(() => {
    if (!employee?.trainees) return [];
    return employee.trainees.filter(trainee =>
      trainee.nameAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainee.program.nameAr.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [employee?.trainees, searchTerm]);

  // Calculate performance metrics
  const performanceMetrics = useMemo(() => {
    if (!employee) return null;

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    
    const currentTarget = employee.marketingTargets.find(
      target => target.month === currentMonth && target.year === currentYear
    );

    const firstContactAchievement = currentTarget ? 
      (0 / currentTarget.firstContactTarget) * 100 : 0; // سيتم إضافة البيانات لاحقاً
    const secondContactAchievement = currentTarget ? 
      (0 / currentTarget.secondContactTarget) * 100 : 0; // سيتم إضافة البيانات لاحقاً
    const totalAchievement = (firstContactAchievement + secondContactAchievement) / 2;

    return {
      firstContactAchievement: Math.round(firstContactAchievement),
      secondContactAchievement: Math.round(secondContactAchievement),
      totalAchievement: Math.round(totalAchievement),
      currentTarget
    };
  }, [employee]);

  const handleRefresh = () => {
    refetch();
  };

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getMonthName = (month: number) => {
    const months = [
      'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];
    return months[month - 1] || '';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
            <RefreshCw className="w-12 h-12 text-blue-500 animate-spin" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">جاري التحميل...</h3>
          <p className="text-gray-600">يرجى الانتظار بينما نقوم بجلب بيانات المسوق</p>
        </div>
      </div>
    );
  }

  if (error || !employee) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">حدث خطأ</h3>
          <p className="text-gray-600">لم نتمكن من جلب بيانات المسوق</p>
          <div className="flex gap-4 justify-center mt-6">
            <button
              onClick={handleRefresh}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              إعادة المحاولة
            </button>
            <button
              onClick={() => router.back()}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              العودة
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmMWY1ZjkiIGZpbGwtb3BhY2l0eT0iMC40Ij48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-60"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => router.back()}
              className="p-3 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-gray-200/50"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-2">
                تفاصيل المسوق
              </h1>
              <p className="text-lg text-gray-600 font-medium">
                عرض تفاصيل وأداء المسوق في النظام
              </p>
            </div>
          </div>

          {/* Employee Info Card */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
              {/* Avatar and Basic Info */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-3xl shadow-2xl">
                    {employee.name.charAt(0).toUpperCase()}
                  </div>
                  <span className={`absolute bottom-2 right-2 w-6 h-6 ${employee.isActive ? 'bg-green-500' : 'bg-red-500'} rounded-full border-4 border-white`}></span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{employee.name}</h2>
                  <p className="text-lg text-gray-600 mb-1">موظف تسويق</p>
                  <p className="text-sm text-gray-500">ID: {employee.id}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      employee.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {employee.isActive ? (
                        <>
                          <CheckCircle className="w-4 h-4 ml-1" />
                          نشط
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 ml-1" />
                          غير نشط
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700 font-medium">{employee.phone}</span>
                  </div>
                  {employee.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700 font-medium">{employee.email}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700 font-medium">انضم: {formatDate(employee.createdAt)}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700 font-medium">{employee.totalAssignedTrainees} متدرب</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700 font-medium">{employee.marketingTargets.length} هدف</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700 font-medium">
                      0 اتصال أول
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleRefresh}
                  className="p-3 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-gray-200/50"
                  title="تحديث البيانات"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
                <Link
                  href={`/Marketing/Trainees/${employee.id}`}
                  className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                  title="عرض متدربي المسوق"
                >
                  <Users className="w-5 h-5" />
                </Link>
                <button 
                  onClick={() => {
                    console.log("Edit button clicked, opening modal");
                    setIsEditModalOpen(true);
                  }}
                  className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                  title="تعديل بيانات الموظف"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-200 hover:scale-105">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">إجمالي المتدربين</p>
                <p className="text-3xl font-bold text-blue-600">{employee.totalAssignedTrainees}</p>
                <p className="text-xs text-gray-500 mt-1">متدرب مُعيَّن</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">الاتصالات الأولى</p>
                <p className="text-3xl font-bold text-green-600">0</p>
                <p className="text-xs text-gray-500 mt-1">هذا الشهر</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">الاتصالات الثانية</p>
                <p className="text-3xl font-bold text-purple-600">0</p>
                <p className="text-xs text-gray-500 mt-1">هذا الشهر</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">معدل الإنجاز</p>
                <p className="text-3xl font-bold text-orange-600">
                  {performanceMetrics?.totalAchievement || 0}%
                </p>
                <p className="text-xs text-gray-500 mt-1">الأداء العام</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-8 mb-8">
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { id: "overview", label: "نظرة عامة", icon: BarChart3 },
              { id: "trainees", label: "المتدربين", icon: Users },
              { id: "targets", label: "الأهداف", icon: Target },
              { id: "performance", label: "الأداء", icon: TrendingUp }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">نظرة عامة</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Performance Overview */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">أداء الشهر الحالي</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">الاتصالات الأولى</span>
                        <span className="text-sm font-bold text-gray-900">
                          0 / {performanceMetrics?.currentTarget?.firstContactTarget || 0}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(performanceMetrics?.firstContactAchievement || 0, 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {performanceMetrics?.firstContactAchievement || 0}% إنجاز
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">الاتصالات الثانية</span>
                        <span className="text-sm font-bold text-gray-900">
                          0 / {performanceMetrics?.currentTarget?.secondContactTarget || 0}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-400 to-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(performanceMetrics?.secondContactAchievement || 0, 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {performanceMetrics?.secondContactAchievement || 0}% إنجاز
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">النشاط الأخير</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">متدرب جديد</p>
                        <p className="text-xs text-gray-500">تم إضافة متدرب جديد</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Phone className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">اتصال جديد</p>
                        <p className="text-xs text-gray-500">تم إجراء اتصال أول</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Target className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">هدف جديد</p>
                        <p className="text-xs text-gray-500">تم تعيين هدف جديد</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "trainees" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">المتدربين المُعيَّنين</h3>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="البحث في المتدربين..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTrainees.map((trainee) => (
                  <div key={trainee.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                        {trainee.nameAr.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{trainee.nameAr}</h4>
                        <p className="text-sm text-gray-600">{trainee.program.nameAr}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>انضم: {formatDate(trainee.createdAt)}</span>
                    </div>
                  </div>
                ))}
              </div>

              {filteredTrainees.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Users className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد متدربين</h3>
                  <p className="text-gray-600">لم يتم العثور على أي متدربين</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "targets" && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">الأهداف التسويقية</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {employee.marketingTargets.map((target) => (
                  <div key={target.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">
                        {getMonthName(target.month)} {target.year}
                      </h4>
                      <span className="text-xs text-gray-500">#{target.id}</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">الاتصالات الأولى</span>
                          <span className="text-sm font-bold text-gray-900">{target.firstContactTarget}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">الاتصالات الثانية</span>
                          <span className="text-sm font-bold text-gray-900">{target.secondContactTarget}</span>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">تم الإنشاء</span>
                          <span className="text-xs text-gray-500">{formatDate(target.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {employee.marketingTargets.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Target className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد أهداف</h3>
                  <p className="text-gray-600">لم يتم تعيين أي أهداف تسويقية</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "performance" && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">تحليل الأداء</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Performance Chart Placeholder */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">معدل الإنجاز الشهري</h4>
                  <div className="h-64 flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">رسم بياني للأداء</p>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">مؤشرات الأداء</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">إجمالي المتدربين</span>
                      <span className="text-lg font-bold text-gray-900">{employee.totalAssignedTrainees}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">الاتصالات الأولى</span>
                      <span className="text-lg font-bold text-green-600">0</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">الاتصالات الثانية</span>
                      <span className="text-lg font-bold text-purple-600">0</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">معدل الإنجاز</span>
                      <span className="text-lg font-bold text-orange-600">
                        {performanceMetrics?.totalAchievement || 0}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <EditMarketingEmployeeModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        employee={employee}
        onSuccess={() => {
          refetch(); // إعادة جلب البيانات بعد التحديث
        }}
      />
    </div>
  );
};

export default MarketingEmployeeDetail;
