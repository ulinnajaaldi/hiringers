import { ProvinceResponse } from "@/domains/Domicile";

import { domicileApi } from "./config";

export const DomicileServices = {
  getProvinces: async () => {
    const response = await domicileApi.get<ProvinceResponse>("/provinsi");
    return response.data;
  },
};
