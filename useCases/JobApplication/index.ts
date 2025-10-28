export { default as useCreateJobApplication } from "./use-create-job-application";
// export { default as useGetJobApplications } from "./use-get-job-applications";
// export { default as useGetJobApplication } from "./use-get-job-application";

export const JOBAPPLICATION_QKEY = {
  ALL: ["job-applications"],
  DETAIL: (slug: string) => ["job-application", { slug }],
};
