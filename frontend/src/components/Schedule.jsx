import { useSchedule } from "./ScheduleContext";

const Schedule = () => {
  const { schedule, clearSchedule } = useSchedule();

  // If no schedule is available, show a message
  if (!schedule || schedule.length === 0) {
    return (
      <div className="bg-white border-2 border-[#06D6A0] text-[#073B4C] p-6 rounded-lg w-full h-auto shadow-md">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4 font-poppins">Your Daily Schedule</h2>
          <div className="text-gray-500 py-8">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-lg font-poppins">No tasks scheduled yet.</p>
            <p className="text-sm font-poppins mt-2">Use the AI Daily Planner above to create your schedule!</p>
          </div>
        </div>
      </div>
    );
  }

  // Helper function to remove the stars for bold text
  const removeStars = (text) => {
    if (!text) return "";
    return text.replace(/\*\*(.*?)\*\*/g, "$1"); // Remove **bold** markdown stars
  };

  // Helper function to parse time and sort tasks
  const sortTasksByTime = (tasks) => {
    return tasks.sort((a, b) => {
      const timeA = parseTime(a.time);
      const timeB = parseTime(b.time);
      return timeA - timeB;
    });
  };

  const parseTime = (timeStr) => {
    if (!timeStr) return 0;
    const cleanTime = removeStars(timeStr).trim();
    const timeMatch = cleanTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    
    if (!timeMatch) return 0;
    
    let [, hours, minutes, period] = timeMatch;
    hours = parseInt(hours);
    minutes = parseInt(minutes);
    
    if (period.toUpperCase() === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period.toUpperCase() === 'AM' && hours === 12) {
      hours = 0;
    }
    
    return hours * 60 + minutes;
  };

  const sortedSchedule = sortTasksByTime(schedule);

  return (
    <div>
      {/* Clear Button */}
      <div className="flex justify-end mb-3">
        <button
          onClick={clearSchedule}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-poppins transition-colors flex items-center gap-1"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Clear All
        </button>
      </div>
      
      {/* Tasks List */}
      <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
        {sortedSchedule.map((task, index) => {
          const taskTitle = removeStars(task?.title) || "No Title";
          const taskTime = removeStars(task?.time) || "Time Unavailable";
          const taskColor = task?.color || "#06D6A0";

          return (
            <div
              key={index}
              className="flex items-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border-l-3"
              style={{ borderLeftColor: taskColor, borderLeftWidth: '3px' }}
            >
              <div className="flex-shrink-0 mr-2">
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: taskColor }}
                >
                  {index + 1}
                </div>
              </div>
              
              <div className="flex-grow min-w-0">
                <p className="text-sm font-medium font-poppins text-gray-800 truncate">
                  {taskTitle}
                </p>
                <p className="text-xs font-poppins text-gray-500 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {taskTime}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-xs font-poppins text-gray-600 text-center flex items-center justify-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          {schedule.length} task{schedule.length !== 1 ? 's' : ''} scheduled
        </p>
      </div>
    </div>
  );
};

export default Schedule;