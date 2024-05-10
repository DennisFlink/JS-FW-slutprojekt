import { Header } from '@/components/header/Header';

import { Outlet } from 'react-router-dom';

export const HomeTemplate = () => {
   return (
      <>
         <Header></Header>
         <main className=" mx-4 mt-6">
            <Outlet />
         </main>
      </>
   );
};
