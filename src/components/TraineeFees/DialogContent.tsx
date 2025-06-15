"use client";

import React from "react";
import { Input } from "../input";

const ModernForm = () => {
  return (
    <div className="p-6 bg-white/20 rounded-xl max-w-3xl mx-auto space-y-4 text-white">
      <p className="bg-orange-500/40 p-3 rounded-md text-sm leading-relaxed">
        تعديل مبلغ نوع رسوم أو حذف النوع لا يقلل المبالغ المستحقة على المتدربين السابقين، تطبق
        هذا النوع عليهم ولا يسقط مديونيتهم المرتبطة على إضافة هذا النوع من الرسوم عليهم، ولكن لتعديل
        مدفوعه متدرب يتم ذلك من خلال صفحة مدفوعات هذا المتدرب.
      </p>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">الاسم:</label>
          <Input type="text" className="w-full bg-white/10 border border-white/30 p-2 rounded-md text-white placeholder-white/60" />
        </div>
        <div>
          <label className="block mb-1">المبلغ:</label>
          <Input type="number" className="w-full bg-white/10 border border-white/30 p-2 rounded-md text-white placeholder-white/60" />
        </div>
        <div>
          <label className="block mb-1">الأولوية:</label>
          <Input type="number" className="w-full bg-white/10 border border-white/30 p-2 rounded-md text-white placeholder-white/60" />
        </div>
        <div>
          <label className="block mb-1">حالة المتدرب:</label>
          <select className="w-full bg-white/10 border border-white/30 p-2 rounded-md text-white">
            <option>-- الكل --</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">العام التدريبي:</label>
          <select className="w-full bg-white/10 border border-white/30 p-2 rounded-md text-white">
            <option>-- بدون تحديد --</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">النوع:</label>
          <select className="w-full bg-white/10 border border-white/30 p-2 rounded-md text-white">
            <option>-- بدون تحديد --</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">السماح بطباعة إيصال:</label>
          <select className="w-full bg-white/10 border border-white/30 p-2 rounded-md text-white">
            <option>لا</option>
            <option>نعم</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">السماح بالتنسيق أكثر من مرة على نفس المتدرب:</label>
          <select className="w-full bg-white/10 border border-white/30 p-2 rounded-md text-white">
            <option>لا</option>
            <option>نعم</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default ModernForm;
