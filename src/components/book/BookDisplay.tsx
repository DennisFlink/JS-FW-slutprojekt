import { useBookStore } from '@/store/useBookstore';
import { findBookById } from '@/utils/findBookById';
import { formatNames, getBookId } from '@/utils/formatFunctions';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cover_not_found from '@/assets/cover_not_found.jpg';
import { Button } from '../ui/button';
import { Heart, Book, NotebookPen } from 'lucide-react';
import { useDialog } from '@/hooks/useDialog';
import { BookReview } from './BookReview';
type BookDisplay = {};

export const BookDisplay: React.FC<BookDisplay> = () => {
   const { isOpen, openDialog, closeDialog } = useDialog();
   const { data, fetchBookDetail, bookDetails } = useBookStore();
   const parens = useParams<{ id: string }>();
   const book = findBookById(data, parens.id);
   console.log(book);
   const authors = formatNames(book?.author_name as string[]);
   const bookWithCovers = book?.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : cover_not_found;

   useEffect(() => {
      if (book) {
         fetchBookDetail(book.key);
      }
   }, [book, fetchBookDetail]);
   console.log(book?.id);
   console.log('BOOOKDETAIL', bookDetails.description?.value);
   return (
      <>
         {book ? (
            <section className=" bg-zinc-200 rounded-lg p-2">
               <div className="p-1">
                  <h1 className="text-6xl font-semibold">{bookDetails.title}</h1>
                  <h2 className="italic text-xl my-2">{bookDetails.subtitle ? bookDetails.subtitle.charAt(0).toUpperCase() + bookDetails.subtitle.slice(1) : ''}</h2>
                  <h3 className="text-xl mx-1 mt-2">by: {authors}</h3>
               </div>
               <div className="w-full flex justify-center pt-4">
                  <img src={bookWithCovers} alt="Book Cover Image" className=" block size-48 object-contain" />
               </div>
               <div className="   w-full p-2 mx-auto flex flex-col items-center">
                  <div className=" w-60  flex justify-between py-2">
                     <Button>
                        <Book className="mr-2 h-4 w-4" />
                        READ IT
                     </Button>
                     <Button>
                        <Heart className="mr-2 h-4 w-4" />
                        LOVE IT
                     </Button>
                  </div>
                  <div className=" w-60 flex justify-center">
                     <Button onClick={openDialog}>
                        <NotebookPen className="mr-2 h-4 w-4" />
                        REVIEW
                     </Button>
                  </div>
               </div>
               <div className="p-2">
                  <h3>{bookDetails.description?.value ? bookDetails.description.value : 'Sorry, No Description 😢'}</h3>
               </div>
               <BookReview isopen={isOpen} onClose={closeDialog}></BookReview>
            </section>
         ) : (
            <p>Book not found with ID: </p>
         )}
      </>
   );
};
