import { Statistics } from '@/components/shelf/Statistics';
import { StoredBooks } from '@/components/shelf/StoredBooks';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Shelf = {};

export const Shelf: React.FC<Shelf> = () => {
   return (
      <Tabs defaultValue="books" className="w-full text-center">
         <TabsList>
            <TabsTrigger value="books">Books</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
         </TabsList>
         <TabsContent value="books">
            <StoredBooks></StoredBooks>
         </TabsContent>
         <TabsContent value="statistics">
            <Statistics />
         </TabsContent>
      </Tabs>
   );
};
