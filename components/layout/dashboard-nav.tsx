"use client";

import React from "react";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const DashboardNav: React.FC = () => {
  const pathname = usePathname();

  const isAdmin = pathname === "/admin";

  return (
    <nav className="flex h-16 items-center justify-between border-b px-5">
      {isAdmin ? (
        <h1 className="text-xl font-bold text-neutral-100">Job List</h1>
      ) : (
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin">Job List</Link>
          </Button>
          <ChevronRight className="size-6 text-neutral-100" />
          <Button variant="outline" className="shadow-none" disabled>
            Manage Candidate
          </Button>
        </div>
      )}
      <Avatar>
        <AvatarImage
          src="https://github.com/ulinnajaaldi.png"
          alt="@ulinnajaaldi"
        />
        <AvatarFallback>UA</AvatarFallback>
      </Avatar>
    </nav>
  );
};

export default DashboardNav;
