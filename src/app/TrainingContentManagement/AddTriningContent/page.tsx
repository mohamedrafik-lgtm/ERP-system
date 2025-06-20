import Menu from "@/components/ui/menu";

const AddTriningContent = () => {
    
    const programOptions = [
        { value: 'frontend', label: 'Front-End Development' },
        { value: 'backend', label: 'Back-End Development' },
        { value: 'fullstack', label: 'Full-Stack Development' },
      ];  
      return (
        <div className="">
             <div className="max-w-9/12 mx-auto pt-10">
                <div>
                    <h1 dir="ltr" className="text-2xl font-bold">اضافه محتوي تدريبي</h1>
                </div>
                <form className="space-y-5 grid grid-cols-2  gap-4">
                    <div>
                        <label className="block text-sm font-medium  mb-2">عنوان المحتوي</label>
                        <input type="text" className="w-full p-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="ادخل عنوان المحتوي" />
                    </div>
                    <div>
                        <Menu options={programOptions} />
                    </div>
                    <div>
                      <Menu options={programOptions} label="الفصل الدراسي" />
                    </div>
                    <div>
                      <Menu options={programOptions} label="السنه الدراسيه" />
                    </div>
                    <div>
                      <Menu options={programOptions} label="أستاذ المحتوى التدريبي" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium  mb-2">عدد الاسابيع</label>
                        <input type="text" className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="ادخل عدد الاسابيع" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium  mb-2">جدارات / اسبوعي</label>
                        <input type="text" className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="ادخل الجدارات " />
                    </div>
                    <div>
                        <label className="block text-sm font-medium  mb-2">سكاشن / اسبوع</label>
                        <input type="text" className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="ادخل  عدد السكاشن في الاسبوع" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium  mb-2">عدد الفصول / Chapter</label>
                        <input type="text" className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="ادخل عنوان المحتوي" />
                    </div>

                    <div className="col-span-2"> <h2 dir="ltr" className=" text-2xl font-bold">درجات المقرر</h2></div>
                    <div>
                        <label className="block text-sm font-medium  mb-2">اعمال السنه</label>
                        <input type="text" className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="ادخل قيمه اعمال السنه" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">عملي</label>
                        <input type="text" className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="ادخل قيمه العملي " />
                    </div>
                    <div>
                        <label className="block text-sm font-medium  mb-2">التحريري</label>
                        <input type="text" className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="ادخل قيمه التحريري" />
                    </div>
                    <div className="col-span-2"> <h2 dir="ltr" className=" text-2xl font-bold">مسؤولية تسجيل الحضور</h2></div>
                    <div>
                        <Menu options={programOptions} />
                    </div>
                    <div>
                        <Menu options={programOptions} />
                    </div>

                </form>
                <div className="w-full flex justify-end">
                    <button className="text-xl text-white bg-orange-600 px-6 py-2 rounded-xl col-span-2">حفظ</button>
                </div>
             </div>
        </div>
    )
}
export default AddTriningContent;