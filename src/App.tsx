import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { HomeTemplate } from './layout/HomeTemplate';
import { Home } from '@/pages/Home';
import { Shelf } from '@/pages/Shelf';
import { BookDisplay } from './components/book/BookDisplay';
import { AuthorDisplay } from './components/author/AuthorDisplay';

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
            {
               path: '/book/:id',
               element: <BookDisplay />,
            },
            { path: '/author/:id', element: <AuthorDisplay></AuthorDisplay> },
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
