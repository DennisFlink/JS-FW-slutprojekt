import { BookStore } from '@/store/Bookstore';
import { BookPreview } from './BookPreview';
import { fetchData } from '@/api/fetchData';

type BookGrid = {};

export const BookGrid: React.FC<BookGrid> = () => {
   const { data, loading } = BookStore();
   console.log('GRID', data, loading);
   return (
      <section className="bg-slate-300">
         <h1>Your search result</h1>

         <article className="grid ">
            <BookPreview />
         </article>
      </section>
   );
};
