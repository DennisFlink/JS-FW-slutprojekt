import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '../ui/input';
import { useBookStore } from '@/store/useBookstore';

export const FormSchema = z.object({
   term: z.string().min(1),
   selection: z.string(),
});

export type formType = z.infer<typeof FormSchema>;

export const SearchInput = () => {
   const { setSearchTerm, fetchSearchedBooks, loading, fetchAuthors } = useBookStore();
   const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      mode: 'onSubmit',
      defaultValues: {
         term: '',
         selection: 'book',
      },
   });

   const onSubmit = async (data: z.infer<typeof FormSchema>) => {
      console.log(data);
      setSearchTerm(data);
      const updatedSearchTerm = useBookStore.getState().searchTerm.term;

      if (data.selection == 'book' && updatedSearchTerm) {
         await fetchSearchedBooks();
      } else if (data.selection == 'author' && updatedSearchTerm) {
         await fetchAuthors();
      }
   };

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className=" container sm:grid grid-rows-2 grid-cols-[200px,auto] gap-2 flex flex-col sm:gap-4 ">
            <FormField
               control={form.control}
               name="selection"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Select book or author</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                           <SelectTrigger>
                              <SelectValue placeholder="Select book or author" />
                           </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           <SelectItem value="book">Book</SelectItem>
                           <SelectItem value="author">Author</SelectItem>
                        </SelectContent>
                     </Select>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="term"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Search</FormLabel>
                     <FormControl>
                        <Input placeholder="Search" {...field} autoComplete="off" />
                     </FormControl>

                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button type="submit" disabled={loading} className="col-start-2 sm:w-28 sm:self-center justify-self-center">
               {loading ? (
                  <>
                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                     Searching...
                  </>
               ) : (
                  'Search'
               )}
            </Button>
         </form>
      </Form>
   );
};
