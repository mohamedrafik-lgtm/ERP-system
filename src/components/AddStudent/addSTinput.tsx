import { Input } from "../input";
import { IAddStudent, } from "@/interface";

export const RenderStudentInput = (inputData: IAddStudent[]) => {
   return inputData.map((itm, idx) => (
        <div key={idx} className="flex flex-col space-y-2">
            <label htmlFor={itm.id} className="mb-2">{itm.label}</label>
            <Input type={itm.type} name={itm.name} id={itm.id} placeholder={itm.placeholder}
            className="rounded-md bg-white/20 w-full  border-0"
            />
        </div>
    ));
}