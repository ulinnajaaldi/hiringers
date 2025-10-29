import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

import { JOBAPPLICATION_QKEY } from ".";

const useGetJobApplication = (id: string) => {
  const query = useQuery({
    queryKey: JOBAPPLICATION_QKEY.CANDIDATE_DETAIL(id),
    queryFn: async () => {
      const response = await client.api["job-application"][":id"]["$get"]({
        param: {
          id,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch job opening");
      }

      return await response.json();
    },
    select: (data) => {
      return data.data;
    },
    enabled: !!id,
  });

  return query;
};

export default useGetJobApplication;
