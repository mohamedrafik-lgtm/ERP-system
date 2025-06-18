import FilterButton from "@/components/ui/filterButton";
import {MessageSquare,PhoneCall,File,Newspaper} from "lucide-react";


interface IProps{
    name: string,
    phone:string
}

export const ClientData =({name,phone}:IProps) => {
    return (
        <div>
             <div className="text-white flex space-x-5 p-5">
                <div>
                   <span className="text-xl font-semibold">اسم العميل :</span>
                </div>
                <p className="text-xl font-semibold">{name}</p>
             </div>
             <div className="text-white flex space-x-5 p-5">
                <div>
                   <span className="text-xl font-semibold">رقم الهاتف :</span>
                </div>
                <div className="flex space-x-3 items-center">
                    <p className="text-xl font-semibold">{phone}</p>
                    <div className="flex space-x-2">
                        <MessageSquare/>
                        <PhoneCall/>
                        <File/>
                    </div>
                </div>
             </div>
             <div className="flex flex-col space-y-5">
               <FilterButton label="حاله العميل" options={['متزوج','اعزب']}
                className="w-full px-5 flex items-center py-1 text-white bg-white/20 rounded-md" 
                paramKey={"state"}/>

                <FilterButton label="طريقة التواصل" options={['اعلان ممول','داتا','وتساب']}
                className="w-full px-5 flex items-center py-1 text-white bg-white/20 rounded-md" 
                paramKey={"state"}/>

                <FilterButton label="القسم" options={['مساعد خدمات صحيه','تكنولوجيا معلومات']}
                className="w-full px-5 flex items-center py-1 text-white bg-white/20 rounded-md" 
                paramKey={"state"}/>
             </div>
             <div className="text-white space-y-2 mt-5">
               <label htmlFor="Notes">التفاصيل الإضافية</label>
               <textarea
                  id={'Notes'}
                  placeholder={'اكتب اي ملاحظات عن الطالب'}
                  className="w-full min-h-[150px] p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-white/20 text-gray-900 dark:text-white resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button className="text-white w-full text-center py-2 rounded-md bg-orange-600 hover:bg-orange-700 transition-all duration-300 mt-10">
                   العميل التالي     
            </button>
        </div>
    )
}