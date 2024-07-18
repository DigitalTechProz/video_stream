import { createClient, Entry } from 'contentful';
import { Movie, MovieSkeleton, MovieFields } from '../app/types/movie';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
});

export const fetchMovies = async (): Promise<Movie[]> => {
  try {
    const res = await client.getEntries<MovieSkeleton>({ content_type: 'movie' });

    return res.items.map((item: Entry<MovieSkeleton>) => {
      const fields = item.fields as MovieFields;

      return {
        title: fields.title || '',
        description: fields.description,
        apiVideoId: fields.apiVideoId || '',
        duration: fields.duration,
        tags: fields.tags || [],
        uploadDate: fields.uploadDate || '',
        thumbnail: fields.thumbnail && fields.thumbnail.fields?.file
          ? { 
              url: typeof fields.thumbnail.fields.file.url === 'string' ? fields.thumbnail.fields.file.url : '',
              title: typeof fields.thumbnail.fields.title === 'string' ? fields.thumbnail.fields.title : ''
            }
          : undefined,
        categories: fields.categories?.map(category => {
          const categoryFields = category.fields as { name: string; description?: string };
          return {
            name: typeof categoryFields.name === 'string' ? categoryFields.name : '',
            description: typeof categoryFields.description === 'string' ? categoryFields.description : undefined
          };
        }) || []
      };
    }) as Movie[];
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

export const fetchMovieById = async (id: string): Promise<Movie | null> => {
  try {
    const res = await client.getEntry<MovieSkeleton>(id);

    if (!res) {
      throw new Error(`No entry found for ID: ${id}`);
    }

    const fields = res.fields as MovieFields;

    return {
      title: fields.title || '',
      description: fields.description,
      apiVideoId: fields.apiVideoId || '',
      duration: fields.duration,
      tags: fields.tags || [],
      uploadDate: fields.uploadDate || '',
      thumbnail: fields.thumbnail && fields.thumbnail.fields?.file
        ? { 
            url: typeof fields.thumbnail.fields.file.url === 'string' ? fields.thumbnail.fields.file.url : '',
            title: typeof fields.thumbnail.fields.title === 'string' ? fields.thumbnail.fields.title : ''
          }
        : undefined,
      categories: fields.categories?.map(category => {
        const categoryFields = category.fields as { name: string; description?: string };
        return {
          name: typeof categoryFields.name === 'string' ? categoryFields.name : '',
          description: typeof categoryFields.description === 'string' ? categoryFields.description : undefined
        };
      }) || []
    } as Movie;
  } catch (error) {
    console.error(`Error fetching movie with ID ${id}:`, error);
    return null;
  }
};
