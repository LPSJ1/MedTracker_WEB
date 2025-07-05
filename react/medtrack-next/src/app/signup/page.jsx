"use client"
import {useState, useRef, useEffect} from "react";
import styles from "../login/login.module.css";
import Image from "next/image";
import {useRouter} from "next/navigation";

import {startStarAnimation} from "../login/starMotion";

export default function Signup() {

    const router =useRouter();
    const [form, setForm] =  useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
     password: ""
    })
    const canvasRef= useRef(null);

    useEffect(() => {
        if (typeof startStarAnimation === "function"){
            const cleanup = startStarAnimation(canvasRef.current);
            return cleanup;
        }
    }, []);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value});
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/api/signup", {
            method: "POST",
            headers: {  "Content-Type": "application/json"},
            body: JSON.stringify({
                first_name: form.firstName,
                last_name: form.lastName,
                email: form.email,
                phone_number: form.phone,
                password: form.password
            })
        })
        .then(res=> {
            if (res.ok) {

                router.push("/login");
            } else {
                alert("Signup failed.");
            }
          

        });
    }

    return (
        <div className={styles.container}>
            <canvas ref={canvasRef} className={styles.starCanvas}></canvas>
            <a href="/">
                <Image
                    src="/img_rsrcs/update2.png"
                    alt="pill icon"
                    width={100}
                    height={100}
                    className={styles.topLeftPill}
                />    
            </a>
            <h1 className={styles.heading + "rainbow-glow"}>MedTrack</h1>
            <div className={styles.formContainer}>
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                          id="firstName"
                        name="firstName"
                       value={form.firstName}
                    onChange={handleChange}
                    required
                    />

                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                          id="lastName"
                        name="lastName"
                       value={form.lastName}
                    onChange={handleChange}
                    required
                    />



                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                          id="email"
                        name="email"
                       value={form.email}
                    onChange={handleChange}
                    required
                    />
                    <label htmlFor="phone">Phone Number:</label>
                    <input
                       type="tel"
                         id="phone"
                       name="phone"
                      value={form.phone}
                   onChange={handleChange}
                       required
                    />

                    <label htmlFor ="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        />                    



                    <button type ="submit">Sign Up</button>   
                </form>

            </div>
        </div>
    );

}