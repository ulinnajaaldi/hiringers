"use client";

import React from "react";

import NotFound from "@/app/not-found";
import Image from "next/image";

import { DataTable } from "@/components/common/data-table";

import { cn } from "@/lib/utils";

import { columnPinning } from "./components/table-column";
import { useManageCandidate } from "./hook";
import { DialogDetail, SkeletonPage } from "./section";

const ManageCandidateFeature: React.FC = () => {
  const { queryDetail, isMobile, columns } = useManageCandidate();

  if (queryDetail.isLoading) {
    return <SkeletonPage />;
  }

  if (queryDetail.isError) {
    return <NotFound />;
  }

  return (
    <div className="mx-auto flex h-full min-h-[90svh] flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <h1 className="text-xl font-bold text-neutral-100">
        {queryDetail.data?.job_opening.title}
      </h1>
      <div
        className={cn(
          "border-neutral-40 flex flex-col items-center justify-center rounded-[8px] border p-6 text-center",
          queryDetail.data?.applications.length === 0 ? "flex-1" : "",
        )}
      >
        {queryDetail.data?.applications.length === 0 ? (
          <>
            <div className="relative h-full">
              <Image
                src="/images/no-candidate.svg"
                alt="No candidates found"
                width={isMobile ? 206 : 306}
                height={isMobile ? 200 : 300}
                className="h-auto max-w-full"
              />
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className="text-l font-bold">No candidates found</p>
              <p className="text-m text-neutral-70">
                Share your job vacancies so that more candidates will apply.
              </p>
            </div>
          </>
        ) : (
          <div className="relative w-full">
            <DataTable
              columns={columns}
              data={queryDetail.data?.applications || []}
              columnPinning={columnPinning}
            />
          </div>
        )}
      </div>
      <DialogDetail />
    </div>
  );
};

export default ManageCandidateFeature;
