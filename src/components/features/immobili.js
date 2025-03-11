"use client";
import { useState, useEffect } from "react";
import {
  BuildingLibraryIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "@/app/firebase/config";

const Immobili = () => {
  const [user, setUser] = useState(null);
  const [immobili, setImmobili] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCondo, setNewCondo] = useState({
    type: "",
    address: "",
    cap: "",
    city: "",
    region: "",
    fiscal_code: "",
    floors: "",
    square_meters: "",
  });
  const [showOwnersView, setShowOwnersView] = useState(null); // For showing owners view
  const [owners, setOwners] = useState({
    name: "",
    surname: "",
    millesimi: "",
    floor: "",
  });
  const [ownersList, setOwnersList] = useState([]); // Holds list of owners for the selected condo

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
        const querySnapshot = await getDocs(condosRef);

        const condosList = querySnapshot.docs
          .filter((doc) => doc.id !== "_metadata")
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

  useEffect(() => {
    if (showOwnersView) {
      const fetchOwners = async () => {
        try {
          const ownersRef = collection(
            firestore,
            `users/${user.uid}/condos/${showOwnersView}/condomini`
          );
          const querySnapshot = await getDocs(ownersRef);
          const ownersList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setOwnersList(ownersList);
        } catch (error) {
          console.error("Error fetching owners:", error);
        }
      };

      fetchOwners();
    }
  }, [showOwnersView, user]);

  const addCondo = async () => {
    if (
      !newCondo.type ||
      !newCondo.address ||
      !newCondo.cap ||
      !newCondo.city ||
      !newCondo.region ||
      !newCondo.fiscal_code ||
      newCondo.fiscal_code.length !== 11 ||
      isNaN(newCondo.cap) ||
      isNaN(newCondo.fiscal_code) ||
      isNaN(newCondo.floors) ||
      isNaN(newCondo.square_meters) ||
      newCondo.floors < 0 ||
      newCondo.square_meters < 0
    ) {
      alert("Please fill in all fields correctly.");
      return;
    }

    try {
      const condoData = {
        ...newCondo,
        createdAt: serverTimestamp(),
      };
      const userCondosRef = collection(firestore, `users/${user.uid}/condos`);
      const docRef = await addDoc(userCondosRef, condoData);
      setImmobili([...immobili, { id: docRef.id, ...condoData }]);
      setNewCondo({
        type: "",
        address: "",
        cap: "",
        city: "",
        region: "",
        fiscal_code: "",
        floors: "",
        square_meters: "",
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

  const addOwner = async () => {
    if (!owners.name || !owners.surname || !owners.millesimi || !owners.floor) {
      alert("Please fill in all owner fields.");
      return;
    }

    try {
      const ownerData = {
        ...owners,
      };
      const ownersRef = collection(
        firestore,
        `users/${user.uid}/condos/${showOwnersView}/condomini`
      );
      const docRef = await addDoc(ownersRef, ownerData);
      setOwnersList([...ownersList, { id: docRef.id, ...ownerData }]);
      setOwners({
        name: "",
        surname: "",
        millesimi: "",
        floor: "",
      });
    } catch (error) {
      console.error("Error adding owner:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-base-200 rounded-lg">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
        <BuildingLibraryIcon className="w-6 h-6 text-primary" />
        Manage Immobili (Condos)
      </h2>

      {showOwnersView === null ? (
        // Add Condo View
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <select
              className="input input-bordered w-full"
              value={newCondo.type}
              onChange={(e) =>
                setNewCondo({ ...newCondo, type: e.target.value })
              }
            >
              <option value="">Select Type</option>
              <option value="Condominio residenziale">
                Condominio residenziale
              </option>
              <option value="Complesso residenziale">
                Complesso residenziale
              </option>
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
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="CAP (Postal Code)"
              value={newCondo.cap}
              onChange={(e) =>
                setNewCondo({ ...newCondo, cap: e.target.value })
              }
              maxLength={5}
              pattern="\d*"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="City"
              value={newCondo.city}
              onChange={(e) =>
                setNewCondo({ ...newCondo, city: e.target.value })
              }
            />
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Region"
              value={newCondo.region}
              onChange={(e) =>
                setNewCondo({ ...newCondo, region: e.target.value })
              }
            />
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Fiscal Code (11 digits)"
              value={newCondo.fiscal_code}
              onChange={(e) =>
                setNewCondo({ ...newCondo, fiscal_code: e.target.value })
              }
              maxLength={11}
              pattern="\d*"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="number"
              className="input input-bordered w-full"
              placeholder="Floors"
              value={newCondo.floors}
              onChange={(e) =>
                setNewCondo({ ...newCondo, floors: e.target.value })
              }
            />
            <input
              type="number"
              className="input input-bordered w-full"
              placeholder="Square Meters"
              value={newCondo.square_meters}
              onChange={(e) =>
                setNewCondo({ ...newCondo, square_meters: e.target.value })
              }
            />
          </div>
          <button
            className="btn btn-primary w-full md:w-auto"
            onClick={addCondo}
          >
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
                    <th>Type</th>
                    <th>Address</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {immobili.length > 0 ? (
                    immobili.map((condo) => (
                      <tr
                        key={condo.id}
                        onClick={() => setShowOwnersView(condo.id)} // Show the owners view
                      >
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
                      <td colSpan="3" className="text-center">
                        No condos found. Add your first condo above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        // Show Owner Management View for the selected condo
        <>
          <h3 className="text-xl font-semibold mb-4">
            Manage Owners for Condo
          </h3>
          <div className="mb-4">
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Owner's Name"
              value={owners.name}
              onChange={(e) => setOwners({ ...owners, name: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Owner's Surname"
              value={owners.surname}
              onChange={(e) =>
                setOwners({ ...owners, surname: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Millesimi"
              value={owners.millesimi}
              onChange={(e) =>
                setOwners({ ...owners, millesimi: e.target.value })
              }
            />
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Floor"
              value={owners.floor}
              onChange={(e) => setOwners({ ...owners, floor: e.target.value })}
            />
          </div>
          <button
            className="btn btn-primary w-full md:w-auto mb-6"
            onClick={addOwner}
          >
            Add Owner
          </button>

          <h3 className="text-xl font-semibold mb-4">Owners List</h3>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Millesimi</th>
                  <th>Floor</th>
                </tr>
              </thead>
              <tbody>
                {ownersList.length > 0 ? (
                  ownersList.map((owner) => (
                    <tr key={owner.id}>
                      <td>{owner.name}</td>
                      <td>{owner.surname}</td>
                      <td>{owner.millesimi}</td>
                      <td>{owner.floor}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No owners added yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Immobili;
