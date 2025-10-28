import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

import { JOBOPENING_QKEY } from ".";

const useGetJobOpenings = ({ search }: { search?: string }) => {
  const query = useQuery({
    queryKey: [...JOBOPENING_QKEY.ALL, { search }],
    queryFn: async () => {
      const response = await client.api["job-opening"]["$get"]({
        query: {
          search: search,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      return await response.json();
    },
    select: (data) => {
      return data.data;
    },
  });

  return query;
};

export default useGetJobOpenings;
