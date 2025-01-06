"use client";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const pathname = usePathname();
  const user = useUser();
  // console.log(pathname)
  return (
    <div className="flex items-center justify-between py-4 px-8 md:py-5 md:px-10 shadow-md bg-secondary">
      {/* <Image src={"./logoipsum-338.svg"} width={70} height={60} alt="Logo"></Image>
       */}
      <div>
        <h2 className=" text-xl md:text-2xl font-bold">AI PrepMate</h2>
        
      </div>

      <ul className="hidden md:flex items-center  gap-3 md:gap-5">
        <li
          className={`${
            pathname === `/dashboard` ? "text-primary font-bold" : ""
          } hover:text-primary hover:font-bold cursor-pointer`}
        >
          Dashboard
        </li>
        <li
          className={`${
            pathname === "/dashboard/questions" ? "text-primary font-bold" : ""
          } hover:text-primary hover:font-bold cursor-pointer`}
        >
          Questions
        </li>
        <li
          className={`${
            pathname === "/dashboard/premium" ? "text-primary font-bold" : ""
          } hover:text-primary hover:font-bold cursor-pointer`}
        >
          Premium
        </li>
        <li
          className={`${
            pathname === "/dashboard/how" ? "text-primary font-bold" : ""
          } hover:text-primary hover:font-bold cursor-pointer`}
        >
          How it Works?
        </li>
        <ThemeToggle />
      </ul>

      <div className="flex items-center justify-center gap-2">
        <UserButton />
        {user?.user?.firstName}
      </div>
    </div>
  );
};

export default Header;
