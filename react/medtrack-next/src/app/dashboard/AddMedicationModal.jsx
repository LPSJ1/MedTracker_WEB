"use client";
import React, { useState, useEffect } from "react";
import styles from "./AddMedicationModal.module.css";

function AddMedicationModal({ onClose, onSave }) {
    const [name, setName] = useState("");
    const [dosage, setDosage] = useState("");
    const [frequency, setFrequency] = useState("");
    const [time, setTime] = useState("");
    const [instructions, setInstructions] = useState("");

    // Prevent background scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMedication = { name, dosage, frequency, time, instructions };
        onSave(newMedication);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent} role="dialog" aria-modal="true">
                <button className={styles.close} onClick={onClose} aria-label="Close">&times;</button>
                <h2>Add New Medication</h2>
                <form onSubmit={handleSubmit} className={styles.medicationForm}>
                    <label>
                        Medication Name
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g Panadol"
                            required
                        />
                    </label>
                    <label>
                        Dosage
                        <input
                            type="text"
                            value={dosage}
                            onChange={(e) => setDosage(e.target.value)}
                            placeholder="e.g. 1 tablet"
                            required
                        />
                    </label>
                    <label>
                        Frequency
                        <input
                            type="text"
                            value={frequency}
                            onChange={(e) => setFrequency(e.target.value)}
                            placeholder="e.g. Daily"
                            required
                        />
                    </label>
                    <label>
                        Time
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Special Instructions
                        <textarea
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            placeholder="e.g. Take after food"
                        />
                    </label>
                    <button type="submit" className={styles.btnAdd}>Save Medication</button>
                </form>
            </div>
        </div>
    );
}

export default AddMedicationModal;