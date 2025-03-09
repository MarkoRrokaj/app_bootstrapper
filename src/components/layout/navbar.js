"use client";

import { useState, useEffect } from "react";
import { auth } from "@/app/firebase/config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear user state
      router.push("/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const getEmailPrefix = (email) => {
    if (email) {
      return email.split("@")[0]; // Get the part before '@'
    }
    return "User";
  };

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Reviews</a>
            </li>
            <li>
              <a href="#pricing">Pricing</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <>
              <span className="mr-4">
                Welcome, {getEmailPrefix(user.email)}
              </span>
              <button className="btn btn-soft" onClick={handleSignOut}>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <a className="btn btn-soft" href="/login">
                Log In
              </a>
              <a className="btn btn-soft" href="/signup">
                Sign Up
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
