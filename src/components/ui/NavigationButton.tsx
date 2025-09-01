"use client";
import { useRouter } from "next/navigation";
import { ButtonProps } from "@/interface";
import { useCallback, memo } from "react";

const NavigationButtonComponent = ({name,url,className}:ButtonProps) => {
    const router = useRouter();
    
    const handleClick = useCallback(() => {
        router.push(`${url}`);
    }, [router, url]);
    
    return(
        <div>
            <button 
                onClick={handleClick}
                className={`${className}`}
            >
                {name}
            </button>
        </div>
    )
}

export const NavigationButton = memo(NavigationButtonComponent);