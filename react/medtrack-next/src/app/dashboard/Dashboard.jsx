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


{/*Browser notifications*/}
useEffect ( () => {
  if (typeof window !== "undefined" && "Notification" in window) {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }
}, []);


{/*To call notification*/}
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
    
    <div className={styles.container} style={{ background: '#111827', minHeight: '100vh', width: '100vw' }}>
      {/* Top bar with logo and auth buttons (not sticky) */}
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.2rem 2.2rem 1.2rem 2.2rem', background: 'rgba(255,255,255,0.95)', borderBottom: '1.5px solid #b2ebf2', boxShadow: '0 2px 12px #b2ebf2' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src="/img_rsrcs/update2.png" alt="Pill Icon" width={40} height={40} className={styles.topLeftPill} />
          <span className={styles.logoText} style={{ color: '#00cfcf', fontSize: '1.7rem', fontWeight: 700, fontFamily: 'Playfair Display,serif', textShadow: '0 2px 8px #b2ebf2' }}>MedTrack</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className={styles.btnAdd} style={{ background: '#00cfff', color: '#fff', fontWeight: 700, fontSize: '1.05rem', padding: '0.5rem 1.2rem', borderRadius: '10px', boxShadow: '0 2px 8px #b2ebf2', border: '1.5px solid #00cfff' }} onClick={() => setShowModal(true)} id="add-medication-btn">+ Add Medication</button>
          {status !== "authenticated" ? (
            <button style={{ background: '#ff3b3b', color: '#fff', border: 'none', borderRadius: '10px', padding: '0.5rem 1.2rem', fontWeight: 700, fontSize: '1.05rem', cursor: 'pointer', boxShadow: '0 2px 8px #ffeaea' }} onClick={() => signIn()}>Sign In</button>
          ) : (
            <button style={{ background: '#fff', color: '#ff3b3b', border: '1.5px solid #ff3b3b', borderRadius: '10px', padding: '0.5rem 1.2rem', fontWeight: 700, fontSize: '1.05rem', cursor: 'pointer', boxShadow: '0 2px 8px #ffeaea' }} onClick={() => signOut()}>Logout</button>
          )}
        </div>
      </div>

      <main className={styles.mainContent}>
        <div className={styles.pageHeader}>
          <h2 style={{ color: '#232946', fontFamily: 'Playfair Display,serif', fontWeight: 800, fontSize: '2.2rem', textShadow: '0 2px 8px #b2ebf2', textAlign: 'center' }}>Medication Tracker</h2>
          <p style={{ color: '#00796b', fontSize: '1.1rem', fontWeight: 500, textAlign: 'center' }}>Keep track of your medications and never miss a dose</p>
        </div>

        <div className={styles.tabs} style={{ background: 'none', border: 'none', justifyContent: 'center', marginBottom: 24, display: 'flex', gap: 16 }}>
          <button
            className={activeTab === "today" ? styles.tabButton : styles.tabLink}
            style={activeTab === "today" ? { background: '#00cfff', color: '#fff', fontWeight: 700, boxShadow: '0 2px 8px #b2ebf2', border: '1.5px solid #00cfff' } : { background: '#e0f7fa', color: '#00897b', fontWeight: 700, border: '1.5px solid #00cfff' }}
            onClick={() => setActiveTab("today")}
            id="today-tab"
          >
            Today's Schedule
          </button>
          <button
            className={activeTab === "history" ? styles.tabButton : styles.tabLink}
            style={activeTab === "history" ? { background: '#00cfff', color: '#fff', fontWeight: 700, boxShadow: '0 2px 8px #b2ebf2', border: '1.5px solid #00cfff' } : { background: '#e0f7fa', color: '#00897b', fontWeight: 700, border: '1.5px solid #00cfff' }}
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

      <footer className={styles.footerQuote} style={{ background: 'rgba(255,255,255,0.95)', color: '#00897b', marginTop: 40, boxShadow: '0 -2px 12px #b2ebf2', fontWeight: 700, fontSize: '1.1rem', textAlign: 'center' }}>
        <p>
          Eat Healthy. Hydrate. Move. Sleep. Smile.
          <br />
          <span style={{ fontWeight: 400, fontSize: '1rem', color: '#00796b' }}>Your health journey matters - stay consistent with your medications</span>
        </p>
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