import { create } from 'zustand';
import { book, bookDetailData, responseType } from '@/types/responseType';
import { v4 as uuidv4 } from 'uuid';
import { fetchBooks } from '@/api/fetchBooks';

export type State = {
   searchTerm: string;
   id: string;
   data: book[];
   bookDetails: bookDetailData;
   loading: boolean;
   error: boolean;
   setId: (id: string) => void;
   setSearchTerm: (searchTerm: string) => void;
   fetch: () => Promise<void>;
   fetchBookDetail: (bookId: string) => Promise<void>;
};

const initialState: State = {
   searchTerm: '',
   id: '',
   data: [],
   bookDetails: {} as bookDetailData,
   loading: false,
   error: false,
   setId: () => {},
   setSearchTerm: () => {},
   fetch: async () => {},
   fetchBookDetail: async () => {},
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
         const responseData: responseType = await fetchBooks(searchQuery, 'http://openlibrary.org/search.json?title=');
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
         const responseData = await fetchBooks<bookDetailData>(bookId, 'https://openlibrary.org/works/', true);
         console.log('BOOKSTORE', responseData);

         set(() => ({ bookDetails: responseData, loading: false }));
      } catch (err) {
         set(() => ({ hasErrors: true, loading: false }));
      }
   },
}));
