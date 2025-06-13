import * as React from "react";

const EditTypeDialog = () => {
  return (
    <form className="p-6 w-full text-white">
      <h2 className="text-xl font-bold mb-4">تحكم في نوع الرسوم</h2>

      <div className="bg-orange-500/20 border-l-4 border-orange-400 text-white p-4 mb-6 rounded-md text-sm leading-relaxed">
        تعديل مبلغ نوع رسوم أو حذفه لا يقلل المبالغ المستحقة على المتدربين السابقين.
        لتعديل مدفوعات متدرب يتم ذلك من خلال صفحة مدفوعات المتدرب.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm" dir="rtl">
        {/* الاسم والمبلغ */}
        <div>
          <label className="block mb-1 font-medium">الاسم:</label>
          <input type="text" placeholder="مثال: رسوم تسجيل"
            className="w-full p-2 rounded bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">المبلغ:</label>
          <input type="number" placeholder="مثال: 2400"
            className="w-full p-2 rounded bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none"
          />
        </div>

        {/* الأولوية */}
        <div>
          <label className="block mb-1 font-medium">الأولوية:</label>
          <input type="number"
            className="w-full p-2 rounded bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none"
          />
          <p className="text-xs text-white mt-1">
            تزيد أولوية البند كلما قل الرقم المدخل
          </p>
        </div>

        {/* حالة المتدرب */}
        <div>
          <label className="block mb-1 font-medium">حالة المتدرب:</label>
          <select className="w-full p-2 rounded bg-white/20 border border-white/30 text-white focus:outline-none">
            <option>مستجد</option>
            <option>مستمر</option>
          </select>
        </div>

        {/* النوع والعام التدريبي */}
        <div>
          <label className="block mb-1 font-medium">النوع:</label>
          <select className="w-full p-2 rounded bg-white/20 border border-white/30 text-white focus:outline-none">
            <option>مصروفات</option>
            <option>خصومات</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">العام التدريبي:</label>
          <select className="w-full p-2 rounded bg-white/20 border border-white/30 text-white focus:outline-none">
            <option>2024/2025</option>
            <option>2023/2024</option>
          </select>
        </div>

        {/* السماح بإعادة التطبيق والطباعة */}
        <div>
          <label className="block mb-1 font-medium">السماح بالتطبيق أكثر من مرة:</label>
          <select className="w-full p-2 rounded bg-white/20 border border-white/30 text-white focus:outline-none">
            <option>نعم</option>
            <option>لا</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">السماح بطباعة إيصال:</label>
          <select className="w-full p-2 rounded bg-white/20 border border-white/30 text-white focus:outline-none">
            <option>نعم</option>
            <option>لا</option>
          </select>
        </div>

        {/* البرنامج والفرقة */}
        <div>
          <label className="block mb-1 font-medium">البرنامج:</label>
          <select className="w-full p-2 rounded bg-white/20 border border-white/30 text-white focus:outline-none">
            <option>الذكاء الاصطناعي (FULL)</option>
            <option>علوم البيانات</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">الفرقة:</label>
          <select className="w-full p-2 rounded bg-white/20 border border-white/30 text-white focus:outline-none">
            <option>الأولى</option>
            <option>الثانية</option>
          </select>
        </div>

        {/* حساب الخزينة */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">حساب الخزينة:</label>
          <select className="w-full p-2 rounded bg-white/20 border border-white/30 text-white focus:outline-none">
            <option>خزينة عمومية [1203]</option>
          </select>
        </div>
      </div>

    </form>
  );
};

export default EditTypeDialog;
