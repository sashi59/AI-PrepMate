import React from 'react'
import AddMockInterview from './_components/AddMockInterview'
import InterviewList from './_components/InterviewList'

const Dashboard = () => {
  return (
    <div className='p-10'>
      
      <h1 className='font-bold text-3xl md:text-4xl text-primary'>Dashboard</h1>
      <h2 className='text-gray-400 '>Create and Start your AI Mock Interview</h2>

      <div className='mt-5'>
        <AddMockInterview/>
      </div>
      <div className='mt-5'>
        <InterviewList/>
      </div>
    </div>
  )
}

export default Dashboard