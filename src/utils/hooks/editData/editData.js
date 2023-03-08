import { useMutation } from "@tanstack/react-query";
import { instance } from "../../axios";

export const useEditData = (url) => {
  return useMutation((data) =>
    instance.patch(url + "/" + data?.id, data.value)
  );
};
