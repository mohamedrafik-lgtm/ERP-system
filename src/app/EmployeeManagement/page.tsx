import AddEmployeeModal from "@/components/EmployeeManagement/EmployeeModal";
import EmployeeTable from "@/components/EmployeeManagement/EmployeeTable";
import Paginator from "@/components/ui/paginator";

const EmployeeManagement = () => {
    return (
        <div dir="ltr">
              <div className="w-9/12 mx-auto mt-14 space-y-10">
                {/* title */}
                <div>
                    <h1 className="text-3xl font-bold  ">المستخدمين</h1>
                </div>
                <div dir="rtl">
                  <AddEmployeeModal/>
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