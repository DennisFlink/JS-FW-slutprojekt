import { Button } from '@/components/ui/button';
import { LibraryBig } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header = () => {
   return (
      <header className="flex h-24 items-center justify-between relative bg-black w-full z-20">
         <Link to="/">
            <h1 className=" sm:text-6xl text-4xl text-white p-2 font-bold flex sm:gap-4 gap-2  ">
               Book<span className=" sm:h-16 px-1 bg-orange-500 text-black rounded">hub</span>
            </h1>
         </Link>
         <Link to="/myshelf">
            <Button className="relative  text-white sm:py-2 py-1 sm:px-6 px-2 rounded-full mx-4  border-2">
               <LibraryBig className="mr-2 h-4 w-4" /> My Shelf
            </Button>
         </Link>
      </header>
   );
};
