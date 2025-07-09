"use client";
import React, { useState, useEffect } from "react";
import TodaySchedule from "./TodaySchedule";
import History from "./History";
import AddMedicationModal from "./AddMedicationModal";
import styles from "./med_dash.module.css";
import { useSession } from "next-auth/react";
import {signIn, signOut} from "next-auth/react";


export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("today");
  const [showModal, setShowModal] = useState(false);
  const [medications, setMedications] = useState([]);
  const {data: session, status} = useSession();


  console.log("Session:", session, "Status:", status);
  useEffect(() => {
    console.log("Medications array:", medications);
    medications.forEach((med, idx) => {
      console.log(`Medicatoin ${idx}:`, med);
    });
  }, [medications]);



// Browser notifications
useEffect(() => {
  if (typeof window !== "undefined" && "Notification" in window) {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }
}, []);


// To call notification
function notifyMedication(medName) {
  console.log("Trying to notify for:", medName);
  console.log("Notification permission:", Notification.permission);
  if (typeof window !== "undefined" && Notification.permission === "granted") {
    new Notification(`Time to take your medication: ${medName}`);
  }
}

useEffect(() =>{
  if (!session?.user?.email) return;
  fetch("/api/medications", {
    headers: {"x-user-email": session.user.email}
  })
   .then(res => res.json())
   .then(data => setMedications(data));
}, [session]);



useEffect(() => {
  if (!medications.length) return;

  const interval = setInterval(() => {
    const now = new Date();
    medications.forEach((med) => {
      if (!med.taken && med.time) {
        const [hour, minute] = med.time.split(":").map(Number);
        const medDate = new Date(now);
        medDate.setHours(hour, minute, 0, 0);

        const diff = Math.abs(medDate.getTime() - now.getTime());
        console.log(
          `Checking med: ${med.name}, medDate: ${medDate.toLocaleTimeString()}, now: ${now.toLocaleTimeString()}, diff(ms): ${diff}`
        );

        if (diff < 60 * 1000) {
          console.log("Triggering notification for:", med.name);
          notifyMedication(med.name);
        }
      }
    });
  }, 60000); // Check every 60 seconds

  // Run once immediately as well
  const now = new Date();
  medications.forEach((med) => {
    if (!med.taken && med.time) {
      const [hour, minute] = med.time.split(":").map(Number);
      const medDate = new Date(now);
      medDate.setHours(hour, minute, 0, 0);

      const diff = Math.abs(medDate.getTime() - now.getTime());
      if (diff < 60 * 1000) {
        notifyMedication(med.name);
      }
    }
  });

  return () => clearInterval(interval);
}, [medications]);




  const handleAddMedication = async (newMed) => {
    if (!session?.user?.email) {
      alert("You must be logged in to add medications.");
      return;
    }
    const userEmail = session.user.email;

    const res = await fetch("/api/medications", {
      method:"POST",
      headers: {
        "Content-Type" : "application/json",
        "x-user-email" : userEmail,
      },
      body: JSON.stringify(newMed),
    });

    if (res.ok) {
      const savedMed = await res.json();
      setMedications((prev) => [...prev, savedMed]);
      setShowModal(false);
    } else {
      alert("Failed to add medication.")
    }
  };

  return (
    
    <div className={styles.container}>


    <div style={{ position: "absolute", top: 10, right: 10 }}>
      {status !== "authenticated" ? (
        <button onClick={() => signIn()}>Sign In</button>
      ) : (
        <button onClick={() => signOut()}>Sign Out</button>
      )}
    </div>


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

        {/* Notif button */}
        <button onClick={() => notifyMedication("Panadol")}> 
          Test Medication Notification
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