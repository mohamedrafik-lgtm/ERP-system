"use client";
import { useRouter } from "next/navigation";
import { ButtonProps } from "@/interface";


export const NavigationButton = ({name,url,className}:ButtonProps) => {
    const router = useRouter();
    return(
        <div>
            <button onClick={() => router.push(`${url}`)}
                     className={`${className}`}>{name}</button>
        </div>
    )
}