import { useBookStore } from '@/store/useBookstore';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cover_not_found from '@/assets/cover_not_found.jpg';
import { Button } from '../ui/button';
import { Heart, Book, NotebookPen } from 'lucide-react';
import { useDialog } from '@/hooks/useDialog';
import { BookReview } from './BookReviewDialog';
import { useToast } from '@/components/ui/use-toast';
type BookDisplay = {};

export const BookDisplay: React.FC<BookDisplay> = () => {
   const { toast } = useToast();
   const { isOpen, openDialog, closeDialog } = useDialog();
   const { fetchBookDetail, bookDetails, addToShelf } = useBookStore();
   const parens = useParams<{ id: string }>();
   const bookCoverNumber: string | undefined = bookDetails?.covers?.[0];
   const bookWithCovers = bookCoverNumber ? `https://covers.openlibrary.org/b/id/${bookCoverNumber}-M.jpg` : cover_not_found;
   console.log(bookDetails);
   useEffect(() => {
      if (parens.id) {
         fetchBookDetail(parens.id);
      }
   }, [parens.id, fetchBookDetail]);

   const handleAddtoShelf = (shelfType: 'read' | 'favorites') => {
      const isStored = useBookStore.getState().shelf[shelfType].some((storedBook) => storedBook.id === bookDetails.id);
      if (!isStored) {
         const cover = bookCoverNumber || cover_not_found;
         addToShelf(bookDetails, cover, shelfType);
         toast({
            title: 'Book is added 👍',
            description: `Book is added in ${shelfType}`,
            duration: 800,
         });
      } else {
         toast({
            title: 'Uh oh! Something went wrong.',
            description: `Book is already stored in  ${shelfType}`,
            duration: 800,
         });
      }
   };

   return (
      <>
         {parens.id ? (
            <section className=" bg-zinc-200 rounded-lg p-2">
               <div className="p-1">
                  <h1 className="text-6xl font-semibold">{bookDetails.title}</h1>
                  <h2 className="italic text-xl my-2">{bookDetails.subtitle ? bookDetails.subtitle.charAt(0).toUpperCase() + bookDetails.subtitle.slice(1) : ''}</h2>
                  <h3 className="text-xl mx-1 mt-2">by: {bookDetails?.authornames ? bookDetails.authornames.join(' ') : 'Unknown'}</h3>
               </div>
               <div className="w-full flex justify-center pt-4">
                  <img src={bookWithCovers} alt="Book Cover Image" className=" block size-48 object-contain" />
               </div>
               <div className="   w-full p-2 mx-auto flex flex-col items-center">
                  <div className=" w-60  flex justify-between py-2 gap-2">
                     <Button onClick={() => handleAddtoShelf('read')}>
                        <Book className="mr-2 h-4 w-4" />
                        MARK READ
                     </Button>
                     <Button onClick={() => handleAddtoShelf('favorites')}>
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
