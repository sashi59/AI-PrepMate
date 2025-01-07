"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { chatSession } from "@/utils/GeminiAI";
import { LoaderIcon } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import {v4 as uuid} from "uuid"
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const AddMockInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const {user} = useUser();
  const router = useRouter();

  const onsubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log("User Details: ", jobPosition, jobDescription, jobExperience);
    const InputPrompt = `Job Position: ${jobPosition}, Job Description / Tech Stack : ${jobDescription},
    Years of Experience : ${jobExperience}, Depends on this given information please give me
    ${process.env.NEXT_PUBLIC_NO_QUESTIONS} interview questions with answers in JSON Format.
    Give Question and Answered as field in JSON.`;

    const result = await chatSession.sendMessage(InputPrompt);
    const mockJsonForm = (result.response.text()).replace("```json", "").replace("```", "")
    console.log("mockParseJsonForm", JSON.parse(mockJsonForm));
    if(mockJsonForm){
      const resp = await db.insert(MockInterview).values({
        mockId: uuid(),
        createdBy:user?.primaryEmailAddress?.emailAddress,
        jobPosition: jobPosition,
        jobDescription: jobDescription,
        jobExperience: jobExperience,
        jsonMockResponse: mockJsonForm,
      }).returning({mockId: MockInterview.mockId})
  
      console.log("Inserted Id:", resp)
      if(resp){
        setOpenDialog(false);
        router.push(`/dashboard/interview/${resp[0]?.mockId}`) // Navigate to Questions page with mockId

      }
    }else{
      console.log("Error in AddMockInterview");
    }
    setLoading(false);
  };
  return (
    <div className="w-1/3">
      <div className="p-10  border rounded-lg bg-secondary w-52 md:w-96 hover:scale-105 hover:shadow-md cursor-pointer transition-all">
        <h2 className="text-lg text-center" onClick={() => setOpenDialog(true)}>
          + Add New{" "}
        </h2>
      </div>
      <Dialog open={openDialog}>
        {/* <DialogTrigger></DialogTrigger> */}
        <DialogContent className="p-10 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-left ">
              Tell us more about your Job Interviewing
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onsubmit}>
                <div>
                  <div>
                    <h2 className="text-black text-sm text-left">
                      Add Details about your Job position, Job Description and
                      Year of Experinece
                    </h2>
                  </div>
                  <div className="flex flex-col mt-3 text-left">
                    <label className="text-sm text-black">
                      Job Position/ Role Name
                    </label>
                    <input
                      className="border rounded-lg bg-secondary p-3"
                      value={jobPosition}
                      onChange={(e) => setJobPosition(e.target.value)}
                      type="text"
                      placeholder="Ex. Full Stack Developer"
                      required
                    />
                  </div>
                  <div className="flex flex-col mt-3  text-left">
                    <label className=" text-black">
                      Job Description/ Tech Stack
                    </label>
                    <textarea
                      className="border rounded-lg bg-secondary p-3 w-full"
                      type="text"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Ex. Nodejs, Reactjs, Git"
                      required
                    />
                  </div>
                  <div className="flex flex-col mt-3  text-left">
                    <label className="text-black ">Job Experience</label>
                    <input
                      className="border rounded-lg bg-secondary p-3 w-full"
                      value={jobExperience}
                      onChange={(e) => setJobExperience(e.target.value)}
                      type="number"
                      placeholder="Ex. 5"
                      max={50}
                      required
                    />
                  </div>
                  <div className="flex justify-end mt-3 gap-3">
                    <button
                      className="bg-red-500 text-white p-2 px-5 border rounded-lg"
                      onClick={() => setOpenDialog(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-primary px-5 text-white p-2 border rounded-lg"
                    >
                      {loading ? (
                        <div className="flex gap-1">
                          <LoaderIcon className="animate-spin" /> Generating from AI
                        </div>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddMockInterview;
