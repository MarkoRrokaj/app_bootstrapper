"use client";

import { useState } from "react";
import {
  TicketIcon,
  TrashIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const TicketManager = () => {
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({ title: "", description: "" });

  const statuses = {
    open: {
      label: "Open",
      color: "badge-warning",
      icon: <ClockIcon className="w-4 h-4" />,
    },
    inProgress: {
      label: "In Progress",
      color: "badge-info",
      icon: <ClockIcon className="w-4 h-4" />,
    },
    closed: {
      label: "Closed",
      color: "badge-success",
      icon: <CheckCircleIcon className="w-4 h-4" />,
    },
  };

  const addTicket = () => {
    if (newTicket.title.trim() && newTicket.description.trim()) {
      setTickets([
        ...tickets,
        { ...newTicket, id: Date.now(), status: "open" },
      ]);
      setNewTicket({ title: "", description: "" }); // Reset input
    }
  };

  const deleteTicket = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this ticket?"
    );
    if (confirmDelete) {
      setTickets(tickets.filter((ticket) => ticket.id !== id));
    }
  };

  const updateStatus = (id, newStatus) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === id ? { ...ticket, status: newStatus } : ticket
      )
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-base-200 rounded-lg">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
        <TicketIcon className="w-6 h-6 text-primary" />
        Ticket Management
      </h2>

      {/* Add New Ticket */}
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Ticket Title"
          value={newTicket.title}
          onChange={(e) =>
            setNewTicket({ ...newTicket, title: e.target.value })
          }
        />
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Description"
          value={newTicket.description}
          onChange={(e) =>
            setNewTicket({ ...newTicket, description: e.target.value })
          }
        />
        <button className="btn btn-primary" onClick={addTicket}>
          Add Ticket
        </button>
      </div>

      {/* Ticket List */}
      {tickets.length > 0 ? (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Active Tickets</h3>
          <ul className="space-y-2">
            {tickets.map((ticket) => (
              <li
                key={ticket.id}
                className="flex justify-between items-center bg-white p-3 shadow rounded-lg"
              >
                <div>
                  <p className="font-semibold">{ticket.title}</p>
                  <p className="text-sm text-gray-500">{ticket.description}</p>
                  <span
                    className={`badge ${
                      statuses[ticket.status].color
                    } flex items-center gap-1`}
                  >
                    {statuses[ticket.status].icon}
                    {statuses[ticket.status].label}
                  </span>
                </div>
                <div className="flex gap-2">
                  <select
                    className="select select-bordered select-sm"
                    value={ticket.status}
                    onChange={(e) => updateStatus(ticket.id, e.target.value)}
                  >
                    {Object.keys(statuses).map((status) => (
                      <option key={status} value={status}>
                        {statuses[status].label}
                      </option>
                    ))}
                  </select>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => deleteTicket(ticket.id)}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No tickets created yet.</p>
      )}
    </div>
  );
};

export default TicketManager;
