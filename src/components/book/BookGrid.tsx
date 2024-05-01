import { BookStore } from '@/store/Bookstore';
import { BookPreview } from './BookPreview';
import { book } from '@/types/responseType';

type BookGrid = {};

export const BookGrid: React.FC<BookGrid> = () => {
   const { data } = BookStore();
   console.log(data);

   return (
      <section className=" grid sm:grid-cols-3 grid-cols-2 max-h-full gap-2 overflow-y-auto ">
         {data.map((book, index) => (
            <BookPreview book={book} key={index} />
         ))}
      </section>
   );
};
