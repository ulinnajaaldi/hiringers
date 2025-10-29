"use client";

import React, { Suspense } from "react";

import CardCTAJobOpening from "@/components/common/card-cta-job-opening";
import NotFound from "@/components/common/not-found";

import { CardJob, SearchJob, SkeletonCardJob } from "./components";
import { useJobOpening } from "./hook";
import { FormAdd } from "./sections";

const AdminFeature: React.FC = () => {
  const { queryAll, handleOpenDialogJob } = useJobOpening();

  return (
    <main className="mx-auto grid min-h-auto grid-cols-12 gap-4 px-4 pt-6 pb-4 lg:min-h-[90svh] lg:gap-6 lg:px-6 lg:pt-9 lg:pb-6">
      <section className="col-span-12 h-fit lg:order-2 lg:col-span-3">
        <CardCTAJobOpening
          actionDisabled={queryAll.isLoading}
          handleOpenDialogJob={handleOpenDialogJob}
        />
      </section>

      <section className="col-span-12 flex h-full flex-col gap-4 lg:order-1 lg:col-span-9">
        <Suspense>
          <SearchJob />
        </Suspense>

        <div className="flex flex-col gap-4">
          {queryAll.isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <SkeletonCardJob key={index} />
            ))
          ) : queryAll.data && queryAll.data.length > 0 ? (
            queryAll.data.map((item) => <CardJob key={item.id} item={item} />)
          ) : (
            <NotFound
              withAction
              actionTitle="Create a new job"
              actionProps={{
                onClick: handleOpenDialogJob,
              }}
            />
          )}
        </div>
      </section>

      <FormAdd />
    </main>
  );
};

export default AdminFeature;
