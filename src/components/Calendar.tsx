"use client"

import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CalendarApp() {
  const [date, setDate] = useState<Value>(new Date());
  console.log("date from calendar app: ", date);
  const router = useRouter();

  const handleDateChange = (newDate: Value) => {
    setDate(newDate);

    if(newDate instanceof Date){
      router.push(`/home/${format(newDate, 'yyyy-MM-dd')}`);
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-start p-5 bg-gray-50">
      <div className="w-full max-w-4xl">

        {/* Calendar positioned left */}
        <div className="flex justify-center">
          <Calendar
            onChange={handleDateChange} //only triggers on user interaction
            value={date}
            className="rounded-lg border border-gray-200 shadow-md p-2 bg-white"
          />
        </div>

        {/* Centered selected date */}
        <div className="mt-8 text-center">
          <p className="inline-block bg-gray-100 rounded-lg px-4 py-3 text-gray-700">
            <span className="font-semibold">Selected Date:</span>{" "}
            {date instanceof Date ? date.toDateString() : "No date selected"}
          </p>
        </div>
      </div>
    </div>
  );
}

