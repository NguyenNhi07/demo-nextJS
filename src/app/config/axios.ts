"use client";
import axios from "axios";

const customAxios = axios.create({
  baseURL: "https://e1c6-118-70-190-141.ngrok-free.app/",
  headers: {
    "ngrok-skip-browser-warning": "69420",
  },
});

customAxios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default customAxios;
