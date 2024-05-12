import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useBookStore } from '@/store/useBookstore';
import { Card, CardContent } from '../ui/card';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
type StoredAuthors = {};

export const StoredAuthors: React.FC<StoredAuthors> = () => {
   const windowSize = useWindowSize();
   const navigate = useNavigate();
   const { shelf, removeFromShelf } = useBookStore();
   console.log(shelf);

   const handleClick = (id: string) => {
      const authorId = id.split('/')[2];
      navigate(`/author/${authorId}`);
   };
   const handleRemove = (authorId: string, shelfType: 'author') => {
      removeFromShelf(authorId, shelfType);
   };
   return (
      <section className=" flex flex-col items-center justify-center gap-6 h-full ">
         <h1 className=" text-left w-full ml-2">Read Books</h1>
         <Carousel
            opts={{
               align: 'start',
            }}
            className="w-full max-w-sm min-h-80"
         >
            <CarouselContent>
               {shelf.author.length > 0 ? (
                  shelf.author.map((author, index) => (
                     <CarouselItem key={index} className="sm:basis-1/2 basis-1/3">
                        <Card key={author.name || index}>
                           <div className="flex justify-between p-1">
                              <h1>{author.name}</h1>
                              <Button variant="outline" onClick={() => handleRemove(author.id, 'author')} className=" p-2 py-1 text-xl">
                                 X
                              </Button>
                           </div>
                           <CardContent className="flex aspect-square items-center justify-center p-2" onClick={() => handleClick(author.id)}></CardContent>
                        </Card>
                     </CarouselItem>
                  ))
               ) : (
                  <div className=" w-full h-48 flex items-center">
                     <p className="text-center w-full">No books in your Read shelf yet.</p>
                  </div>
               )}
            </CarouselContent>
            {windowSize.width >= 500 ? (
               <>
                  <CarouselPrevious />
                  <CarouselNext />
               </>
            ) : null}
         </Carousel>
      </section>
   );
};
