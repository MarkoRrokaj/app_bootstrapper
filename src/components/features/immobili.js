"use client";

import { useState } from "react";
import { BuildingLibraryIcon, TrashIcon } from "@heroicons/react/24/outline";

const Immobili = () => {
  const [immobili, setImmobili] = useState([]);
  const [newCondo, setNewCondo] = useState({ name: "", address: "" });

  const addCondo = () => {
    if (newCondo.name.trim() && newCondo.address.trim()) {
      setImmobili([...immobili, { ...newCondo, id: Date.now() }]);
      setNewCondo({ name: "", address: "" }); // Reset input fields
    }
  };

  const deleteCondo = (id) => {
    setImmobili(immobili.filter((condo) => condo.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-base-200 rounded-lg">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
        <BuildingLibraryIcon className="w-6 h-6 text-primary" />
        Manage Immobili (Condos)
      </h2>

      {/* Add new condo */}
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Condo Name"
          value={newCondo.name}
          onChange={(e) => setNewCondo({ ...newCondo, name: e.target.value })}
        />
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Address"
          value={newCondo.address}
          onChange={(e) =>
            setNewCondo({ ...newCondo, address: e.target.value })
          }
        />
        <button className="btn btn-primary" onClick={addCondo}>
          Add
        </button>
      </div>

      {/* List of condos */}
      {immobili.length > 0 ? (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Registered Condos</h3>
          <ul className="space-y-2">
            {immobili.map((condo) => (
              <li
                key={condo.id}
                className="flex justify-between items-center bg-white p-3 shadow rounded-lg"
              >
                <div>
                  <p className="font-semibold">{condo.name}</p>
                  <p className="text-sm text-gray-500">{condo.address}</p>
                </div>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => deleteCondo(condo.id)}
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No condos added yet.</p>
      )}
    </div>
  );
};

export default Immobili;
