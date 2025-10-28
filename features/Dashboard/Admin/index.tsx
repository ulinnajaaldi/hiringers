"use client";

import React from "react";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";

import CardCTAJobOpening from "@/components/common/card-cta-job-opening";
import NotFound from "@/components/common/not-found";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { CardJob, SkeletonCardJob } from "./components";
import { useJobOpening } from "./hook";
import { FormAdd } from "./sections";

const AdminFeature: React.FC = () => {
  const { value, search, setSearch, queryAll, handleOpenDialogJob } =
    useJobOpening();

  return (
    <main className="mx-auto grid min-h-auto grid-cols-12 gap-4 px-4 pt-6 pb-4 lg:min-h-[90svh] lg:gap-6 lg:px-6 lg:pt-9 lg:pb-6">
      <section className="col-span-12 h-fit lg:order-2 lg:col-span-3">
        <CardCTAJobOpening
          actionDisabled={queryAll.isLoading}
          handleOpenDialogJob={handleOpenDialogJob}
        />
      </section>

      <section className="col-span-12 flex h-full flex-col gap-4 lg:order-1 lg:col-span-9">
        <InputGroup>
          <InputGroupInput
            placeholder="Search by job details"
            value={search || ""}
            onChange={(e) => setSearch(e.target.value)}
            disabled={queryAll.isLoading}
          />
          <InputGroupAddon align="inline-end">
            <button
              onClick={() => {
                if (value) {
                  setSearch("");
                }
              }}
              disabled={queryAll.isLoading}
              className="mr-0.5 cursor-pointer"
            >
              {value ? (
                <XMarkIcon className="text-neutral-60 hover:text-primary size-6 stroke-1" />
              ) : (
                <MagnifyingGlassIcon className="text-primary size-6 stroke-1" />
              )}
            </button>
          </InputGroupAddon>
        </InputGroup>

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
