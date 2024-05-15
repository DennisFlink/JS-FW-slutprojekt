import { useBookStore } from '@/store/useBookstore';
import { Heart } from 'lucide-react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../ui/button';
import { createShelfAuthor } from '@/utils/createShelfAuthor';
import { useToast } from '../ui/use-toast';

export const AuthorDisplay = () => {
   const { toast } = useToast();
   const { fetchAuthorDetail, authorDetails, addToShelf } = useBookStore();
   const parens = useParams<{ id: string }>();
   useEffect(() => {
      if (parens.id) {
         fetchAuthorDetail(parens.id);
      }
   }, [parens.id, fetchAuthorDetail]);
   /* 
TODO:ADD TOAST FOR ADDING AUTHOR

 */
   console.log(authorDetails);
   const handleAddtoShelf = (shelfType: 'author') => {
      const isStored = useBookStore.getState().shelf[shelfType].some((storedAuthor) => storedAuthor.id?.split('/authors/')[1] === parens.id);
      if (!isStored) {
         const authorShelf = createShelfAuthor(authorDetails);
         addToShelf(authorShelf, '1', shelfType);
         toast({
            title: 'Author is added 👍',
            description: `Author is added in ${shelfType} shelf`,
            duration: 800,
            className: 'w-[200px]',
         });
      } else {
         toast({
            title: 'Uh oh! Something went wrong.',
            description: `Author is already stored in  ${shelfType} shelf`,
            duration: 800,
            className: 'w-[200px]',
         });
      }
   };
   return (
      <>
         {authorDetails ? (
            <section className="  rounded-lg p-2">
               <div className="p-1">
                  <h1 className="text-6xl font-semibold">{authorDetails?.name}</h1>
                  <h2 className="italic text-xl my-2">Born: {authorDetails.birth_date}</h2>
               </div>
               <div className="w-full flex justify-center pt-4">
                  <div className="p-4 w-full  flex flex-col items-center gap-4   ">
                     <h3>{typeof authorDetails.bio === 'string' ? authorDetails.bio : authorDetails.bio?.value}</h3>
                     <Button className=" w-2/4" onClick={() => handleAddtoShelf('author')}>
                        <Heart className="mr-2 h-4 w-4" />
                        Add to favorites
                     </Button>
                  </div>
               </div>
            </section>
         ) : (
            <p>Book not found with ID: </p>
         )}
      </>
   );
};
