"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import InterviewCard from "./InterviewCard";

const InterviewList = () => {
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  useEffect(() => {
    getAllInterviews();
    // eslint-disable-next-line
  }, [user]);
  const getAllInterviews = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(MockInterview)
      .where(
        eq(MockInterview?.createdBy, user?.primaryEmailAddress?.emailAddress)
      )
      .orderBy(desc(MockInterview.id));

    // console.log("result", result);
    setInterviewList(result);
    setLoading(false);
  };
  return (
    <div>
      <h1 className="text-3xl my-10 font-bold">Your Previous AI Interview</h1>

      {loading ? (
        <div className="text-center text-3xl font-bold">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {interviewList &&
            interviewList.length > 0 &&
            interviewList.map((interviewList, idx) => (
              <InterviewCard
                key={interviewList?.mockId || idx}
                idx={idx}
                interviewList={interviewList}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default InterviewList;
