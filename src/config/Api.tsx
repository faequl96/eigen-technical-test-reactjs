import axios from "axios"

export const API = axios.create({
   baseURL: "https://newsapi.org/v2",
});

API.defaults.headers.common["x-api-key"] = `4545de399b5e45fda1baaa13bf0d1220`;