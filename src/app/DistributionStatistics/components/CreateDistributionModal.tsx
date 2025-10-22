"use client";

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  X,
  Save,
  Minus,
  Plus,
  BookOpen,
  GraduationCap,
  Info,
  Loader2
} from "lucide-react";
import { useCreateDistributionMutation } from '@/lip/features/distribution/distributionApi';
import { useGetProgramsQuery } from '@/lip/features/program/program';
import toast from 'react-hot-toast';
import { CreateDistributionFormData, Program } from '../types';

interface CreateDistributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateDistributionModal: React.FC<CreateDistributionModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [roomCapacities, setRoomCapacities] = useState<number[]>([]);
  const [showRoomCapacities, setShowRoomCapacities] = useState(false);

  const [createDistribution, { isLoading: isCreating }] = useCreateDistributionMutation();
  const { data: programs = [], isLoading: isLoadingPrograms } = useGetProgramsQuery();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isValid }
  } = useForm<CreateDistributionFormData>({
    mode: 'onChange',
    defaultValues: {
      programId: 0,
      type: undefined,
      numberOfRooms: 1,
      roomCapacities: []
    }
  });

  const numberOfRooms = watch('numberOfRooms');
  const type = watch('type');

  // Update room capacities when numberOfRooms changes
  useEffect(() => {
    if (numberOfRooms && numberOfRooms > 0) {
      const newCapacities = Array(numberOfRooms).fill(0);
      setRoomCapacities(newCapacities);
      setValue('roomCapacities', newCapacities);
    }
  }, [numberOfRooms, setValue]);

  const onSubmit = async (data: CreateDistributionFormData) => {
    try {
      console.log('Form data received:', data);
      
      // Validate required fields
      if (!data.programId || !data.type || !data.numberOfRooms) {
        toast.error('يرجى ملء جميع الحقول المطلوبة');
        return;
      }

      const payload = {
        programId: Number(data.programId), // Convert to number
        type: data.type,
        numberOfRooms: Number(data.numberOfRooms), // Convert to number
        roomCapacities: showRoomCapacities && data.roomCapacities ? data.roomCapacities : undefined
      };

      console.log('Sending payload:', payload); // Debug log
      console.log('Payload types:', {
        programId: typeof payload.programId,
        type: typeof payload.type,
        numberOfRooms: typeof payload.numberOfRooms,
        roomCapacities: typeof payload.roomCapacities
      });

      await createDistribution(payload).unwrap();
      toast.success('تم إنشاء التوزيع بنجاح');
      onClose();
      reset();
      onSuccess();
    } catch (error) {
      console.error('Error creating distribution:', error);
      toast.error('فشل في إنشاء التوزيع');
    }
  };

  const updateRoomCapacity = (index: number, value: number) => {
    const newCapacities = [...roomCapacities];
    newCapacities[index] = value;
    setRoomCapacities(newCapacities);
    setValue('roomCapacities', newCapacities);
  };

  const getTypeIcon = (type: string) => {
    return type === 'THEORY' ? (
      <BookOpen className="w-5 h-5" />
    ) : (
      <GraduationCap className="w-5 h-5" />
    );
  };

  const getTypeColor = (type: string) => {
    return type === 'THEORY' 
      ? 'bg-blue-100 text-blue-700 border-blue-200' 
      : 'bg-purple-100 text-purple-700 border-purple-200';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">إنشاء توزيع جديد</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Program Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              البرنامج التدريبي *
            </label>
            <Controller
              name="programId"
              control={control}
              rules={{ required: 'البرنامج مطلوب', min: { value: 1, message: 'يرجى اختيار برنامج صحيح' } }}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoadingPrograms}
                >
                  <option value={0}>
                    {isLoadingPrograms ? 'جاري تحميل البرامج...' : 'اختر البرنامج'}
                  </option>
                  {programs.map((program) => (
                    <option key={program.id} value={program.id}>
                      {program.nameAr} - {program.nameEn}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.programId && (
              <p className="mt-1 text-sm text-red-600">{errors.programId.message}</p>
            )}
          </div>

          {/* Distribution Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              نوع التوزيع *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="type"
                control={control}
                rules={{ required: 'نوع التوزيع مطلوب' }}
                render={({ field }) => (
                  <>
                    <label className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      field.value === 'THEORY' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        value="THEORY"
                        checked={field.value === 'THEORY'}
                        onChange={field.onChange}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${getTypeColor('THEORY')}`}>
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">نظري</p>
                          <p className="text-sm text-gray-600">محاضرات نظرية</p>
                        </div>
                      </div>
                    </label>

                    <label className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      field.value === 'PRACTICAL' 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        value="PRACTICAL"
                        checked={field.value === 'PRACTICAL'}
                        onChange={field.onChange}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${getTypeColor('PRACTICAL')}`}>
                          <GraduationCap className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">عملي</p>
                          <p className="text-sm text-gray-600">جلسات عملية</p>
                        </div>
                      </div>
                    </label>
                  </>
                )}
              />
            </div>
            {errors.type && (
              <p className="mt-2 text-sm text-red-600">{errors.type.message}</p>
            )}
          </div>

          {/* Number of Rooms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              عدد المجموعات *
            </label>
            <Controller
              name="numberOfRooms"
              control={control}
              rules={{ required: 'عدد المجموعات مطلوب', min: { value: 1, message: 'يجب أن يكون عدد المجموعات أكبر من 0' } }}
              render={({ field }) => (
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => field.onChange(Math.max(1, (field.value || 1) - 1))}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={field.value || ''}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                    className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => field.onChange((field.value || 1) + 1)}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              )}
            />
            {errors.numberOfRooms && (
              <p className="mt-2 text-sm text-red-600">{errors.numberOfRooms.message}</p>
            )}
          </div>

          {/* Room Capacities (Optional) */}
          {numberOfRooms > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">
                  سعة المجموعات (اختياري)
                </label>
                <button
                  type="button"
                  onClick={() => setShowRoomCapacities(!showRoomCapacities)}
                  className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  {showRoomCapacities ? 'إخفاء' : 'تخصيص السعات'}
                </button>
              </div>

              {showRoomCapacities && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Array.from({ length: numberOfRooms }, (_, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <label className="text-sm text-gray-600 w-16">
                          المجموعة {index + 1}:
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={roomCapacities[index] || ''}
                          onChange={(e) => updateRoomCapacity(index, parseInt(e.target.value) || 0)}
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="السعة"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                    <Info className="w-4 h-4 text-blue-600" />
                    <p className="text-sm text-blue-700">
                      إذا لم تحدد السعات، سيتم توزيع الطلاب تلقائياً بالتساوي
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={!isValid || isCreating}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {isCreating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  جاري الإنشاء...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  إنشاء التوزيع
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
