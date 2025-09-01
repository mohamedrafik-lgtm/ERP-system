"use client";
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { ReactNode, useState } from 'react'
import AddQuestionForm from './AddQuestionContetn';
import { IAddQuestions, IDifficulty, IType , ISkill} from '@/interface';
import { useForm } from 'react-hook-form';
import { useAddQuestionMutation } from '@/lip/features/question/question';
import toast from 'react-hot-toast';
import { Plus, X, Save, Loader2, Brain } from 'lucide-react';

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
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        {ButtonContent}
      </Button>

      <Dialog open={isOpen} className="relative z-50 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300">
              <form onSubmit={handleSubmit(onSubmit)} className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <DialogTitle as="h3" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        إضافة سؤال جديد
                      </DialogTitle>
                      <p className="text-gray-600 text-sm mt-1">أدخل تفاصيل السؤال والخيارات</p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    onClick={close}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </Button>
                </div>

                {/* Form Content */}
                <div className="space-y-6">
                  <AddQuestionForm register={register} setValue={setValue} values={values} />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                  <Button
                    type="button"
                    onClick={close}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
                  >
                    إلغاء
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        جاري الإضافة...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        إضافة السؤال
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
