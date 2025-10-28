import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { toast } from "@/hooks/useToast";

import { client } from "@/lib/hono";

import { JOBAPPLICATION_QKEY } from ".";

type CreateJobOpeningResType = InferResponseType<
  (typeof client.api)["job-application"]["$post"]
>;
type CreateJobOpeningReqType = InferRequestType<
  (typeof client.api)["job-application"]["$post"]
>["form"];

const useCreateJobOpening = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    CreateJobOpeningResType,
    Error,
    CreateJobOpeningReqType
  >({
    mutationFn: async (form) => {
      const response = await client.api["job-application"]["$post"]({ form });
      return await response.json();
    },
    onSuccess: (data) => {
      toast({
        variant: "success",
        title: data.message,
      });
      queryClient.invalidateQueries({ queryKey: JOBAPPLICATION_QKEY.ALL });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: error.name,
      });
      console.log(error);
    },
  });

  return mutation;
};

export default useCreateJobOpening;
