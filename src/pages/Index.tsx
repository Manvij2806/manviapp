import ClockWidget from '@/components/ClockWidget';
import WeatherWidget from '@/components/WeatherWidget';
import TimetableWidget from '@/components/TimetableWidget';
import TodoWidget from '@/components/TodoWidget';

const Index = () => {
  return (
    <div className="w-[480px] h-[320px] bg-background p-2 overflow-hidden mx-auto">
      <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
        {/* Top Left - Clock */}
        <div className="col-span-1 row-span-1">
          <ClockWidget />
        </div>
        
        {/* Top Right - Weather */}
        <div className="col-span-1 row-span-1">
          <WeatherWidget />
        </div>
        
        {/* Bottom Left - Timetable */}
        <div className="col-span-1 row-span-1">
          <TimetableWidget />
        </div>
        
        {/* Bottom Right - Todo */}
        <div className="col-span-1 row-span-1">
          <TodoWidget />
        </div>
      </div>
    </div>
  );
};

export default Index;
