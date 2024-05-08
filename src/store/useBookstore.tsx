import { create } from 'zustand';
import { Author, authorResponse, book, bookDetailData, responseType } from '@/types/responseType';
import { v4 as uuidv4 } from 'uuid';
import { fetchBooks } from '@/api/fetchBooks';
import { ReviewWithId } from '@/components/book/BookReviewDialog';

/* 
TODO: SLICE THE STORE
* Kanske borde slice storen
 */
export type StoredBook = {
   id: string;
   title: string;
   key: string;
   cover: string;
};

export type State = {
   searchTerm: string;
   data: book[];
   bookDetails: bookDetailData;
   loading: boolean;
   error: boolean;
   shelf: {
      read: StoredBook[];
      favorites: StoredBook[];
   };
   reviews: ReviewWithId[];
   setSearchTerm: (searchTerm: string) => void;
   fetchSearchedBooks: () => Promise<void>;
   fetchBookDetail: (bookId: string) => Promise<void>;
   fetchAuthors: (author: Author[]) => Promise<void>;
   addToShelf: (book: bookDetailData, bookCoverNumber: string, shelfType: 'read' | 'favorites') => void;
   removeFromShelf: (bookId: string, shelfType: 'read' | 'favorites') => void;
   addReview: (review: ReviewWithId) => void;
   updateReview: (updatedReview: ReviewWithId) => void;
};

const initialState: State = {
   searchTerm: '',
   data: [],
   bookDetails: {} as bookDetailData,
   loading: false,
   error: false,
   shelf: {
      read: [],
      favorites: [],
   },
   reviews: [],
   setSearchTerm: () => {},
   fetchSearchedBooks: async () => {},
   fetchBookDetail: async () => {},
   fetchAuthors: async () => {},
   addToShelf: () => {},
   removeFromShelf: () => {},
   addReview: () => {},
   updateReview: () => {},
};

export const useBookStore = create<State>((set) => ({
   ...initialState,

   setSearchTerm: (searchTerm: string) => set({ searchTerm }),

   addReview: (review: ReviewWithId) => {
      console.log(review);
      set((state) => ({
         reviews: [...state.reviews, review],
      }));
   },
   updateReview: (updatedReview: ReviewWithId) => {
      set((state) => {
         return {
            reviews: state.reviews.map((review) => (review.id === updatedReview.id ? updatedReview : review)),
         };
      });
   },
   fetchSearchedBooks: async () => {
      set(() => ({ loading: true }));
      try {
         const searchQuery = useBookStore.getState().searchTerm;
         const responseData = await fetchBooks<responseType>(searchQuery, 'http://openlibrary.org/search.json?title=');
         console.log(searchQuery);
         const first20Books = responseData.docs.slice(0, 20);
         const bookUuid = first20Books.map((book) => ({ ...book, id: uuidv4() }));
         set(() => ({ data: bookUuid, loading: false }));
      } catch (err) {
         set(() => ({ hasErrors: true, loading: false }));
      }
   },
   fetchBookDetail: async (bookId: string) => {
      set(() => ({ loading: true }));
      try {
         /* 
         ? Hur göra med url att den funkar både för föratte och boken
         todo:FIXA DEN HÄR SKITEN PISS SKIT HELVETE
         */
         const responseData = await fetchBooks<bookDetailData>(bookId, 'https://openlibrary.org/works/', true);

         const authorKeys = responseData.authors?.map((author) => author.author.key);
         const authornames: string[] = [];
         for (const authorKey of authorKeys) {
            const authorResponse = await fetchBooks<authorResponse>(authorKey, 'https://openlibrary.org', true);
            authornames.push(authorResponse.name);
         }
         const bookDetailsWithUUID = { ...responseData, id: bookId };

         set(() => ({ bookDetails: { ...bookDetailsWithUUID, authornames }, loading: false }));
      } catch (err) {
         set(() => ({ hasErrors: true, loading: false }));
      }
   },
   /*    fetchAuthors: async (authors: Author[] | undefined) => {
      const mappingAuthors = authors?.map((auth) => auth.author.key);
      console.log('Author ID', mappingAuthors);
      set(() => ({ loading: true }));
      
      TODO: FIXA ATT ALLA KEYS ANVÄNDA LOOP
      ? Ska jag använda samma funktioner?
       
      try {
         const responseData = await fetchBooks<bookDetailData>(authors, 'https://openlibrary.org', true);
         set(() => ({ Author: responseData, loading: false }));
      } catch (err) {
         set(() => ({ hasErrors: true, loading: false }));
      }
   }, */
   addToShelf: (book: bookDetailData, bookCoverNumber: string, shelfType: 'read' | 'favorites') => {
      const readBook: StoredBook = {
         id: book.id,
         title: book.title,
         key: book.key,
         cover: bookCoverNumber,
      };
      set((state) => ({
         shelf: {
            ...state.shelf,
            [shelfType]: [...state.shelf[shelfType], readBook],
         },
      }));
   },
   removeFromShelf: (bookId: string, shelfType: 'read' | 'favorites') => {
      set((state) => ({
         shelf: {
            ...state.shelf,
            [shelfType]: [...state.shelf[shelfType].filter((book) => book.id !== bookId)],
         },
      }));
   },
}));
