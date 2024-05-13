import { DisplayGrid } from '@/components/displayGrid/DisplayGrid';
import { SearchInput } from '@/components/searchInput/SearchInput';

export const Home = () => {
   return (
      <section>
         <div className="container flex w-full">
            <SearchInput></SearchInput>
         </div>
         <div className="h-full mt-6">
            <DisplayGrid></DisplayGrid>
         </div>
      </section>
   );
};
