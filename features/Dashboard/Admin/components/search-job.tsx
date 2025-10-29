"use client";

import React from "react";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { useJobOpening } from "../hook";

const SearchJob: React.FC = () => {
  const { value, search, setSearch, queryAll } = useJobOpening();
  return (
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
  );
};

export default SearchJob;
