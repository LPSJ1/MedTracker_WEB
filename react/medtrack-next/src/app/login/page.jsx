"use client";
import {useState, useRef, useEffect} from "react";
import styles from "./login.module.css";
import Image from "next/image";
import {useRouter} from "next/navigation";
import { startStarAnimation } from "./starMotion";

export default function Login() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const canvasRef = useRef(null);

    useEffect(() => {
        const cleanup = startStarAnimation(canvasRef.current);
        return cleanup;
    },  []);
  
    function handleSubmit(e) {
        e.preventDefault();

        router.push("/dashboard");
    }

    return (
        <div className={styles.container}>
            <canvas ref={canvasRef} className={styles.starCanvas}></canvas>
          {/*top left pill*/}
          <a href="/">
            <Image
              src="/img_rscrs/update2.png"
              alt="pill icon"
              width={100}
              height={100}
              className={styles.topLeftPill}
            />    
          </a>
          
          
            <h1 className={styles.heading}>MedTrack</h1>
          
        <div className={styles.formContainer}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                <p>
                   Don't have an account? <br />
                    <a href="/signup">Sign up</a>
                </p>


                </form>
        </div>

        </div>
    )

}