'use client'
import React, { useState } from "react";
import { Input } from '../input';

interface AddProgramFormProps {
  onSubmit: (data: ProgramData) => void;
}

export interface ProgramData {
  nameAr: string;
  nameEn: string;
  price: string;
  description: string;
}

const AddProgramForm: React.FC<AddProgramFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<ProgramData>({
    nameAr: "",
    nameEn: "",
    price: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm  mb-1">اسم البرنامج (بالعربي)</label>
        <Input
          type="text"
          name="nameAr"
          value={formData.nameAr}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 bg-white rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label className="block text-sm  mb-1">اسم البرنامج (بالإنجليزي)</label>
        <Input
          type="text"
          name="nameEn"
          value={formData.nameEn}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 bg-white rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">سعر البرنامج</label>
        <Input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 bg-white rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">وصف قصير</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full border border-gray-300 bg-white rounded px-3 py-2 resize-none focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      {/* <div className="text-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          حفظ البرنامج
        </button>
      </div> */}
    </form>
  );
};

export default AddProgramForm;
