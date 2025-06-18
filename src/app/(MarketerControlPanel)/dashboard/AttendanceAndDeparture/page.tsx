import { AttendanceAndDepartureTable } from "@/components/dashboard/AttendanceAndDeparture/Table"
import { AttendanceAndDepartureData } from "@/data"
import {TimerIcon,LogOut} from "lucide-react";
const AttendanceAndDeparture = () => {
    return ( 
        <div>
            <div className="w-9/12 mb-14 mx-auto space-y-10 font-semibold mt-14">
                <div>
                    <h1 className='text-white text-4xl text-center'>سجل الحضور والانصراف لهذا الشهر</h1>
                </div>
                <div className="space-y-5">
                    <h3 className='text-white flex gap-4 items-center text-2xl'>
                        سجل الحضور
                        <TimerIcon/>
                    </h3>
                    <AttendanceAndDepartureTable data={AttendanceAndDepartureData} isPresence={true}/>
                </div>
                <div className="space-y-5">
                    <h3 className='text-white flex gap-4 items-center text-2xl'>
                        سجل الانصراف
                        <LogOut/>
                    </h3>
                    <AttendanceAndDepartureTable data={AttendanceAndDepartureData} isPresence={false}/>
                </div>
            </div>
        </div>
    )
}

export default AttendanceAndDeparture