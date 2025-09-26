"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import PageHeader from "@/app/components/PageHeader";
import {
  CreditCard,
  Users,
  Printer,
  Settings,
  BarChart3,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
} from "lucide-react";

export default function CardsManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Mock data for cards
  const cards = [
    {
      id: 1,
      traineeName: "أحمد محمد علي",
      traineeId: "TR001",
      program: "Frontend Development",
      status: "active",
      issueDate: "2024-01-15",
      expiryDate: "2025-01-15",
      cardNumber: "CARD-001",
    },
    {
      id: 2,
      traineeName: "فاطمة أحمد حسن",
      traineeId: "TR002",
      program: "Backend Development",
      status: "expired",
      issueDate: "2023-12-01",
      expiryDate: "2024-12-01",
      cardNumber: "CARD-002",
    },
    {
      id: 3,
      traineeName: "محمد سعد الدين",
      traineeId: "TR003",
      program: "Full Stack Development",
      status: "pending",
      issueDate: "2024-02-01",
      expiryDate: "2025-02-01",
      cardNumber: "CARD-003",
    },
  ];

  const stats = {
    total: 1247,
    active: 892,
    expired: 234,
    pending: 121,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <PageHeader
        title="إدارة الكرنيهات"
        description="إدارة وعرض جميع كرنيهات المتدربين"
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/' },
          { label: 'إدارة الكرنيهات', href: '/CardsManagement' },
        ]}
        actions={
          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              تصدير
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              استيراد
            </Button>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              إضافة كرنيه
            </Button>
          </div>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm border-white/50 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">إجمالي الكرنيهات</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-white/50 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">نشط</p>
                  <p className="text-3xl font-bold text-green-600">{stats.active.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-white/50 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">منتهي الصلاحية</p>
                  <p className="text-3xl font-bold text-red-600">{stats.expired.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-white/50 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">في الانتظار</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.pending.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <Settings className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Section */}
        <Card className="bg-white/95 backdrop-blur-md border-white/50 shadow-2xl mb-8">
          <CardHeader className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">البحث والفلترة</h3>
                <p className="text-gray-600">ابحث عن الكرنيهات باستخدام معايير متعددة</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="ابحث بالاسم، رقم الكرنيه، أو رقم المتدرب..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3 px-4 pr-10"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              
              <div>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">جميع الحالات</option>
                  <option value="active">نشط</option>
                  <option value="expired">منتهي الصلاحية</option>
                  <option value="pending">في الانتظار</option>
                </select>
              </div>
              
              <div className="flex gap-3">
                <Button className="flex-1">
                  <Search className="w-4 h-4 mr-2" />
                  بحث
                </Button>
                <Button variant="outline">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cards Table */}
        <Card className="bg-white/95 backdrop-blur-md border-white/50 shadow-2xl">
          <CardHeader className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">قائمة الكرنيهات</h3>
                  <p className="text-gray-600">عرض وإدارة جميع كرنيهات المتدربين</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-500">
                  عرض <span className="font-bold text-gray-900">1-10</span> من <span className="font-bold text-gray-900">1,247</span> كرنيه
                </div>
                <Button variant="outline" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-right py-4 px-6 font-semibold text-gray-900">رقم الكرنيه</th>
                    <th className="text-right py-4 px-6 font-semibold text-gray-900">اسم المتدرب</th>
                    <th className="text-right py-4 px-6 font-semibold text-gray-900">البرنامج</th>
                    <th className="text-right py-4 px-6 font-semibold text-gray-900">تاريخ الإصدار</th>
                    <th className="text-right py-4 px-6 font-semibold text-gray-900">تاريخ الانتهاء</th>
                    <th className="text-right py-4 px-6 font-semibold text-gray-900">الحالة</th>
                    <th className="text-right py-4 px-6 font-semibold text-gray-900">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {cards.map((card) => (
                    <tr key={card.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="font-medium text-gray-900">{card.cardNumber}</div>
                        <div className="text-sm text-gray-500">{card.traineeId}</div>
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-900">{card.traineeName}</td>
                      <td className="py-4 px-6 text-gray-600">{card.program}</td>
                      <td className="py-4 px-6 text-gray-600">{card.issueDate}</td>
                      <td className="py-4 px-6 text-gray-600">{card.expiryDate}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                          card.status === 'active' ? 'bg-green-100 text-green-800' :
                          card.status === 'expired' ? 'bg-red-100 text-red-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {card.status === 'active' ? 'نشط' :
                           card.status === 'expired' ? 'منتهي الصلاحية' : 'في الانتظار'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Printer className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
