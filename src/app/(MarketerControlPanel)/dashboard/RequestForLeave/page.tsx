import { Input } from "@/components/input"

const RequestForLeave = () =>{

    return (
        <div>
            <div className="w-6/12 bg-white/20 p-4 rounded-xl mx-auto mt-14 space-y-10">
                  <div>
                      <h1 className="text-white text-4xl text-center">تقديم طلب إجازة</h1>
                  </div>

                  <form className="space-y-5">
                     <div className=" text-white mt-3 rounded-md flex flex-col space-y-3 ">
                        <label htmlFor="searchId" className="text-white text-xl mb-3">تاريخ الإجازة :</label>
                        <Input type="date" name="search" id="searchId" className="w-full border-none rounded-xl bg-white/20 "/>
                     </div>
                     <div className="text-white flex flex-col space-y-3 mt-5">
                         <label htmlFor="Notes">سبب الإجازة :</label>
                         <textarea
                            id={'Notes'}
                            placeholder={'اكتب اي ملاحظات عن الطالب'}
                            className="w-full min-h-[150px] p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-white/20 text-gray-900 dark:text-white resize-y focus:outline-none focus:ring-2 focus:ring-orange-600"
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