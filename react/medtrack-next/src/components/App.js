
import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import TodaySchedule from './components/TodaySchedule';
import History from './components/History';
import AddMedicationModal from './components/AddMedicationModal';
import './App.css';

function App() {
    const [medications, setMedications] = useState([]);
    const [activeTab, setActiveTab] = useState('today');
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    }, []);


    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();

            setMedications(prevMeds => {
                return prevMeds.map(med => {
                    const [hour, minute] = med.time.split(':').map(Number);
                    const medTime = new Date();
                    medTime.setHours(hour, minute, 0, 0);

                    const fiveMinBefore = new Date(medTime.getTime() - 5 * 60 * 1000);
                    const fiveMinAfter = new Date(medTime.getTime() + 5 * 60 * 1000);

                    if (
                        !med.taken &&
                        !med.notified &&
                        now >= fiveMinBefore &&
                        now <= fiveMinAfter
                    ) {
                        if (Notification.permission === 'granted') {
                            new Notification(`Time to take ${med.name}`, {
                                body: `${med.dosage} · ${med.instructions || 'No special instructions'}`,
                            });
                        }
                        return { ...med, notified: true };
                    }

                    return med;
                });
            });
        }, 60000); // Check every 60 seconds

        return () => clearInterval(interval);
    }, []);


    const handleAddMedication = (newMedication) => {
        setMedications(prev => [...prev, { ...newMedication, taken: false, notified: false }]);
        setShowModal(false);
    };

    const handleMarkAsTaken = (index) => {
        setMedications(prev =>
            prev.map((med, i) => (i === index ? { ...med, taken: true } : med))
        );
    };

    return (
        <div className="App">
            <Dashboard
                onAdd={() => setShowModal(true)}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {activeTab === 'today' && (
                <TodaySchedule
                    medications={medications}
                    onMarkAsTaken={handleMarkAsTaken}
                />
            )}
            {activeTab === 'history' && <History medications={medications} />}

            {showModal && (
                <AddMedicationModal
                    onSave={handleAddMedication}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
}

export default App;
