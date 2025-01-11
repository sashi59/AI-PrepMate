"use client";
import { db } from "@/utils/db";
import { userAnswerTable } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const FeedbackPage = ({ params: paramsPromise }) => {
  const [feedback, setFeedback] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [interviewId, setInterviewId] = useState(null);
  const router = useRouter();

  // Unwrap params
  useEffect(() => {
    const unwrapParams = async () => {
      const unwrappedParams = await paramsPromise;
      setInterviewId(unwrappedParams.interviewId);
    };
    unwrapParams();
  }, [paramsPromise]);

  // Fetch feedback once interviewId is available
  useEffect(() => {
    if (interviewId) {
      GetFeedback();
    }
  }, [interviewId]);

  const GetFeedback = async () => {
    try {
      const result = await db
        .select()
        .from(userAnswerTable)
        .where(eq(userAnswerTable.mockIdRef, interviewId))
        .orderBy(userAnswerTable.id);

      setFeedback(result);

      // Calculate average rating
      const validRatings = result
        .map((item) => Math.min(Math.max(item.rating || 0, 0), 10)) // Ensure ratings are clamped between 0 and 10
        .filter((rating) => !isNaN(rating)); // Remove invalid ratings

      const totalRating = validRatings.reduce((acc, curr) => acc + curr, 0);
      const average =
        validRatings.length > 0 ? (totalRating / process.env.NEXT_PUBLIC_NO_QUESTIONS).toFixed(2) : 0;

      setAverageRating(average);

      //console.log("feedback", result);
    } catch (error) {
      //console.error("Error fetching feedback:", error);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-green-400 font-bold text-3xl">Congratulations!</h1>
      <h2 className="text-gray-900 font-bold text-2xl dark:text-white">
        Here is your Interview Feedback
      </h2>
      <h2 className="text-blue-500 text-xl font-bold mt-5 mb-3">
        Your overall Interview rating: {averageRating}/10
      </h2>
      <Button onClick={() => router.replace("/dashboard")}>Go to Home</Button>

      <h3 className="text-sm text-gray-400 my-5 dark:text-gray-200">
        Here below, your interview questions with correct answers, your answers,
        and feedback for improvement are given.
      </h3>

      <div className="mt-5">
        {feedback && feedback.length > 0 ? (
          feedback.map((feed, idx) => (
            <Collapsible key={idx}>
              <CollapsibleTrigger className="w-full flex justify-between items-center pr-5 text-left bg-gray-100 py-3 border pl-3 rounded-lg mb-4 dark:text-black">
                {feed?.question} <p><ArrowDown  className="ml-1" /></p>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-1">
                  <h2 className="w-full text-left text-xs text-red-700 border py-3 pl-3 rounded-lg pr-3 dark:bg-red-100">
                    <strong>Result: </strong>
                    {feed?.rating}
                  </h2>
                  <p className="w-full text-left text-xs bg-red-100 text-red-700 border py-3 pl-3 rounded-lg pr-3">
                    <strong>Your Answer:</strong> {feed?.userAns}
                  </p>
                  <p className="w-full text-left text-xs bg-green-100 text-green-700 border py-3 pl-3 rounded-lg pr-3">
                    <strong>Correct Answer:</strong> {feed?.correctAns}
                  </p>
                  <p className="w-full text-left text-xs bg-blue-100 text-blue-700 border py-3 pl-3 rounded-lg pr-3">
                    <strong>Feedback:</strong> {feed?.feedback}
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))
        ) : (
          <p>OOPS!! No feedback available.</p>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
