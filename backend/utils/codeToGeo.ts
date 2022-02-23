import { forwardApi } from "../service";

export const codeToGeo = async (postalCode: string) => {
  const result = await forwardApi.get(
    `?searchVal=${postalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`
  );
  return result.data;
};
