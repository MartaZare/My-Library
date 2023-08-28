export type AuthorType = {
  id: number;
  name: string;
  surname: string;
  born: string;
  died: string;
  nationality: string;
  novelsPublished: number;
  url: string;
  description: string;
};

export type BookType = {
  id: number;
  authorId: string;
  title: string;
  genreId: string;
  publisherId: string;
  date: string;
  pages: number;
  description: string;
};

export type GenreType = {
  id: number;
  title: string;
  date: string;
  description: string;
};

export type PublisherType = {
  id: number;
  title: string;
  founded: string;
  founder: string;
  description: string;
};
