import { responseType } from '@/types/responseType';
import axios from 'axios';

export const fetchBooks = async (searchQuery: string | undefined, url: string): Promise<responseType> => {
   const URL = `${url}${searchQuery}`;
   console.log('FETCHING');
   try {
      const response = await axios.get<responseType>(URL);
      return response.data;
   } catch (error) {
      throw new Error('Error fetching books: ' + error);
   }
};
