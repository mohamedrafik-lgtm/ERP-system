import { Card } from "@/components/dashboard/home/Card";
import { CalendarDays, ListTodo, Megaphone, UserPlus, Users } from "lucide-react";
// import { ReactNode } from "react";



const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 mt-14 xl:grid-cols-2  gap-10 p-4">
      {/* Greeting + Attendance */}
      <div className="col-span-2">
           <Card
        title="صباح الخير Admin"
        content={
          <div className="flex justify-center">
            <button className="mt-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded flex items-center gap-2">
              <UserPlus size={18} />
              حضور
            </button>
          </div>
        }
      />
      </div>

      {/* Communication */}
      <Card
        title="التواصل"
        content={
          <div className="text-white space-y-2 pl-8 relative">
            <Users className="text-blue-500 absolute top-0 left-0" />
            <p>عدد التواصلات اليوم : 0</p>
            <p>العملاء المهتمين اليوم : 0</p>
            <p>إجمالي عدد العملاء المهتمين : 0</p>
          </div>
        }
      />

      {/* Daily Tasks */}
      <Card
        title="المهام اليومية"
        content={
          <div className="text-white space-y-2 pl-8 relative">
            <ListTodo className="text-blue-500 absolute top-0 left-0" />
            <p>عدد المهام الكلي : 8</p>
            <p>عدد المهام المتبقية : 8</p>
          </div>
        }
      />

      {/* Monthly Statistics */}
      <Card
        title="احصائيات الشهر"
        content={
          <div className="text-white space-y-4">
            <div className="flex items-center gap-2">
              <CalendarDays className="text-blue-500" />
              <p>متوسط تنفيذ المهام : 25.00%</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '25%' }} />
            </div>
          </div>
        }
      />

      {/* Campaign Status */}
      <Card
        title="حالة الحملات"
        content={
          <div className="text-white space-y-2 pl-8 relative">
            <Megaphone className="text-blue-500 absolute top-0 left-0" />
            <p>
              حملات WhatsApp:
              <span className="text-red-500 font-medium"> مُعطلة</span>
            </p>
            <p>
              إعلانات Facebook:
              <span className="text-red-500 font-medium"> مُعطلة</span>
            </p>
          </div>
        }
      />
    </div>
  );
};


export default Dashboard ;