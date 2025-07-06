"use client";
import React, { useState } from "react";
import TodaySchedule from "./TodaySchedule";
import History from "./History";
import AddMedicationModal from "./AddMedicationModal";
import styles from "./med_dash.module.css";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("today");
  const [showModal, setShowModal] = useState(false);
  const [medications, setMedications] = useState([]);

  const handleAddMedication = (newMed) => {
    setMedications((prev) => [...prev, newMed]);
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoWrapper}>
          <img
            src="/img_rsrcs/update2.png"
            alt="Pill Icon"
            width={48}
            height={48}
            className={styles.topLeftPill}
          />
          <span className={styles.logoText}>MedTrack</span>
        </div>
        <button
          className={styles.btnAdd}
          onClick={() => setShowModal(true)}
          id="add-medication-btn"
        >
          + Add Medication
        </button>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.pageHeader}>
          <h2>Medication Tracker</h2>
          <p>keep track of your medications and never miss a dose</p>
        </div>

        <div className={styles.tabs}>
          <button
            className={activeTab === "today" ? styles.tabButton : styles.tabLink}
            onClick={() => setActiveTab("today")}
            id="today-tab"
          >
            Today's Schedule
          </button>
          <button
            className={activeTab === "history" ? styles.tabButton : styles.tabLink}
            onClick={() => setActiveTab("history")}
            id="history-tab"
          >
            History
          </button>
        </div>

        <div className={styles.content}>
          {activeTab === "today" ? (
            <TodaySchedule
              medications={medications}
              onMarkAsTaken={(idx) => {
                setMedications((meds) =>
                  meds.map((med, i) =>
                    i === idx ? { ...med, taken: true } : med
                  )
                );
              }}
            />
          ) : (
            <History medications={medications} />
          )}
        </div>
      </main>

     {/* <div className={styles.medSticker}>
        <img
          className={styles.sticker}
          src="/img_rsrcs/sticker.jpeg"
          alt="sticker"
        />
      </div> */}

      <footer className={styles.footerQuote}>
        <p>Eat Healthy. Hydrate. Move. Sleep. Smile</p>
      </footer>

      {showModal && (
        <AddMedicationModal
          onClose={() => setShowModal(false)}
          onSave={handleAddMedication}
        />
      )}
    </div>
  );
}