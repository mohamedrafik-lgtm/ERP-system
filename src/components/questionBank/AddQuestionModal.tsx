"use client";
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { ReactNode, useState } from 'react'
import AddQuestionForm from './AddQuestionContetn';
import { IAddQuestions, IDifficulty, IType , ISkill} from '@/interface';
import { useForm } from 'react-hook-form';
import { useAddQuestionMutation } from '@/lip/features/question/question';
import toast from 'react-hot-toast';

interface IProps{
  ButtonContent  : ReactNode;
  className?:string;
  contentId:number;
  setData?:IAddQuestions
}
export default function AddQuestionModal({setData,contentId,ButtonContent,className="bg-orange-600 text-white px-5 py-2 rounded hover:bg-orange-700 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-orange-800"}:IProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [AddQuestion,{isLoading,isSuccess}] = useAddQuestionMutation()
 const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddQuestions>({
    defaultValues: {
      text: "",
      type: IType.MULTIPLE_CHOICE,
      skill: ISkill.RECALL,
      difficulty: IDifficulty.EASY,
      chapter: 1,
      contentId,
      options: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
    },
  });
  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

 const onSubmit = (data: IAddQuestions) => {
   try{
     AddQuestion(data);
      toast.success('تم اضافه سؤال بنجاح');
    }catch(err){
      console.log(err)
      close()
    }
  };

  const values = watch();

  return (
    <>
      <Button
        onClick={open}
        className={className}
      >
            {ButtonContent}
      </Button>

      <Dialog open={isOpen} onSubmit={handleSubmit(onSubmit)} as="form" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-4xl border-gray-600 rounded-xl bg-white/20 p-6 space-y-3 backdrop-blur-xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="h3" className="text-2xl font-medium">
                  اضافة سؤال جديد
              </DialogTitle>
                 <AddQuestionForm register={register} setValue={setValue} values={values} />
              <div className="mt-4 space-x-5 mr-10">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-red-500 px-8 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-red-600 data-open:bg-red-700"
                  onClick={close}
                  type='button'
                >
                  اغلاق
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-green-500 px-8 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-green-600 data-open:bg-green-700"
                  onClick={close}
                  type='submit'
                >
                  اضافه
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
