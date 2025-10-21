"use client";

import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  UserGroupIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export interface EditFormValues {
  name: string;
  email: string;
  phone: string;
  accountType?: string;
  roleId?: string;
}

interface Props {
  register: UseFormRegister<EditFormValues>;
  errors: FieldErrors<EditFormValues>;
}

const EditUserForm: React.FC<Props> = ({ register, errors }) => {
  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <CheckCircleIcon className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-orange-900 mb-1">تحديث بيانات المستخدم</h4>
            <p className="text-sm text-orange-700">
              يمكنك تحديث أي من الحقول التالية. الحقول الفارغة لن يتم تحديثها.
            </p>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* الاسم */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
            الاسم الكامل
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <UserIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="name"
              {...register("name")}
              className={`w-full pr-10 pl-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none ${
                errors.name 
                  ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100' 
                  : 'border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100'
              }`}
              placeholder="أدخل الاسم الكامل"
            />
          </div>
          {errors.name && (
            <div className="flex items-center space-x-2 text-red-600 text-sm">
              <ExclamationTriangleIcon className="w-4 h-4" />
              <span>{errors.name.message}</span>
            </div>
          )}
        </div>

        {/* البريد الإلكتروني */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
            البريد الإلكتروني
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <EnvelopeIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={`w-full pr-10 pl-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none ${
                errors.email 
                  ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100' 
                  : 'border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100'
              }`}
              placeholder="example@domain.com"
            />
          </div>
          {errors.email && (
            <div className="flex items-center space-x-2 text-red-600 text-sm">
              <ExclamationTriangleIcon className="w-4 h-4" />
              <span>{errors.email.message}</span>
            </div>
          )}
        </div>

        {/* رقم الهاتف */}
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
            رقم الهاتف
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <PhoneIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="phone"
              type="tel"
              {...register("phone")}
              className={`w-full pr-10 pl-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none ${
                errors.phone 
                  ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100' 
                  : 'border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100'
              }`}
              placeholder="+20 123 456 7890"
            />
          </div>
          {errors.phone && (
            <div className="flex items-center space-x-2 text-red-600 text-sm">
              <ExclamationTriangleIcon className="w-4 h-4" />
              <span>{errors.phone.message}</span>
            </div>
          )}
        </div>

        {/* نوع الحساب */}
        <div className="space-y-2">
          <label htmlFor="accountType" className="block text-sm font-semibold text-gray-700">
            نوع الحساب
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <UserGroupIcon className="h-5 w-5 text-gray-400" />
            </div>
            <select
              id="accountType"
              {...register("accountType")}
              className={`w-full pr-10 pl-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none appearance-none bg-white ${
                errors.accountType 
                  ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100' 
                  : 'border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100'
              }`}
            >
              <option value="" className="text-gray-500">اختر نوع الحساب</option>
              <option value="STAFF" className="text-gray-900">موظف</option>
              <option value="INSTRUCTOR" className="text-gray-900">مدرب</option>
            </select>
          </div>
          {errors.accountType && (
            <div className="flex items-center space-x-2 text-red-600 text-sm">
              <ExclamationTriangleIcon className="w-4 h-4" />
              <span>{errors.accountType.message}</span>
            </div>
          )}
        </div>

        {/* معرف الدور */}
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="roleId" className="block text-sm font-semibold text-gray-700">
            معرف الدور (اختياري)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <UserIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="roleId"
              {...register("roleId")}
              className={`w-full pr-10 pl-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none ${
                errors.roleId 
                  ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100' 
                  : 'border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100'
              }`}
              placeholder="أدخل معرف الدور (اختياري)"
            />
          </div>
          {errors.roleId && (
            <div className="flex items-center space-x-2 text-red-600 text-sm">
              <ExclamationTriangleIcon className="w-4 h-4" />
              <span>{errors.roleId.message}</span>
            </div>
          )}
          <p className="text-xs text-gray-500 mt-1">
            معرف الدور اختياري ويمكن تركه فارغاً
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditUserForm;
