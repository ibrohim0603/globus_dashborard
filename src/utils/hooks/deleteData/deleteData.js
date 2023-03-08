import { instance } from "../../axios";
import { useMutation } from "@tanstack/react-query";

export const useDeleteData = (url) => {
  return useMutation((data) => {
    console.log(data.id);
    instance.delete(data.id ? `${url + "/" + data.id}` : url);
  });
};
