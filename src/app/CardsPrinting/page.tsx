"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import PageHeader from "@/app/components/PageHeader";
import {
  Printer,
  CreditCard,
  Users,
  Settings,
  Download,
  Upload,
  Eye,
  CheckCircle,
  AlertCircle,
  Clock,
  FileText,
  Image,
} from "lucide-react";

export default function CardsPrintingPage() {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [printSettings, setPrintSettings] = useState({
    paperSize: "A4",
    orientation: "portrait",
    quality: "high",
    copies: 1,
  });

  // Mock data for cards ready for printing
  const cardsToPrint = [
    {
      id: 1,
      traineeName: "أحمد محمد علي",
      traineeId: "TR001",
      program: "Frontend Development",
      cardNumber: "CARD-001",
      status: "ready",
      design: "Default Design",
      lastUpdated: "2024-01-15",
    },
    {
      id: 2,
      traineeName: "فاطمة أحمد حسن",
      traineeId: "TR002",
      program: "Backend Development",
      cardNumber: "CARD-002",
      status: "ready",
      design: "Corporate Design",
      lastUpdated: "2024-01-14",
    },
    {
      id: 3,
      traineeName: "محمد سعد الدين",
      traineeId: "TR003",
      program: "Full Stack Development",
      cardNumber: "CARD-003",
      status: "pending",
      design: "Default Design",
      lastUpdated: "2024-01-13",
    },
  ];

  const printStats = {
    ready: 892,
    pending: 121,
    printed: 234,
    total: 1247,
  };

  const handleSelectCard = (cardId: number) => {
    setSelectedCards(prev => 
      prev.includes(cardId) 
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCards.length === cardsToPrint.length) {
      setSelectedCards([]);
    } else {
      setSelectedCards(cardsToPrint.map(card => card.id));
    }
  };

  const handlePrint = () => {
    console.log("Printing cards:", selectedCards);
    console.log("Print settings:", printSettings);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <PageHeader
        title="طباعة الكرنيهات"
        description="طباعة وإدارة كرنيهات المتدربين"
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/' },
          { label: 'إدارة الكرنيهات', href: '/CardsManagement' },
          { label: 'طباعة الكرنيهات', href: '/CardsPrinting' },
        ]}
        actions={
          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              تحميل PDF
            </Button>
            <Button 
              className="flex items-center gap-2"
              onClick={handlePrint}
              disabled={selectedCards.length === 0}
            >
              <Printer className="w-4 h-4" />
              طباعة ({selectedCards.length})
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
                  <p className="text-sm font-semibold text-gray-600 mb-1">جاهز للطباعة</p>
                  <p className="text-3xl font-bold text-green-600">{printStats.ready.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-white/50 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">في الانتظار</p>
                  <p className="text-3xl font-bold text-orange-600">{printStats.pending.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-white/50 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">تم الطباعة</p>
                  <p className="text-3xl font-bold text-blue-600">{printStats.printed.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Printer className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-white/50 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">إجمالي الكرنيهات</p>
                  <p className="text-3xl font-bold text-gray-900">{printStats.total.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Print Settings */}
          <div className="lg:col-span-1">
            <Card className="bg-white/95 backdrop-blur-md border-white/50 shadow-2xl">
              <CardHeader className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">إعدادات الطباعة</h3>
                    <p className="text-gray-600">تخصيص إعدادات الطباعة</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">حجم الورق</label>
                  <select
                    value={printSettings.paperSize}
                    onChange={(e) => setPrintSettings(prev => ({ ...prev, paperSize: e.target.value }))}
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="A4">A4</option>
                    <option value="A3">A3</option>
                    <option value="Letter">Letter</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">الاتجاه</label>
                  <select
                    value={printSettings.orientation}
                    onChange={(e) => setPrintSettings(prev => ({ ...prev, orientation: e.target.value }))}
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="portrait">عمودي</option>
                    <option value="landscape">أفقي</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">جودة الطباعة</label>
                  <select
                    value={printSettings.quality}
                    onChange={(e) => setPrintSettings(prev => ({ ...prev, quality: e.target.value }))}
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="draft">مسودة</option>
                    <option value="normal">عادي</option>
                    <option value="high">عالي</option>
                    <option value="best">أفضل</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">عدد النسخ</label>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={printSettings.copies}
                    onChange={(e) => setPrintSettings(prev => ({ ...prev, copies: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>الكرنيهات المحددة:</span>
                    <span className="font-bold text-blue-600">{selectedCards.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>إجمالي النسخ:</span>
                    <span className="font-bold text-green-600">{selectedCards.length * printSettings.copies}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cards List */}
          <div className="lg:col-span-2">
            <Card className="bg-white/95 backdrop-blur-md border-white/50 shadow-2xl">
              <CardHeader className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">الكرنيهات الجاهزة للطباعة</h3>
                      <p className="text-gray-600">اختر الكرنيهات التي تريد طباعتها</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" onClick={handleSelectAll}>
                      {selectedCards.length === cardsToPrint.length ? 'إلغاء الكل' : 'تحديد الكل'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="space-y-4">
                  {cardsToPrint.map((card) => (
                    <div
                      key={card.id}
                      className={`p-4 border-2 rounded-xl transition-all duration-200 cursor-pointer ${
                        selectedCards.includes(card.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                      onClick={() => handleSelectCard(card.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <input
                            type="checkbox"
                            checked={selectedCards.includes(card.id)}
                            onChange={() => handleSelectCard(card.id)}
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-white" />
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900">{card.traineeName}</h4>
                            <p className="text-sm text-gray-600">{card.program}</p>
                            <p className="text-xs text-gray-500">رقم الكرنيه: {card.cardNumber}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{card.design}</p>
                            <p className="text-xs text-gray-500">آخر تحديث: {card.lastUpdated}</p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                              card.status === 'ready' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                            }`}>
                              {card.status === 'ready' ? 'جاهز' : 'في الانتظار'}
                            </span>
                            
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
