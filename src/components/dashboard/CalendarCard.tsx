"use client";
import React, { useState } from 'react';
import { 
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserGroupIcon 
} from '@heroicons/react/24/outline';

interface Event {
  id: number;
  title: string;
  time: string;
  location: string;
  attendees: number;
  type: 'meeting' | 'training' | 'exam' | 'event';
}

interface CalendarCardProps {
  events: Event[];
}

const CalendarCard: React.FC<CalendarCardProps> = ({ events }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'training':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'exam':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'event':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting':
        return <UserGroupIcon className="w-4 h-4" />;
      case 'training':
        return <CalendarIcon className="w-4 h-4" />;
      case 'exam':
        return <ClockIcon className="w-4 h-4" />;
      case 'event':
        return <MapPinIcon className="w-4 h-4" />;
      default:
        return <CalendarIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">التقويم</h3>
          <div className="flex items-center space-x-2">
            <CalendarIcon className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-500">
              {selectedDate.toLocaleDateString('ar-SA')}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {events.map((event) => (
            <div 
              key={event.id} 
              className={`p-4 rounded-lg border ${getEventTypeColor(event.type)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    {getEventTypeIcon(event.type)}
                  </div>
                  <div>
                    <h4 className="font-medium">{event.title}</h4>
                    <div className="flex items-center space-x-4 mt-1 text-sm">
                      <div className="flex items-center space-x-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPinIcon className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <UserGroupIcon className="w-4 h-4" />
                        <span>{event.attendees} مشارك</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {events.length === 0 && (
          <div className="text-center py-8">
            <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">لا توجد أحداث اليوم</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarCard;
