import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useBookStore } from '@/store/useBookstore';

const reviewSchema = z.object({
   reviewtext: z.string().max(50),
   rating: z.coerce.number().min(1, 'Rating must be between 1 and 5').max(5, 'Rating must be between 1 and 5'),
   pages: z.coerce.number().min(1, 'Number of pages must be positive'),
});

type BookReview = {
   isopen: boolean;
   onClose: () => void;
};
type reviewData = z.infer<typeof reviewSchema>;
export type ReviewWithId = reviewData & { id: string };

export const BookReview: React.FC<BookReview> = ({ isopen, onClose }) => {
   const { bookDetails, addReview, reviews } = useBookStore();
   const existingReview = reviews.find((review) => review.id === bookDetails.id);
   console.log(existingReview);

   const reviewForm = useForm<z.infer<typeof reviewSchema>>({
      resolver: zodResolver(reviewSchema),
      mode: 'onSubmit',
      values: {
         reviewtext: existingReview?.reviewtext || '',
         rating: existingReview?.rating || 1,
         pages: existingReview?.pages || 1,
      },
   });

   const onSubmit = async (data: z.infer<typeof reviewSchema>) => {
      const reviewWithId: ReviewWithId = { ...data, id: bookDetails.id };
      addReview(reviewWithId);
   };
   console.log(reviews);
   return (
      <Dialog open={isopen} onOpenChange={onClose}>
         <DialogTrigger asChild>Open</DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Add a review</DialogTitle>
               <DialogDescription>Add a review to the book</DialogDescription>
            </DialogHeader>
            <Form {...reviewForm}>
               <form onSubmit={reviewForm.handleSubmit(onSubmit)} className="space-y-8 w-full ">
                  <FormField
                     control={reviewForm.control}
                     name="reviewtext"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Your Book Review</FormLabel>
                           <FormControl>
                              <Textarea {...field} autoComplete="off" />
                           </FormControl>

                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={reviewForm.control}
                     name="rating"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Your Rating</FormLabel>
                           <FormControl>
                              <Input {...field} autoComplete="off" />
                           </FormControl>

                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={reviewForm.control}
                     name="pages"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>How many pages?</FormLabel>
                           <FormControl>
                              <Input type="number" {...field} autoComplete="off" />
                           </FormControl>

                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <DialogFooter className="sm:justify-end">
                     <Button type="submit">Save</Button>
                  </DialogFooter>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   );
};
