// import FilterButton from "@/components/ui/filterButton";

import { Input } from "@/components/input";


const StudentSections = () => {

    return (
        <div className="h-screen">
            <form dir="ltr" className="w-9/12 mx-auto mt-14 space-y-30">
                  <div className="space-y-5">
                    <h1 className="text-3xl text-white font-bold">انشاء سكشن</h1>
                    <p className="text-white opacity-45">حدد القسم الذي تريد انشاء سكاشن له و حدد العدد المطلوب في كل سكشن</p>
                  </div>

                  <div className="space-y-15">
                  <div className="grid gap-3 text-white">
                    {/* <h3 className="text-white text-xl"></h3> */}
                    {/* <FilterButton label={"القسم"} paramKey={"department"} options={['full stack','front-end','back end']} className="w-96 flex flex-col justify-start bg-white rounded-2xl "/> */}
                    <label htmlFor="departmentId">القسم</label>
                    <Input type="text" name="department" id="departmentId" placeholder="اختر التخصص"  className="w-7/12 rounded-lg border-none bg-white/20"/>
                  </div>
                  <div className="grid gap-3 text-white">
                    {/* <h3 className="text-white text-xl"></h3> */}
                    {/* <FilterButton label={"القسم"} paramKey={"department"} options={['full stack','front-end','back end']} className="w-96 flex flex-col justify-start bg-white rounded-2xl "/> */}
                    <label htmlFor="departmentId">عدد السكاشن</label>
                    <Input type="text" name="department" id="departmentId" placeholder="ادخل عدد السكاشن"  className="w-7/12 rounded-lg border-none bg-white/20"/>
                  </div>
                  </div>
                  <div>
                    <button type="submit" className="bg-orange-600 flex hover:bg-orange-700 px-7 py-2 text-white rounded-lg  transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                           <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                      انشاء سكشن
                    </button>
                  </div>
            </form>
        </div>
    );
}

export default StudentSections;