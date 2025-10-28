"use client";

import React from "react";

import Image from "next/image";

import { useMediaQuery } from "@/hooks/useMediaQuery";

import { Button } from "../ui/button";

const NotFound: React.FC<{
  withAction?: boolean;
  actionTitle?: string;
  actionProps?: React.ComponentProps<typeof Button>;
}> = (props) => {
  const {
    withAction = false,
    actionTitle = "Create a new job",
    actionProps = {},
  } = props;

  const isMobile = useMediaQuery("(max-width: 1024px)");

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
      <Image
        src="/images/no-job-open.svg"
        alt="No job openings"
        className="h-auto max-w-full"
        width={isMobile ? 206 : 306}
        height={isMobile ? 200 : 300}
      />
      <div className="flex flex-col gap-1">
        <h2 className="text-l lg:text-heading-s text-neutral-90 font-bold">
          No job openings
        </h2>
        <p className="text-m lg:text-l text-neutral-90">
          Create a job opening now and start the candidate process.
        </p>
      </div>
      {withAction && (
        <Button variant="secondary" {...actionProps}>
          {actionTitle}
        </Button>
      )}
    </div>
  );
};

export default NotFound;
