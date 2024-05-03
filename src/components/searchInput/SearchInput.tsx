import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '../ui/input';
import { useBookStore } from '@/store/useBookstore';
import { useState } from 'react';

export const FormSchema = z.object({
   title: z.string().min(1),
});

type SearchInput = {};
export type formType = z.infer<typeof FormSchema>;

export const SearchInput: React.FC<SearchInput> = () => {
   const { setSearchTerm, fetch, loading } = useBookStore();
   const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      mode: 'onSubmit',
      defaultValues: {
         title: '',
      },
   });
   const onSubmit = async (data: z.infer<typeof FormSchema>) => {
      setSearchTerm(data.title);
      const updatedSearchTerm = useBookStore.getState().searchTerm;
      console.log(updatedSearchTerm);
      if (updatedSearchTerm) {
         await fetch();
      } else {
         console.warn('Search term is empty');
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
            <Button type="submit" disabled={loading}>
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
