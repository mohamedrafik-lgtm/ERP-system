import { Input } from "@/components/input";

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <form className="w-full max-w-md flex flex-col items-center">
        <h3 className="text-2xl md:text-3xl font-bold my-6 text-center mb-10">تسجيل الدخول</h3>
        <div className="w-full space-y-12">
          {/* 
          <div className="space-x-5">
            <button type="button" className="px-4 py-1.5 border-[0.5px] rounded-md hover:bg-gray-200">موظف</button>
            <button type="button" className="px-4 py-1.5 border-[0.5px] rounded-md hover:bg-gray-200">طالب</button>
          </div> 
          */}

         <div className="w-full space-y-5">
           <div className="space-y-2 w-full">
            <label htmlFor="email" className="text-lg">البريد الالكتروني</label>
            <Input
              type="text"
              name="email"
              placeholder="tipaAcadmy@test.com"
              id="email"
              className="w-full bg-gray-200 border-b-gray-400 border-x-0 border-t-0 rounded-0 "
              required
            />
          </div>

          <div className="space-y-2 w-full">
            <label htmlFor="password" className="text-lg">كلمه السر</label>
            <Input
              type="password"
              name="password"
              placeholder="password"
              id="password"
              className="w-full bg-gray-200 border-b-gray-400 border-x-0 border-t-0 rounded-0 "
              required
            />
          </div>
          <div className="flex items-center space-x-1">
            <input type="checkbox" id="pass"/>
            <label htmlFor="pass" className="text-sm">حفظ تسجيل الدخول</label>
          </div>
         </div>

          <button className="w-full py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition">
            تسجيل الدخول
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
