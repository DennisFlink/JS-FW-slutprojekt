import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '../ui/input';
import { fetchData } from '@/api/fetchData';
import { BookStore } from '@/store/Bookstore';
export const FormSchema = z.object({
   title: z.string().min(1),
});

type SearchInput = {};
export type formType = z.infer<typeof FormSchema>;

export const SearchInput: React.FC<SearchInput> = () => {
   const { setSearchTerm, searchTerm, fetch } = BookStore();

   const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      mode: 'onChange',
      defaultValues: {
         title: '',
      },
   });
   const onSubmit = (data: z.infer<typeof FormSchema>) => {
      console.log(data.title);
      setSearchTerm(data.title);
      if (searchTerm) {
         fetch();
      }
   };
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full ">
            <FormField
               control={form.control}
               name="title"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Search for Book</FormLabel>
                     <FormControl>
                        <Input placeholder="Search for book" {...field} autoComplete="off" />
                     </FormControl>

                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button type="submit">Search</Button>
         </form>
      </Form>
   );
};
