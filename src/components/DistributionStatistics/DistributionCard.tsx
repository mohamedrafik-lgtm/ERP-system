"use client";

import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  GraduationCap,
  MapPin,
  User,
  Trash2,
  Edit,
  Eye
} from "lucide-react";
import { Distribution, Room } from '@/app/DistributionStatistics/types';

interface DistributionCardProps {
  distribution: Distribution;
  isExpanded: boolean;
  onToggle: () => void;
  onEdit?: (distribution: Distribution) => void;
  onDelete?: (distribution: Distribution) => void;
  onView?: (distribution: Distribution) => void;
}

interface RoomCardProps {
  room: Room;
  isExpanded: boolean;
  onToggle: () => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, isExpanded, onToggle }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      {/* Room Header */}
      <div 
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 rounded-md">
            <MapPin className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h5 className="text-md font-medium text-gray-900">
              {room.roomName} (رقم: {room.roomNumber})
            </h5>
            <p className="text-xs text-gray-600">
              السعة: {room.capacity || 'غير محدد'} | متدربين: {room._count.assignments}
            </p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-500" />
        )}
      </div>

      {/* Trainees in Room */}
      {isExpanded && (
        <div className="border-t border-gray-100 bg-gray-50 p-4 space-y-2">
          <h6 className="text-sm font-semibold text-gray-700 mb-2">المتدربون في هذه القاعة:</h6>
          {room.assignments.length === 0 ? (
            <p className="text-gray-600 text-xs">لا يوجد متدربون مخصصون لهذه القاعة.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {room.assignments.map(assignment => (
                <div key={assignment.id} className="flex items-center gap-3 bg-white p-3 rounded-md shadow-sm border border-gray-100">
                  {assignment.trainee.photoUrl ? (
                    <img 
                      src={assignment.trainee.photoUrl} 
                      alt={assignment.trainee.nameAr} 
                      className="w-8 h-8 rounded-full object-cover" 
                    />
                  ) : (
                    <User className="w-8 h-8 text-gray-500 p-1 bg-gray-100 rounded-full" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{assignment.trainee.nameAr}</p>
                    <p className="text-xs text-gray-600">الرقم الوطني: {assignment.trainee.nationalId}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const DistributionCard: React.FC<DistributionCardProps> = ({ 
  distribution, 
  isExpanded, 
  onToggle,
  onEdit,
  onDelete,
  onView
}) => {
  const [expandedRooms, setExpandedRooms] = useState<Set<string>>(new Set());

  const toggleRoom = (roomId: string) => {
    setExpandedRooms(prev => {
      const newSet = new Set(prev);
      if (newSet.has(roomId)) {
        newSet.delete(roomId);
      } else {
        newSet.add(roomId);
      }
      return newSet;
    });
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
      ? 'bg-green-100 text-green-600' 
      : 'bg-purple-100 text-purple-600';
  };

  const getTypeLabel = (type: string) => {
    return type === 'THEORY' ? 'نظري' : 'عملي';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Distribution Header */}
      <div 
        className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-lg ${getTypeColor(distribution.type)}`}>
              {getTypeIcon(distribution.type)}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {distribution.program.nameAr}
              </h3>
              <p className="text-sm text-gray-600">
                {distribution.program.nameEn} • {distribution.academicYear}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {distribution._count.rooms}
              </p>
              <p className="text-xs text-gray-600">قاعات</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {distribution.rooms.reduce((sum, room) => sum + room.assignments.length, 0)}
              </p>
              <p className="text-xs text-gray-600">متدربين</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                distribution.type === 'THEORY'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-purple-100 text-purple-700'
              }`}>
                {getTypeLabel(distribution.type)}
              </span>
              <div className="flex items-center gap-1">
                {onView && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onView(distribution);
                    }}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    title="عرض التفاصيل"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                )}
                {onEdit && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(distribution);
                    }}
                    className="p-1 text-gray-400 hover:text-yellow-600 transition-colors"
                    title="تعديل التوزيع"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(distribution);
                    }}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    title="حذف التوزيع"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rooms List */}
      {isExpanded && (
        <div className="border-t border-gray-100 bg-gray-50 p-6 space-y-4">
          <h4 className="text-md font-semibold text-gray-800 mb-3">القاعات المخصصة:</h4>
          {distribution.rooms.length === 0 ? (
            <p className="text-gray-600 text-sm">لا توجد قاعات مخصصة لهذا التوزيع.</p>
          ) : (
            <div className="space-y-3">
              {distribution.rooms.map(room => (
                <RoomCard
                  key={room.id}
                  room={room}
                  isExpanded={expandedRooms.has(room.id)}
                  onToggle={() => toggleRoom(room.id)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};


