// ScheduleContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const ScheduleContext = createContext();

export const ScheduleProvider = ({ children }) => {
  const [schedule, setSchedule] = useState(() => {
    const savedSchedule = localStorage.getItem("schedule");
    return savedSchedule ? JSON.parse(savedSchedule) : [];
  });

  useEffect(() => {
    localStorage.setItem("schedule", JSON.stringify(schedule));
  }, [schedule]);

  const addToSchedule = (tasks) => {
    console.log("Adding tasks to schedule:", tasks);

    if (!Array.isArray(tasks)) {
      console.error("Tasks must be an array");
      return;
    }

    // Filter out invalid tasks
    const validTasks = tasks.filter(task =>
      task &&
      (task.title || task.time) &&
      typeof task === 'object'
    );

    if (validTasks.length === 0) {
      console.warn("No valid tasks to add");
      return;
    }

    setSchedule((prev) => {
      const newSchedule = [...prev, ...validTasks];
      console.log("Updated schedule:", newSchedule);
      return newSchedule;
    });
  };

  const clearSchedule = () => {
    console.log("Clearing schedule");
    setSchedule([]);
  };

  const updateTask = (index, updatedTask) => {
    setSchedule((prev) => {
      const newSchedule = [...prev];
      newSchedule[index] = updatedTask;
      return newSchedule;
    });
  };

  const removeTask = (index) => {
    setSchedule((prev) => prev.filter((_, i) => i !== index));
  };

  console.log("Current schedule in context:", schedule);

  return (
    <ScheduleContext.Provider value={{
      schedule,
      addToSchedule,
      clearSchedule,
      updateTask,
      removeTask
    }}>
      {children}
    </ScheduleContext.Provider>
  );
};

export const useSchedule = () => {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error("useSchedule must be used within a ScheduleProvider");
  }
  return context;
};