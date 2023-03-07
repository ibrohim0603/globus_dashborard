import { instance } from "../../axios";
import { useMutation } from "@tanstack/react-query";

export const useDeleteData = (url) => {
  return useMutation(() => instance.delete(url));
};
