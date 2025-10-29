import React from "react";

import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { mappingJobTypeDisplayText } from "@/lib/text";

import { useGetJobOpening } from "@/useCases/JobOpening";

interface JobDetailProps {
  queryDetail: ReturnType<typeof useGetJobOpening>;
  handleApplyJob: () => void;
}

const JobDetail: React.FC<JobDetailProps> = ({
  queryDetail,
  handleApplyJob,
}) => {
  return (
    <div className="flex flex-col gap-6 py-6">
      <div className="flex flex-col items-start justify-between gap-2 px-6 lg:flex-row lg:gap-6">
        <div className="flex items-start gap-2 lg:gap-6">
          <div className="relative h-12 w-12 shrink-0">
            <Image
              src={
                queryDetail.data?.company.photo_url || "/images/placeholder.svg"
              }
              alt={queryDetail.data?.company.name || "Rakamin"}
              width={240}
              height={240}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Badge variant="success">
              {mappingJobTypeDisplayText[queryDetail.data?.type || ""] || ""}
            </Badge>
            <div className="flex flex-col items-start">
              <p className="text-neutral-90 text-xl font-bold">
                {queryDetail.data?.title}
              </p>
              <p className="text-m text-neutral-70">
                {queryDetail.data?.company.name}
              </p>
            </div>
          </div>
        </div>
        <Button variant="secondary" onClick={handleApplyJob}>
          Apply
        </Button>
      </div>
      <Separator dashed />
      <ScrollArea className="h-[65svh] px-6">
        <p className="text-m text-neutral-90 whitespace-pre-line">
          {queryDetail.data?.description}
        </p>
      </ScrollArea>
    </div>
  );
};

export default JobDetail;
