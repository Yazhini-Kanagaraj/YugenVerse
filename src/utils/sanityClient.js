import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "3lyd6k37",   // replace with your Sanity project ID
  dataset: "production",          // or the dataset you created
  useCdn: true,
  apiVersion: "2025-09-02",       // use a recent date
});
