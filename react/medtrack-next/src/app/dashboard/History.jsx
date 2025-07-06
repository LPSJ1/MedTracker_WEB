"use client";
import React from "react";
import styles from "./med_dash.module.css";

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

export default function History({ medications }) {
  return (
    <div className={styles.historyContainer}>
      <h2>Medication History</h2>
      <div className={styles.medicationsGrid}>
        {medications.length === 0 ? (
          <p>No medication history available.</p>
        ) : (
          medications.map((med, index) => {
            const status = getStatus(med);
            return (
              <div className={`${styles.medCard} ${styles[status]}`} key={index}>
                <h4>{med.name}</h4>
                <p>
                  <strong>Dosage:</strong> {med.dosage}
                </p>
                <p>
                  <strong>Time:</strong> {med.time}
                </p>
                <p>
                  <strong>Frequency:</strong> {med.frequency}
                </p>
                <p>
                  <strong>Instructions:</strong> {med.instructions || "—"}
                </p>
                <span className={`${styles.statusLabel} ${styles[status]}`}>
                  {getLabel(status)}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}