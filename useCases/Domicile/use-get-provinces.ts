import { DomicileServices } from "@/server/Domicile";
import { useQuery } from "@tanstack/react-query";

export const getProvincesQueryKey = ["provinces"];

const useGetProvinces = () => {
  const query = useQuery({
    queryKey: getProvincesQueryKey,
    queryFn: () => DomicileServices.getProvinces(),
  });

  return query;
};

export default useGetProvinces;
