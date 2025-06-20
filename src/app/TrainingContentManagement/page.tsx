import img from "@/img/502585454_122235753458244801_413190920156398012_n-removebg-preview.png";
import Image from "next/image";

const TrainingContentManagement = () => {
    return (
        <div>
            <div className="flex justify-center items-center">
                <Image src={img.src} width={1000} height={1000}  alt="Logo" className="opacity-60" />      
            </div>
        </div>
    )
}

export default TrainingContentManagement;