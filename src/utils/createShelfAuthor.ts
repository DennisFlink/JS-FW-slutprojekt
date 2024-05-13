import { author } from '@/types/responseType';

export const createShelfAuthor = (authorDetails: author) => {
   return {
      id: authorDetails.key || '',
      name: authorDetails.name,
   };
};
