"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { DIALOG_TYPES } from "@/constants/dialog";

import NotFound from "@/components/common/not-found";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import useDialog from "@/hooks/useDialog";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import { useGetJobOpening, useGetJobOpenings } from "@/useCases/JobOpening";

import { CardJob, JobDetail } from "./components";
import SkeletonJobDetail from "./components/skeleton-job-detail";
import { SkeletonPages } from "./section";

const HomepageFeature: React.FC = () => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const { openDialog, type, closeDialog } = useDialog();

  const [slug, setSlug] = useState("");

  const queryAll = useGetJobOpenings({});
  const queryDetail = useGetJobOpening(slug || "");

  useEffect(() => {
    if (isMobile) {
      setSlug("");
    } else {
      if (queryAll.data && queryAll.data.length > 0 && !slug) {
        setSlug(queryAll.data[0].slug);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryAll.data, isMobile]);

  const handleCardClick = (itemSlug: string) => {
    if (isMobile) {
      openDialog(DIALOG_TYPES.MOBILE_JOB_DETAIL);
      setSlug(itemSlug);
      return;
    }
    setSlug(itemSlug);
  };

  const handleJobApply = () => {
    if (isMobile) {
      closeDialog();
    }
    router.push(`/${queryDetail.data?.slug}/apply`);
  };

  return (
    <main className="container mx-auto grid min-h-[90svh] grid-cols-12 gap-4 px-4 py-6 lg:gap-6 lg:py-10">
      {queryAll.isLoading ? (
        <SkeletonPages />
      ) : queryAll.data && queryAll.data.length > 0 ? (
        <>
          <ScrollArea className="col-span-12 h-[85svh] w-full lg:col-span-4">
            <div className="flex flex-col gap-4">
              {queryAll.data.map((item) => (
                <CardJob
                  key={item.id}
                  item={item}
                  slug={slug || ""}
                  handleClick={() => handleCardClick(item.slug)}
                />
              ))}
            </div>
          </ScrollArea>
          <div className="border-neutral-40 col-span-8 hidden h-full flex-col gap-4 rounded-[8px] border lg:flex">
            {queryDetail.isLoading ? (
              <SkeletonJobDetail />
            ) : (
              <JobDetail
                queryDetail={queryDetail}
                handleApplyJob={handleJobApply}
              />
            )}
          </div>
        </>
      ) : (
        <div className="col-span-12 flex h-full flex-col items-center justify-center">
          <NotFound />
        </div>
      )}
      <Dialog
        open={type === DIALOG_TYPES.MOBILE_JOB_DETAIL && slug !== ""}
        onOpenChange={(open) => {
          if (!open) {
            closeDialog();
            setSlug("");
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          {queryDetail.isLoading ? (
            <SkeletonJobDetail />
          ) : (
            <JobDetail
              queryDetail={queryDetail}
              handleApplyJob={handleJobApply}
            />
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default HomepageFeature;
