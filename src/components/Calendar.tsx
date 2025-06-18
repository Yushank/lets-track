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
  // const isFirstRender = useRef(true);
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


//NOTE:

//Previosuly when useffect is used what was happening is when calendar is mounted , state is set with current date, then useffect wait for next date 
//When user click the next date then it redirect 
// now the thing is when we visit this component from home page using calendar link, then the next date is registered in memory
//meaning, the isFirstRender = useRef(true) is set in memory, then on date selection, calendar again mounts and it become false, then in useffect it is stated that if isFirstRender.current is false then redirect
// it is set that way that on first mount it will not redirect, on second mount after date selection it will redirect
// but when we visit from home page via calendar link, in memory isFirstRender.current is still false
// so when we visit the calendar page, the useffect instantly redirect back to home with current date 
// if the isFirstRender.current was true or the memory was erased when visiting via link, then instant redirect would have not happened

// To prevent this issue instead of useEffect , we created a separate function
// which takes the date from <Calendar /> , as in onChange ={handleDateChange} we have used the function itself instead of state like before
// then handleDateChange function take the clicked tile date from <Calendar />, store it in the state and also redirect to home page with formatted date as url
// now with this when we visit from home page via calendar link, we don't redirect instantly, we only redirect when a new date is clicked