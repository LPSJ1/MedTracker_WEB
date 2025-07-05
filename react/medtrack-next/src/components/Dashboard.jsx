// src/components/Dashboard.jsx
import React, { useState, useEffect}  from 'react';
import TodaySchedule from "./TodaySchedule";
import History from "./History";
import AddMedicationModal from "./AddMedicationModal";
import '../med_dash.css';
import logo from '../img_rsrcs/TakeMeds1.jpeg';
import sticker from '../img_rsrcs/sticker.jpeg';

function Dashboard() {
    const [activeTab, setActiveTab]= useState("today");
    const [showModal, setShowModal] = useState(false);
    const [medications, setMedications] = useState([]);

    const handleAddMedication = (newMed) => {
        setMedications([...medications, newMed]);
        setShowModal(false);
    }

    return (
        <div>
            <header>
                <div className="logo-wrapper">
                    <h1>MedTracker</h1>
                    <img className="TakeMeds1" src={logo} alt="TakeMeds1" />
                </div>
                <button className="btn-add" onClick={() => setShowModal(true)}id="add-medication-btn">+ Add Medication</button>
            </header>

            <div className="container">
                <div className="med-sticker">
                    <img className="sticker" src={sticker} alt="sticker" />
                </div>

                <div className="page-header">
                    <h2>Medication Tracker</h2>
                    <p>keep track of your medications and never miss a dose</p>
                </div>

                <div className="tabs">
                    <button
                        className={activeTab === "today" ? "tab-button": "tab-link"}
                        onClick={() => setActiveTab("today")} id="today-tab"> Today's Schedule</button>

                    <button
                        className={activeTab === "history" ? "tab-button" : "tab-link"}
                        onClick={() => setActiveTab("history")} id="history-tab">History</button>
                </div>

                <div id="content">
                    {activeTab === "today" ?
                        <TodaySchedule medications={medications} /> : <History medications={medications} />}

                </div>
            </div>
            <footer className="footer-quote">
                <p>Eat Healthy. Hydrate. Move. Sleep. Smile</p>
            </footer>


            {showModal && (
                <AddMedicationModal
                    onClose={() => setShowModal(false)}
                    onSave={(med) => {
                        setMedications(prev =>[...prev, med]);
                        setShowModal(false);
                    }}
                />
            )}
        </div>
    );
}

export default Dashboard;
