import EmployeeTable from "@/components/EmployeeManagement/EmployeeTable";
import Paginator from "@/components/ui/paginator";

const EmployeeManagement = () => {
    return (
        <div dir="ltr">
              <div className="w-9/12 mx-auto mt-14 space-y-10">
                {/* title */}
                <div>
                    <h1 className="text-3xl font-bold text-white ">المستخدمين</h1>
                </div>
                <div>
                  <button className="text-white px-7 py-2 bg-orange-600 hover:bg-orange-700 rounded-xl">اضافه موظف +</button>
                </div>
                <div>
                    <EmployeeTable/>
                </div>
                <div dir="rtl">
                    <Paginator/>
                </div>
              </div>
        </div>
    );
}

export default EmployeeManagement;