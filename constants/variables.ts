import type { ProfileInformationField } from "@/types/Variables";

export const JOB_TYPE = [
  { label: "Full-time", value: "full_time" },
  { label: "Part-time", value: "part_time" },
  { label: "Contract", value: "contract" },
  { label: "Internship", value: "internship" },
  { label: "Freelance", value: "freelance" },
];

export const PROFILE_INFORMATION_FIELDS: ProfileInformationField[] = [
  {
    title: "Full Name",
    fields: {
      mandatory: "active",
      optional: "disabled",
      off: "disabled",
    },
  },
  {
    title: "Photo Profile",
    fields: {
      mandatory: "active",
      optional: "disabled",
      off: "disabled",
    },
  },
  {
    title: "Gender",
    fields: {
      mandatory: "active",
      optional: "active",
      off: "active",
    },
  },
  {
    title: "Domicile",
    fields: {
      mandatory: "active",
      optional: "active",
      off: "active",
    },
  },
  {
    title: "Email",
    fields: {
      mandatory: "active",
      optional: "disabled",
      off: "disabled",
    },
  },
  {
    title: "Phone number",
    fields: {
      mandatory: "active",
      optional: "active",
      off: "active",
    },
  },
  {
    title: "Linkedin link",
    fields: {
      mandatory: "active",
      optional: "active",
      off: "active",
    },
  },
  {
    title: "Date of birth",
    fields: {
      mandatory: "active",
      optional: "active",
      off: "active",
    },
  },
];
