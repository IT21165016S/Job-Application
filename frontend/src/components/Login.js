import React, { useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Login = ({ setRole }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            // Step 1: Authenticate user
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Step 2: Retrieve role & profile image from Firestore
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                const role = userData.role;
                const profileImage = userData.profileImage || ""; // Retrieve profile image

                // Step 3: Store user details in local storage
                localStorage.setItem("token", await user.getIdToken());
                localStorage.setItem("email", user.email);
                localStorage.setItem("role", role);
                localStorage.setItem("profileImage", profileImage);
                setRole(role);

                alert("Login successful!");

                // Step 4: Redirect based on role
                if (role === "admin") {
                    navigate("/dashboard");
                } else {
                    navigate("/apply");
                }
            } else {
                setError("User role not found. Please contact support.");
            }
        } catch (error) {
            setError("Invalid email or password. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <form onSubmit={handleLogin}>
                    <input 
                        className="border p-2 w-full mb-2" 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <input 
                        className="border p-2 w-full mb-2" 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full">Login</button>
                </form>
                <p className="mt-2 text-sm">Don't have an account? <a href="/register" className="text-blue-500">Register</a></p>
            </div>
        </div>
    );
};

export default Login;
