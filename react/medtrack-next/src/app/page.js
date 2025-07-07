// src/app/page.jsx

"use client"; // This is essential for client-side interactivity



import styles from './page.module.css';

export default function Home() {
  // Navigation handlers
  const handleLogin = () => {
    window.location.href = '/login';
  };
  const handleSignUp = () => {
    window.location.href = '/signup';
  };

  return (
    <div className={styles.container}>
      {/* Top left logo */}
      <div style={{ position: 'absolute', top: 18, left: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
        <img src="/img_rsrcs/update2.png" alt="MedTracker logo" style={{ width: 28, height: 28, marginRight: 6 }} />
        <span style={{ color: '#00cfcf', fontWeight: 700, fontSize: 18, fontFamily: 'Playfair Display,serif' }}>MedTracker</span>
      </div>

      {/* Rainbow heading */}
      <div className={styles.upperContainer} style={{ background: 'transparent', marginTop: 30, flexDirection: 'column', alignItems: 'center', border: 'none', boxShadow: 'none' }}>
        <h1 className={styles.heading} style={{ marginBottom: 0 }}>MedTrack</h1>
        <div style={{ color: '#fff', fontWeight: 400, fontSize: '1.2rem', marginTop: '-10px', letterSpacing: '0.02em' }}>✧ Your Health Journey Simplified ✧</div>
      </div>

      {/* Features Card */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
        <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 20, boxShadow: '0 4px 32px rgba(0,0,0,0.08)', padding: '40px 32px', maxWidth: 900, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ color: '#232946', fontWeight: 800, fontSize: '2rem', marginBottom: 10 }}>Never Miss Another Dose Again</h2>
          <p style={{ color: '#232946', fontSize: '1.1rem', maxWidth: 700, marginBottom: 32 }}>Take control of your health with intelligent medication management. MedTracker helps you stay consistent, safe, and informed about your medications—so you can focus on feeling your best.</p>
          <div style={{ display: 'flex', gap: 60, marginBottom: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', minWidth: 160 }}>
              <div style={{ fontSize: '2.2rem', color: '#00cfff', marginBottom: 8 }}>🔔</div>
              <div style={{ fontWeight: 700, color: '#232946' }}>Smart Reminders</div>
              <div style={{ fontSize: '0.98rem', color: '#232946' }}>Personalized notifications that adapt to your schedule and ensure you never forget a dose.</div>
            </div>
            <div style={{ textAlign: 'center', minWidth: 160 }}>
              <div style={{ fontSize: '2.2rem', color: '#7928ca', marginBottom: 8 }}>📊</div>
              <div style={{ fontWeight: 700, color: '#232946' }}>Progress Tracking</div>
              <div style={{ fontSize: '0.98rem', color: '#232946' }}>Visual insights into your medication adherence and health improvements over time.</div>
            </div>
            <div style={{ textAlign: 'center', minWidth: 160 }}>
              <div style={{ fontSize: '2.2rem', color: '#ff3b3b', marginBottom: 8 }}>🛡️</div>
              <div style={{ fontWeight: 700, color: '#232946' }}>Safety First</div>
              <div style={{ fontSize: '0.98rem', color: '#232946' }}>Drug interaction alerts and dosage tracking to keep you safe and informed.</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 10 }}>
            <button className={styles.loginBtn} style={{ background: '#ff3b3b', fontWeight: 700 }} onClick={handleSignUp}>Start Free Today</button>
            <button className={styles.loginBtn} style={{ background: '#e6f7fa', color: '#00cfff', fontWeight: 700, border: '1.5px solid #00cfff' }} onClick={handleLogin}>Already Have Account? Login</button>
          </div>
        </div>
      </div>

      {/* How MedTracker Works */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 36 }}>
        <div style={{ background: 'linear-gradient(90deg, #e0ffe6 0%, #e6f7fa 100%)', borderRadius: 20, boxShadow: '0 4px 32px rgba(0,0,0,0.04)', padding: '32px 24px', maxWidth: 900, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ color: '#232946', fontWeight: 800, fontSize: '1.5rem', marginBottom: 18 }}>How MedTracker Works</h2>
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', minWidth: 180 }}>
              <div style={{ fontSize: '1.7rem', color: '#00cfff', fontWeight: 700, marginBottom: 6 }}>1</div>
              <div style={{ fontWeight: 700, color: '#232946' }}>Add Your Medications</div>
              <div style={{ fontSize: '0.98rem', color: '#232946' }}>Simply input your prescriptions, dosages, and schedules. Our system handles the rest.</div>
            </div>
            <div style={{ textAlign: 'center', minWidth: 180 }}>
              <div style={{ fontSize: '1.7rem', color: '#7928ca', fontWeight: 700, marginBottom: 6 }}>2</div>
              <div style={{ fontWeight: 700, color: '#232946' }}>Get Smart Reminders</div>
              <div style={{ fontSize: '0.98rem', color: '#232946' }}>Receive timely notifications across all your devices, customized to your preferences.</div>
            </div>
            <div style={{ textAlign: 'center', minWidth: 180 }}>
              <div style={{ fontSize: '1.7rem', color: '#ff3b3b', fontWeight: 700, marginBottom: 6 }}>3</div>
              <div style={{ fontWeight: 700, color: '#232946' }}>Track Your Progress</div>
              <div style={{ fontSize: '0.98rem', color: '#232946' }}>Monitor your adherence, view health trends, and share reports with your healthcare team.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose MedTracker */}
      <div style={{ marginTop: 60, textAlign: 'center' }}>
        <h2 style={{ color: '#fff', fontWeight: 800, fontSize: '1.5rem', marginBottom: 30 }}>Why Choose MedTracker?</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 60, flexWrap: 'wrap', marginBottom: 30 }}>
          <div style={{ minWidth: 180 }}>
            <div style={{ fontSize: '2rem', color: '#00cfff' }}>⏰</div>
            <div style={{ fontWeight: 700, color: '#fff' }}>Save Time</div>
            <div style={{ fontSize: '0.98rem', color: '#e6f7fa' }}>Automate your medication routine and focus on what matters most.</div>
          </div>
          <div style={{ minWidth: 180 }}>
            <div style={{ fontSize: '2rem', color: '#ff3b3b' }}>❤️</div>
            <div style={{ fontWeight: 700, color: '#fff' }}>Improve Health</div>
            <div style={{ fontSize: '0.98rem', color: '#e6f7fa' }}>Better adherence leads to better health outcomes and quality of life.</div>
          </div>
          <div style={{ minWidth: 180 }}>
            <div style={{ fontSize: '2rem', color: '#7928ca' }}>📅</div>
            <div style={{ fontWeight: 700, color: '#fff' }}>Stay Organized</div>
            <div style={{ fontSize: '0.98rem', color: '#e6f7fa' }}>Keep all your health information in one secure, easy-to-access place.</div>
          </div>
          <div style={{ minWidth: 180 }}>
            <div style={{ fontSize: '2rem', color: '#00cfff' }}>🛡️</div>
            <div style={{ fontWeight: 700, color: '#fff' }}>Peace of Mind</div>
            <div style={{ fontSize: '0.98rem', color: '#e6f7fa' }}>Know that you’re taking the right medications at the right time, every time.</div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20, marginBottom: 40 }}>
        <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 16, boxShadow: '0 4px 32px rgba(0,0,0,0.08)', padding: '32px 24px', maxWidth: 400, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ color: '#232946', fontWeight: 800, fontSize: '1.2rem', marginBottom: 10, textAlign: 'center' }}>Ready to Transform Your Health?</div>
          <div style={{ color: '#232946', fontSize: '1rem', marginBottom: 18, textAlign: 'center' }}>Join thousands who trust MedTracker with their medication management.</div>
          <button className={styles.loginBtn} style={{ background: '#ff3b3b', fontWeight: 700, width: '100%', fontSize: '1.1rem', marginBottom: 8 }} onClick={handleSignUp}>Get Started Free</button>
          <div style={{ fontSize: '0.9rem', color: '#888', textAlign: 'center' }}>No credit card required · Free forever plan available</div>
        </div>
      </div>

      <footer style={{ textAlign: 'center', color: '#e6f7fa', fontSize: '0.95rem', marginBottom: 18, letterSpacing: '0.04em' }}>© ALL RIGHTS RESERVED</footer>
    </div>
  );
}