import AddMarketer from "@/components/Marketer/AddMarketer";
import MarketerTable from "@/components/Marketer/MarketerTable";

const Marketer = () => {
    return (
        <div>
            <div className="w-9/12 mx-auto mt-10 space-y-10">
               <div className="flex items-center justify-between">
                      <div className="space-y-3">
                         <h1 className="text-4xl">المسوقين</h1>
                         <p className="text-sm text-gray-500">لديك هنا كل ما يخص المسوقين و يمكنك التحكم بهم</p>
                      </div>
                      <div>
                             <AddMarketer/>
                      </div>
                  </div>
                  <div>
                     <MarketerTable/>
                  </div>
            </div>
        </div>
    )
}

export default Marketer;