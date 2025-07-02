import React from "react";

const HabitCard = ({ habit, onToggleToday, onDelete }) => {
    const today = new Date().toLocaleDateString();
    const isDoneToday = habit.completedDates.includes(today);

    const getStreak = () => {
        const dateSet = new Set(habit.completedDates);
        let streak = 0;

        const checkDate = new Date();

        while (true) {
            const dateStr = checkDate.toISOString().split("T")[0];

            if (dateSet.has(dateStr)) {
                streak++;
                checkDate.setDate(checkDate.getDate() - 1);
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
