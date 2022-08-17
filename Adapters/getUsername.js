import { client } from "./client";

export const getUsername = (params) => {
  return client.get({ params });
};
console.log(getUsername, "client");
