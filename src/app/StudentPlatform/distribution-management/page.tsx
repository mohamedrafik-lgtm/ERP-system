"use client";

import { useState } from "react";
import { 
  UserCheck, 
  Users, 
  Plus, 
  User,
  BookOpen,
  Calendar,
  Clock,
  MapPin,
  UserX,
  AlertCircle,
  CheckCircle,
  Edit,
  Trash2
} from "lucide-react";

// Mock data
const mockStudents = [
  {
    id: 1,
    name: "أحمد محمد علي",
    studentId: "ST001",
    program: "الذكاء الاصطناعي",
    level: "مبتدئ",
    status: "available",
    preferences: ["الذكاء الاصطناعي", "تطوير الويب"],
    assignedTo: null
  },
  {
    id: 2,
    name: "سارة أحمد حسن",
    studentId: "ST002", 
    program: "تطوير الويب",
    level: "متوسط",
    status: "assigned",
    preferences: ["تطوير الويب", "البيانات"],
    assignedTo: "توزيع برنامج تطوير الويب"
  },
  {
    id: 3,
    name: "محمد علي سعد",
    studentId: "ST003",
    program: "علوم البيانات", 
    level: "متقدم",
    status: "available",
    preferences: ["علوم البيانات", "الذكاء الاصطناعي"],
    assignedTo: null
  }
];

const mockDistributions = [
  {
    id: 1,
    name: "توزيع برنامج الذكاء الاصطناعي",
    program: "الذكاء الاصطناعي",
    instructor: "د. أحمد محمد",
    maxStudents: 30,
    currentStudents: 25,
    startDate: "2024-01-15",
    endDate: "2024-07-15",
    location: "القاعة الرئيسية",
    schedule: "السبت - الثلاثاء 10:00-12:00",
    status: "active"
  },
  {
    id: 2,
    name: "توزيع برنامج تطوير الويب",
    program: "تطوير الويب",
    instructor: "م. سارة أحمد",
    maxStudents: 25,
    currentStudents: 20,
    startDate: "2024-02-01",
    endDate: "2024-08-01",
    location: "معمل الحاسوب",
    schedule: "الأحد - الأربعاء 14:00-16:00",
    status: "active"
  }
];

const DistributionManagementPage = () => {
  const [activeTab, setActiveTab] = useState("students");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedDistribution, setSelectedDistribution] = useState("");
  const [showAssignModal, setShowAssignModal] = useState(false);

  const availableStudents = mockStudents.filter(student => student.status === "available");
  const assignedStudents = mockStudents.filter(student => student.status === "assigned");

  const handleStudentSelection = (studentId: number) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleAssignStudents = () => {
    if (selectedStudents.length === 0 || !selectedDistribution) {
      alert("يرجى اختيار الطلاب والتوزيع");
      return;
    }
    
    // هنا سيتم إرسال البيانات للباك إند
    console.log("توزيع الطلاب:", selectedStudents, "على:", selectedDistribution);
    setShowAssignModal(false);
    setSelectedStudents([]);
    setSelectedDistribution("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200";
      case "assigned":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "متاح";
      case "assigned":
        return "موزع";
      case "pending":
        return "معلق";
      default:
        return "غير محدد";
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <UserCheck className="w-8 h-8 text-blue-600" />
              إدارة التوزيع
            </h1>
            <p className="text-gray-600 mt-2">إدارة وتنظيم توزيع الطلاب على البرامج التدريبية</p>
          </div>
          <button 
            onClick={() => setShowAssignModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            توزيع طلاب
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab("students")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "students"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              الطلاب المتاحين ({availableStudents.length})
            </button>
            <button
              onClick={() => setActiveTab("assigned")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "assigned"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              الطلاب الموزعين ({assignedStudents.length})
            </button>
            <button
              onClick={() => setActiveTab("distributions")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "distributions"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              التوزيعات ({mockDistributions.length})
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "students" && (
            <div>
              {/* Search */}
              <div className="mb-6">
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

              {/* Students Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableStudents.map((student) => (
                  <div key={student.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{student.name}</h3>
                          <p className="text-sm text-gray-500">{student.studentId}</p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => handleStudentSelection(student.id)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{student.program}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">المستوى:</span>
                        <span className="text-sm font-medium text-gray-900">{student.level}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">التفضيلات:</p>
                      <div className="flex flex-wrap gap-1">
                        {student.preferences.map((pref, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {pref}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(student.status)}`}>
                        {getStatusText(student.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "assigned" && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assignedStudents.map((student) => (
                  <div key={student.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{student.name}</h3>
                        <p className="text-sm text-gray-500">{student.studentId}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{student.program}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">موزع على:</span>
                        <span className="text-sm font-medium text-blue-600">{student.assignedTo}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(student.status)}`}>
                        {getStatusText(student.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "distributions" && (
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {mockDistributions.map((distribution) => (
                  <div key={distribution.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{distribution.name}</h3>
                        <p className="text-sm text-gray-600">{distribution.program}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{distribution.instructor}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{distribution.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{distribution.startDate} - {distribution.endDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{distribution.schedule}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">الطلاب</span>
                        <span className="text-sm text-gray-600">{distribution.currentStudents}/{distribution.maxStudents}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(distribution.currentStudents / distribution.maxStudents) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(distribution.status)}`}>
                        {getStatusText(distribution.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Assign Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">توزيع الطلاب</h3>
              <button 
                onClick={() => setShowAssignModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اختيار التوزيع</label>
                <select
                  value={selectedDistribution}
                  onChange={(e) => setSelectedDistribution(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">اختر التوزيع</option>
                  {mockDistributions.map((dist) => (
                    <option key={dist.id} value={dist.name}>
                      {dist.name} ({dist.currentStudents}/{dist.maxStudents})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  الطلاب المختارين: {selectedStudents.length}
                </p>
                <div className="max-h-32 overflow-y-auto space-y-1">
                  {selectedStudents.map((studentId) => {
                    const student = mockStudents.find(s => s.id === studentId);
                    return student ? (
                      <div key={studentId} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{student.name}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={handleAssignStudents}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                <CheckCircle className="w-5 h-5" />
                تأكيد التوزيع
              </button>
              <button
                onClick={() => setShowAssignModal(false)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <UserX className="w-5 h-5" />
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DistributionManagementPage;