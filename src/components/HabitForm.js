import React, { useState } from "react";

const HabitForm = ({ onAdd }) => {
  const [habit, setHabit] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (habit.trim()) {
      onAdd(habit.trim());
      setHabit("");
    }
  };

  return (
    <form className="habit-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a habit (e.g., Drink Water)"
        value={habit}
        onChange={(e) => setHabit(e.target.value)}
      />
      <button type="submit">Add Habit</button>
    </form>
  );
};

export default HabitForm;
