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
      className="w-full flex items-center bg-white/20 rounded-xl"
    >
      <Input
        dir="ltr"
        type="text"
        placeholder="ابحث برقم الوصل"
        className="w-full border-none p-2 text-white"
        {...register("search")}
      />
      <button className="px-2 text-white cursor-pointer hover:bg-white/20 py-2 rounded-l-xl">
        بحث
      </button>
    </form>
  );
};
