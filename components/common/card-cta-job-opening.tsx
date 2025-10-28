import React from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";

import { Button } from "../ui/button";

interface CardCTAJobOpeningProps {
  handleOpenDialogJob: () => void;
  actionDisabled: boolean;
}

const CardCTAJobOpening: React.FC<CardCTAJobOpeningProps> = ({
  handleOpenDialogJob,
  actionDisabled,
}) => {
  const isMobile = useMediaQuery("(max-width: 1024px)");

  return (
    <div
      className="flex w-full flex-col gap-6 overflow-hidden rounded-2xl p-6"
      style={{
        backgroundImage: "url('/images/bg-card-cta.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-l text-neutral-40 font-bold lg:text-xl">
          Recruit the best candidates
        </h2>
        <p className="text-s lg:text-m text-neutral-10 font-bold">
          Create jobs, invite, and hire with ease
        </p>
      </div>
      <Button
        size={isMobile ? "default" : "lg"}
        disabled={actionDisabled}
        onClick={handleOpenDialogJob}
      >
        Create a new job
      </Button>
    </div>
  );
};

export default CardCTAJobOpening;
