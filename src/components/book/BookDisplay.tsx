import { BookStore } from '@/store/Bookstore';
import { findBookById } from '@/utils/findBookById';
import { getBookId } from '@/utils/formatFunctions';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

type BookDisplay = {};

export const BookDisplay: React.FC<BookDisplay> = () => {
   const { data } = BookStore();
   const parens = useParams<{ id: string }>();
   const book = findBookById(data, parens.id);

   const authors = book?.author_name?.join(' ');
   const bookWithCovers = book?.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : 'cover_not_found.jpg';

   const bookKey = getBookId(book?.key);

   console.log(book);
   return (
      <>
         {book ? (
            <section className=" bg-slate-200">
               <div className="p-1">
                  <h1 className="text-6xl font-semibold">{book.title}</h1>
                  <h3 className="text-2xl mx-1 mt-2">by: {authors}</h3>
               </div>
               <div className="w-full flex justify-center pt-4">
                  <img src={bookWithCovers} alt="" />
               </div>
            </section>
         ) : (
            <p>Book not found with ID: </p>
         )}
      </>
   );
};
