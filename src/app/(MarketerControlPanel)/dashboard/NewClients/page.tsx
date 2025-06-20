import { ClientData } from "@/components/dashboard/NewClients/ClientData"

const NewClients = () => {

    return (
        <div>
            <div className="xl:w-5/12 mx-auto mt-14 bg-white rounded-xl p-3 space-y-5">
                 <div>
                    <h1 className=" text-center font-semibold text-4xl">بيانات العميل</h1>
                 </div>
                 <div>
                    <ClientData name="محمد رفيق فتحي" phone="01066975648"/>
                 </div>
            </div>
        </div>
    )
}

export default NewClients