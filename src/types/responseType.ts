export type book = {
   title: string;
   key: string;
   id: string;
   cover_i: number;
   first_publish_year: number;
   authors?: author[];
   author_name?: author[];
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
