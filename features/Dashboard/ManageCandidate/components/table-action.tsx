import React from "react";

import { Ellipsis } from "lucide-react";

import { DIALOG_TYPES } from "@/constants/dialog";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import useDialog from "@/hooks/useDialog";
import { toast } from "@/hooks/useToast";

export const TableAction: React.FC<{
  full_name: string;
  id: string;
}> = ({ full_name, id }) => {
  const { openDialog } = useDialog();

  return (
    <button
      className="text-m text-neutral-90 hover:text-primary w-full cursor-pointer text-start transition-colors hover:underline"
      onClick={() => openDialog(DIALOG_TYPES.CANDIDATE_DETAIL, id)}
    >
      {full_name}
    </button>
  );
};

export const TableActionOption: React.FC<{
  id: string;
}> = ({ id }) => {
  const { openDialog } = useDialog();
  return (
    <div className="flex w-full justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon-sm" className="bg-transparent">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Action</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => openDialog(DIALOG_TYPES.CANDIDATE_DETAIL, id)}
          >
            Detail
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              toast({
                variant: "info",
                title: "Action Manage",
              })
            }
          >
            Manage
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
