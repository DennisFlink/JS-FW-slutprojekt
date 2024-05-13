import { Statistics } from '@/components/shelf/Statistics';
import { StoredAuthors } from '@/components/shelf/StoredAuthors';
import { StoredBooks } from '@/components/shelf/StoredBooks';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const Shelf = () => {
   return (
      <Tabs defaultValue="books" className="w-full text-center">
         <TabsList>
            <TabsTrigger value="books">Books</TabsTrigger>
            <TabsTrigger value="authors">Authors</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
         </TabsList>
         <TabsContent value="books">
            <StoredBooks></StoredBooks>
         </TabsContent>
         <TabsContent value="authors">
            <StoredAuthors></StoredAuthors>
         </TabsContent>
         <TabsContent value="statistics">
            <Statistics />
         </TabsContent>
      </Tabs>
   );
};
