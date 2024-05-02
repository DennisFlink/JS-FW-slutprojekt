import { BookStore } from '@/store/useBookstore';
import { FetchParams } from '@/types/fetchParams';
import axios, { AxiosError } from 'axios';
import { useReducer } from 'react';

type State<T> = { data: null; isLoading: boolean; error: null } | { data: T; isLoading: boolean; error: null } | { data: null; isLoading: boolean; error: AxiosError };

export const initialState = {
   data: null,
   isLoading: false,
   error: null,
};
type ACTION<T> = { type: 'FETCH_LOADING'; error: undefined } | { type: 'FETCH_SUCCESS'; data: T } | { type: 'FETCH_ERROR'; error: AxiosError };
export const dataFetchReducer = <T,>(state: State<T>, action: ACTION<T>): State<T> => {
   switch (action.type) {
      case 'FETCH_LOADING': {
         return {
            ...state,
            isLoading: true,
         };
      }
      case 'FETCH_SUCCESS': {
         return {
            ...state,
            data: action.data,
            isLoading: false,
            error: null,
         };
      }
      case 'FETCH_ERROR': {
         return {
            ...state,
            data: null,
            isLoading: false,
            error: action.error,
         };
      }
      default:
         throw new Error('Unknown action type');
   }
};
export const useFetchData = () => {
   const [state, dispatch] = useReducer(dataFetchReducer, initialState);
   const { searchTerm } = BookStore();
   const url = `http://openlibrary.org/search.json?title=${searchTerm}`;
   const fetchData = async () => {
      try {
         dispatch({ type: 'FETCH_LOADING', error: undefined });
         console.log('URL IN FETCH', url);
         const result = await axios.get(url);
         dispatch({ type: 'FETCH_SUCCESS', data: result.data.docs });
      } catch (error) {
         if (axios.isAxiosError(error)) {
            dispatch({ type: 'FETCH_ERROR', error });
         } else {
            console.error('Unexpected error:', error);
         }
      }
   };

   return { state, fetchData };
};
