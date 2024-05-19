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
export type author = {
   id?: string;
   name: string;
   birth_date?: string;
   key?: string;
};

export type responseType = {
   docs: book[];
};

export type responeTypeAuthor = {
   docs: author[];
};

export type authorDetailResponse = {
   name: string;
   bio?: string | { type: string; value: string };
   birth_date?: string;
};

export type descriptionData = { value: string };

export type Author = {
   author: {
      key: string;
   };
};

export type bookDetailData = {
   title: string;
   description?: string | descriptionData;
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
