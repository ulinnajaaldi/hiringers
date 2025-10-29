"use client";

import React, { createContext, useContext } from "react";

import useDialog from "@/hooks/useDialog";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import {
  useGetJobApplication,
  useGetJobApplications,
} from "@/useCases/JobApplication";

import { generateColumns } from "../components/table-column";

interface ManageCandidateProps {
  isZoomed: boolean;
  setIsZoomed: (zoomed: boolean) => void;
  isMobile: boolean;
  queryDetail: ReturnType<typeof useGetJobApplications>;
  queryDetailCandidate: ReturnType<typeof useGetJobApplication>;
  columns: ReturnType<typeof generateColumns>;
}

const ManageCandidate = createContext<ManageCandidateProps | undefined>(
  undefined,
);

export const ManageCandidateStore: React.FC<{
  children: React.ReactNode;
  params: { slug: string };
}> = ({ children, params }) => {
  const { slug } = params;

  const { id } = useDialog();
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const [isZoomed, setIsZoomed] = React.useState(false);

  const queryDetail = useGetJobApplications({ slug });
  const queryDetailCandidate = useGetJobApplication(id || "");

  const columns = React.useMemo(() => {
    if (!queryDetail.data?.job_opening.minimum_profile_information) {
      return [];
    }
    return generateColumns(
      queryDetail.data.job_opening.minimum_profile_information,
    );
  }, [queryDetail.data]);

  return (
    <ManageCandidate.Provider
      value={{
        isZoomed,
        setIsZoomed,
        isMobile,
        queryDetail,
        queryDetailCandidate,
        columns,
      }}
    >
      {children}
    </ManageCandidate.Provider>
  );
};

export const useManageCandidate = () => {
  const context = useContext(ManageCandidate);
  if (context === undefined) {
    throw new Error("useManageCandidate must be used within a ManageCandidate");
  }
  return context;
};
