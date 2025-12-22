import { useState, useEffect } from 'react';

const ClockWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  
  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  return (
    <div className="dashboard-card h-full flex flex-col justify-center">
      <div className="card-header flex items-center gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-time animate-pulse-glow" />
        CURRENT TIME
      </div>
      <div className="flex items-baseline gap-1">
        <span className="time-display text-4xl glow-time">{hours}</span>
        <span className="time-display text-4xl glow-time animate-pulse-glow">:</span>
        <span className="time-display text-4xl glow-time">{minutes}</span>
        <span className="time-display text-xl text-time/60 ml-1">{seconds}</span>
      </div>
      <div className="flex gap-2 mt-1 text-[11px] text-muted-foreground font-medium">
        <span className="text-primary">{dayNames[time.getDay()]}</span>
        <span>{time.getDate()} {monthNames[time.getMonth()]} {time.getFullYear()}</span>
      </div>
    </div>
  );
};

export default ClockWidget;
