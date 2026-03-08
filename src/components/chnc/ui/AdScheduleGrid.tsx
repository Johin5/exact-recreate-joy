import { useState, useEffect } from 'react';

const HOURS = 24;
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIME_LABELS = [
  { label: '12am', hour: 0 },
  { label: '3am', hour: 3 },
  { label: '6am', hour: 6 },
  { label: '9am', hour: 9 },
  { label: '12pm', hour: 12 },
  { label: '3pm', hour: 15 },
  { label: '6pm', hour: 18 },
  { label: '9pm', hour: 21 },
];

export default function AdScheduleGrid() {
  const [schedule, setSchedule] = useState<boolean[][]>(
    Array(7).fill(null).map(() => Array(HOURS).fill(false))
  );
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartValue, setDragStartValue] = useState(false);

  useEffect(() => {
    const newSchedule = Array(7).fill(null).map(() => Array(HOURS).fill(false));
    for (let d = 0; d < 7; d++) {
      for (let h = 9; h < 22; h++) {
        newSchedule[d][h] = true;
      }
    }
    setSchedule(newSchedule);
  }, []);

  const toggleCell = (dayIndex: number, hourIndex: number, forceValue?: boolean) => {
    setSchedule(prev => {
      const newSchedule = prev.map(row => [...row]);
      const newValue = forceValue !== undefined ? forceValue : !newSchedule[dayIndex][hourIndex];
      newSchedule[dayIndex][hourIndex] = newValue;
      return newSchedule;
    });
  };

  const handleMouseDown = (dayIndex: number, hourIndex: number) => {
    setIsDragging(true);
    const newValue = !schedule[dayIndex][hourIndex];
    setDragStartValue(newValue);
    toggleCell(dayIndex, hourIndex, newValue);
  };

  const handleMouseEnter = (dayIndex: number, hourIndex: number) => {
    if (isDragging) {
      toggleCell(dayIndex, hourIndex, dragStartValue);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleEveryDayClick = (hourIndex: number) => {
    const allSelected = schedule.every(day => day[hourIndex]);
    const newValue = !allSelected;
    setSchedule(prev => {
      const newSchedule = prev.map(row => {
        const newRow = [...row];
        newRow[hourIndex] = newValue;
        return newRow;
      });
      return newSchedule;
    });
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, []);

  return (
    <div className="mt-4 select-none">
      <div className="flex mb-2">
        <div className="w-24 shrink-0"></div>
        <div className="flex-1 relative h-6">
          {TIME_LABELS.map(({ label, hour }) => (
            <div
              key={hour}
              className="absolute text-xs text-gray-500 transform -translate-x-1/2"
              style={{ left: `${(hour / 24) * 100}%` }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      <div className="border border-gray-200 rounded-sm overflow-hidden">
        {DAYS.map((day, dayIndex) => (
          <div key={day} className="flex border-b border-gray-100 last:border-0 h-8">
            <div className="w-24 shrink-0 flex items-center justify-end pr-4 text-xs text-gray-600 font-sans bg-gray-50 border-r border-gray-100">
              {day}
            </div>
            <div className="flex-1 flex">
              {Array.from({ length: HOURS }).map((_, hourIndex) => (
                <div
                  key={hourIndex}
                  className={`flex-1 border-r border-gray-100 last:border-0 cursor-pointer transition-colors duration-75
                    ${schedule[dayIndex][hourIndex] ? 'bg-[#34CC32]' : 'bg-white hover:bg-gray-50'}
                  `}
                  onMouseDown={() => handleMouseDown(dayIndex, hourIndex)}
                  onMouseEnter={() => handleMouseEnter(dayIndex, hourIndex)}
                />
              ))}
            </div>
          </div>
        ))}

        <div className="flex h-8 border-t border-gray-200">
          <div className="w-24 shrink-0 flex items-center justify-end pr-4 text-xs font-bold text-gray-700 font-sans bg-gray-50 border-r border-gray-100">
            Every day
          </div>
          <div className="flex-1 flex">
            {Array.from({ length: HOURS }).map((_, hourIndex) => {
              const allSelected = schedule.every(day => day[hourIndex]);
              return (
                <div
                  key={hourIndex}
                  className={`flex-1 border-r border-gray-100 last:border-0 cursor-pointer transition-colors duration-75
                    ${allSelected ? 'bg-[#34CC32]/50' : 'bg-white hover:bg-gray-50'}
                  `}
                  onClick={() => handleEveryDayClick(hourIndex)}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-3">
        <div className="w-4 h-4 bg-[#34CC32] rounded-sm"></div>
        <span className="text-xs text-gray-600 font-sans">Scheduled hours</span>
      </div>
    </div>
  );
}
