import FilterButton from "@/components/AllStudent/filterButton";
import { Input } from "@/components/input";
import StudentTable from "@/components/AllStudent/studentTable";
import Paginator from "@/components/ui/paginator";

const AllStudent = () => {
        

    return(
        <div className="mb-10">
            <div className="max-w-9/12 mx-auto mt-10 space-y-3">
               {/* title and add student button */}
               <div className="flex justify-between items-center">
                    <button className="bg-gray-200 font-bold px-8 py-2 rounded-3xl mt-2 hover:bg-gray-600 transition-all duration-300 hover:text-white">إضافة متدرب</button>
                    <h1 className="text-2xl font-bold">جميع المتدربين</h1>
               </div>
               <form className="bg-gray-200 rounded-xl flex items-center mt-10">
                    <Input type="text" placeholder="البحث عن طالب" name="search_student" id="searchStudent" className="border-0 w-full py-3"/>
                    <button className="px-5 py-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                           <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
               </form>
                {/* filter student */}
                <div>
                <div dir="ltr" className="text-2xl mt-10">فلتر</div>  
                <div className="flex items-center gap-5 flex-row-reverse mt-3">

                   <FilterButton 
                    label="البرنامج"
                    options={["Frontend", "Backend", "Fullstack"]}
                    paramKey={"program"}/>
                    <FilterButton
                     label="الحاله"
                     paramKey="status"
                     options={["Active", "Pending", "Completed"]}
                     />
                     <FilterButton
                      label="تاريخ التسجيل"
                      paramKey="date"
                      options={["Newest", "Oldest"]}
                      />
                </div>
                </div>
                {/* student table */}
                <StudentTable />
                {/* paginator */}
                <Paginator totalPages={5} />
            </div>
        </div>
    )
}
export default AllStudent;