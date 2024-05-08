export type book = {
   title: string;
   key: string;
   id: string;
   cover_i: number;
   first_publish_year: number;
   authors?: author[];
   author_name?: [];
   first_sentence?: string;
   isbn?: string[];
   lcc?: string[];
   lccn?: string[];
   olid?: string[];
   number_of_pages?: number;
   publish_date?: string;
};
export interface author {}

export type responseType = {
   docs: book[];
};

export type descriptionData = { value: string };

export type Author = {
   author: {
      key: string;
   };
};

export type bookDetailData = {
   title: string;
   description?: descriptionData;
   subtitle?: string;
   key: string;
   id: string;
   covers?: string[];
   authors: Author[];
   names: string[];
   authornames: string[];
   subjects?: string[];
};

export type authorResponse = {
   bio: string;
   name: string;
};
