import React, { useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user"); // Default role
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        try {
            // Step 1: Create User in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Step 3: Store user details in Firestore
            await setDoc(doc(db, "users", user.uid), {
                email,
                role,
                createdAt: new Date(),
            });

            alert("Registration successful! You can now log in.");
            navigate("/login");

        } catch (error) {
            console.error("Error registering:", error);
            setError(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <form onSubmit={handleRegister}>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        className="border p-2 w-full mb-2"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="border p-2 w-full mb-2"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />

                    {/* Role Selection Dropdown */}
                    <select 
                        className="border p-2 w-full mb-2" 
                        value={role} 
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>

                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full">
                        Register
                    </button>
                </form>
                <p className="mt-2 text-sm">
                    Already have an account? <a href="/login" className="text-blue-500">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
