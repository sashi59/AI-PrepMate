"use client";

import { MicIcon, Pause, WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAI";
import { db } from "@/utils/db";
import { userAnswerTable } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";

const RecordAnswerComponent = ({
  mockInterviewQuestion,
  activeQuestion,
  interviewId,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [fb, setfb] = useState("");
  const [loading, setLoading] = useState(false);
  const [webCam, setWebCam] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const { user } = useUser();

  const {
    error,
    interimResult,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const saveUserAnswer = async () => {
    if (isRecording) {
      setIsRecording(false);
      stopSpeechToText();
      setLoading(true);

      try {
        const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestion]?.Question}, Answer:${userAnswer}
        , Depends on question and user answer for given interview question, please give us rating for answer and feedback as area 
        of improvement  if any, in just 3 to 5 lines to improve it in JSON format with rating field and feedback field.`;

        const result = await chatSession.sendMessage(feedbackPrompt);
        const feedbackJsonForm = result.response
          .text()
          .replace("```json", "")
          .replace("```", "");
        const feedData = JSON.parse(feedbackJsonForm);

        setfb(feedData);

        const resp = await db.insert(userAnswerTable).values({
          mockIdRef: interviewId,
          correctAns: mockInterviewQuestion[activeQuestion]?.Answer,
          feedback: feedData?.feedback,
          rating: feedData?.rating,
          question: mockInterviewQuestion[activeQuestion]?.Question,
          userAns: userAnswer,
          userEmail: user?.primaryEmailAddress?.emailAddress,
        });

        if (resp) {
          toast("Your Answer Saved Successfully");
        } else {
          toast("Error in saving your answer");
        }
      } catch (err) {
        console.error("Error saving user answer:", err);
        toast("Error in processing your feedback");
      }

      setUserAnswer("");
      setLoading(false);
    } else {
      setIsRecording(true);
      startSpeechToText();
    }
  };

  useEffect(() => {
    if (interimResult) {
      setUserAnswer((prev) => `${prev} ${interimResult}`);
    }
  }, [interimResult]);

  useEffect(() => {
    results.forEach((r) => setUserAnswer((prev) => `${prev} ${r.transcript}`));
  }, [results]);

  return (
    <div className="mb-20">
      <div className="mt-10 flex flex-col justify-center items-center ">
        <h1 className="text-bold">Enable Webcam to Start Recording</h1>
        {webCam ? (
          <div>
            <Webcam
              height={400}
              className="rounded-lg w-full"
              mirrored={true}
              onUserMedia={() => setWebCam(true)}
            />
          </div>
        ) : (
          <WebcamIcon className=" h-56 md:h-96 w-full bg-gray-300 text-gray-800 p-20 m-4 rounded-lg" />
        )}
      </div>

      <div className="flex gap-7">
        <button
          onClick={() => setWebCam(!webCam)}
          className={`px-5 py-2 rounded-lg shadow-md hover:scale-105 mt-3 w-1/2 text-sm bg-secondary`}
        >
          {webCam ? "Disable Webcam" : "Enable Webcam"}
        </button>
        <button
          onClick={saveUserAnswer}
          disabled={!webCam}
          className={`${
            isRecording ? "bg-red-500" : "bg-green-400"
          } ${webCam ? "" : "cursor-not-allowed"} text-white w-1/2 px-5 py-2 rounded-lg hover:scale-105 shadow-md mt-3 text-sm`}
        >
          {isRecording ? (
            <div className="flex gap-1 justify-center items-center">
              <Pause />
              Stop Recording
            </div>
          ) : (
            <div className="flex gap-1 justify-center items-center">
              {loading ? (
                "Loading..."
              ) : (
                <>
                  <MicIcon />
                  Start Recording
                </>
              )}
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default RecordAnswerComponent;
