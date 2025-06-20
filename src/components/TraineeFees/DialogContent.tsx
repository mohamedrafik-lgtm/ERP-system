"use client";

import React from "react";
import { Input } from "../input";

const ModernForm = () => {
  return (
    <div className="p-6 bg-white/20 rounded-xl max-w-3xl mx-auto space-y-4 ">
      <p className="bg-orange-500/90 text-white p-3 rounded-md text-sm leading-relaxed">
        تعديل مبلغ نوع رسوم أو حذف النوع لا يقلل المبالغ المستحقة على المتدربين السابقين، تطبق
        هذا النوع عليهم ولا يسقط مديونيتهم المرتبطة على إضافة هذا النوع من الرسوم عليهم، ولكن لتعديل
        مدفوعه متدرب يتم ذلك من خلال صفحة مدفوعات هذا المتدرب.
      </p>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">الاسم:</label>
          <Input type="text" className="w-full bg-white border border-white/30 p-2 rounded-md  placeholder-black/60" />
        </div>
        <div>
          <label className="block mb-1">المبلغ:</label>
          <Input type="number" className="w-full bg-white border border-white/30 p-2 rounded-md  placeholder-black/60" />
        </div>
        <div>
          <label className="block mb-1">الأولوية:</label>
          <Input type="number" className="w-full bg-white border border-white/30 p-2 rounded-md  placeholder-whblackite/60" />
        </div>
        <div>
          <label className="block mb-1">حالة المتدرب:</label>
          <select className="w-full bg-white border border-gray-200 p-2 rounded-md">
            <option>-- الكل --</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">العام التدريبي:</label>
          <select className="w-full bg-white border border-gray-200 p-2 rounded-md">
            <option>-- بدون تحديد --</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">النوع:</label>
          <select className="w-full bg-white border border-gray-200 p-2 rounded-md">
            <option>-- بدون تحديد --</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">السماح بطباعة إيصال:</label>
          <select className="w-full bg-white border border-gray-200 p-2 rounded-md">
            <option>لا</option>
            <option>نعم</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">السماح بالتنسيق أكثر من مرة على نفس المتدرب:</label>
          <select className="w-full bg-white border border-gray-200 p-2 rounded-md">
            <option>لا</option>
            <option>نعم</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default ModernForm;
