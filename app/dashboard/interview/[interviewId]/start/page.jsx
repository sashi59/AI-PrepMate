"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionComponent from "./_components/QuestionComponent";
import RecordAnswerComponent from "./_components/RecordAnswerComponent";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const InterviewStartPage = ({ params }) => {
  const [interviewId, setInterviewId] = useState(null);
  const [interviewData, setInterviewData] = useState("");
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState("");
  let [activeQuestion, setActiveQuestion] = useState(0);

  const router = useRouter();

  const endInterview = () => {
    router.push(`/dashboard/interview/${interviewId}/feedback`);
  };

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
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, interviewId));
    setInterviewData(result[0]?.mockId);
    setMockInterviewQuestion(JSON.parse(result[0].jsonMockResponse));

    // //console.log("result", mockInterviewQuestion);
    // //console.log("interviewId", interviewId);
    // //console.log("interviewData", interviewData);
  };
  return (
    <div>
      <div className=" grid md:grid-cols-2 gap-10 mb-15">
        {/* Record Answer */}
        <div>
          <RecordAnswerComponent
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestion={activeQuestion}
            interviewId={interviewId}
          />
          <div className="flex justify-start gap-5" style={{marginTop:"-3rem"}}>
            {activeQuestion !== 0 && (
              <Button className="w-1/2 dark:text-white" onClick={() => setActiveQuestion(activeQuestion - 1)}>
                Previous Question
              </Button>
            )}
            {activeQuestion !== mockInterviewQuestion?.length - 1 && (
              <Button  className="w-1/2 dark:text-white" onClick={() => setActiveQuestion(activeQuestion + 1)}>
                Next Question
              </Button>
            )}
            {activeQuestion === mockInterviewQuestion?.length - 1 && (
              <Button className="w-1/2 dark:text-white" onClick={endInterview}>End Interview</Button>
            )}
          </div>
        </div>

        {/* Question */}
        <QuestionComponent
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestion={activeQuestion}
          setActiveQuestion={setActiveQuestion}
        />
      </div>
    </div>
  );
};

export default InterviewStartPage;
