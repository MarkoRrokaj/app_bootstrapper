"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "@/app/firebase/config";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("basic"); // Default role
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function storeUserInFirestore(uid, email, role) {
    try {
      await setDoc(doc(firestore, "users", uid), {
        email,
        role: role === "admin" ? "pending" : "basic", // Admins start as "pending"
        createdAt: new Date(),
      });
      console.log("User stored in Firestore successfully.");
    } catch (error) {
      console.error("Error storing user in Firestore:", error);
    }
  }

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User created successfully:", userCredential.user.email);

      await storeUserInFirestore(
        userCredential.user.uid,
        userCredential.user.email,
        role
      );

      if (role === "admin") {
        router.push("/payment"); // Redirect to payment page
      } else {
        router.push("/");
      }
    } catch (err) {
      console.log("Signup error:", err.code, err.message);
      setError("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("Google signup successful:", result.user.email);

      await storeUserInFirestore(result.user.uid, result.user.email, role);

      if (role === "admin") {
        router.push("/payment");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error("Google signup error:", err);
      setError("Failed to sign up with Google. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-base-100 p-8">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>

        <form onSubmit={handleEmailSignup} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Role Selection */}
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="basic"
                className="radio radio-primary"
                checked={role === "basic"}
                onChange={() => setRole("basic")}
              />
              <span>Basic User</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="admin"
                className="radio radio-accent"
                checked={role === "admin"}
                onChange={() => setRole("admin")}
              />
              <span>Admin (requires payment)</span>
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="divider">OR</div>

        <button
          onClick={handleGoogleSignup}
          className="btn btn-outline w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Sign Up with Google"
          )}
        </button>

        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}
      </div>
    </div>
  );
}
