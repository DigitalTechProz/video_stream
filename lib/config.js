// lib/config.js
import { createClient } from 'contentful';
import { ApiVideoClient } from '@api.video/nodejs-client';

export const contentfulClient = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export const apiVideoClient = new ApiVideoClient({
  apiKey: process.env.API_VIDEO_API_KEY,
});

export function parseContentfulMovie(entry) {
  return {
    id: entry.sys.id,
    ...entry.fields,
  };
}