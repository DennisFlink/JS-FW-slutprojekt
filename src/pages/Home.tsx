import { BookGrid } from '@/components/book/BookGrid';
import { SearchInput } from '@/components/searchInput/SearchInput';

type Home = {};

export const Home: React.FC<Home> = () => {
   return (
      <section>
         <div className="container flex w-full">
            <SearchInput></SearchInput>
         </div>
         <div className="h-full mt-6">
            <BookGrid></BookGrid>
         </div>
      </section>
   );
};
