import React, { useState, useEffect } from "react";
import HabitForm from "./components/HabitForm";
import HabitCard from "./components/HabitCard";
import "./App.css";

function App() {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = (habitName) => {
    const newHabit = {
      id: Date.now(),
      name: habitName,
      completedDates: [],
    };
    setHabits([newHabit, ...habits]);
  };

  const toggleToday = (id) => {
    const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"

    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id
          ? {
            ...habit,
            completedDates: habit.completedDates.includes(today)
              ? habit.completedDates.filter((d) => d !== today)
              : [...habit.completedDates, today],
          }
          : habit
      )
    );
  };



  const deleteHabit = (id) => {
    setHabits(habits.filter((h) => h.id !== id));
  };

  return (
    <div className="app">
      <h1>✅ Daily Habit Tracker</h1>
      <HabitForm onAdd={addHabit} />
      <div className="habit-list">
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onToggleToday={toggleToday}
            onDelete={deleteHabit}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
