import { book } from '@/types/responseType';
import cover_not_found from '@/assets/cover_not_found.jpg';
import { Link } from 'react-router-dom';
import { formatNames, getBookKey } from '@/utils/formatFunctions';

type BookPreview = {
   book: book;
};

export const BookPreview: React.FC<BookPreview> = ({ book }) => {
   const bookWithCovers = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : cover_not_found;
   const authors = formatNames(book.author_name as string[]);
   const keys = getBookKey(book.key);

   return (
      <Link to={`/book/${keys}`}>
         <div id={book.key} className="min-w-36 m-h-72 p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center justify-start gap-2 ">
            <img src={bookWithCovers} alt="Book Cover Image" className=" block size-48 object-contain" />
            <h1 className="text-sm text-wrap w-full text-center ">{book.title}</h1>
            <h2 className="text-xs">Author: {authors}</h2>
         </div>
      </Link>
   );
};
