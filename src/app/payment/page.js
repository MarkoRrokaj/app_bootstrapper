"use client";

import { useRouter } from "next/navigation";
import { auth, firestore } from "@/app/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";

const PaymentPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePaymentSuccess = async () => {
    setLoading(true);
    setError(null);

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not found. Please log in again.");

      // Update Firestore role from "pending" to "admin"
      const userRef = doc(firestore, "users", user.uid);
      await updateDoc(userRef, { role: "admin" });

      console.log("User role updated to admin in Firestore.");

      // Redirect to admin page
      router.push("/admin");
    } catch (err) {
      console.error("Error updating user role:", err);
      setError("Failed to update your admin status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Admin Upgrade</h2>
      <p className="text-center mb-4">
        To become an admin, complete the payment.
      </p>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <button
        onClick={handlePaymentSuccess}
        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default PaymentPage;
