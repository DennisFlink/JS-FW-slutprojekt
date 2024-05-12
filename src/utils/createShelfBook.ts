import { bookDetailData } from '@/types/responseType';

export const createShelfBook = (bookDetails: bookDetailData) => {
   return {
      id: bookDetails.id,
      title: bookDetails.title,
      key: bookDetails.key,
   };
};
