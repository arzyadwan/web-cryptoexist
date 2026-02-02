import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-02-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set false saat development untuk data fresh, true di production untuk cache
})