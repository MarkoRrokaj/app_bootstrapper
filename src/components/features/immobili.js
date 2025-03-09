"use client";
import { useState, useEffect } from "react";
import { BuildingLibraryIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "@/app/firebase/config";

const Immobili = () => {
  const [user, setUser] = useState(null);
  const [immobili, setImmobili] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCondo, setNewCondo] = useState({
    init: "",
    type: "",
    address: "",
    cap: "",
    city: "",
    region: "",
    fiscal_code: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchCondos = async () => {
      try {
        if (!user) return;
        setLoading(true);

        const condosRef = collection(firestore, `users/${user.uid}/condos`);
        // Optional: Skip the metadata document if it exists
        // const condosQuery = query(condosRef, where("__name__", "!=", "_metadata"));
        // const querySnapshot = await getDocs(condosQuery);

        const querySnapshot = await getDocs(condosRef);

        const condosList = querySnapshot.docs
          .filter((doc) => doc.id !== "_metadata") // Filter out metadata doc if it exists
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

        setImmobili(condosList);
      } catch (error) {
        console.error("Error fetching condos:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchCondos();
    } else {
      setLoading(false);
    }
  }, [user]);

  const addCondo = async () => {
    if (!newCondo.address.trim() || !user) return;
    try {
      const condoData = {
        ...newCondo,
        createdAt: serverTimestamp(),
      };
      const userCondosRef = collection(firestore, `users/${user.uid}/condos`);
      const docRef = await addDoc(userCondosRef, condoData);
      setImmobili([...immobili, { id: docRef.id, ...condoData }]);
      setNewCondo({
        init: "",
        type: "",
        address: "",
        cap: "",
        city: "",
        region: "",
        fiscal_code: "",
      });
    } catch (error) {
      console.error("Error adding condo:", error);
    }
  };

  const deleteCondo = async (id) => {
    try {
      await deleteDoc(doc(firestore, `users/${user.uid}/condos`, id));
      setImmobili(immobili.filter((condo) => condo.id !== id));
    } catch (error) {
      console.error("Error deleting condo:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-base-200 rounded-lg">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
        <BuildingLibraryIcon className="w-6 h-6 text-primary" />
        Manage Immobili (Condos)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Init"
          value={newCondo.init}
          onChange={(e) => setNewCondo({ ...newCondo, init: e.target.value })}
        />
        <select
          className="input input-bordered w-full"
          value={newCondo.type}
          onChange={(e) => setNewCondo({ ...newCondo, type: e.target.value })}
        >
          <option value="">Select Type</option>
          <option value="Condominio residenziale">
            Condominio residenziale
          </option>
          <option value="Complesso residenziale">Complesso residenziale</option>
          <option value="Edificio commerciale">Edificio commerciale</option>
          <option value="Edificio misto">Edificio misto</option>
          <option value="Supercondominio">Supercondominio</option>
          <option value="Residence o villaggio turistico">
            Residence o villaggio turistico
          </option>
          <option value="Edificio storico">Edificio storico</option>
        </select>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Address"
          value={newCondo.address}
          onChange={(e) =>
            setNewCondo({ ...newCondo, address: e.target.value })
          }
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="CAP (Postal Code)"
          value={newCondo.cap}
          onChange={(e) => setNewCondo({ ...newCondo, cap: e.target.value })}
        />
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="City"
          value={newCondo.city}
          onChange={(e) => setNewCondo({ ...newCondo, city: e.target.value })}
        />
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Region"
          value={newCondo.region}
          onChange={(e) => setNewCondo({ ...newCondo, region: e.target.value })}
        />
      </div>
      <input
        type="text"
        className="input input-bordered w-full mb-4"
        placeholder="Fiscal Code"
        value={newCondo.fiscal_code}
        onChange={(e) =>
          setNewCondo({ ...newCondo, fiscal_code: e.target.value })
        }
      />
      <button className="btn btn-primary w-full md:w-auto" onClick={addCondo}>
        Add Condo
      </button>

      {loading ? (
        <div className="text-center mt-6">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="overflow-x-auto mt-6">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Init</th>
                <th>Type</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {immobili.length > 0 ? (
                immobili.map((condo) => (
                  <tr key={condo.id}>
                    <td>{condo.init}</td>
                    <td>{condo.type}</td>
                    <td>{condo.address}</td>
                    <td>
                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => deleteCondo(condo.id)}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No condos found. Add your first condo above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Immobili;
