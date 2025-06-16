"use client";

import React from "react";

interface Props {
  groups: string[]; // مصفوفة بالمجموعات الممكن اختيارها
}

const AddUserForm: React.FC<Props> = ({ groups }) => {
  return (
    <div className=" p-6 rounded-xl w-full max-w-3xl mx-auto space-y-4">
      <div className="bg-orange-400/40 text-white text-sm p-3 rounded-md">
        يسجل المستخدم دخوله عن طريق رقم موبايله المدخل بالإضافة للباسورد المسجل في هذه النافذة
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="name" className="text-white">الاسم:</label>
        <input
          id="name"
          name="name"
          type="text"
          className="p-2 rounded-md bg-white/20 text-white placeholder-white/70"
          placeholder="ادخل الاسم"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="group" className="text-white">المجموعة:</label>
        <select
          id="group"
          name="group"
          className="p-2 rounded-md bg-white/20 text-white"
        >
          <option className="text-black">-- بدون تحديد --</option>
          {groups.map((group, index) => (
            <option key={index} value={group} className="text-black">
              {group}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="password" className="text-white">الباسورد:</label>
        <input
          id="password"
          name="password"
          type="password"
          className="p-2 rounded-md bg-white/20 text-white placeholder-white/70"
          placeholder="ادخل الباسورد"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="mobile" className="text-white">الموبايل:</label>
        <input
          id="mobile"
          name="mobile"
          type="text"
          className="p-2 rounded-md bg-white/20 text-white placeholder-white/70"
          placeholder="ادخل رقم الموبايل"
        />
      </div>
    </div>
  );
};

export default AddUserForm;
