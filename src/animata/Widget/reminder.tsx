"use client";
import { useState } from "react";
import { BellDot } from "lucide-react";

import * as React from "react";
import { cn } from "../../lib/utils.ts";

function ReminderWidget({ chan, arr, activeSeries, setActiveSeries }) {
  const [reminder, setReminder] = useState<string[]>(chan);

  const handleCheckboxChange = (data: string) => {
    console.log(reminder);
    if (!activeSeries.includes(data)) {
      //add to series
      setActiveSeries((prev) => [...prev, data]);
      console.log(activeSeries);
    } else {
      //delete it
      setActiveSeries(activeSeries.filter((el) => el !== data));
      console.log(activeSeries);
    }

    setReminder((prev) =>
      prev.includes(data)
        ? prev.filter((remind) => remind !== data)
        : [...prev, data]
    );
  };

  return (
    <div className={cn("group z-1 w-60 rounded-3xl bg-zinc-900 p-4")}>
      <div className="text-md flex items-center justify-between gap-2 font-bold text-blue-400">
        <div className="flex items-center gap-2">
          <BellDot color="#60a5fa" size={15} />
          <p className="text-xl">Top 10 Channels</p>
        </div>
        <div className="flex h-4 w-5 items-center justify-center rounded-full bg-zinc-700 text-xs text-blue-400">
          {activeSeries.length}
        </div>
      </div>
      <div className="mt-1">
        {chan.map((chan) => (
          <div
            key={`item-${chan.channel}`}
            onClick={() => handleCheckboxChange(chan.channel)}
            className="flex cursor-pointer items-center gap-3  border-b border-zinc-700 py-1"
          >
            <input
              type="checkbox"
              checked={activeSeries.includes(chan.channel)}
              className="h-3 w-3 appearance-none rounded-full border-2 border-gray-700 checked:bg-blue-500"
            />
            <p className="bg-transparenth-auto flex m-0 text-white ">
              {chan.channel}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReminderWidget;
