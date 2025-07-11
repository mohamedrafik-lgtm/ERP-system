import RolesPermissionsTable from "@/components/Roles/PowersTable";
import RoleModel from "@/components/Roles/RoleModel";
import Paginator from "@/components/ui/paginator";


  const Powers = () => {
    return (
      <div>
        <div  className="w-9/12 mx-auto mt-14 space-y-10" dir="ltr">
          <div>
                <h1 className="text-4xl font-bold mb-4">الصلاحيات</h1>
                <p className="text-lg">يمكنك التحكم في الصلاحيات و انشاء اي صلاحيه تريدها.</p>
          </div>
          <div>
             <RoleModel btContent={'+ اضافه جديد'} title="اضافه صلاحيه جديده"/>
          </div>
          <div>
             <RolesPermissionsTable/>
          </div>
          <div dir="rtl">
               <Paginator totalPages={3}/>
          </div>
        </div>
      </div>
    );
  }

  export default Powers;