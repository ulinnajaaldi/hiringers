"use client";

import React, { createContext, useContext, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";

import { DIALOG_TYPES } from "@/constants/dialog";

import useDialog from "@/hooks/useDialog";

import { createFieldValidationJobOpening } from "@/lib/form";

import {
  useCreateJobOpening,
  useGetJobOpeningsAll,
} from "@/useCases/JobOpening";

import { formSchema, FormSchemaType } from "../types";

interface JobOpeningProps {
  value: string | null;
  search: string | null;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  isDraft: boolean;
  setIsDraft: React.Dispatch<React.SetStateAction<boolean>>;
  mutationAdd: ReturnType<typeof useCreateJobOpening>;
  queryAll: ReturnType<typeof useGetJobOpeningsAll>;
  form: ReturnType<typeof useForm<FormSchemaType>>;
  onSubmit: (values: FormSchemaType) => void;
  handleOpenDialogJob: () => void;
}

const JobOpening = createContext<JobOpeningProps | undefined>(undefined);

export const JobOpeningStore: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { openDialog, closeDialog } = useDialog();
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 300);
  const [isDraft, setIsDraft] = useState<boolean>(false);

  const mutationAdd = useCreateJobOpening();
  const queryAll = useGetJobOpeningsAll({
    search: value ? value : undefined,
  });

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      type: "",
      description: "",
      minimum_profile_information: {
        full_name: "mandatory",
        photo_profile: "mandatory",
        gender: "mandatory",
        domicile: "mandatory",
        email: "mandatory",
        phone_number: "mandatory",
        linkedin_link: "mandatory",
        date_of_birth: "mandatory",
      },
    },
  });

  const onSubmit = (values: FormSchemaType) => {
    const output = {
      ...values,
      status: (isDraft ? "draft" : "active") as "active" | "inactive" | "draft",
      minimum_profile_information: [
        {
          key: "full_name",
          validation: createFieldValidationJobOpening(
            values.minimum_profile_information.full_name,
          ),
        },
        {
          key: "photo_profile",
          validation: createFieldValidationJobOpening(
            values.minimum_profile_information.photo_profile,
          ),
        },
        {
          key: "gender",
          validation: createFieldValidationJobOpening(
            values.minimum_profile_information.gender,
          ),
        },
        {
          key: "domicile",
          validation: createFieldValidationJobOpening(
            values.minimum_profile_information.domicile,
          ),
        },
        {
          key: "email",
          validation: createFieldValidationJobOpening(
            values.minimum_profile_information.email,
          ),
        },
        {
          key: "phone_number",
          validation: createFieldValidationJobOpening(
            values.minimum_profile_information.phone_number,
          ),
        },
        {
          key: "linkedin_link",
          validation: createFieldValidationJobOpening(
            values.minimum_profile_information.linkedin_link,
          ),
        },
        {
          key: "date_of_birth",
          validation: createFieldValidationJobOpening(
            values.minimum_profile_information.date_of_birth,
          ),
        },
      ],
    };

    mutationAdd.mutate(output, {
      onSuccess: () => {
        closeDialog();
      },
    });
  };

  const handleOpenDialogJob = () => {
    openDialog(DIALOG_TYPES.CREATE_JOB);
  };

  return (
    <JobOpening.Provider
      value={{
        value,
        search,
        setSearch,
        isDraft,
        setIsDraft,
        mutationAdd,
        queryAll,
        form,
        onSubmit,
        handleOpenDialogJob,
      }}
    >
      {children}
    </JobOpening.Provider>
  );
};

export const useJobOpening = () => {
  const context = useContext(JobOpening);
  if (context === undefined) {
    throw new Error("useJobOpening must be used within a JobOpening");
  }
  return context;
};
