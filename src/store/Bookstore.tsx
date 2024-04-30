import { create } from 'zustand';
import axios from 'axios';
export type SearchResult = {};

export type State = {
   searchTerm: string;
   data: SearchResult[];
   loading: boolean;
   error: boolean;
   setSearchTerm: (searchTerm: string) => void;
   fetch: () => Promise<void>;
};

const initialState: State = {
   searchTerm: '',
   data: [],
   loading: false,
   error: false,
   setSearchTerm: () => {},
   fetch: async () => {},
};

export const BookStore = create<State>((set) => ({
   ...initialState,
   setSearchTerm: (searchTerm: string) => set({ searchTerm }),
   setSearchResults: (results: SearchResult[]) => set({ data: results }),
   fetch: async () => {
      set(() => ({ loading: true }));
      try {
         const response = await axios.get(`http://openlibrary.org/search.json?title=${BookStore.getState().searchTerm}`);

         set(() => ({ data: response.data.docs, loading: false }));
      } catch (err) {
         set(() => ({ hasErrors: true, loading: false }));
      }
   },
}));
