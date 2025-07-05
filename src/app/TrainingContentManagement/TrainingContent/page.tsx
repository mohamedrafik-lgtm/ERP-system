import { TrainingContentTable } from "@/components/TrainingContent/TrainingContentTable";

const TrainingContent = () => {

    return (
        <div>
            <div className="max-w-7xl space-y-10 mx-auto mt-14">
                {/* title */}
                <div>
                    <h1 className="text-3xl">المحتوي التدريبي</h1>
                </div>
                 <div>
                    <TrainingContentTable/>
                 </div>
            </div>
        </div>
    )
}

export default TrainingContent;