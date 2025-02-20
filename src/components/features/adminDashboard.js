"use client";

import { useState } from "react";
import {
  HomeIcon,
  TicketIcon,
  BuildingLibraryIcon,
  UsersIcon,
  ClipboardIcon,
  ChartBarIcon,
  UserGroupIcon,
  BellIcon,
  ClipboardDocumentIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

import Pool from "./pool";
import InterventionRequest from "./interventionRequest";
import SharedCalendar from "./calendar";
import Immobili from "./immobili";
import TicketManager from "./ticketManager";
import Contact from "./contact";

const AdminDashboard = () => {
  const [selected, setSelected] = useState("dashboard");

  const menuItems = [
    {
      label: "Dashboard",
      value: "dashboard",
      icon: <HomeIcon className="h-6 w-6" />,
    },
    {
      label: "Tickets",
      value: "tickets",
      icon: <TicketIcon className="h-6 w-6" />,
    },
    {
      label: "Immobili",
      value: "immobili",
      icon: <BuildingLibraryIcon className="h-6 w-6" />,
    },
    {
      label: "Utenti",
      value: "utenti",
      icon: <UsersIcon className="h-6 w-6" />,
    },
    {
      label: "Interventi",
      value: "interventi",
      icon: <ClipboardIcon className="h-6 w-6" />,
    },
    {
      label: "Sondaggi",
      value: "sondaggi",
      icon: <ChartBarIcon className="h-6 w-6" />,
    },
    {
      label: "Assemblee",
      value: "assemblee",
      icon: <UserGroupIcon className="h-6 w-6" />,
    },
    {
      label: "Avvisi",
      value: "avvisi",
      icon: <BellIcon className="h-6 w-6" />,
    },
    {
      label: "Fornitori",
      value: "fornitori",
      icon: <ClipboardDocumentIcon className="h-6 w-6" />,
    },
    {
      label: "Contatti",
      value: "contatti",
      icon: <PhoneIcon className="h-6 w-6" />,
    },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-base-200 p-4">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Admin Dashboard
        </h2>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li
              key={item.value}
              className={`p-2 cursor-pointer rounded-md flex items-center space-x-3 hover:bg-base-300 ${
                selected === item.value ? "bg-base-300" : ""
              }`}
              onClick={() => setSelected(item.value)}
            >
              {item.icon}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">
          Welcome to the Admin Dashboard
        </h1>
        <div className="bg-base-100 p-6">
          {selected === "dashboard" && <p>This is your Dashboard overview.</p>}
          {selected === "tickets" && <TicketManager />}
          {selected === "immobili" && <Immobili />}
          {selected === "utenti" && <p>Manage users here.</p>}
          {selected === "interventi" && <InterventionRequest />}
          {selected === "sondaggi" && <Pool />}
          {selected === "assemblee" && <p>Manage assemblies here.</p>}
          {selected === "avvisi" && <SharedCalendar />}
          {selected === "fornitori" && <p>Manage suppliers here.</p>}
          {selected === "contatti" && <Contact />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
