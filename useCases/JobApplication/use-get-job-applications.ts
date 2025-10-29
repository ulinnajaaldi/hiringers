import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

import { JOBAPPLICATION_QKEY } from ".";

const useGetJobOpenings = ({ slug }: { slug: string }) => {
  const query = useQuery({
    queryKey: JOBAPPLICATION_QKEY.DETAIL(slug),
    queryFn: async () => {
      const response = await client.api["job-application"]["list"][":slug"][
        "$get"
      ]({
        param: {
          slug: slug,
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
    enabled: !!slug,
  });

  return query;
};

export default useGetJobOpenings;
