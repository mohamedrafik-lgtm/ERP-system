import { Input } from "./input";
import { IAddSdutind, } from "@/interface";

export const renderstInput = (inputData: IAddSdutind[]) => {
   return inputData.map((itm, idx) => (
        <div key={idx} className="flex flex-col space-y-2">
            <label htmlFor={itm.id} className="mb-2">{itm.label}</label>
            <Input type={itm.type} name={itm.name} id={itm.id} placeholder={itm.placeholder}
            className="rounded-md bg-white w-full border-0"
            />
        </div>
    ));
}