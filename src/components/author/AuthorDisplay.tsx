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
   const handleAddtoShelf = (shelfType: 'author') => {
      console.log(authorDetails);
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
      }
      else {
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
         {parens.id ? (
            <section className="  rounded-lg p-2">
               <div className="p-1">
                  <h1 className="text-6xl font-semibold">{authorDetails.name}</h1>
                  <h2 className="italic text-xl my-2">Born: {authorDetails.birth_date}</h2>
               </div>
               <div className="w-full flex justify-center pt-4">
                  <div className="p-4 w-full  flex flex-col items-center gap-4   ">
                     <h3>{authorDetails.bio ? authorDetails.bio : 'Sorry, No Description 😢'}</h3>
                     <Button className=" w-2/4" onClick={() => handleAddtoShelf('author')}>
                        <Heart className="mr-2 h-4 w-4" />
                        Add to favorites
                     </Button>
                  </div>
               </div>
               {/*                <div className="w-full flex justify-center pt-4">
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
               <div className="p-4 w-full text-center">
                  <h3>{bookDetails.description?.value ? bookDetails.description.value : 'Sorry, No Description 😢'}</h3>
               </div>
               <div className="flex flex-wrap gap-2 w-full justify-center">
                  {bookDetails.subjects?.slice(0, 10).map((item, index) => (
                     <Badge key={index}>{item}</Badge>
                  ))}
               </div> */}
            </section>
         ) : (
            <p>Book not found with ID: </p>
         )}
      </>
   );
};
