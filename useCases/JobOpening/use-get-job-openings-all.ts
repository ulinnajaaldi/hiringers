import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

import { JOBOPENING_QKEY } from ".";

const useGetJobOpeningsAll = ({ search }: { search?: string }) => {
  const query = useQuery({
    queryKey: [...JOBOPENING_QKEY.ALL_ADMIN, { search }],
    queryFn: async () => {
      const response = await client.api["job-opening"]["all"]["$get"]({
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

export default useGetJobOpeningsAll;
