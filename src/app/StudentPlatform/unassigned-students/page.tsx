"use client";

import { useState } from "react";
import { 
  UserX, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  User,
  BookOpen,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
  Users,
  UserCheck
} from "lucide-react";

// Mock data للطلاب غير الموزعين
const mockUnassignedStudents = [
  {
    id: 1,
    name: "أحمد محمد علي",
    studentId: "ST001",
    program: "الذكاء الاصطناعي",
    level: "مبتدئ",
    enrollmentDate: "2024-01-15",
    preferences: ["الذكاء الاصطناعي", "تطوير الويب"],
    waitingDays: 15,
    status: "waiting",
    notes: "يحتاج إلى توزيع عاجل"
  },
  {
    id: 2,
    name: "فاطمة أحمد حسن",
    studentId: "ST002",
    program: "تطوير الويب",
    level: "متوسط",
    enrollmentDate: "2024-01-20",
    preferences: ["تطوير الويب", "البيانات"],
    waitingDays: 10,
    status: "waiting",
    notes: "مستوى جيد، جاهز للتوزيع"
  },
  {
    id: 3,
    name: "محمد علي سعد",
    studentId: "ST003",
    program: "علوم البيانات",
    level: "متقدم",
    enrollmentDate: "2024-02-01",
    preferences: ["علوم البيانات", "الذكاء الاصطناعي"],
    waitingDays: 5,
    status: "pending",
    notes: "في انتظار الموافقة"
  },
  {
    id: 4,
    name: "سارة محمد أحمد",
    studentId: "ST004",
    program: "الأمن السيبراني",
    level: "مبتدئ",
    enrollmentDate: "2024-02-10",
    preferences: ["الأمن السيبراني", "تطوير الويب"],
    waitingDays: 2,
    status: "new",
    notes: "طالب جديد"
  }
];

const UnassignedStudentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showBulkAssignModal, setShowBulkAssignModal] = useState(false);

  const filteredStudents = mockUnassignedStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.program.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || student.status === statusFilter;
    const matchesLevel = levelFilter === "all" || student.level === levelFilter;
    
    return matchesSearch && matchesStatus && matchesLevel;
  });

  const handleStudentSelection = (studentId: number) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(student => student.id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "waiting":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "pending":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "new":
        return "bg-green-100 text-green-800 border-green-200";
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "waiting":
        return "في الانتظار";
      case "pending":
        return "معلق";
      case "new":
        return "جديد";
      case "urgent":
        return "عاجل";
      default:
        return "غير محدد";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "مبتدئ":
        return "bg-green-100 text-green-800";
      case "متوسط":
        return "bg-yellow-100 text-yellow-800";
      case "متقدم":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <UserX className="w-8 h-8 text-red-600" />
              طلاب غير موزعين
            </h1>
            <p className="text-gray-600 mt-2">الطلاب الذين لم يتم توزيعهم على البرامج التدريبية</p>
          </div>
          {selectedStudents.length > 0 && (
            <button 
              onClick={() => setShowBulkAssignModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <UserCheck className="w-5 h-5" />
              توزيع المختارين ({selectedStudents.length})
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">إجمالي غير الموزعين</p>
              <p className="text-2xl font-bold text-gray-900">{mockUnassignedStudents.length}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <UserX className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">في الانتظار</p>
              <p className="text-2xl font-bold text-yellow-600">
                {mockUnassignedStudents.filter(s => s.status === 'waiting').length}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">جدد</p>
              <p className="text-2xl font-bold text-green-600">
                {mockUnassignedStudents.filter(s => s.status === 'new').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <User className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">متوسط الانتظار</p>
              <p className="text-2xl font-bold text-blue-600">
                {Math.round(mockUnassignedStudents.reduce((sum, s) => sum + s.waitingDays, 0) / mockUnassignedStudents.length)} يوم
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <input
                type="text"
                placeholder="البحث في الطلاب..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-4 pl-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">جميع الحالات</option>
              <option value="waiting">في الانتظار</option>
              <option value="pending">معلق</option>
              <option value="new">جديد</option>
              <option value="urgent">عاجل</option>
            </select>
          </div>

          {/* Level Filter */}
          <div>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">جميع المستويات</option>
              <option value="مبتدئ">مبتدئ</option>
              <option value="متوسط">متوسط</option>
              <option value="متقدم">متقدم</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">قائمة الطلاب غير الموزعين</h3>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">اختيار الكل</span>
              </label>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">الطالب</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">البرنامج</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">المستوى</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">مدة الانتظار</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">الحالة</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => handleStudentSelection(student.id)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{student.name}</p>
                          <p className="text-sm text-gray-500">{student.studentId}</p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{student.program}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(student.level)}`}>
                      {student.level}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{student.waitingDays} يوم</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(student.status)}`}>
                      {getStatusText(student.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="عرض التفاصيل">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="توزيع">
                        <UserCheck className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" title="تعديل">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <UserX className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد طلاب غير موزعين</h3>
          <p className="text-gray-500">جميع الطلاب تم توزيعهم بنجاح</p>
        </div>
      )}

      {/* Bulk Assign Modal */}
      {showBulkAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">توزيع الطلاب المختارين</h3>
              <button 
                onClick={() => setShowBulkAssignModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-900">الطلاب المختارين</span>
                </div>
                <p className="text-sm text-blue-700">{selectedStudents.length} طالب</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اختيار التوزيع</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">اختر التوزيع</option>
                  <option value="dist1">توزيع برنامج الذكاء الاصطناعي</option>
                  <option value="dist2">توزيع برنامج تطوير الويب</option>
                  <option value="dist3">توزيع برنامج علوم البيانات</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                <UserCheck className="w-5 h-5" />
                تأكيد التوزيع
              </button>
              <button 
                onClick={() => setShowBulkAssignModal(false)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                ✕
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnassignedStudentsPage;