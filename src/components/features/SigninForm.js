"use client";

import { useState } from "react";
import { auth } from "@/app/firebase/config";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";

const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between SignUp and SignIn

  // Google sign-in
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Redirect or handle post-login actions here
    } catch (err) {
      setError(err.message);
    }
  };

  // Email and password sign-in
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect or handle post-login actions here
    } catch (err) {
      setError(err.message);
    }
  };

  // Toggle between SignUp and SignIn
  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-center">
        {isSignUp ? "Sign Up" : "Sign In"}
      </h2>
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Google login */}
      <button
        onClick={handleGoogleLogin}
        className="w-full py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
      >
        {isSignUp ? "Sign Up with Google" : "Sign In with Google"}
      </button>

      {/* Email/Password Sign-in or Sign-up */}
      <form onSubmit={handleEmailLogin} className="mt-4">
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>

      <p className="text-center mt-4 text-sm">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          onClick={toggleSignUp}
          className="text-blue-500 hover:text-blue-700"
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </button>
      </p>
    </div>
  );
};

export default SigninForm;
