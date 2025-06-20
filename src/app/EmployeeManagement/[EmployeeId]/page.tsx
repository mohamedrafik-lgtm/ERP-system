import EmployeeDetailsTable from "@/components/EmployeeDetails/table";
import Paginator from "@/components/ui/paginator";

const EmployeePage = () => {
  return (
    <div>
      {/* Employee details will be displayed here */}
      <div className="w-9/12 mx-auto mt-14 space-y-15"dir="ltr">
        <div>
            <h1 className="text-3xl font-bold">تفاصيل الموظف</h1>
        </div>
        <div>
            <EmployeeDetailsTable/>
        </div>
        <div dir="rtl">
        <Paginator totalPages={4}/>
        </div>
      </div>
    </div>
  );
}

export default EmployeePage;