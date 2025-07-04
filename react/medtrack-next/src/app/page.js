"use client";
import Image from "next/image";
import { useState, useEffect} from "react";
import styles from './page.module.css';
import Link from "next/link";


export default function Home() {




  //fade in effect of the pill
  const [overlayVisible, setOverlayVisible] = useState(true);

  useEffect(() => 
    {
    function hideOverlay() {
      setOverlayVisible(false)
    }

    window.addEventListener("scroll", hideOverlay, {once: true});
    window.addEventListener("click", hideOverlay,  {once: true});
    return () => {
      window.removeEventListener("scroll", hideOverlay);
      window.removeEventListener("click", hideOverlay); 
    };

  }, []);


return (
  <div className={styles.container}>
    {/*button*/}
    <div className={styles.topRight}>
      <Link href="/login" className={styles.loginBtn}>
      Login
      </Link> 
  </div>



  
      
      {/*The intro overlay */}
      {overlayVisible && (
        <div
          id="intro-overlay"
          className={styles.introOverlay}
          style={{
            opacity: overlayVisible ? 1 :0, 
            pointerEvents: overlayVisible ? "auto": "none"
          }}
       >

          <Image
            src="/img_rsrcs/update2.png"
            alt="pill icon"
            width={120}
            height={120}
            className={styles.centerPill}
            priority
          />
        </div>  
    )}
      
    <div className={styles.upperContainer}>
      <h1 className={styles.heading}>MedTrack</h1>
    </div>

    <div className={styles.middleContainer}>
      <Image
        src="/img_rsrcs/wsr_shake.jpg"
        alt="greeting"
        width={350}
        height={350}
        className={styles.greetingImage}
      /> 
      <div className={styles.midText}>
        <p> Your medical assistant</p>
        <p>
          We are devoted to making your recovery journey quick and simple
          <br />
          by providing you with a platform to remind and track your medication intake.
        </p>
        </div>   
      </div>
      </div>  

  );

}
