import { Input } from "@/components/input";
import {Search} from "lucide-react";

const RegisteredClients = () => {
    return (
        <div>
            <div className="w-9/12 space-y-8 mx-auto mt-14 bg-white/20 p-3 rounded-xl">
                 <h1 className="text-4xl text-white text-center font-semibold">عملاء مسجلين</h1>
                 <form>
                     <label htmlFor="searchId" className="text-white text-xl mb-3">ابحث عن عميل</label>
                     <div className="flex items-center mb-5 justify-center text-white mt-3  bg-white/20 rounded-md">
                        <Input type="text" name="search" id="searchId" className="w-full border-none bg-white/20 "/>
                        <button className="px-2 py-2 bg-white/20 hover:bg-white/40 rounded-l-md">
                           <Search/>
                        </button>
                     </div>
                 </form>
            </div>
        </div>
    )
}

export default RegisteredClients;