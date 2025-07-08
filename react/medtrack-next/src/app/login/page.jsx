"use client";
import {useState, useRef, useEffect} from "react";
import styles from "../login/login.module.css";
import Image from "next/image";
import {useRouter} from "next/navigation";
import { startStarAnimation } from "./starMotion";
import Link from "next/link";
import {signIn} from "next-auth/react";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const canvasRef = useRef(null);

    useEffect(() => {
        const cleanup = startStarAnimation(canvasRef.current);
        return cleanup;
    },  []);
  
    async function handleSubmit(e) {
        e.preventDefault();

        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
            
        });
            if (result.ok) {
                router.push("/dashboard"); 
            } else {
                alert("Failed Login.check your credentials.");
            }
        }
    

    return (
        <div className={styles.container}>
            <canvas ref={canvasRef} className={styles.starCanvas}></canvas>
          {/*top left pill*/}
          <a href="/">
            <Image
              src="/img_rsrcs/update2.png"
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
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
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
                    <Link href="/signup">Sign up</Link>
                </p>


                </form>
        </div>

        </div>
    )
}
