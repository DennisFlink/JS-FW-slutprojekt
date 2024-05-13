import { create } from 'zustand';
import { author, authorDetailResponse, authorResponse, book, bookDetailData, responeTypeAuthor, responseType } from '@/types/responseType';
import { v4 as uuidv4 } from 'uuid';
import { fetchData } from '@/api/fetchData';
import { ReviewWithId } from '@/components/book/BookReviewDialog';

/* 
TODO: SLICE THE STORE
* Kanske borde slice storen
 */

export type StoredItem = {
   id: string;
   title?: string;
   key?: string;
   name?: string;
   cover?: string;
   authorNames?: string[];
};
export type State = {
   searchTerm: { term: string; selection: string };
   data: book[];
   authorData: author[];
   authorDetails: authorDetailResponse;
   bookDetails: bookDetailData;
   loading: boolean;
   error: boolean;
   shelf: {
      read: StoredItem[];
      favorites: StoredItem[];
      author: StoredItem[];
   };
   reviews: ReviewWithId[];
   setSearchTerm: (searchTerm: { term: string; selection: string }) => void;
   fetchSearchedBooks: () => Promise<void>;
   fetchBookDetail: (bookId: string) => Promise<void>;
   fetchAuthors: () => Promise<void>;
   fetchAuthorDetail: (authorId: string) => Promise<void>;
   addToShelf: (item: StoredItem, bookCoverNumber: string, shelfType: 'read' | 'favorites' | 'author') => void;
   removeFromShelf: (bookId: string, shelfType: 'read' | 'favorites' | 'author') => void;
   addReview: (review: ReviewWithId) => void;
   updateReview: (updatedReview: ReviewWithId) => void;
};

const initialState: State = {
   searchTerm: {
      term: '',
      selection: '',
   },
   data: [],
   authorData: [],
   authorDetails: {} as authorDetailResponse,
   bookDetails: {} as bookDetailData,
   loading: false,
   error: false,
   shelf: {
      read: [],
      favorites: [],
      author: [],
   },
   reviews: [],
   setSearchTerm: () => {},
   fetchSearchedBooks: async () => {},
   fetchBookDetail: async () => {},
   fetchAuthors: async () => {},
   fetchAuthorDetail: async () => {},
   addToShelf: () => {},
   removeFromShelf: () => {},
   addReview: () => {},
   updateReview: () => {},
};

export const useBookStore = create<State>((set) => ({
   ...initialState,

   setSearchTerm: (searchTerm: { term: string; selection: string }) => set({ searchTerm }),

   addReview: (review: ReviewWithId) => {
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
         const responseData = await fetchData<responseType>(searchQuery.term, 'http://openlibrary.org/search.json?title=');
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
         const responseData = await fetchData<bookDetailData>(bookId, 'https://openlibrary.org/works/', true);
         const authorKeys = responseData.authors?.map((author) => author.author.key);
         const authornames: string[] = [];
         for (const authorKey of authorKeys) {
            const authorResponse = await fetchData<authorResponse>(authorKey, 'https://openlibrary.org', true);
            authornames.push(authorResponse.name);
         }
         const bookDetailsWithUUID = { ...responseData, id: bookId };

         set(() => ({ bookDetails: { ...bookDetailsWithUUID, authornames }, loading: false }));
      } catch (err) {
         set(() => ({ hasErrors: true, loading: false }));
      }
   },
   fetchAuthors: async () => {
      set(() => ({ loading: true }));
      try {
         const searchQuery = useBookStore.getState().searchTerm;
         const responseData = await fetchData<responeTypeAuthor>(searchQuery.term, 'https://openlibrary.org/search/authors.json?q=', false);
         const first20Authors = responseData.docs.slice(0, 10);
         console.log(first20Authors);
         set(() => ({ authorData: first20Authors, loading: false }));
      } catch (err) {
         set(() => ({ hasErrors: true, loading: false }));
      }
   },
   fetchAuthorDetail: async (authorId: string) => {
      set(() => ({ loading: true }));
      try {
         const responseData = await fetchData<authorDetailResponse>(authorId, 'https://openlibrary.org/authors/', true);
         set(() => ({ authorDetails: responseData, loading: false }));
      } catch (err) {
         set(() => ({ hasErrors: true, loading: false }));
      }
   },
   addToShelf: (item: StoredItem, bookCoverNumber: string, shelfType: 'read' | 'favorites' | 'author') => {
      const storeItem: StoredItem = {
         id: item.id,
         title: item.title,
         name: item.name,
         key: item.key,
         cover: bookCoverNumber,
         authorNames: item.authorNames,
      };
      set((state) => ({
         shelf: {
            ...state.shelf,
            [shelfType]: [...state.shelf[shelfType], storeItem],
         },
      }));
   },
   removeFromShelf: (itemID: string, shelfType: 'read' | 'favorites' | 'author') => {
      set((state) => ({
         shelf: {
            ...state.shelf,
            [shelfType]: [...state.shelf[shelfType].filter((item) => item.id !== itemID)],
         },
      }));
   },
}));
