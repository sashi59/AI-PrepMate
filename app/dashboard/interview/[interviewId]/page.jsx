"use client";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { WebcamIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

const InterviewPage = ({ params }) => {
  const [interviewId, setInterviewId] = useState(null);
  const [interviewData, setInterviewData] = useState("");
  const [webCam, setWebCam] = useState(false);
  const router = useRouter();

  const handelStartInterview =()=>{
    router.push(`/dashboard/interview/${interviewId}/start`)
  }
  useEffect(() => {
    const fetchParams = async () => {
      const unwrappedParams = await params;
      setInterviewId(unwrappedParams.interviewId);
    };

    fetchParams();
  }, [params]);

  useEffect(() => {
    if (interviewId) {
      getInterviewDetail();
    }
  }, [interviewId]);

  const getInterviewDetail = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId));
      console.log(result);
      setInterviewData(result[0]);
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl md:text-3xl font-bold mt-5">Let's Get Started</h1>
      {webCam ? (
        <Webcam
          height={400}
          width={500}
          className="rounded-lg"
          mirrored={true}
          onUserMedia={() => setWebCam(true)}
          onUserMediaError={() => setWebCam(false)}
        />
      ) : (
        <WebcamIcon className="h-56 w-1/3 bg-gray-300 text-gray-800 p-10 m-4" />
      )}
      <div>
        <button 
          onClick={() => setWebCam(!webCam)}
          className="mt-1 p-3 border rounded-lg hover:shadow-md bg-slate-50"
        >
          {webCam ? "Disable Webcam and Microphone":"Enable Webcam and Microphone"}
        </button>
      </div>

      <div className="mt-8 border p-5 rounded-md w-1/2">
        <h2><strong>Job Position/ Role Name: </strong>{interviewData.jobPosition}</h2>
        <h2><strong>Job Description/ Tech Stack: </strong>{interviewData.jobDescription}</h2>
        <h2><strong>Job Experience: </strong>{interviewData.jobExperience} years</h2>
      </div>
      <button className="bg-primary p-3 mt-5 w-1/2 hover:shadow-sm text-white rounded-lg" onClick={handelStartInterview}>Let's Start Interview</button>
    </div>
  );
};

export default InterviewPage;
