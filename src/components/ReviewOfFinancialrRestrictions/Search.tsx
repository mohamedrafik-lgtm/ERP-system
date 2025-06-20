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
      className="w-full flex items-center rounded-xl border border-gray-300"
    >
      <Input
        dir="ltr"
        type="text"
        placeholder="ابحث برقم الوصل"
        className="w-full border-none p-2 "
        {...register("search")}
      />
      <button className="px-2 cursor-pointer hover:bg-black/10 py-2 rounded-l-xl">
        بحث
      </button>
    </form>
  );
};
