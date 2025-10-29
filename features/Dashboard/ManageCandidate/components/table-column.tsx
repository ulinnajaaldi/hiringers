"use client";

import * as React from "react";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { InferResponseType } from "hono";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { client } from "@/lib/hono";
import { firstLetterUppercase } from "@/lib/text";

import { TableAction, TableActionOption } from "./table-action";

export type ResponseType = InferResponseType<
  (typeof client.api)["job-application"]["list"][":slug"]["$get"],
  200
>["data"]["applications"][0];

export type MinimumProfileInfo = {
  key: string;
  validation: {
    required: boolean;
    is_off?: boolean;
  };
};

export const columnPinning = {
  left: ["full_name"],
  right: [],
};

const columnConfigMap: Record<
  string,
  {
    header: string;
    cell?: (row: ResponseType) => React.ReactNode;
  }
> = {
  full_name: {
    header: "FULL NAME",
  },
  status: {
    header: "Application Status",
  },
  email: {
    header: "EMAIL ADDRESS",
  },
  phone: {
    header: "PHONE NUMBERS",
  },
  date_of_birth: {
    header: "DATE OF BIRTH",
    cell: (row) => {
      const value = row.date_of_birth
        ? format(new Date(row.date_of_birth), "dd MMMM yyyy")
        : null;
      return <span>{value}</span>;
    },
  },
  domicile: {
    header: "DOMICILE",
  },
  gender: {
    header: "GENDER",
    cell: (row) => <span>{firstLetterUppercase(row.gender || "")}</span>,
  },
  linkedin_link: {
    header: "LINK LINKEDIN",
    cell: (row) => (
      <a
        href={row.linkedin_link || ""}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary"
      >
        {row.linkedin_link}
      </a>
    ),
  },
};

export const generateColumns = (
  minimumProfileInfo: MinimumProfileInfo[],
): ColumnDef<ResponseType>[] => {
  const activeFields = minimumProfileInfo.filter(
    (field) => !field.validation.is_off,
  );

  const dynamicColumns: ColumnDef<ResponseType>[] = activeFields
    .map((field) => {
      const config = columnConfigMap[field.key];
      if (!config) return null;

      if (field.key === "full_name") {
        return {
          id: "full_name",
          header: ({ table }) => (
            <div className="flex items-center gap-2.5 md:min-w-[178px]">
              <Checkbox
                checked={
                  table.getIsAllPageRowsSelected() ||
                  (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                  table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
              />
              <p className="text-s font-bold text-neutral-100 uppercase">
                {config.header}
              </p>
            </div>
          ),
          cell: ({ row }) => (
            <div className="flex items-center gap-2">
              <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
              />
              <TableAction
                full_name={row.original.full_name || ""}
                id={row.original.id}
              />
            </div>
          ),
        } as ColumnDef<ResponseType>;
      }

      return {
        accessorKey: field.key,
        header: config.header,
        ...(config.cell && {
          cell: ({ row }) => config.cell!(row.original),
        }),
      } as ColumnDef<ResponseType>;
    })
    .filter(Boolean) as ColumnDef<ResponseType>[];

  const statusColumn: ColumnDef<ResponseType> = {
    accessorKey: "status",
    header: columnConfigMap.status.header,
    cell: ({ row }) => (
      <span className="capitalize">
        <Badge variant="draft">
          {firstLetterUppercase(row.original.status || "")}
        </Badge>
      </span>
    ),
  };

  const tableActionOption: ColumnDef<ResponseType> = {
    id: "actions",
    header: "",
    cell: ({ row }) => <TableActionOption id={row.original.id} />,
  };

  return [...dynamicColumns, statusColumn, tableActionOption];
};
