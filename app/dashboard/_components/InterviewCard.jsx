import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const InterviewCard = ({ idx, interviewList }) => {
    const router = useRouter();
  // Ensure createdAt is a readable date string
  const createdAt = interviewList?.createdAt
    ? new Date(interviewList.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown Date";

    const navigateToStart = ()=>{
        router.push(`/dashboard/interview/${interviewList?.mockId}`)
    }
    const navigateToFeedback = ()=>{
        router.push(`/dashboard/interview/${interviewList?.mockId}/feedback`)
    }

  return (
    <div className="shadow-md">
      <Card key={idx}>
        <CardHeader>
          <CardTitle className="text-xl text-primary">
            {interviewList?.jobPosition}
          </CardTitle>
          <CardDescription className="text-black">
            {interviewList?.jobExperience} Years of Experience
          <p className="text-sm text-gray-400">Created At: {createdAt}</p>

          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-between gap-5">
            <Button onClick={navigateToStart} className="w-1/2 bg-secondary text-black hover:bg-gray-300">Start Interview</Button>
            <Button  onClick={navigateToFeedback} className="w-1/2">Feedback</Button>

        </CardContent>
        
      </Card>
    </div>
  );
};

export default InterviewCard;
