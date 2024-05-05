import { create } from 'zustand';
import { book, bookDetailData, responseType } from '@/types/responseType';
import { v4 as uuidv4 } from 'uuid';
import { fetchBooks } from '@/api/fetchBooks';

export type StoredBook = {
   id: string;
   title: string;
   key: string;
   cover: string;
};

export type State = {
   searchTerm: string;
   id: string;
   data: book[];
   bookDetails: bookDetailData;
   loading: boolean;
   error: boolean;
   author: string[];
   shelf: {
      read: StoredBook[];
      favorites: StoredBook[];
   };
   setId: (id: string) => void;
   setSearchTerm: (searchTerm: string) => void;
   fetch: () => Promise<void>;
   fetchBookDetail: (bookId: string) => Promise<void>;
   fetchAuthors: (authorKey: string) => Promise<void>;
   addToShelf: (book: bookDetailData, bookCoverNumber: string, shelfType: 'read' | 'favorites') => void;
   removeFromShelf: (bookId: string, shelfType: 'read' | 'favorites') => void;
};

const initialState: State = {
   searchTerm: '',
   id: '',
   data: [],
   bookDetails: {} as bookDetailData,
   loading: false,
   author: [],
   error: false,
   shelf: {
      read: [],
      favorites: [],
   },
   setId: () => {},
   setSearchTerm: () => {},
   fetch: async () => {},
   fetchBookDetail: async () => {},
   fetchAuthors: async () => {},
   addToShelf: () => {},
   removeFromShelf: () => {},
};

export const useBookStore = create<State>((set) => ({
   ...initialState,
   setSearchTerm: (searchTerm: string) => set({ searchTerm }),
   setId: (id: string) => set({ id }),

   /*    fetch: async () => {
      set(() => ({ loading: true }));
      try {
         const response = await axios.get<ResponseType>(`http://openlibrary.org/search.json?title=${BookStore.getState().searchTerm}`);

         set(() => ({ data: response.data.docs, loading: false }));
      } catch (err) {
         set(() => ({ hasErrors: true, loading: false }));
      }
   }, */
   fetch: async () => {
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
      console.log('HELLL ID', bookId);
      set(() => ({ loading: true }));
      try {
         const responseData = await fetchBooks<bookDetailData>(bookId, 'https://openlibrary.org/works/', true);
         const bookDetailsWithUUID = { ...responseData, id: bookId };

         set(() => ({ bookDetails: bookDetailsWithUUID, loading: false }));
      } catch (err) {
         set(() => ({ hasErrors: true, loading: false }));
      }
   },
   fetchAuthors: async (authorKey: string) => {
      console.log('Author ID', authorKey);
      set(() => ({ loading: true }));
      /* 
      TODO: FIXA ATT ALLA KEYS ANVÄNDA LOOP
       */
      try {
         const responseData = await fetchBooks<bookDetailData>(authorKey, 'https://openlibrary.org', true);
         set(() => ({ Author: responseData, loading: false }));
      } catch (err) {
         set(() => ({ hasErrors: true, loading: false }));
      }
   },
   addToShelf: (book: bookDetailData, bookCoverNumber: string, shelfType: 'read' | 'favorites') => {
      const readBook: StoredBook = {
         id: book.id,
         title: book.title,
         key: book.key,
         cover: bookCoverNumber,
      };

      console.log(readBook);

      set((state) => ({
         shelf: {
            ...state.shelf,
            [shelfType]: [...state.shelf[shelfType], readBook],
         },
      }));
   },
   removeFromShelf: (bookId: string, shelfType: 'read' | 'favorites') => {
      console.log('REMOVE', bookId, shelfType);
      set((state) => ({
         shelf: {
            ...state.shelf,
            [shelfType]: [...state.shelf[shelfType].filter((book) => book.id !== bookId)],
         },
      }));
   },
}));
