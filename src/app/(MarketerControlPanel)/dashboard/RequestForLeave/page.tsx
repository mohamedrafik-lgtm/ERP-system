import { Input } from "@/components/input"

const RequestForLeave = () =>{

    return (
        <div>
            <div className="w-6/12 bg-white p-4 rounded-xl mx-auto mt-14 space-y-10">
                  <div>
                      <h1 className=" text-4xl text-center">تقديم طلب إجازة</h1>
                  </div>

                  <form className="space-y-5">
                     <div className=" e mt-3 rounded-md flex flex-col space-y-3 ">
                        <label htmlFor="searchId" className=" text-xl mb-3">تاريخ الإجازة :</label>
                        <Input type="date" name="search" id="searchId" className="w-full  rounded-xl border border-gray-300 "/>
                     </div>
                     <div className="flex flex-col space-y-3 mt-5">
                         <label htmlFor="Notes">سبب الإجازة :</label>
                         <textarea
                            id={'Notes'}
                            placeholder={'اكتب اي ملاحظات عن الطالب'}
                            className="w-full min-h-[150px] p-4 rounded-xl border border-gray-300 dark:border-gray-600  text-gray-900 dark:text-white resize-y focus:outline-none focus:ring-2 focus:ring-orange-600"
                          />
                      </div>
                      <div>
                        <button className="text-white w-full text-xl py-2 bg-orange-600 hover:bg-orange-700 rounded-xl">
                            ارسال
                        </button>
                      </div>
                 </form>
            </div>
        </div>
    )
}

export default RequestForLeave