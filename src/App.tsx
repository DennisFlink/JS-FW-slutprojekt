import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { HomeTemplate } from './layout/HomeTemplate';
import { Home } from '@/pages/Home';
import { Shelf } from '@/pages/Shelf';

function App() {
   const routers = createBrowserRouter([
      {
         element: <HomeTemplate />,
         children: [
            {
               path: '/',
               element: <Home />,
            },
            { path: '/myshelf', element: <Shelf /> },
         ],
      },
   ]);
   return (
      <>
         <RouterProvider router={routers}></RouterProvider>
      </>
   );
}
export default App;
