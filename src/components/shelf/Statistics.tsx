import { useBookStore } from '@/store/useBookstore';
import { Separator } from '@/components/ui/separator';
type Statistics = {};

export const Statistics: React.FC<Statistics> = () => {
   const { shelf, reviews } = useBookStore();
   const totalPages = reviews.reduce((accumulator, review) => accumulator + review.pages, 0);

   return (
      <section className=" container relative min-h-96 mt-6 ">
         <div className="w-full grid grid-cols-2">
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
         </div>
      </section>
   );
};
