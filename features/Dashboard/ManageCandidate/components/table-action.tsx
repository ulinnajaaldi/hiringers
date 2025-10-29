import React from "react";

import { DIALOG_TYPES } from "@/constants/dialog";

import useDialog from "@/hooks/useDialog";

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
