import instance from "../../axios";
import { useQuery } from "@tanstack/react-query";

export const usePostData = (url) => {
  return useQuery((data) => instance.post(url, data));
};
