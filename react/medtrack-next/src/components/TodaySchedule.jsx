// src/components/TodaySchedule.jsx
import React from "react";
import "./TodaySchedule.css";

const getStatus = (med) => {
    if (med.taken) return "taken";

    const [hour, minute] = med.time.split(":").map(Number);
    const medTime = new Date();
    medTime.setHours(hour, minute, 0, 0);

    const now = new Date();
    const fiveMinutesAfter = new Date(medTime.getTime() + 5 * 60000);

    if (now > fiveMinutesAfter) return "missed";
    return "upcoming";
};

const getLabel = (status) => {
    if (status === "taken") return "✓ Taken";
    if (status === "missed") return "✗ Missed";
    return "⏳ Upcoming";
};

const TodaySchedule = ({ medications, onMarkAsTaken }) => {
    return (
        <div className="today-container">
            <h2>Today's Medications</h2>
            <div className="medications-grid">
                {medications.length === 0 ? (
                    <p>No medications scheduled for today.</p>
                ) : (
                    medications.map((med, index) => {
                        const status = getStatus(med);
                        return (
                            <div className={`med-card ${status}`} key={index}>
                                <h4>{med.name}</h4>
                                <p><strong>Dosage:</strong> {med.dosage}</p>
                                <p><strong>Time:</strong> {med.time}</p>
                                <p><strong>Frequency:</strong> {med.frequency}</p>
                                <p><strong>Instructions:</strong> {med.instructions || '—'}</p>

                                <div className="med-footer">
                  <span className={`status-label ${status}`}>
                    {getLabel(status)}
                  </span>

                                    {status === "upcoming" && !med.taken && (
                                        <button
                                            className="mark-taken-btn"
                                            onClick={() => onMarkAsTaken(index)}
                                        >
                                            Mark as Taken
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default TodaySchedule;
