import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { toast } from "@/hooks/useToast";

import { client } from "@/lib/hono";

import { JOBOPENING_QKEY } from ".";

type CreateJobOpeningResType = InferResponseType<
  (typeof client.api)["job-opening"]["$post"]
>;
type CreateJobOpeningReqType = InferRequestType<
  (typeof client.api)["job-opening"]["$post"]
>["json"];

const useCreateJobOpening = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    CreateJobOpeningResType,
    Error,
    CreateJobOpeningReqType
  >({
    mutationFn: async (json) => {
      const response = await client.api["job-opening"]["$post"]({ json });
      return await response.json();
    },
    onSuccess: (data) => {
      toast({
        variant: "success",
        title: data.message,
      });
      queryClient.invalidateQueries({ queryKey: JOBOPENING_QKEY.ALL });
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
