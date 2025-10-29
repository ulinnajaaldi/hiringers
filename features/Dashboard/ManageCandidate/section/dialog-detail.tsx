"use client";

import React from "react";

import { format } from "date-fns";
import Image from "next/image";

import { DIALOG_TYPES } from "@/constants/dialog";

import { ImageZoom } from "@/components/common/image-zoom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import useDialog from "@/hooks/useDialog";

import { firstLetterUppercase } from "@/lib/text";
import { cn } from "@/lib/utils";

import { useManageCandidate } from "../hook";

const DialogDetail: React.FC = () => {
  const { type, closeDialog } = useDialog();
  const { queryDetailCandidate, isZoomed, setIsZoomed } = useManageCandidate();

  return (
    <Dialog
      open={type === DIALOG_TYPES.CANDIDATE_DETAIL}
      onOpenChange={() => {
        if (!isZoomed) {
          closeDialog();
        }
      }}
    >
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Candidate Detail</DialogTitle>
          <DialogDescription>
            Detailed information about the candidate.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className={cn("h-[70svh] w-full")}>
          {queryDetailCandidate.isLoading ? (
            <div className="flex flex-col gap-4 px-6 py-4">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-32 w-32 rounded-lg" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-6 w-1/5" />
            </div>
          ) : (
            <div className="relative flex w-full flex-col gap-4 px-6 py-4">
              {queryDetailCandidate.data?.opening.minimum_profile_information
                ?.filter((info) => !info.validation.is_off)
                .map((info) => {
                  const application = queryDetailCandidate.data?.application;
                  let value: string | null = null;
                  let isPhotoProfile = false;

                  if (application) {
                    switch (info.key) {
                      case "full_name":
                        value = application.full_name;
                        break;
                      case "email":
                        value = application.email;
                        break;
                      case "phone":
                      case "phone_number":
                        value = application.phone;
                        break;
                      case "date_of_birth":
                        value = application.date_of_birth
                          ? format(
                              new Date(application.date_of_birth),
                              "dd MMMM yyyy",
                            )
                          : null;
                        break;
                      case "domicile":
                        value = application.domicile;
                        break;
                      case "gender":
                        value = firstLetterUppercase(application.gender || "");
                        break;
                      case "linkedin_link":
                        value = application.linkedin_link;
                        break;
                      case "photo_profile":
                        value = application.photo_profile_url;
                        isPhotoProfile = true;
                        break;
                      default:
                        value = null;
                    }
                  }

                  return (
                    <div key={info.key}>
                      <h2 className="text-md text-neutral-90 mb-1 font-semibold">
                        {info.key
                          .split("_")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1),
                          )
                          .join(" ")}
                      </h2>
                      {isPhotoProfile && value ? (
                        <ImageZoom
                          isZoomed={isZoomed}
                          onZoomChange={setIsZoomed}
                        >
                          <div className="relative h-32 w-32 overflow-hidden rounded-lg">
                            <Image
                              src={value}
                              alt="Candidate photo profile"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <p className="text-s">Swipe Up to Zoom Out</p>
                        </ImageZoom>
                      ) : (
                        <p className="text-m text-neutral-80">
                          {value || "N/A"}
                        </p>
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={() => closeDialog()}>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDetail;
