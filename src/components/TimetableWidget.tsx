import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

type Period = {
  time: string;
  subject: string;
  room?: string;
};

type DaySchedule = {
  [key: string]: Period[];
};

const schedule: DaySchedule = {
  MON: [
    { time: '7:00', subject: 'SOFT DEG KSRI', room: 'TC EX HALL' },
    { time: '7:55', subject: 'SOFT DEG KSRI', room: 'TC EX HALL' },
    { time: '8:50', subject: 'PS1 RK', room: 'TC LT3' },
    { time: '10:30', subject: 'MP GSB', room: 'SOE H1' },
    { time: '11:25', subject: 'ELE MAT', room: 'SOE H1' },
    { time: '12:20', subject: 'CEC (G+E)', room: 'Sc HALL' },
    { time: '1:15', subject: 'MATHS', room: 'Sc HALL' },
    { time: '2:10', subject: 'DIG DESG', room: 'SOE R8' },
    { time: '3:05', subject: 'DIG DESG', room: 'SOE R8' },
  ],
  TUE: [
    { time: '7:00', subject: 'COM ENG', room: 'PDG EDU HALL' },
    { time: '7:55', subject: 'ELE MAT', room: 'TC LT3' },
    { time: '8:50', subject: 'PS1 RK', room: 'TC LT3' },
    { time: '10:30', subject: 'MP LAB GSB (B)' },
    { time: '11:25', subject: 'DETD' },
    { time: '12:20', subject: 'CEC (B)', room: 'R1; A+F AH' },
    { time: '1:15', subject: 'MATHS', room: 'Sc HALL' },
    { time: '2:10', subject: 'ELEC DEG MMA', room: 'SC HALL' },
    { time: '3:05', subject: 'ELEC DEG MMA', room: 'SC HALL' },
  ],
  WED: [
    { time: '7:00', subject: 'PS 1 LAB (G)RJK', room: 'COM LAB PDG' },
    { time: '7:55', subject: 'SYS LAB ACK', room: 'SB LT1' },
    { time: '8:50', subject: 'DAA ACK SB LT3', room: 'PE SUB SB LT2' },
    { time: '11:25', subject: 'DETD' },
    { time: '12:20', subject: 'PE LAB', room: 'SU (B) VLSI LAB GFR' },
    { time: '1:15', subject: 'ADV PROG LAB (B)' },
    { time: '2:10', subject: 'DIG DESG' },
    { time: '3:05', subject: 'DIG DESG', room: 'SOE R8' },
    { time: '4:00', subject: 'CG SC HALL' },
  ],
  THU: [
    { time: '7:00', subject: 'MP LAB GSB (G)' },
    { time: '8:50', subject: 'DAA ACK SB LT3', room: 'PE SUB SB LT2' },
    { time: '10:30', subject: 'MATHS', room: 'SOE H1' },
    { time: '11:25', subject: 'MP GSB', room: 'SOE H1' },
    { time: '12:20', subject: 'ELE MAT', room: 'SOE H1' },
    { time: '2:10', subject: 'SOFT DEG KSRI', room: 'EDU R53' },
    { time: '3:05', subject: 'SOFT DEG KSRI', room: 'DIG DESG' },
    { time: '4:00', subject: 'SP LECTURE' },
  ],
  FRI: [
    { time: '7:00', subject: 'COM ENG', room: 'PDG EDU HALL' },
    { time: '8:50', subject: 'DAA ACK SBSH', room: 'PE SU TC LT3' },
    { time: '10:30', subject: 'MP GSB', room: 'EDU R53' },
    { time: '11:25', subject: 'ELE MAT', room: 'EDU R53' },
    { time: '12:20', subject: 'STREAM SEMINAR', room: 'RJK GSB KSRI' },
    { time: '2:10', subject: 'SOE R8' },
    { time: '3:05', subject: 'SOE R8' },
  ],
  SAT: [
    { time: '7:00', subject: 'ADV PROG LAB', room: 'ACK SB LT3' },
    { time: '7:55', subject: 'PE LAB (G) SUB', room: 'VLSI LAB (G) GFR' },
    { time: '8:50', subject: 'PS1 RK', room: 'TC LT3' },
    { time: '10:30', subject: 'PS LAB (B) SUB', room: 'COM LAB (B) PDG' },
    { time: '12:20', subject: 'SOFT DEG', room: 'KSRI EDU R53' },
    { time: '3:05', subject: 'ELEC DEG MMA', room: 'AR BR2' },
  ],
  SUN: [],
};

const TimetableWidget = () => {
  const [currentDay, setCurrentDay] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    setCurrentDay(days[new Date().getDay()]);
    
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const todaySchedule = schedule[currentDay] || [];

  const isCurrentPeriod = (periodTime: string) => {
    const [hours, minutes] = periodTime.split(':').map(Number);
    const periodStart = hours * 60 + minutes;
    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    return currentMinutes >= periodStart && currentMinutes < periodStart + 55;
  };

  const getNextPeriod = () => {
    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    return todaySchedule.find(period => {
      const [hours, minutes] = period.time.split(':').map(Number);
      return hours * 60 + minutes > currentMinutes;
    });
  };

  const nextPeriod = getNextPeriod();

  return (
    <div className="dashboard-card h-full flex flex-col overflow-hidden">
      <div className="card-header flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3 text-schedule" />
          <span>VI SEM ELECTRICAL</span>
        </div>
        <span className="text-primary font-bold">{currentDay}</span>
      </div>

      {todaySchedule.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
          No classes today
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-0.5 pr-1 scrollbar-thin">
          {todaySchedule.map((period, index) => (
            <div
              key={index}
              className={`schedule-item animate-fade-in ${
                isCurrentPeriod(period.time) ? 'schedule-current' : ''
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex justify-between items-start">
                <span className="font-mono text-[8px] text-muted-foreground w-10">
                  {period.time}
                </span>
                <div className="flex-1 text-right">
                  <div className="text-foreground font-medium truncate">
                    {period.subject}
                  </div>
                  {period.room && (
                    <div className="text-[8px] text-muted-foreground truncate">
                      {period.room}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {nextPeriod && (
        <div className="mt-1 pt-1 border-t border-border">
          <div className="text-[8px] text-muted-foreground">NEXT:</div>
          <div className="text-[10px] text-primary font-medium truncate">
            {nextPeriod.time} - {nextPeriod.subject}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimetableWidget;
