"use client"

import { format } from 'date-fns';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import './App.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CalendarApp() {
  const [date, setDate] = useState<Value>(new Date());
  // const [selectedDate, setSelectedDate] = useState<string>();
  const isFirstRender = useRef(true);
  console.log("date from calendar app: ", date);
  // console.log("selected date from calendar app: ", selectedDate);

  const router = useRouter();

  // const formattedDate = date instanceof Date ? format(date, 'yyyy-MM-dd') : "No date selected";
  // console.log("formatted date: ", formattedDate)
  
  // useEffect(() => {
  //   // setSelectedDate(formattedDate);

  //   if(isFirstRender.current){
  //     isFirstRender.current = false;
  //     return
  //   }

  //   // redirect(`/home/${formattedDate}`)
  //   router.push(`/home/${formattedDate}`)
  // }, [date])

  const handleDateChange = (newDate: Value) => {
    setDate(newDate);

    if(newDate instanceof Date){
      router.push(`/home/${format(newDate, 'yyyy-MM-dd')}`);
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-start p-5 bg-gray-50">
      <div className="w-full max-w-4xl">
        {/* Left-aligned heading */}
        {/* <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-left justify-center">
          React Calendar
        </h1> */}

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