import { instance } from "../../axios";
import { useMutation } from "@tanstack/react-query";

export const useDeleteData = (url) => {
  return useMutation((data) => {
    instance.delete(data.id ? `${url + "/" + data.id}` : url);
  });
};
