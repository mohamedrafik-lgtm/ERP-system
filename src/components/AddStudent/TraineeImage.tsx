'use client';
import { useRef, useState, useCallback, useEffect } from 'react';
import { IStudentRequest } from '@/interface';
import { Camera, Upload, Trash2, Image as ImageIcon } from 'lucide-react';
import Webcam from 'react-webcam';

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
  watch,
}: {
  label: string;
  name: keyof IStudentRequest;
  register: any;
  setValue: any;
  watch?: any;
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const webcamRef = useRef<Webcam>(null);
  
  // مراقبة قيمة الصورة من النموذج
  const currentValue = watch ? watch(name) : null;
  
  // معالجة الصورة الموجودة عند تحميل البيانات
  useEffect(() => {
    if (currentValue && typeof currentValue === 'string' && currentValue.startsWith('/uploads')) {
      // إذا كانت الصورة مسار من الخادم
      setPreviewUrl(`http://localhost:4000${currentValue}`);
    } else if (currentValue && typeof currentValue === 'string' && currentValue.startsWith('data:')) {
      // إذا كانت الصورة base64
      setPreviewUrl(currentValue);
    } else if (currentValue instanceof File) {
      // إذا كانت الصورة ملف جديد
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(currentValue);
    }
  }, [currentValue]);
  
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  const handleFileChange = (file: File) => {
    if (file) {
      // التحقق من نوع وحجم الملف
      if (!file.type.startsWith('image/')) {
        alert('الرجاء اختيار ملف صورة فقط');
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB
        alert('حجم الصورة يجب أن يكون أقل من 5 ميجابايت');
        return;
      }

      // قراءة الصورة وعرضها
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileUrl = e.target?.result as string;
        setPreviewUrl(fileUrl);
        setValue(name, file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileChange(file);
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    setValue(name, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const startCamera = () => {
    setShowCamera(true);
  };

  const capturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      // تحويل base64 إلى ملف
      fetch(imageSrc)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'camera-photo.jpg', { type: 'image/jpeg' });
          setPreviewUrl(imageSrc);
          setValue(name, file);
          stopCamera();
        });
    }
  }, [webcamRef, setValue, name]);

  const stopCamera = () => {
    setShowCamera(false);
  };

  return (
    <FormField label={label}>
      {!previewUrl && !showCamera && (
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 transform ${
            isDragging 
              ? 'border-blue-500 bg-blue-50 scale-105 shadow-lg' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
            className="hidden"
          />
          
          <div className="flex flex-col items-center gap-6">
            <div className={`p-4 rounded-full bg-gray-100 transition-transform duration-300 ${isDragging ? 'scale-110' : ''}`}>
              <ImageIcon className="w-12 h-12 text-blue-600" />
            </div>
            <div className="text-center space-y-4">
              <p className="text-gray-600 text-lg font-medium">
                اسحب وأفلت الصورة هنا أو
              </p>
              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  اختر صورة
                </button>
                <button
                  type="button"
                  onClick={startCamera}
                  className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  التقط صورة
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCamera && (
        <div className="relative bg-black rounded-xl overflow-hidden w-full max-w-2xl mx-auto shadow-2xl">
          <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent z-10">
            <h3 className="text-white text-center text-lg font-medium">التقط صورتك</h3>
          </div>
          
          <div className="relative aspect-video w-full">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* شبكة التصوير */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="w-full h-full border-2 border-white/20"></div>
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="border border-white/10"></div>
                ))}
              </div>
            </div>
            
            {/* شريط التحكم */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  onClick={capturePhoto}
                  className="px-8 py-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-green-500/30 transform hover:scale-105"
                >
                  <Camera className="w-6 h-6" />
                  التقط الصورة
                </button>
                <button
                  type="button"
                  onClick={stopCamera}
                  className="px-8 py-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-red-500/30 transform hover:scale-105"
                >
                  <Trash2 className="w-6 h-6" />
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {previewUrl && (
        <div className="relative mt-6 group">
          <div className="overflow-hidden rounded-xl border-4 border-white shadow-xl transition-all duration-300 group-hover:shadow-2xl bg-gray-50">
            <div className="aspect-video relative">
              <img
                src={previewUrl}
                alt="صورة المتدرب"
                className="w-full h-full object-contain"
              />
              
              {/* تراكب عند التحويم */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                  <button
                    type="button"
                    onClick={handleRemove}
                    className="p-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-all duration-300 hover:shadow-red-500/30 transform hover:scale-110 flex items-center gap-2"
                  >
                    <Trash2 className="w-5 h-5" />
                    <span className="text-sm">حذف</span>
                  </button>
                  <button
                    type="button"
                    onClick={startCamera}
                    className="p-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:shadow-green-500/30 transform hover:scale-110 flex items-center gap-2"
                  >
                    <Camera className="w-5 h-5" />
                    <span className="text-sm">التقاط صورة جديدة</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* شريط المعلومات */}
            <div className="p-4 bg-white">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>تم التقاط الصورة بنجاح</span>
                <span className="text-green-600">✓</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </FormField>
  );
};

export default ImageUpload;
