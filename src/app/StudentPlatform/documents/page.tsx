"use client";

import { useState } from "react";
import StudentSidebar from "@/components/ui/StudentSidebar";
import { 
  FileText, 
  Download, 
  Eye, 
  Upload,
  Search,
  Filter,
  Grid,
  List,
  Folder,
  File,
  Image,
  Video,
  Music,
  Archive,
  Trash2,
  Star,
  Share
} from "lucide-react";

const StudentDocuments = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const documents = [
    {
      id: 1,
      name: "دليل الطالب.pdf",
      type: "pdf",
      size: "2.5 MB",
      uploadDate: "2024-01-15",
      category: "دليل",
      isImportant: true,
      description: "دليل شامل للطالب يحتوي على جميع المعلومات المطلوبة"
    },
    {
      id: 2,
      name: "جدول المحاضرات.xlsx",
      type: "excel",
      size: "1.2 MB",
      uploadDate: "2024-01-14",
      category: "جدول",
      isImportant: false,
      description: "جدول المحاضرات للفصل الدراسي الحالي"
    },
    {
      id: 3,
      name: "ملاحظات الدرس الأول.docx",
      type: "word",
      size: "850 KB",
      uploadDate: "2024-01-13",
      category: "ملاحظات",
      isImportant: false,
      description: "ملاحظات مهمة من الدرس الأول"
    },
    {
      id: 4,
      name: "صورة الشهادة.jpg",
      type: "image",
      size: "3.1 MB",
      uploadDate: "2024-01-12",
      category: "شهادة",
      isImportant: true,
      description: "صورة شهادة التخرج من المرحلة السابقة"
    },
    {
      id: 5,
      name: "تسجيل المحاضرة.mp4",
      type: "video",
      size: "125 MB",
      uploadDate: "2024-01-11",
      category: "تسجيل",
      isImportant: false,
      description: "تسجيل فيديو للمحاضرة الأخيرة"
    },
    {
      id: 6,
      name: "الواجب المنزلي.pdf",
      type: "pdf",
      size: "1.8 MB",
      uploadDate: "2024-01-10",
      category: "واجب",
      isImportant: false,
      description: "الواجب المنزلي المطلوب تسليمه"
    }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || doc.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-8 h-8 text-red-600" />;
      case 'excel':
        return <FileText className="w-8 h-8 text-green-600" />;
      case 'word':
        return <FileText className="w-8 h-8 text-blue-600" />;
      case 'image':
        return <Image className="w-8 h-8 text-purple-600" />;
      case 'video':
        return <Video className="w-8 h-8 text-orange-600" />;
      case 'music':
        return <Music className="w-8 h-8 text-pink-600" />;
      default:
        return <File className="w-8 h-8 text-gray-600" />;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'PDF';
      case 'excel':
        return 'Excel';
      case 'word':
        return 'Word';
      case 'image':
        return 'صورة';
      case 'video':
        return 'فيديو';
      case 'music':
        return 'صوت';
      default:
        return 'ملف';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex" dir="rtl">
      {/* Student Sidebar */}
      <StudentSidebar 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">المستندات</h1>
            <p className="text-gray-600">إدارة المستندات والملفات</p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="البحث في المستندات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Filters */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-gray-500" />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">جميع الأنواع</option>
                    <option value="pdf">PDF</option>
                    <option value="excel">Excel</option>
                    <option value="word">Word</option>
                    <option value="image">صور</option>
                    <option value="video">فيديو</option>
                  </select>
                </div>

                {/* View Mode */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === "grid" 
                        ? "bg-blue-600 text-white" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === "list" 
                        ? "bg-blue-600 text-white" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>

                {/* Upload Button */}
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Upload className="w-5 h-5" />
                  <span>رفع ملف</span>
                </button>
              </div>
            </div>
          </div>

          {/* Documents Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDocuments.map((doc) => (
                <div key={doc.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(doc.type)}
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">{doc.name}</h3>
                        <p className="text-xs text-gray-500">{getTypeText(doc.type)} • {doc.size}</p>
                      </div>
                    </div>
                    {doc.isImportant && (
                      <Star className="w-5 h-5 text-yellow-500" />
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{doc.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                      {doc.category}
                    </span>
                    <span className="text-xs text-gray-500">{formatDate(doc.uploadDate)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">عرض</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                      <Download className="w-4 h-4" />
                      <span className="text-sm">تحميل</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="divide-y divide-gray-100">
                {filteredDocuments.map((doc) => (
                  <div key={doc.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {getFileIcon(doc.type)}
                        <div>
                          <h3 className="font-semibold text-gray-900">{doc.name}</h3>
                          <p className="text-sm text-gray-600">{doc.description}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-xs text-gray-500">{getTypeText(doc.type)} • {doc.size}</span>
                            <span className="text-xs text-gray-500">{formatDate(doc.uploadDate)}</span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                              {doc.category}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {doc.isImportant && (
                          <Star className="w-5 h-5 text-yellow-500" />
                        )}
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Download className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Share className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredDocuments.length === 0 && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
              <Folder className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد مستندات</h3>
              <p className="text-gray-600 mb-6">لم يتم العثور على مستندات تطابق معايير البحث</p>
              <button className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto">
                <Upload className="w-5 h-5" />
                <span>رفع ملف جديد</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDocuments;
