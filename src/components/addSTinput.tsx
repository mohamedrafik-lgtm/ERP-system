import { addSTinput } from "@/data";
import { Input } from "./input";

export const renderstInput = addSTinput.map((itm,idx)=>{
    return(
        <div>
            <label htmlFor={itm.id} className="mb-2">{itm.label}</label>
            <Input key={idx} type={itm.type} name={itm.name} id={itm.id} placeholder={itm.placeholder}
            className="rounded-md bg-white w-full border-0"
            />
        </div>
    )
})