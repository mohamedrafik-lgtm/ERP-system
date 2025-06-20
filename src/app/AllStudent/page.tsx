import FilterButton from "@/components/ui/filterButton";
import { Input } from "@/components/input";
import StudentTable from "@/components/AllStudent/studentTable";
import Paginator from "@/components/ui/paginator";
import { NavigationButton } from "@/components/ui/NavigationButton";

const AllStudent = () => {
        

    return(
        <div className="mb-10">
            <div className="max-w-10/12 mx-auto pt-10 space-y-3">
               {/* title and add student button */}
               <div className="flex justify-between items-center">
                     <NavigationButton name="إضافة متدرب" url="/AddStudent" className="bg-orange-600 text-white font-bold px-8 py-2 rounded-3xl mt-2 hover:bg-orange-600 transition-all duration-300 hover:text-white"/>
                    <h1 className="text-2xl font-bold">جميع المتدربين</h1>
               </div>
               <form className="bg-white rounded-xl flex items-center mt-10">
                    <Input type="text" placeholder="البحث عن طالب" name="search_student" id="searchStudent" className="border-0 w-full py-3 placeholder:text-black/70"/>
                    <button className="px-5 py-3 hover:bg-black/20 rounded-l-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                           <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
               </form>
                {/* filter student */}
                <div>
                <div dir="ltr" className="text-2xl mt-10">فلتر</div>  
                <div className="flex relative items-center gap-5 flex-row-reverse mt-3">

                   <FilterButton 
                    label="البرنامج"
                    options={["Frontend", "Backend", "Fullstack"]}
                    paramKey={"program"}
                    className="inline-flex items-center px-4 py-2 rounded-xl bg-orange-600 text-sm font-medium text-white transition duration-200 shadow-sm"/>
                    
                    <FilterButton
                     label="الحاله"
                     paramKey="status"
                     options={["Active", "Pending", "Completed"]}
                     className="inline-flex items-center px-4 py-2 rounded-xl bg-orange-600 text-sm font-medium text-white transition duration-200 shadow-sm"
                     />
                     <FilterButton
                      label="تاريخ التسجيل"
                      paramKey="date"
                      options={["Newest", "Oldest"]}
                      className="inline-flex items-center px-4 py-2 rounded-xl bg-orange-600 text-sm font-medium text-white transition duration-200 shadow-sm"
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