import FilterButton from "@/components/ui/filterButton";
import { Input } from "@/components/input";
import StudentTable from "@/components/AllStudent/studentTable";
import Paginator from "@/components/ui/paginator";
import { NavigationButton } from "@/components/ui/NavigationButton";
import { memo } from "react";

const AllStudent = () => {
         
    return(
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
               {/* Header Section */}
               <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
                   <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                          </svg>
                      </div>
                      <div>
                          <h1 className="text-3xl font-bold text-gray-900">جميع المتدربين</h1>
                          <p className="text-gray-600 mt-1">إدارة وعرض جميع المتدربين المسجلين في النظام</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>نظام إدارة المتدربين</span>
                      </div>
                      <NavigationButton 
                          name="إضافة متدرب" 
                          url="/AddStudent" 
                          className="inline-flex items-center gap-2 px-6 py-3 text-white bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all duration-200 rounded-xl shadow-lg hover:shadow-xl hover:scale-105"
                      />
                   </div>
               </div>

               {/* Search Section */}
               <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
                   <div className="flex items-center gap-3 mb-4">
                       <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                           <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                           </svg>
                       </div>
                       <h3 className="text-xl font-bold text-gray-900">البحث عن المتدربين</h3>
                   </div>
                   <form className="flex items-center rounded-xl border-2 border-gray-200 bg-white shadow-sm focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-100 transition-all duration-200">
                       <Input 
                           type="text" 
                           placeholder="ابحث بالاسم أو رقم الملف أو الهاتف..." 
                           name="search_student" 
                           id="searchStudent" 
                           className="border-0 w-full py-4 px-4 text-gray-700 placeholder-gray-400 focus:outline-none"
                       />
                       <button className="px-6 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-r-xl hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all duration-200 flex items-center gap-2">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                           </svg>
                           بحث
                       </button>
                   </form>
               </div>

               {/* Filter Section */}
               <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
                   <div className="flex items-center gap-3 mb-6">
                       <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                           <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                           </svg>
                       </div>
                       <h3 className="text-xl font-bold text-gray-900">فلتر البيانات</h3>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       <div className="space-y-2">
                           <label className="block text-sm font-semibold text-gray-700">البرنامج</label>
                           <FilterButton 
                               label="البرنامج"
                               options={["Frontend", "Backend", "Fullstack"]}
                               paramKey={"program"}
                               className="inline-flex items-center justify-between w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-200 shadow-sm hover:shadow-md"
                           />
                       </div>
                       <div className="space-y-2">
                           <label className="block text-sm font-semibold text-gray-700">الحالة</label>
                           <FilterButton
                               label="الحالة"
                               paramKey="status"
                               options={["Active", "Pending", "Completed"]}
                               className="inline-flex items-center justify-between w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-200 shadow-sm hover:shadow-md"
                           />
                       </div>
                       <div className="space-y-2">
                           <label className="block text-sm font-semibold text-gray-700">تاريخ التسجيل</label>
                           <FilterButton
                               label="تاريخ التسجيل"
                               paramKey="date"
                               options={["Newest", "Oldest"]}
                               className="inline-flex items-center justify-between w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-200 shadow-sm hover:shadow-md"
                           />
                       </div>
                   </div>
               </div>

               {/* Table Section */}
               <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
                   <div className="p-6 border-b border-gray-100">
                       <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                               <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                               </svg>
                           </div>
                           <h3 className="text-xl font-bold text-gray-900">قائمة المتدربين</h3>
                       </div>
                   </div>
                   <div className="p-6">
                       <StudentTable />
                   </div>
               </div>

               {/* Pagination Section */}
               <div className="flex justify-center">
                   <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
                       <Paginator totalPages={5} />
                   </div>
               </div>
            </div>
        </div>
    )
}
export default memo(AllStudent);