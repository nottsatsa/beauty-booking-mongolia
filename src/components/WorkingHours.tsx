
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Plus } from 'lucide-react';

interface WorkingDay {
  day: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

interface WorkingHoursProps {
  workingHours: WorkingDay[];
  onChange: (workingHours: WorkingDay[]) => void;
}

const WorkingHours: React.FC<WorkingHoursProps> = ({ workingHours, onChange }) => {
  const days = [
    'Даваа',
    'Мягмар', 
    'Лхагва',
    'Пүрэв',
    'Баасан',
    'Бямба',
    'Ням'
  ];

  const initializeWorkingHours = () => {
    if (workingHours.length === 0) {
      const defaultHours = days.map(day => ({
        day,
        isOpen: true,
        openTime: '09:00',
        closeTime: '18:00'
      }));
      onChange(defaultHours);
      return defaultHours;
    }
    return workingHours;
  };

  const currentWorkingHours = initializeWorkingHours();

  const handleDayToggle = (index: number, checked: boolean) => {
    const updated = [...currentWorkingHours];
    updated[index].isOpen = checked;
    onChange(updated);
  };

  const handleTimeChange = (index: number, field: 'openTime' | 'closeTime', value: string) => {
    const updated = [...currentWorkingHours];
    updated[index][field] = value;
    onChange(updated);
  };

  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-gray-800">
          Ажиллах цагийн хуваарь
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentWorkingHours.map((workingDay, index) => (
          <div key={workingDay.day} className="flex items-center gap-4 p-3 rounded-lg border border-gray-100">
            <div className="flex items-center space-x-2 min-w-[100px]">
              <Checkbox
                id={`day-${index}`}
                checked={workingDay.isOpen}
                onCheckedChange={(checked) => handleDayToggle(index, checked as boolean)}
              />
              <label
                htmlFor={`day-${index}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {workingDay.day}
              </label>
            </div>
            
            {workingDay.isOpen ? (
              <div className="flex items-center gap-2 flex-1">
                <Input
                  type="time"
                  value={workingDay.openTime}
                  onChange={(e) => handleTimeChange(index, 'openTime', e.target.value)}
                  className="w-32"
                />
                <span className="text-gray-500">-</span>
                <Input
                  type="time"
                  value={workingDay.closeTime}
                  onChange={(e) => handleTimeChange(index, 'closeTime', e.target.value)}
                  className="w-32"
                />
              </div>
            ) : (
              <div className="flex-1 text-gray-500 text-sm">
                Амралтын өдөр
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default WorkingHours;
