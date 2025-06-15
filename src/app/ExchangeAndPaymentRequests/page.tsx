import { ExchangeAndPaymentRequestsTabel } from "@/components/ExchangeAndPaymentRequests/tabel";
import Paginator from "@/components/ui/paginator";

const ExchangeAndPaymentRequests = ()  =>{

   return (
    <div>
          <div className="w-10/12 mx-auto mt-14 space-y-10">
              <div dir="ltr">
                <h1 className="text-white text-3xl font-semibold">طلبات الصرف  / الدفع</h1>
              </div>
                 
              <div>
                <ExchangeAndPaymentRequestsTabel/>
              </div>
              <div>
                <Paginator/>
              </div>
          </div>
    </div>
   )
};

export default ExchangeAndPaymentRequests;