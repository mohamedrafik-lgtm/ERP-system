"use client";
import { Input } from "@/components/input";
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { LoginSchema } from "@/Schema/login";
type Inputs = {
  email:string
  password: string
}
const LoginPage = () => {
 const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  })
  const onSubmit: SubmitHandler<Inputs> = (data ) => {
    console.log(data)
  }
  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md flex flex-col items-center">
        <h3 className="text-3xl md:text-3xl text-white font-bold my-6 text-center mb-10">تسجيل الدخول</h3>
        <div className="w-full text-white space-y-12">
         <div className="w-full space-y-5">
           <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="email" className="text-lg">البريد الالكتروني</label>
            <Input
              type="text"
              {...register("email")}
              placeholder="tipaAcadmy@test.com"
              id="email"
              className="w-full bg-white/20 text-white rounded-xl "
              required
            />
            {
              errors.email?.message ? <p className="text-red-500">{errors.email?.message}</p>
              : null
            }
          </div>

          <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="password" className="text-lg">كلمه السر</label>
            <Input
              type="password"
              {...register("password")}
              name="password"
              placeholder="password"
              id="password"
              className="w-full bg-white/20 text-white rounded-xl "
              required
            />
            {
              errors.password?.message ? <p className="text-red-500">{errors.password?.message}</p>
              : null
            }
          </div>
          <div className="flex items-center space-x-1">
            <input type="checkbox" id="pass"/>
            <label htmlFor="pass" className="text-sm">حفظ تسجيل الدخول</label>
          </div>
         </div>

          <button type="submit" className="w-full py-2 rounded-md text-white bg-orange-600 hover:bg-orange-700 transition">
            تسجيل الدخول
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
