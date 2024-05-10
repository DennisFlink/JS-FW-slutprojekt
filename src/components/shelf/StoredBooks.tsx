import { useBookStore } from '@/store/useBookstore';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import cover_not_found from '@/assets/cover_not_found.jpg';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { number } from 'zod';
type StoredBooks = {};

export const StoredBooks: React.FC<StoredBooks> = () => {
   const navigate = useNavigate();
   const windowSize = useWindowSize();
   const { shelf, removeFromShelf } = useBookStore();

   const handleClick = (id: string) => {
      navigate(`/book/${id}`);
   };

   const handleRemove = (bookId: string, shelfType: 'read' | 'favorites') => {
      removeFromShelf(bookId, shelfType);
   };
   console.log(shelf);
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
               {shelf.read.length > 0 ? (
                  shelf.read.map((book, index) => (
                     <CarouselItem key={index} className="sm:basis-1/2 basis-1/3">
                        <Card key={book.id || index}>
                           <div className="flex justify-between p-1">
                              <h1>{book.title}</h1>
                           </div>
                           <CardContent className="flex aspect-square items-center justify-center p-2" onClick={() => handleClick(book.id)}>
                              {typeof book.cover === 'number' ? <img src={`https://covers.openlibrary.org/b/id/${book.cover}-M.jpg`} alt="" /> : <img src={book.cover} alt="No Cover" />}
                           </CardContent>
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

         <h1 className="text-left w-full ml-2 ">Favorites</h1>
         <Carousel
            opts={{
               align: 'start',
            }}
            className="w-full max-w-sm min-h-80"
         >
            <CarouselContent>
               {shelf.favorites.length > 0 ? (
                  shelf.favorites.map((book, index) => (
                     <CarouselItem key={index} className="sm:basis-1/2 basis-1/3">
                        <Card key={book.id || index}>
                           <div className="flex justify-between p-1">
                              <h1>{book.title}</h1>
                              <Button variant="outline" onClick={() => handleRemove(book.id, 'favorites')} className=" p-2 py-1 text-xl">
                                 X
                              </Button>
                           </div>
                           <CardContent className="flex aspect-square items-center justify-center p-2" onClick={() => handleClick(book.id)}>
                              {typeof book.cover === 'number' ? <img src={`https://covers.openlibrary.org/b/id/${book.cover}-M.jpg`} alt="" /> : <img src={book.cover} alt="No Cover" />}
                           </CardContent>
                        </Card>
                     </CarouselItem>
                  ))
               ) : (
                  <div className=" w-full h-48 flex items-center">
                     <p className=" text-center w-full">No books in your Favorite shelf yet.</p>
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
