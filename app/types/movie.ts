// app/types/movie.ts

import { Entry, Asset, EntryFields } from 'contentful';

// Define the structure for Category fields
export interface CategoryFields {
  name: EntryFields.Text;
  description?: EntryFields.Text;
}

// Define the Category content type
export interface CategorySkeleton {
  contentTypeId: 'category';
  fields: CategoryFields;
}

// Define the Category entry type
export type CategoryEntry = Entry<CategorySkeleton>;

// Define the main Movie fields
export interface MovieFields {
  title: EntryFields.Text;
  description?: EntryFields.Text;
  thumbnail?: Asset;
  apiVideoId: EntryFields.Text;
  duration?: EntryFields.Number;
  categories?: CategoryEntry[];
  tags?: EntryFields.Symbol[];
  uploadDate: EntryFields.Date;
}

// Define the Movie content type
export interface MovieSkeleton {
  contentTypeId: 'movie';
  fields: MovieFields;
}

// Create a type that combines Contentful's Entry type with our MovieSkeleton
export type MovieEntry = Entry<MovieSkeleton>;

// You can also create a type for the response you expect from Contentful
export interface MovieResponse {
  items: MovieEntry[];
  total: number;
  skip: number;
  limit: number;
}

// If you need a plain object type for Category (without Contentful metadata)
export type Category = {
  name: string;
  description?: string;
};

// If you need a plain object type for Movie (without Contentful metadata)
{/*export type Movie = {
  title: string;
  description?: string;
  thumbnail?: { url: string; title: string };
  apiVideoId: string;
  duration?: number;
  categories?: Category[];
  tags?: string[];
  uploadDate: string;
};/*/}

// types/movie.ts

export interface Movie {
  title: string;
  description: string;
  apiVideoId: string;
  duration: string | number;
  tags?: string[] | undefined; // Allow tags to be undefined
  uploadDate: string; // Adjust as per your actual date format
  thumbnail?: {
    url: string;
    title: string;
  };
  categories: {
    name: string;
    description?: string;

  }[];
  nowPlaying: string[];
  moreSeries: string[];
  newMovies: string[];
  
}
