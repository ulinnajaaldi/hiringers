import React from "react";

import JobApplyFeature from "@/features/Root/JobApply";
import { JobApplyStore } from "@/features/Root/JobApply/hook";

const JobApply: React.FC<{ params: Promise<{ slug: string }> }> = async ({
  params,
}) => {
  const { slug } = await params;
  return (
    <JobApplyStore params={{ slug }}>
      <JobApplyFeature />
    </JobApplyStore>
  );
};

export default JobApply;
