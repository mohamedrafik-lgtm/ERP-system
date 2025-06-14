import FinancialModel from "@/components/ReviewOfFinancialrRestrictions/Dialog";
import { Search } from "@/components/ReviewOfFinancialrRestrictions/Search";
import FinancialStatementsTable from "@/components/ReviewOfFinancialrRestrictions/Table";
import InlineMenu from "@/components/ui/MenuReport";
import Paginator from "@/components/ui/paginator";



const FinancialStatements = () => {
       const items = [
        { name: 'حساب المدفوعات', label: 'حساب المدفوعات', value: 'حساب المدفوعات' },
        { name: 'رصيد حساب المدفوعات' , label: 'مدفوعات المتدربين', value: 'مدفوعات المتدربين' },
        { name: 'برامج رسوم', label: 'حساب رسوم برامج', value: 'حساب رسوم برامج' },
        { name: 'حساب الاقساط', label: 'حساب الاقساط', value: 'حساب الاقساط' }
       ];
    return (
        <div>
            <div className="w-9/12 mx-auto mt-14 space-y-5">
                 <div className="text-end flex justify-between">
                     <div>
                        <FinancialModel/>
                     </div>
                     <div className="space-y-5">
                        <h1 className="text-3xl text-white font-bold">القيوم الماليه</h1>
                        <p className="text-sm text-white/20">هذه الصفحه خاصه بعرض جميع القيود الماليه و انشاء قيد جديد</p>
                     </div>
                 </div>
                 <div className="space-y-6 p-3 bg-white/20 rounded-xl">
                    <h3 dir="ltr" className="text-white text-xl">فلتر</h3>
                    <div className="flex space-x-5" dir="ltr">
                        <div>
                            <InlineMenu name="رصيد حساب" items={items} />
                        </div>
                        <div>
                            <InlineMenu name="تقارير" items={items} />
                        </div>
                        
                    </div>
                    <Search/>
                 </div>

                 <div>
                    <FinancialStatementsTable/>
                 </div>

                 <div>
                    <Paginator totalPages={5}/>
                 </div>
            </div>
        </div>
    )
}

export default FinancialStatements;