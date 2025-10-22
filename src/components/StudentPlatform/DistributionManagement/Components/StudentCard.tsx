// Student Card Component following SRP
import React from 'react';
import { User, BookOpen } from 'lucide-react';
import { Student } from '../types';
import { StudentUtils } from '../utils';
import { BaseCard } from '../BaseComponents/BaseCard';

interface StudentCardProps {
  student: Student;
  isSelected: boolean;
  onSelect: (studentId: number) => void;
  onAssign: (studentId: number) => void;
}

export const StudentCard: React.FC<StudentCardProps> = ({
  student,
  isSelected,
  onSelect,
  onAssign
}) => {
  return (
    <BaseCard className="bg-gray-50">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{student.name}</h3>
            <p className="text-sm text-gray-500">{student.studentId}</p>
          </div>
        </div>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(student.id)}
          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{student.program}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">المستوى:</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${StudentUtils.getLevelColor(student.level)}`}>
            {student.level}
          </span>
        </div>
      </div>

      {student.preferences && student.preferences.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">التفضيلات:</p>
          <div className="flex flex-wrap gap-1">
            {student.preferences.map((pref, index) => (
              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {pref}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${StudentUtils.getStatusColor(student.status)}`}>
          {StudentUtils.getStatusText(student.status)}
        </span>
        <button
          onClick={() => onAssign(student.id)}
          className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors"
        >
          توزيع
        </button>
      </div>
    </BaseCard>
  );
};

