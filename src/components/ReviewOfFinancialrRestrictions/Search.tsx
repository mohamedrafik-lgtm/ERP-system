"use client";

import { Input } from "@/components/input";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  search: string;
};

export const Search = () => {
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!data.search.length) return;
    console.log(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex items-center rounded-xl border-2 border-gray-200 bg-white shadow-sm focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-100 transition-all duration-200"
    >
      <Input
        dir="ltr"
        type="text"
        placeholder="ابحث برقم الوصل أو الوصف..."
        className="w-full border-none p-4 text-gray-700 placeholder-gray-400 focus:outline-none"
        {...register("search")}
      />
      <button 
        type="submit"
        className="px-6 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-r-xl hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all duration-200 flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        بحث
      </button>
    </form>
  );
};
