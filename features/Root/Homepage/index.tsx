"use client";

import React, { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";

import NotFound from "@/components/common/not-found";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useGetJobOpening, useGetJobOpenings } from "@/useCases/JobOpening";

import { CardJob, JobDetail } from "./components";
import SkeletonJobDetail from "./components/skeleton-job-detail";
import { SkeletonPages } from "./section";

const HomepageFeature: React.FC = () => {
  const router = useRouter();

  const [slug, setSlug] = useQueryState("");

  const queryAll = useGetJobOpenings({});
  const queryDetail = useGetJobOpening(slug || "");

  useEffect(() => {
    if (queryAll.data && queryAll.data.length > 0 && !slug) {
      setSlug(queryAll.data[0].slug);
    }
  }, [queryAll.data, slug, setSlug]);

  return (
    <main className="container mx-auto grid min-h-[90svh] grid-cols-12 gap-4 py-6 lg:gap-6 lg:py-10">
      {queryAll.isLoading ? (
        <SkeletonPages />
      ) : queryAll.data && queryAll.data.length > 0 ? (
        <>
          <ScrollArea className="col-span-4 h-[85svh] w-full">
            <div className="flex flex-col gap-4">
              {queryAll.data.map((item) => (
                <CardJob
                  key={item.id}
                  item={item}
                  slug={slug || ""}
                  handleClick={() => setSlug(item.slug)}
                />
              ))}
            </div>
          </ScrollArea>
          <div className="border-neutral-40 col-span-8 flex h-full flex-col gap-4 rounded-[8px] border">
            {queryDetail.isLoading ? (
              <SkeletonJobDetail />
            ) : (
              <JobDetail
                queryDetail={queryDetail}
                handleApplyJob={() => {
                  router.push(`/${queryDetail.data?.slug}/apply`);
                }}
              />
            )}
          </div>
        </>
      ) : (
        <div className="col-span-12 flex h-full flex-col items-center justify-center">
          <NotFound />
        </div>
      )}
    </main>
  );
};

export default HomepageFeature;
