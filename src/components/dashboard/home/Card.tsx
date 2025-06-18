import { ReactNode } from "react"

interface IProps{
    title:string,
    content:ReactNode
}
export const Card = ({ content, title }: IProps) => {
  return (
    <div className='p-4 rounded-xl bg-white/20 h-full'>
      <div className="flex flex-col space-y-4">
        {/* card title */}
        <h3 className="text-2xl text-white font-bold text-center">{title}</h3>
        <div>
          {content}
        </div>
      </div>
    </div>
  );
};
