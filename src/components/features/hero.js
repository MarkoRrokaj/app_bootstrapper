"use client";

import {
  getFirestore,
  collection,
  getCountFromServer,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { app } from "@/app/firebase/config";

export default function Hero() {
  // const [userCount, setUserCount] = useState(null);

  // useEffect(() => {
  //   const fetchUserCount = async () => {
  //     try {
  //       const firestore = getFirestore(app);
  //       const usersCol = collection(firestore, "users");
  //       const snapshot = await getCountFromServer(usersCol);
  //       setUserCount(snapshot.data().count);
  //     } catch (error) {
  //       console.error("Error fetching user count:", error);
  //       setUserCount(0);
  //     }
  //   };

  //   fetchUserCount();
  //   // Fetch count every 5 minutes
  //   const interval = setInterval(fetchUserCount, 300000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center justify-center gap-16 lg:gap-20 px-8 py-12 lg:py-32">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary">Get Started</button>
          <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-3 p-10">
            <div className="-space-x-5 avatar-group justy-start">
              <div className="avatar">
                <div className="w-12">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="User avatar"
                  />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="User avatar"
                  />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="User avatar"
                  />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="User avatar"
                  />
                </div>
              </div>
            </div>
            <div className="flex-col justify-center items-center md:items-start gap-1">
              <div className="rating rating-sm">
                <input
                  type="radio"
                  name="rating-6"
                  className="mask mask-star-2 bg-orange-400"
                  aria-label="1 star"
                />
                <input
                  type="radio"
                  name="rating-6"
                  className="mask mask-star-2 bg-orange-400"
                  aria-label="2 star"
                />
                <input
                  type="radio"
                  name="rating-6"
                  className="mask mask-star-2 bg-orange-400"
                  aria-label="3 star"
                />
                <input
                  type="radio"
                  name="rating-6"
                  className="mask mask-star-2 bg-orange-400"
                  aria-label="4 star"
                />
                <input
                  type="radio"
                  name="rating-6"
                  className="mask mask-star-2 bg-orange-400"
                  aria-label="5 star"
                  defaultChecked
                />
              </div>
              <div className="text-base text-base-content/80">
                <span className="font-semibold text-base-content">
                  {/* {userCount ?? "..."} */}2
                </span>{" "}
                Condo happy owners!
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center text-xs text-base-content-secondary/60">
            Powered by
            <img
              className="inline w-12"
              fetchPriority="high"
              width="100"
              height="50"
              decoding="async"
              data-nimg="1"
              src="/stripe.png"
              alt="Stripe logo"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
