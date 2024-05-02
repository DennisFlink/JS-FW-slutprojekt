import axios from 'axios';

export const fetchBooks = async <T>(searchQuery: string | undefined, url: string, bookDetails: boolean = false): Promise<T> => {
   let URL = `${url}${searchQuery}`;

   if (bookDetails) {
      URL += '.json';
   }
   console.log('FETCHING');
   try {
      const response = await axios.get<T>(URL);
      return response.data;
   } catch (error) {
      throw new Error('Error fetching books: ' + error);
   }
};
