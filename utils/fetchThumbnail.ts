import { createClient } from 'contentful';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
});

export const fetchMovieThumbnails = async (): Promise<string[]> => {
  const res = await client.getEntries({
    content_type: 'movie',
    limit: 10,
  });

  const thumbnails: string[] = res.items.map((item: any) => {
    return item.fields.thumbnail.fields.file.url;
  });

  return thumbnails;
};
