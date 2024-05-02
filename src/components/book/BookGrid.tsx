import { useBookStore } from '@/store/useBookstore';
import { BookPreview } from './BookPreview';

export const BookGrid = () => {
   const { data } = useBookStore();
   console.log(data);

   return (
      <section className=" grid sm:grid-cols-3 grid-cols-2 max-h-full gap-2 overflow-y-auto ">
         {data.map((book, index) => (
            <BookPreview book={book} key={index} />
         ))}
      </section>
   );
};
