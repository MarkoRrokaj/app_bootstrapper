"use client";

import { useState } from "react";

const Pool = () => {
  const [pollOptions, setPollOptions] = useState([]);
  const [newOption, setNewOption] = useState("");
  const [votes, setVotes] = useState({});
  const [userVote, setUserVote] = useState(null);

  const addOption = () => {
    if (newOption.trim() && !pollOptions.includes(newOption)) {
      setPollOptions([...pollOptions, newOption]);
      setVotes({ ...votes, [newOption]: 0 });
      setNewOption("");
    }
  };

  const vote = (option) => {
    setVotes((prevVotes) => {
      const updatedVotes = { ...prevVotes };
      if (userVote) {
        updatedVotes[userVote] -= 1;
      }
      updatedVotes[option] += 1;
      return updatedVotes;
    });

    setUserVote(option);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-base-200 rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Create a Poll</h2>
      <div className="flex gap-2">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Enter poll option"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addOption}>
          Add
        </button>
      </div>

      {pollOptions.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Vote for an option:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {pollOptions.map((option) => (
              <button
                key={option}
                className={`btn flex justify-between ${
                  userVote === option
                    ? "btn-primary text-white"
                    : "btn-outline btn-accent"
                }`}
                onClick={() => vote(option)}
              >
                {option}
                <span className="badge badge-primary">{votes[option]}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {userVote && (
        <p className="text-center text-warning mt-4">
          You voted for: <span className="font-bold">{userVote}</span>.{" "}
          <br></br>Click another option to change your vote.
        </p>
      )}
    </div>
  );
};

export default Pool;
