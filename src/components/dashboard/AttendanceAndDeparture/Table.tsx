import { IAttendanceAndDeparture } from "@/interface";

interface IProps{
    data:IAttendanceAndDeparture[],
    isPresence:boolean
}
export const AttendanceAndDepartureTable = ({data,isPresence}:IProps) => {
    return (
        <div className=" space-y-2">
          {/* عنوان الأعمدة */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-white/40 text-white font-bold text-sm p-2 rounded-md">
            <div className="text-md text-center font-semibold">رقم العمليه</div>
            <div className="text-md text-center font-semibold">
                {isPresence ? "تاريخ الحضور" : "تاريخ الانصارف"}
            </div>
            <div className="text-md text-center font-semibold">
                {isPresence ? "وقت الحضور" : "وقت الانصراف"}
            </div>
            <div className="text-md text-center font-semibold">اليوم</div>
          </div>
    
          {/* البيانات */}
          {data.map((itm, idx) => (
            <div
              key={idx}
              className="bg-white/10 hover:bg-white/30 backdrop-blur-md rounded-xl text-white p-2 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 items-center">
                <div className="text-sm text-center font-semibold">{itm.id}</div>
                <div className="text-sm text-center font-semibold">{itm.DateOfAttendance}</div>
                <div className="text-sm text-center">{itm.DepartureTime}</div>
                <div className="text-sm text-center font-semibold">{itm.day}</div>
              </div>
            </div>
          ))}
        </div>
      );
}