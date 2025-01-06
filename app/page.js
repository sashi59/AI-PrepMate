"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";



export default function Home() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center   min-h-screen ">

      <div>
        <h1 className="text-3xl md:text-5xl font-bold text-black mb-1">AI PrepMate</h1>
        <p className="text-lg text-gray-600 ">Learn AI with confidence</p>
      
      <Button className="w-full my-5" onClick={()=> router.replace("/dashboard")} >Get Started</Button>
      </div>
    </div>
  );
}
