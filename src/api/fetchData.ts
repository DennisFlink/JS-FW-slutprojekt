import { BookStore } from '@/store/Bookstore';
import axios from 'axios';

export const fetchData = async () => {
   const { searchTerm, setLoading, setSearchResults } = BookStore();
   const url = `"http://openlibrary.org/search.json?title="${searchTerm}`;
   setLoading(true);
   try {
      const response = await axios.get(url);
      console.log(response);
      setSearchResults(response.data);
   } catch (error) {
      console.error('Error fetching data:', error);
   } finally {
      setLoading(false);
   }
};
