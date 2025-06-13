"use client";
import { useRouter } from "next/navigation";
interface  ButtonProps {

    url:string,
    name:string
    className?: string;
}
export const NavigationButton = ({name,url,className}:ButtonProps) => {
    const router = useRouter();
    return(
        <div>
            <button onClick={() => router.push(`${url}`)}
                     className={`${className}`}>{name}</button>
        </div>
    )
}