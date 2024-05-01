import { BookStore } from '@/store/Bookstore';
import axios from 'axios';
import { useState } from 'react';

export const FetchData = async () => {
   const [data, setData] = useState<any[]>([]);
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null);
   const { searchTerm } = BookStore();
   const url = `"http://openlibrary.org/search.json?title="${searchTerm}`;

   const fetchData = async () => {
      setLoading(true);
      try {
         const response = await axios.get(url);
         setData(response.data);
      } catch (err) {
         setError('Error fetching data');
      } finally {
         setLoading(false);
      }
   };

   return { data, loading, error, fetchData };
};
