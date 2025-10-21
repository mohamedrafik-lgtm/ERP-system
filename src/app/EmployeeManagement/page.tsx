import AddEmployeeModal from "@/components/EmployeeManagement/EmployeeModal";
import EmployeeTable from "@/components/EmployeeManagement/EmployeeTable";
import Paginator from "@/components/ui/paginator";
import { 
  UserGroupIcon, 
  PlusIcon, 
  UserIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const EmployeeManagement = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6" dir="rtl">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <UserGroupIcon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">إدارة المستخدمين</h1>
                    <p className="text-gray-600 mt-1">إدارة وتنظيم حسابات المستخدمين والموظفين</p>
                  </div>
                </div>
                
                {/* Action Button */}
                <div className="flex items-center space-x-4">
                  <AddEmployeeModal />
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">إجمالي المستخدمين</p>
                    <p className="text-3xl font-bold text-gray-900">24</p>
                    <p className="text-sm text-green-600 mt-1">+3 هذا الشهر</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <UserIcon className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">المديرين</p>
                    <p className="text-3xl font-bold text-gray-900">3</p>
                    <p className="text-sm text-purple-600 mt-1">صلاحيات كاملة</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <ShieldCheckIcon className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">المستخدمين العاديين</p>
                    <p className="text-3xl font-bold text-gray-900">21</p>
                    <p className="text-sm text-green-600 mt-1">نشطون</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-xl">
                    <UserGroupIcon className="w-8 h-8 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">آخر تسجيل دخول</p>
                    <p className="text-lg font-bold text-gray-900">منذ 5 دقائق</p>
                    <p className="text-sm text-blue-600 mt-1">نشط الآن</p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-xl">
                    <ClockIcon className="w-8 h-8 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <ChartBarIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">قائمة المستخدمين</h2>
                      <p className="text-sm text-gray-600">إدارة جميع حسابات المستخدمين في النظام</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <EmployeeTable />
              </div>
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <Paginator />
            </div>
          </div>
        </div>
    );
}

export default EmployeeManagement;