"use client";

import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";

export interface FormValues {
  name: string;
  role: string;
  email: string;
  password: string;
}

interface Props {
  groups: string[]; // مصفوفة الصلاحيات
  register: UseFormRegister<FormValues>; // الريجيستر من الأب
  errors: FieldErrors<FormValues>; // الأخطاء من الأب
}

const AddUserForm: React.FC<Props> = ({ groups, register, errors }) => {
  return (
    <div className="p-6 rounded-xl w-full max-w-3xl mx-auto space-y-4">
      <div className="bg-orange-400/40 text-white text-sm p-3 rounded-md">
        يسجل المستخدم دخوله عن طريق رقم موبايله المدخل بالإضافة للباسورد المسجل في هذه النافذة
      </div>

      {/* الاسم */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="name">الاسم:</label>
        <input
          id="name"
          {...register("name")}
          className="p-2 rounded-md bg-white placeholder-black/20"
          placeholder="ادخل الاسم"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      {/* الصلاحية */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="role">الصلاحية:</label>
        <select
          id="role"
          {...register("role")}
          className="p-2 rounded-md bg-white"
        >
          <option className="text-black">-- بدون تحديد --</option>
          {groups.map((group, index) => (
            <option key={index} value={group} className="text-black">
              {group}
            </option>
          ))}
        </select>
        {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
      </div>

      {/* البريد الإلكتروني */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="email">البريد الالكتروني:</label>
        <input
          id="email"
          {...register("email")}
          className="p-2 rounded-md bg-white placeholder-black/20"
          placeholder="ادخل البريد الالكتروني"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      {/* الباسورد */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="password">الباسورد:</label>
        <input
          id="password"
          type="password"
          {...register("password")}
          className="p-2 rounded-md bg-white placeholder-black/20"
          placeholder="ادخل الباسورد"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>
    </div>
  );
};

export default AddUserForm;
