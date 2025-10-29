import React from "react";

import { Metadata } from "next";

import ManageCandidateFeature from "@/features/Dashboard/ManageCandidate";
import { ManageCandidateStore } from "@/features/Dashboard/ManageCandidate/hook";

import { client } from "@/lib/hono";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const product = await client.api["job-application"]["list"][":slug"]["$get"]({
    param: {
      slug: slug,
    },
  });

  const results = await product.json();

  return {
    // @ts-ignore
    title: results.data?.job_opening?.title || "Manage Candidate",
  };
}

const ManageCandidate: React.FC<{
  params: Promise<{ slug: string }>;
}> = async ({ params }) => {
  const { slug } = await params;

  return (
    <ManageCandidateStore params={{ slug }}>
      <ManageCandidateFeature />
    </ManageCandidateStore>
  );
};

export default ManageCandidate;
