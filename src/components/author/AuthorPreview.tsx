import { author } from '@/types/responseType';
import cover_not_found from '@/assets/cover_not_found.jpg';
import { Link } from 'react-router-dom';
type AuthorPreview = {
   author: author;
};

export const AuthorPreview: React.FC<AuthorPreview> = ({ author }) => {
   const authorWithCovers = author.key ? `https://covers.openlibrary.org/a/olid/${author.key}-M.jpg` : cover_not_found;

   return (
      <Link to={`/author/${author.key}`}>
         <div id={author.key} className="min-w-36 m-h-72 p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center justify-start gap-2 ">
            <img src={authorWithCovers} alt="Book Cover Image" className=" block size-48 object-contain" />
            <h1 className="text-sm text-wrap w-full text-center ">{author.name}</h1>
         </div>
      </Link>
   );
};
