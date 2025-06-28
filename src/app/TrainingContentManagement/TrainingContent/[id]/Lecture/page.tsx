"use client";

import { useState } from "react";
import { ILecture, IResponseLecture, ITypeLecture } from "@/interface";
import { ChevronDown } from "lucide-react";
import { useDeleteLectureMutation, useGetLectureQuery } from "@/lip/features/Lecture/lecture";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/Spinner";


export default function LecturePage() {
  const params = useParams();
  const contentId = Number(params.id);
  const router = useRouter();
  const [DeleteLecture, {isLoading:Loading,isError:Error}] = useDeleteLectureMutation()
  const {
    data: lecturesData,
    isLoading,
    isError,
  } = useGetLectureQuery({ id: contentId });


  const lectures: IResponseLecture[] = Array.isArray(lecturesData) ? lecturesData : [];

  
  const groupedLectures = lectures.reduce(
    (acc: Record<number, IResponseLecture[]>, lecture) => {
      if (!acc[lecture.chapter]) {
        acc[lecture.chapter] = [];
      }
      acc[lecture.chapter].push(lecture);
      return acc;
    },
    {}
  );

  const [expandedChapters, setExpandedChapters] = useState<number[]>([]);

  const toggleChapter = (chapter: number) => {
    setExpandedChapters((prev) =>
      prev.includes(chapter)
        ? prev.filter((c) => c !== chapter)
        : [...prev, chapter]
    );
  };

  if (isLoading) return <p className="text-center py-10">جاري التحميل...</p>;
  if (isError) return <p className="text-center py-10 text-red-600">حدث خطأ أثناء التحميل</p>;
  if(lectures.length === 0 ){
    return <div className="max-w-5xl pt-14 mx-auto p-4">
               <div className="flex justify-between mb-10">
                   <h1 className="text-3xl font-bold ">قائمة المحاضرات</h1>
                   <button
                   className=" text-green-500 transition-all duration-300 hover:bg-green-500 hover:text-white py-1 border border-green-500 px-2 rounded-md"
                    onClick={()=> router.push(`/TrainingContentManagement/TrainingContent/${contentId}/addLecture`)}
                    >اضافه محاضره</button>
               </div>
               <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-gray-300 rounded-md bg-gray-50">
    <span className="text-5xl mb-4">📚</span>
    <p className="text-gray-600 text-lg font-medium">
      لا توجد محاضرات متاحة حالياً
    </p>
    <p className="text-gray-500 text-sm mt-1">
      سيتم إضافة المحاضرات قريباً إن شاء الله
    </p>
  </div>
           </div>
  }
  return (
    <div className="max-w-5xl pt-14 mx-auto p-4">
        <div className="flex justify-between mb-10">
             <h1 className="text-3xl font-bold ">قائمة المحاضرات</h1>
             <button
             className=" text-green-500 transition-all duration-300 hover:bg-green-500 hover:text-white py-1 border border-green-500 px-2 rounded-md"
              onClick={()=> router.push(`/TrainingContentManagement/TrainingContent/${contentId}/addLecture`)}
             >اضافه محاضره</button>
        </div>
      {Object.entries(groupedLectures).map(([chapter, chapterLectures]) => (
        <div key={`chapter-${chapter}`} className="rounded-md bg-white overflow-hidden mb-10">
          <div
            className="flex items-center justify-between  px-4 py-2 cursor-pointer"
            onClick={() => toggleChapter(Number(chapter))}
          >
            <span className="font-semibold">الباب {chapter}</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                expandedChapters.includes(Number(chapter)) ? "rotate-180" : ""
              }`}
            />
          </div>

          {expandedChapters.includes(Number(chapter)) && (
            <div className="p-4">
              {chapterLectures.map((lecture) => (
                <div
                  key={lecture.id}
                  className="p-4 rounded-md mb-10 border border-gray-300 bg-white flex flex-col gap-2"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-md font-semibold">{lecture.title}</h3>
                    <div className="space-x-2">
                      <button
                      onClick={()=> DeleteLecture({id:lecture.id})}
                      className="bg-red-500 hover:bg-red-600 transition-all duration-300 text-white px-3 py-1 rounded-md text-sm">
                            {Loading ? <Spinner/>:'حذف'}
                      </button>
                      <button className="bg-green-500 hover:bg-green-600 transition-all duration-300 text-white px-3 py-1 rounded-md text-sm">
                        تعديل
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600">{lecture.description}</p>
                  <p className="text-sm text-gray-800">الترتيب: {lecture.order}</p>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {lecture.type === ITypeLecture.VIDEO && lecture.youtubeUrl && (
                      <a
                        href={lecture.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm"
                      >
                        مشاهدة الفيديو 🎥
                      </a>
                    )}

                    {lecture.type === ITypeLecture.PDF && lecture.pdfFile && (
                      <>
                        <a
                          href={lecture.pdfFile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm"
                        >
                          عرض PDF 📄
                        </a>
                        <a
                          href={lecture.pdfFile}
                          download
                          className="bg-green-100 text-green-600 px-3 py-1 rounded-md text-sm"
                        >
                          تحميل PDF ⬇️
                        </a>
                      </>
                    )}

                    {lecture.type === ITypeLecture.BOTH && (
                      <>
                        {lecture.youtubeUrl && (
                          <a
                            href={lecture.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm"
                          >
                            مشاهدة الفيديو 🎥
                          </a>
                        )}
                        {lecture.pdfFile && (
                          <>
                            <a
                              href={lecture.pdfFile}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm"
                            >
                              عرض PDF 📄
                            </a>
                            <a
                              href={lecture.pdfFile}
                              download
                              className="bg-green-100 text-green-600 px-3 py-1 rounded-md text-sm"
                            >
                              تحميل PDF ⬇️
                            </a>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
