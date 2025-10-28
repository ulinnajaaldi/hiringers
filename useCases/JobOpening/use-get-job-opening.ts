import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

import { JOBOPENING_QKEY } from ".";

const useGetJobOpening = (slug: string) => {
  const query = useQuery({
    queryKey: JOBOPENING_QKEY.DETAIL(slug),
    queryFn: async () => {
      const response = await client.api["job-opening"][":slug"]["$get"]({
        param: { slug },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch job opening");
      }

      return await response.json();
    },
    select: (data) => {
      return data.data;
    },
    enabled: !!slug,
  });

  return query;
};

export default useGetJobOpening;
