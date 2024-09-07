import { createClient } from "./http";

export const api = createClient({
  baseURL: "/api/v1",
});
