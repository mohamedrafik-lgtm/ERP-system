'use client';
import FeesDialog from "@/components/TraineeFees/Modal";
import TraineeFeesTable from "@/components/TraineeFees/TraineeFeesTable";
import FilterButton from "@/components/ui/filterButton";
import Paginator from "@/components/ui/paginator";
import { useGetFinanceQuery } from "@/lip/features/Lockers/safe";
import { useGetProgramsQuery } from "@/lip/features/program/program";
import { useState } from "react";

const TraineeFees = () =>{
    const [isOpen, setIsOpen] = useState(false);
    const {data} = useGetProgramsQuery ()
    const {data:res} = useGetFinanceQuery()
    return (
        <div>
           <div className="w-10/12 mx-auto mt-10">
           <div dir="ltr" className="">
           <div>
                <h1 className="text-3xl font-bold mb-4">رسوم المتدرب</h1>
                <p className="text-gray-600 mb-6">إدارة وعرض تفاصيل رسوم المتدربين.</p>
            </div>
            <div className="mb-6 grid grid-cols-4 gap-24 px-3">
                <input 
                    type="text" 
                    placeholder=" ابحث عن رسم" 
                    className=" bg-white px-4 py-2 rounded-xl col-span-3"
                />
                {/* <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
                    اضافه جديد
                </button> */}
                <button
                  onClick={() => setIsOpen(true)}
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  اضافه رسوم متدربين
                </button>
                <FeesDialog  programs={data ?? []}
                safes={res ?? []} isOpen={isOpen} onClose={() => setIsOpen(false)} />
           </div>
           <div>
            <FilterButton
                className="bg-white w-fit inline-flex items-center ml-3 justify-center px-4 py-2 rounded-xl mr-2 mb-4"
                label="فلتر"
                paramKey="status"
                options={[
                    "الكل",
                    "مدفوع",
                    "غير مدفوع"
                ]}
            />
           </div>
           </div>
            <div>
                <TraineeFeesTable />
            </div>
            <div>
                <Paginator totalPages={3} />
            </div>
           </div>
        </div>
    );
}

export default TraineeFees;