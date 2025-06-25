'use client';
import { useState } from 'react';
import { IStudentRequest } from '@/interface';
import { Trash2 } from 'lucide-react';

const FormField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    {children}
  </div>
);

const ImageUpload = ({
  label,
  name,
  register,
  setValue,
}: {
  label: string;
  name: keyof IStudentRequest;
  register: any;
  setValue: any;
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileInputKey, setFileInputKey] = useState(Date.now()); // لإعادة تعيين input

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
      setValue(name, file.name); // نخزن اسم الصورة فقط
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    setValue(name, '');
    setFileInputKey(Date.now()); // نعيد تهيئة input file
  };

  return (
    <FormField label={label}>
      {!previewUrl && (
        <input
          key={fileInputKey}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-50 hover:file:bg-gray-100"
        />
      )}

      {previewUrl && (
        <div className="relative mt-2 w-fit">
          <img
            src={previewUrl}
            alt="صورة المتدرب"
            className="h-32 w-32 object-cover rounded-md border border-gray-300"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 bg-white rounded-full shadow p-1 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </button>
        </div>
      )}
    </FormField>
  );
};

export default ImageUpload;
