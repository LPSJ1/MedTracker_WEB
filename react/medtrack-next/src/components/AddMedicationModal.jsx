import React, { useState } from "react";
import './AddMedicationModal.css';

function AddMedicationModal({ onClose, onSave}){
    const[name, setName] = useState("");
    const [dosage, setDosage] = useState("");
    const[frequency, setFrequency] = useState("");
    const[time, setTime] = useState("");
    const[instructions, setInstructions] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMedication = { name, dosage, frequency, time, instructions };
        onSave(newMedication);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close" onClick={onClose}>×</span>
                <h2>Add New Medication</h2>
                <form onSubmit={handleSubmit} className="medication-form">
                    <label>Medication Name
                        <input
                            type="text"
                            value={name} onChange={(e) => setName(e.target.value)}
                            placeholder="e.g Panadol"
                            required />
                    </label>

                    <label>Dosage
                        <input
                            type="text"
                            value={dosage}
                            onChange={(e) => setDosage(e.target.value)}
                            placeholder="e.g. 1 tablet"
                            required />
                    </label>

                    <label>Frequency
                        <input type="text"
                               value={frequency}
                               onChange={(e) => setFrequency(e.target.value)}
                               placeholder="e.g. Daily"
                               required />
                    </label>

                    <label>Time
                        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                    </label>

                    <label>Special Instructions
                        <textarea
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            placeholder="e.g. Take after food" />
                    </label>
                    <button type="submit" className="btn-add">Save Medication</button>
                </form>
            </div>
        </div>
    );
};

export default AddMedicationModal;