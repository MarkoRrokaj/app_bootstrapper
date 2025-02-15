"use client";

import { useState } from "react";

const CondoManagement = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    taxCode: "",
    apartment: "",
    floor: "",
    role: "owner",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Data submitted successfully!");
    console.log(formData);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-base-200 shadow-xl rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">
        Condominium Records
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="surname"
            placeholder="Surname"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input input-bordered w-full"
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          className="input input-bordered w-full"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="taxCode"
          placeholder="Tax Code"
          className="input input-bordered w-full"
          onChange={handleChange}
          required
        />
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            name="apartment"
            placeholder="Apartment Number"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="floor"
            placeholder="Floor"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="label">Role in the Condominium:</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="owner"
                className="radio"
                onChange={handleChange}
                defaultChecked
              />{" "}
              Owner
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="tenant"
                className="radio"
                onChange={handleChange}
              />{" "}
              Tenant
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="delegate"
                className="radio"
                onChange={handleChange}
              />{" "}
              Delegate
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CondoManagement;
