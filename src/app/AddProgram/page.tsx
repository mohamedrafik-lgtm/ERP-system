import ProgramTable from "@/components/AddProgram/AddProgramTable";
import Paginator from "@/components/ui/paginator";

const AddProgram = () => {
    return (
        <div className="mb-10">
            <div className="max-w-9/12 mx-auto mt-10 space-y-3">
               {/* title and add student button */}
               <div className="flex justify-between items-center">
                    <button className="bg-orange-600 font-bold text-white px-8 py-2 rounded-3xl mt-2 hover:bg-orange-700 transition-all duration-300 hover:text-white">إضافة برنامج</button>
                    <h1 className="text-2xl text-white font-bold">البرامج التدريبيه</h1>
               </div>
                <ProgramTable/>
                <Paginator totalPages={2} />
            </div>
        </div>
    );
}
export default AddProgram;