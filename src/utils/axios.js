import axios from "axios";

const token = JSON.parse(localStorage.getItem("access_token"));

export const instance = axios.create({
  baseURL: "http://3.138.204.20/",
  timeout: 10000,
  headers: { Authorization: `Bearer ${token}` },
});

export const instanceUpload = "http://3.138.204.20/upload/upload";
export const instanceImg = "http://3.138.204.20/upload/";
