"use client";

import { useState } from "react";
import { 
  MessageSquare, 
  Send, 
  Search, 
  Filter,
  Bell,
  Star,
  Archive,
  Trash2,
  Reply,
  Forward
} from "lucide-react";

const StudentMessages = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const messages = [
    {
      id: 1,
      sender: "أستاذ أحمد محمد",
      subject: "موعد الامتحان النهائي",
      content: "نود إعلامكم بأن موعد الامتحان النهائي سيكون يوم الأحد القادم في تمام الساعة 10 صباحاً. يرجى الحضور قبل الموعد بـ 15 دقيقة.",
      timestamp: "2024-01-15T10:30:00Z",
      isRead: false,
      isImportant: true,
      category: "exam"
    },
    {
      id: 2,
      sender: "إدارة التدريب",
      subject: "تحديث في الجدول الزمني",
      content: "تم تحديث الجدول الزمني للدورة. يرجى مراجعة الجدول الجديد في منصة الطالب.",
      timestamp: "2024-01-14T14:20:00Z",
      isRead: true,
      isImportant: false,
      category: "schedule"
    },
    {
      id: 3,
      sender: "أستاذة فاطمة علي",
      subject: "الواجب المنزلي",
      content: "تم رفع الواجب المنزلي الجديد. يرجى تسليمه قبل نهاية الأسبوع.",
      timestamp: "2024-01-13T16:45:00Z",
      isRead: true,
      isImportant: false,
      category: "assignment"
    },
    {
      id: 4,
      sender: "نظام الإشعارات",
      subject: "تذكير بالدفع",
      content: "نود تذكيركم بأن موعد دفع الرسوم الشهرية سيكون خلال الأسبوع القادم.",
      timestamp: "2024-01-12T09:15:00Z",
      isRead: false,
      isImportant: false,
      category: "payment"
    }
  ];

  const filteredMessages = messages.filter(message =>
    message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'exam':
        return 'text-red-600 bg-red-100';
      case 'schedule':
        return 'text-blue-600 bg-blue-100';
      case 'assignment':
        return 'text-green-600 bg-green-100';
      case 'payment':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'exam':
        return 'امتحان';
      case 'schedule':
        return 'جدول';
      case 'assignment':
        return 'واجب';
      case 'payment':
        return 'دفع';
      default:
        return 'عام';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex" dir="rtl">
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">الرسائل</h1>
            <p className="text-gray-600">إدارة الرسائل والإشعارات</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Messages List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                {/* Search and Filters */}
                <div className="p-4 border-b border-gray-100">
                  <div className="relative mb-4">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="البحث في الرسائل..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">
                      <Filter className="w-4 h-4" />
                      <span>فلتر</span>
                    </button>
                    <button className="flex items-center space-x-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                      <Archive className="w-4 h-4" />
                      <span>أرشيف</span>
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="max-h-96 overflow-y-auto">
                  {filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      onClick={() => setSelectedMessage(message)}
                      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedMessage?.id === message.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">
                              {message.sender.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{message.sender}</p>
                            <p className="text-sm text-gray-600">{message.subject}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {message.isImportant && (
                            <Star className="w-4 h-4 text-yellow-500" />
                          )}
                          {!message.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {message.content}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(message.category)}`}>
                          {getCategoryText(message.category)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(message.timestamp)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Message Content */}
            <div className="lg:col-span-2">
              {selectedMessage ? (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                  {/* Message Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-lg font-bold">
                            {selectedMessage.sender.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{selectedMessage.sender}</h3>
                          <p className="text-gray-600">{selectedMessage.subject}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Reply className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Forward className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Star className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">
                        {formatDate(selectedMessage.timestamp)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedMessage.category)}`}>
                        {getCategoryText(selectedMessage.category)}
                      </span>
                      {selectedMessage.isImportant && (
                        <span className="flex items-center space-x-1 text-yellow-600">
                          <Star className="w-4 h-4" />
                          <span className="text-sm">مهم</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Message Body */}
                  <div className="p-6">
                    <div className="prose max-w-none">
                      <p className="text-gray-900 leading-relaxed">
                        {selectedMessage.content}
                      </p>
                    </div>
                  </div>

                  {/* Message Actions */}
                  <div className="p-6 border-t border-gray-100">
                    <div className="flex items-center space-x-3">
                      <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <Reply className="w-4 h-4" />
                        <span>رد</span>
                      </button>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                        <Forward className="w-4 h-4" />
                        <span>إعادة توجيه</span>
                      </button>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                        <Star className="w-4 h-4" />
                        <span>مهم</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
                  <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">اختر رسالة</h3>
                  <p className="text-gray-600">اختر رسالة من القائمة لعرض محتواها</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentMessages;
