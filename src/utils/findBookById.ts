import { book } from '@/types/responseType';

export const findBookById = (book: book[], bookId: string | undefined) => {
   return book.find((boo) => boo.id === bookId);
};
