import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

const QuestionComponent = ({ mockInterviewQuestion, activeQuestion, setActiveQuestion }) => {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text); // Use SpeechSynthesisUtterance
      window.speechSynthesis.speak(speech);
    } else {
      alert("Your browser does not support Speech Synthesis");
    }
  };

  

  return (
    mockInterviewQuestion && (
      <div className="p-7 border rounded-lg mt-5">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockInterviewQuestion &&
            mockInterviewQuestion.map((q, idx) => (
              <h2
                key={idx}
                className={` ${activeQuestion === idx ? "bg-blue-500 text-white" : "bg-secondary"} p-2 rounded-lg cursor-pointer text-center text-sm `}
                onClick={()=> setActiveQuestion(idx)}
              >
                Question #{idx + 1}
              </h2>
            ))}
        </div>
        <div>
          <h2 className="mt-10 text-md md:text-lg">
            {mockInterviewQuestion[activeQuestion]?.Question}
          </h2>
        </div>
        <Volume2
          className="mt-10 cursor-pointer mb-5 "
          onClick={() =>
            textToSpeech(mockInterviewQuestion[activeQuestion]?.Question)
          }
        />
        <div className="p-5 bg-blue-200 border-blue-900 rounded-md">
          <h2 className="flex gap-3 mb-1">
            <Lightbulb className="text-blue-900" />{" "}
            <strong className="text-blue-900">Note:</strong>
          </h2>
          <p className="text-blue-900 text-sm">
            {process.env.NEXT_PUBLIC_BLUE_NOTE}
          </p>
        </div>
      </div>
    )
  );
};

export default QuestionComponent;
