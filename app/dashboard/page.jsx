// "use client"
// import React, { useEffect } from 'react'
// import AddMockInterview from './_components/AddMockInterview'
// import InterviewList from './_components/InterviewList'
// import { useUser } from '@clerk/nextjs'
// import { useRouter } from 'next/navigation'

// const Dashboard = () => {
//   const user = useUser();
//   const router = useRouter();
//   useEffect(()=>{
//     router.refresh();
//   },[user])
//   return (
//     <div className='p-10'>
      
//       <h1 className='font-bold text-3xl md:text-4xl text-primary'>Dashboard</h1>
//       <h2 className='text-gray-400 '>Create and Start your AI Mock Interview</h2>

//       <div className='mt-5'>
//         <AddMockInterview/>
//       </div>
//       <div className='mt-5'>
//         <InterviewList/>
//       </div>
//     </div>
//   )
// }

// export default Dashboard
"use client";
import React from "react";
import AddMockInterview from "./_components/AddMockInterview";
import InterviewList from "./_components/InterviewList";
import { useUser } from "@clerk/nextjs";

const Dashboard = () => {
  const { isSignedIn, user } = useUser(); // Add `isSignedIn` to check user state more clearly

  // Conditional rendering if user isn't signed in (optional safeguard)
  if (!isSignedIn) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-10">
      <h1 className="font-bold text-3xl md:text-4xl text-primary">Dashboard</h1>
      <h2 className="text-gray-400">Create and Start your AI Mock Interview</h2>

      <div className="mt-5">
        <AddMockInterview />
      </div>
      <div className="mt-5">
        <InterviewList />
      </div>
    </div>
  );
};

export default Dashboard;
