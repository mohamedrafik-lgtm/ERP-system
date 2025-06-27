import React, { useEffect } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

// ✅ أنواع البيانات
export enum IType {
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  TRUE_FALSE = "TRUE_FALSE",
}

export enum ISkill {
  RECALL = "RECALL",
  COMPREHENSION = "COMPREHENSION",
  DEDUCTION = "DEDUCTION",
}

export enum IDifficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
  VERY_HARD = "VERY_HARD",
}

export interface IOptions {
  text: string;
  isCorrect: boolean;
}

export interface IAddQuestions {
  text: string;
  type: IType;
  skill: ISkill;
  difficulty: IDifficulty;
  chapter: number;
  contentId: number;
  options: IOptions[];
}

// ✅ Props لـ الكمبوننت
interface AddQuestionFormProps {
  register: UseFormRegister<IAddQuestions>;
  values: IAddQuestions;
  setValue: UseFormSetValue<IAddQuestions>;
}

const AddQuestionForm: React.FC<AddQuestionFormProps> = ({ register, values, setValue }) => {
  const { type, options } = values;

  // تحديث الخيارات عند تغيير نوع السؤال
  useEffect(() => {
    if (type === IType.TRUE_FALSE) {
      setValue("options", [
        { text: "صح", isCorrect: false },
        { text: "خطأ", isCorrect: false },
      ]);
    } else {
      setValue("options", [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ]);
    }
  }, [type, setValue]);

  const handleCorrectChange = (index: number): void => {
    const updated: IOptions[] = options.map((opt: IOptions, i: number) => ({
      ...opt,
      isCorrect: i === index,
    }));
    setValue("options", updated);
  };

  const handleOptionChange = (index: number, text: string): void => {
    const updated: IOptions[] = [...options];
    updated[index].text = text;
    setValue("options", updated);
  };

  return (
    <div className="space-y-6 bg-gray-50 p-4 rounded-xl">
      {/* نص السؤال */}
      <div>
        <label className="block text-sm font-semibold mb-1">نص السؤال</label>
        <input
          type="text"
          {...register("text")}
          className="w-full border bg-white border-gray-300 rounded-xl px-3 py-2"
        />
      </div>

      {/* الإعدادات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* نوع السؤال */}
        <div>
          <label className="block text-sm font-semibold mb-1">نوع السؤال</label>
          <select {...register("type")} className="w-full border rounded-xl px-3 py-2">
            <option value={IType.MULTIPLE_CHOICE}>اختيار من متعدد</option>
            <option value={IType.TRUE_FALSE}>صح أو خطأ</option>
          </select>
        </div>

        {/* مهارة السؤال */}
        <div>
          <label className="block text-sm font-semibold mb-1">مهارة السؤال</label>
          <select {...register("skill")} className="w-full border rounded-xl px-3 py-2">
            <option value={ISkill.RECALL}>تذكر</option>
            <option value={ISkill.COMPREHENSION}>فهم</option>
            <option value={ISkill.DEDUCTION}>استنتاج</option>
          </select>
        </div>

        {/* مستوى الصعوبة */}
        <div>
          <label className="block text-sm font-semibold mb-1">مستوى الصعوبة</label>
          <select {...register("difficulty")} className="w-full border rounded-xl px-3 py-2">
            <option value={IDifficulty.EASY}>سهل</option>
            <option value={IDifficulty.MEDIUM}>متوسط</option>
            <option value={IDifficulty.HARD}>صعب</option>
            <option value={IDifficulty.VERY_HARD}>صعب جداً</option>
          </select>
        </div>

        {/* رقم الفصل */}
        <div>
          <label className="block text-sm font-semibold mb-1">رقم الفصل</label>
          <input
            type="number"
            {...register("chapter", { valueAsNumber: true })}
            className="w-full border bg-white border-gray-300 rounded-xl px-4 py-2"
          />
        </div>
      </div>

      {/* الإجابات */}
      <div>
        <label className="block text-sm font-semibold mb-2">الإجابات</label>
        <div className="space-y-4">
          {options.map((opt: IOptions, index: number) => (
            <div
              key={index}
              className={`flex items-center gap-3 p-3 rounded-xl border shadow-sm ${
                opt.isCorrect ? "border-green-500 bg-green-50" : "border-gray-300 bg-white"
              }`}
            >
              <input
                type="radio"
                name="correctAnswer"
                checked={opt.isCorrect}
                onChange={() => handleCorrectChange(index)}
                className="accent-green-500"
              />
              {type === IType.TRUE_FALSE ? (
                <span>{opt.text}</span>
              ) : (
                <input
                  type="text"
                  value={opt.text}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="flex-1 bg-transparent outline-none"
                  placeholder={`الإجابة ${["أ", "ب", "ج", "د"][index]}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddQuestionForm;
