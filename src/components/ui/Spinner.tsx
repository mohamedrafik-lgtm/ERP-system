interface IProps{
  Color:string
}
export default function Spinner({Color}:IProps) {
  return (
    <div className="flex items-center justify-center">
      <div className={`w-6 h-6 border-4 ${Color} border-t-4  border-t-transparent rounded-full animate-spin shadow-md`}></div>
    </div>
  );
}
