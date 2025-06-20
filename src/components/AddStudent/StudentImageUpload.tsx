"use client";// components/StudentImageUpload.jsx

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function StudentImageUpload() {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] }
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded-2xl bg-white p-10 text-center cursor-pointer transition hover:border-orange-600"
    >
      <input {...getInputProps()} />

      {preview ? (
        <div className="flex flex-col items-center gap-4">
          <img
            src={preview}
            alt="معاينة صورة الطالب"
            className="w-40 h-40 object-cover rounded-full border"
          />
          <p className="text-sm text-gray-500">انقر أو اسحب لتغيير الصورة</p>
        </div>
      ) : (
        <>
          <h2 className="text-lg font-semibold mb-2">رفع صورة الطالب</h2>
          <p className="text-sm text-gray-500 mb-4">
            انقر أو اسحب وأسقط لتحميل صورة
          </p>
          <button
            type="button"
            className="bg-gray-100/20 font-semibold px-6 py-2 rounded-full hover:bg-orange-600 hover:text-white transition"
          >
            تحميل الصورة
          </button>
        </>
      )}
    </div>
  );
}

