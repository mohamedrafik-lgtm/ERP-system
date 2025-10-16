"use client";

import { useState, useEffect } from "react";
import { 
  User, 
  Edit,
  Save,
  X,
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar as CalendarIcon,
  Shield,
  Key,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Upload,
  Trash2,
  BookOpen
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/lip/features/auth/authSlice";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

// Mock data - سيتم استبدالها بالبيانات الحقيقية من API
const mockTraineeData = {
  id: 1,
  nameAr: "أحمد محمد علي",
  nameEn: "Ahmed Mohamed Ali",
  nationalId: "12345678901234",
  phone: "01012345678",
  email: "ahmed@example.com",
  address: "شارع التحرير، القاهرة، مصر",
  birthDate: "1995-03-15",
  photoUrl: "/images/default-avatar.jpg",
  program: {
    id: 1,
    nameAr: "برمجة الحاسوب",
    nameEn: "Computer Programming",
    code: "CP101",
    duration: 6,
    description: "برنامج شامل لتعلم البرمجة وتطوير التطبيقات"
  }
};

const MyAccountPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [traineeData, setTraineeData] = useState(mockTraineeData);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nameAr: "",
    nameEn: "",
    phone: "",
    email: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    // محاولة جلب البيانات الحقيقية من localStorage
    const storedData = localStorage.getItem('traineeData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setTraineeData(parsedData);
        setFormData({
          nameAr: parsedData.nameAr || "",
          nameEn: parsedData.nameEn || "",
          phone: parsedData.phone || "",
          email: parsedData.email || "",
          address: parsedData.address || "",
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
      } catch (error) {
        console.error('Error parsing trainee data:', error);
      }
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({
      nameAr: traineeData.nameAr,
      nameEn: traineeData.nameEn || "",
      phone: traineeData.phone || "",
      email: traineeData.email || "",
      address: traineeData.address || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      nameAr: traineeData.nameAr,
      nameEn: traineeData.nameEn || "",
      phone: traineeData.phone || "",
      email: traineeData.email || "",
      address: traineeData.address || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  const handleSave = async () => {
    try {
      // التحقق من صحة البيانات
      if (!formData.nameAr.trim()) {
        toast.error("الاسم بالعربية مطلوب");
        return;
      }

      if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
        toast.error("كلمة المرور الجديدة غير متطابقة");
        return;
      }

      if (formData.newPassword && formData.newPassword.length < 6) {
        toast.error("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
        return;
      }

      // محاكاة حفظ البيانات
      const updatedData = {
        ...traineeData,
        nameAr: formData.nameAr,
        nameEn: formData.nameEn,
        phone: formData.phone,
        email: formData.email,
        address: formData.address
      };

      setTraineeData(updatedData);
      localStorage.setItem('traineeData', JSON.stringify(updatedData));
      
      setIsEditing(false);
      toast.success("تم حفظ البيانات بنجاح");
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error("حدث خطأ أثناء حفظ البيانات");
    }
  };

  const handleLogout = () => {
    // مسح البيانات من localStorage
    localStorage.removeItem('traineeData');
    
    // مسح الكوكيز
    Cookies.remove('access_token');
    Cookies.remove('auth_token');
    Cookies.remove('user_data');
    
    // تسجيل الخروج من Redux
    dispatch(logout());
    
    // توجيه إلى صفحة تسجيل الدخول
    router.push('/login/student');
    
    toast.success('تم تسجيل الخروج بنجاح');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50" dir="rtl">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>العودة</span>
              </button>
              <div className="w-px h-6 bg-gray-300"></div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">حسابي الشخصي</h1>
                <p className="text-sm text-gray-600">إدارة بياناتك الشخصية</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300"
                >
                  <Edit className="w-4 h-4" />
                  <span>تعديل البيانات</span>
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-300"
                  >
                    <X className="w-4 h-4" />
                    <span>إلغاء</span>
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-300"
                  >
                    <Save className="w-4 h-4" />
                    <span>حفظ</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.nameAr}
                      onChange={(e) => setFormData({...formData, nameAr: e.target.value})}
                      className="w-full text-center text-xl font-bold border-2 border-blue-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    traineeData.nameAr
                  )}
                </h2>
                
                <p className="text-gray-600 mb-4">
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.nameEn}
                      onChange={(e) => setFormData({...formData, nameEn: e.target.value})}
                      className="w-full text-center text-gray-600 border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="الاسم بالإنجليزية"
                    />
                  ) : (
                    traineeData.nameEn || "الاسم بالإنجليزية"
                  )}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4" />
                    <span>الرقم القومي: {traineeData.nationalId}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <BookOpen className="w-4 h-4" />
                    <span>{traineeData.program.nameAr}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">المعلومات الشخصية</h3>
              
              <div className="space-y-6">
                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline ml-2" />
                    رقم الهاتف
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="رقم الهاتف"
                    />
                  ) : (
                    <p className="text-gray-900">{traineeData.phone || "غير محدد"}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline ml-2" />
                    البريد الإلكتروني
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="البريد الإلكتروني"
                    />
                  ) : (
                    <p className="text-gray-900">{traineeData.email || "غير محدد"}</p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline ml-2" />
                    العنوان
                  </label>
                  {isEditing ? (
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                      placeholder="العنوان"
                    />
                  ) : (
                    <p className="text-gray-900">{traineeData.address || "غير محدد"}</p>
                  )}
                </div>

                {/* Birth Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <CalendarIcon className="w-4 h-4 inline ml-2" />
                    تاريخ الميلاد
                  </label>
                  <p className="text-gray-900">{formatDate(traineeData.birthDate)}</p>
                </div>
              </div>
            </div>

            {/* Change Password */}
            {isEditing && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">تغيير كلمة المرور</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Key className="w-4 h-4 inline ml-2" />
                      كلمة المرور الحالية
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.currentPassword}
                        onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                        className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="كلمة المرور الحالية"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      كلمة المرور الجديدة
                    </label>
                    <input
                      type="password"
                      value={formData.newPassword}
                      onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                      className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="كلمة المرور الجديدة"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      تأكيد كلمة المرور الجديدة
                    </label>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="تأكيد كلمة المرور الجديدة"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Program Information */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">معلومات البرنامج</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">اسم البرنامج</label>
                  <p className="text-gray-900">{traineeData.program.nameAr}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">كود البرنامج</label>
                  <p className="text-gray-900">{traineeData.program.code}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">مدة البرنامج</label>
                  <p className="text-gray-900">{traineeData.program.duration} أشهر</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">الوصف</label>
                  <p className="text-gray-900">{traineeData.program.description}</p>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mt-6">
              <h3 className="text-xl font-bold text-red-900 mb-4">منطقة الخطر</h3>
              <p className="text-red-700 mb-4">هذه الإجراءات لا يمكن التراجع عنها.</p>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-300"
              >
                <LogOut className="w-4 h-4" />
                <span>تسجيل الخروج</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountPage;
