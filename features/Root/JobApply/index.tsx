"use client";

import React from "react";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { DIALOG_TYPES } from "@/constants/dialog";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import useDialog from "@/hooks/useDialog";

import { PhotoCapture } from "./components";
import { useJobApply } from "./hook";
import { FormJobApply, SkeletonPage } from "./section";

const JobApplyFeature: React.FC = () => {
  const { closeDialog, type } = useDialog();

  const { isLoading, queryDetail, handlePhotoCapture } = useJobApply();

  return (
    <main className="container mx-auto flex min-h-screen flex-col gap-4 border-x p-6 px-4 md:gap-6 lg:gap-6 lg:p-10">
      {isLoading ? (
        <SkeletonPage />
      ) : (
        <>
          <div className="flex flex-col justify-between gap-1 lg:flex-row lg:items-center lg:gap-0">
            <div className="flex items-start gap-4 md:items-center">
              <Button size="icon-sm" variant="outline" asChild>
                <Link href="/">
                  <ArrowLeft />
                </Link>
              </Button>
              <p className="text-xl font-bold text-neutral-100">
                Apply {queryDetail.data?.title} at Rakamin
              </p>
            </div>
            <p className="text-m text-neutral-90">
              &#x2139; This field required to fill
            </p>
          </div>
          <FormJobApply />
        </>
      )}

      <Dialog
        open={type === DIALOG_TYPES.PHOTO_CAPTURE}
        onOpenChange={closeDialog}
      >
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Raise Your Hand to Capture </DialogTitle>
            <DialogDescription>
              We’ll take the photo once your hand pose is detected.
            </DialogDescription>
          </DialogHeader>
          <div>
            <PhotoCapture onPhotoCapture={handlePhotoCapture} />
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default JobApplyFeature;
