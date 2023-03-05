import { instance } from "../../axios";
import { useQuery } from "@tanstack/react-query";

export const useGetData = (keys, url, options) => {
  return useQuery(keys, () => instance.get(url).then((r) => r?.data), {
    ...options,
  });
};
