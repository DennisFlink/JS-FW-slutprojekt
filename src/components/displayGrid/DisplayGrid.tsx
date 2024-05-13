import { useBookStore } from '@/store/useBookstore';
import { BookPreview } from '../book/BookPreview';
import { AuthorPreview } from '../author/AuthorPreview';

export const DisplayGrid = () => {
   const {
      data,
      authorData,
      searchTerm: { selection },
   } = useBookStore();

   return (
      <section className=" grid sm:grid-cols-3 grid-cols-2 max-h-full gap-2 overflow-y-auto ">
         {selection === 'book' ? data.map((book, index) => <BookPreview book={book} key={index} />) : authorData.map((author, index) => <AuthorPreview author={author} key={index} />)}
      </section>
   );
};
