import { useBookStore } from '@/store/useBookstore';
import { Separator } from '@/components/ui/separator';
import { averagePageCalc, averageScore, findMostCommonAuthor } from '@/utils/averageData';

export const Statistics = () => {
   const { shelf, reviews } = useBookStore();
   const totalPages = reviews.reduce((accumulator, review) => accumulator + review.pages, 0);
   const totalRating = reviews.reduce((accumulator, review) => accumulator + review.rating, 0);
   const allAuthors: string[] = shelf.read.reduce((accumulator: string[], book) => {
      const bookAuthors: string[] = book?.authorNames || [];
      return accumulator.concat(bookAuthors);
   }, []);
   const mostCommonAuthor = findMostCommonAuthor(allAuthors);
   console.log('NMNOSAOIAS', mostCommonAuthor);
   const averagePages = averagePageCalc(totalPages, shelf.read.length);
   const averageRating = averageScore(totalRating, shelf.read.length);

   return (
      <section className=" container relative min-h-96 mt-6 ">
         <div className="w-full grid grid-cols-2 gap-2">
            <div className="border">
               <h2>Read Books</h2>
               <Separator className=" bg-black" />
               {shelf.read.length}
            </div>
            <div className="border">
               <h2>Pages Read</h2>
               <Separator className=" bg-black" />
               {totalPages ? totalPages : '0'}
            </div>
            <div className="border">
               <h2>Average pages read</h2>
               <Separator className=" bg-black" />
               {averagePages ? averagePages : '0'}
            </div>
            <div className="border">
               <h2>Average Rating</h2>
               <Separator className=" bg-black" />
               {averageRating ? averageRating : '0'}
            </div>
            <div className="border">
               <h2>Most common Author</h2>
               <Separator className=" bg-black" />
               {mostCommonAuthor.map((author, index) => (
                  <h2 key={index}>{author}</h2>
               ))}
            </div>
         </div>
      </section>
   );
};
