"use client";
import { useState, ChangeEvent, FormEvent } from "react";

interface EntryFormData {
  fromAccount: string;
  toAccount: string;
  date: string;
  amount: string;
  notes: string;
  file: File | null;
}

const NewEntryForm = () => {
  const [form, setForm] = useState<EntryFormData>({
    fromAccount: "",
    toAccount: "",
    date: "",
    amount: "",
    notes: "",
    file: null,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", form);
    // يمكنك إرسال البيانات إلى الباك إند هنا
  };

  return (
    <div className="bg-white/20 text-white p-6 rounded-xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">ادخل قيد جديد</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">من حساب:</label>
            <select
              name="fromAccount"
              className="w-full bg-transparent border border-white/50 rounded px-3 py-2"
              value={form.fromAccount}
              onChange={handleChange}
            >
              <option value="">اختر حساب</option>
              <option>حسابات المتدربين</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">إلى حساب:</label>
            <select
              name="toAccount"
              className="w-full bg-transparent border border-white/50 rounded px-3 py-2"
              value={form.toAccount}
              onChange={handleChange}
            >
              <option value="">اختر حساب</option>
              <option>حسابات المتدربين</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">التاريخ:</label>
            <input
              type="date"
              name="date"
              className="w-full bg-transparent border border-white/50 rounded px-3 py-2"
              value={form.date}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1">المبلغ:</label>
            <input
              type="number"
              name="amount"
              className="w-full bg-transparent border border-white/50 rounded px-3 py-2"
              value={form.amount}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label className="block mb-1">ملاحظات:</label>
          <textarea
            name="notes"
            className="w-full bg-transparent border border-white/50 rounded px-3 py-2"
            rows={3}
            value={form.notes}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <div className="relative">
               <input
                 type="file"
                 id="upload"
                 name="file"
                 className="hidden"
                 onChange={handleChange}
               />
               <label
                 htmlFor="upload"
                              className="block w-full text-white border text-center rounded-xl px-5 py-2 cursor-pointer"
               >
                 اختر صورة أو ملف
               </label>
             </div>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded"
          >
            حفظ
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewEntryForm;
