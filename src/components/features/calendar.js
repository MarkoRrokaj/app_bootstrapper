"use client";

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, parseISO, compareAsc } from "date-fns";
import { XCircleIcon } from "@heroicons/react/24/solid";

const SharedCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [eventText, setEventText] = useState("");
  const [events, setEvents] = useState(() => {
    const storedEvents = JSON.parse(localStorage.getItem("sharedEvents")) || [];
    return storedEvents.sort((a, b) =>
      compareAsc(parseISO(a.date), parseISO(b.date))
    ); // Sort on load
  });
  const [visibleCount, setVisibleCount] = useState(5); // Control how many events to show

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const addEvent = () => {
    if (!eventText.trim()) {
      alert("Please enter an event description.");
      return;
    }

    const newEvent = {
      date: format(date, "yyyy-MM-dd"),
      text: eventText,
    };

    const updatedEvents = [...events, newEvent].sort((a, b) =>
      compareAsc(parseISO(a.date), parseISO(b.date))
    );
    setEvents(updatedEvents);
    localStorage.setItem("sharedEvents", JSON.stringify(updatedEvents));

    setEventText("");
  };

  const deleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
    localStorage.setItem("sharedEvents", JSON.stringify(updatedEvents));
  };

  useEffect(() => {
    const checkForReminders = () => {
      const tomorrow = format(
        new Date(new Date().setDate(new Date().getDate() + 1)),
        "yyyy-MM-dd"
      );

      events.forEach((event) => {
        if (event.date === tomorrow) {
          alert(`Reminder: Upcoming Event Tomorrow - ${event.text}`);
        }
      });
    };

    checkForReminders();
  }, [events]);

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-base-200 shadow-xl rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Shared Calendar</h2>

      {/* Calendar Component */}
      <div className="flex justify-center mb-4">
        <Calendar onChange={handleDateChange} value={date} />
      </div>

      {/* Event Input Field */}
      <div className="flex gap-2">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Enter event description"
          value={eventText}
          onChange={(e) => setEventText(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addEvent}>
          Add Event
        </button>
      </div>

      {/* Display Events */}
      {events.length > 0 && (
        <div className="mt-6 p-4 bg-base-100 shadow-md rounded-lg">
          <h3 className="text-xl font-semibold">Upcoming Events</h3>
          {events.slice(0, visibleCount).map((event, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 mt-2 border rounded-md bg-base-200"
            >
              <div>
                <p className="text-sm text-gray-600">{event.date}</p>
                <p className="text-lg font-semibold">{event.text}</p>
              </div>
              <button
                onClick={() => deleteEvent(index)}
                className="text-red-500 hover:text-red-700"
              >
                <XCircleIcon className="h-6 w-6" />
              </button>
            </div>
          ))}
          {events.length > visibleCount && (
            <button
              className="mt-3 w-full btn btn-outline"
              onClick={() => setVisibleCount(visibleCount + 5)}
            >
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SharedCalendar;
