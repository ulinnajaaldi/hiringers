import React from "react";

import type { Metadata } from "next";

import JobApplyFeature from "@/features/Root/JobApply";
import { JobApplyStore } from "@/features/Root/JobApply/hook";

import { client } from "@/lib/hono";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const product = await client.api["job-opening"][":slug"]["$get"]({
    param: { slug },
  });

  const results = await product.json();

  return {
    title: results.data.title,
  };
}

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
