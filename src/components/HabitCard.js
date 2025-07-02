import React from "react";

const HabitCard = ({ habit, onToggleToday, onDelete }) => {
    const today = new Date().toLocaleDateString();
    const isDoneToday = habit.completedDates.includes(today);

    const getStreak = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const dates = habit.completedDates
            .map(dateStr => {
                const d = new Date(dateStr);
                d.setHours(0, 0, 0, 0); // Normalize time
                return d;
            })
            .sort((a, b) => b - a);

        let streak = 0;
        let day = new Date();
        day.setHours(0, 0, 0, 0);

        for (let i = 0; i < dates.length; i++) {
            if (dates[i].getTime() === day.getTime()) {
                streak++;
                day.setDate(day.getDate() - 1); // Move to previous day
            } else {
                break;
            }
        }

        return streak;
    };


    return (
        <div className={`habit-card ${isDoneToday ? "done" : ""}`}>
            <h3>{habit.name}</h3>
            <p>Streak: {getStreak()} 🔥</p>
            <button onClick={() => onToggleToday(habit.id)}>
                {isDoneToday ? "Undo Today" : "Mark as Done Today"}
            </button>
            <button className="delete-btn" onClick={() => onDelete(habit.id)}>
                ❌ Delete
            </button>
        </div>
    );
};

export default HabitCard;
