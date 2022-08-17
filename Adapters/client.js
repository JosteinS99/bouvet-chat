import axios from "axios";

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// https://data.ssb.no/api/v0/no/table/10467/
