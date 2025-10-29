export { default as useCreateJobOpening } from "./use-create-job-opening";
export { default as useGetJobOpenings } from "./use-get-job-openings";
export { default as useGetJobOpeningsAll } from "./use-get-job-openings-all";
export { default as useGetJobOpening } from "./use-get-job-opening";

export const JOBOPENING_QKEY = {
  ALL: ["job-openings"],
  ALL_ADMIN: ["job-openings-all"],
  DETAIL: (slug: string) => ["job-opening", { slug }],
};
