"use client";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserButton, useUser } from "@clerk/nextjs";
import { Cross, Menu, MenuIcon, Navigation, X, XIcon } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const [nav, setNav] = useState(false);
  const router = useRouter();

  const toggleNav = () => {
    setNav(!nav);
  };

  const closeNav = () => {
    setNav(false);
  };
  const user = useUser();
  const menuVariants = {
    open: {
      x: 0,
      transition: {
        stiffness: 20,
        damping: 15,
      },
    },
    closed: {
      x: "-100%",
      transition: {
        stiffness: 20,
        damping: 15,
      },
    },
  };

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
          onClick={() => router.push("/dashboard")}
          className={`${
            pathname === `/dashboard` ? "text-primary font-bold" : ""
          } hover:text-primary hover:font-bold cursor-pointer`}
        >
          Dashboard
        </li>
        <li
          onClick={() => router.push("/question")}
          className={`${
            pathname === "/dashboard/questions" ? "text-primary font-bold" : ""
          } hover:text-primary hover:font-bold cursor-pointer`}
        >
          Questions
        </li>
        <li
          onClick={() => router.push("/premium")}
          className={`${
            pathname === "/dashboard/premium" ? "text-primary font-bold" : ""
          } hover:text-primary hover:font-bold cursor-pointer`}
        >
          Premium
        </li>
        <li
          onClick={() => router.push("/how")}
          className={`${
            pathname === "/dashboard/how" ? "text-primary font-bold" : ""
          } hover:text-primary hover:font-bold cursor-pointer`}
        >
          How it Works?
        </li>
      </ul>
      <div className="md:hidden flex gap-3 justify-center items-center">
        <ThemeToggle />
        <div onClick={toggleNav} className="z-50">
          {nav ? (
            <XIcon size={30} className="text-black" />
          ) : (
            <MenuIcon size={30} />
          )}
        </div>
      </div>

      <div className=" hidden md:flex items-center justify-center gap-3">
        <ThemeToggle />
        <UserButton />
        <div className="hidden md:block">{user?.user?.firstName}</div>
      </div>

      <motion.div
        initial={false}
        animate={nav ? "open" : "closed"}
        variants={menuVariants}
        className="fixed left-0 top-0 w-full min-h-screen z-40 bg-secondary text-black"
      >
        <div className="mt-10 pl-7 flex flex-col gap-2 ">
          <UserButton height={100}/>
          <div className="text-black text-3xl text-bold">{user?.user?.firstName}</div>
        </div>
        <ul className="font-semibold text-2xl space-y-8 mt-5 text-left pl-7">
          <li className="w-full border-blue-500  rounded-sm ">
            <Link
              href="/dashboard" // Corrected to 'href'
              onClick={closeNav}
              className="cursor-pointer"
            >
              Dashboard
            </Link>
          </li>
          <li className="w-full border-blue-500  rounded-sm  ">
            <Link
              href="/question" // Corrected to 'href'
              onClick={closeNav}
              className="cursor-pointer"
            >
              Question
            </Link>
          </li>
          <li className="w-full border-blue-500  rounded-sm  ">
            <Link
              href="/contact" // Corrected to 'href'
              onClick={closeNav}
              className="cursor-pointer"
            >
              Premium
            </Link>
          </li>
          <li className="w-full border-blue-500 rounded-sm  ">
            <Link
              href="/contact" // Corrected to 'href'
              onClick={closeNav}
              className="cursor-pointer"
            >
              How it Works?
            </Link>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default Header;
