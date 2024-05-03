import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';
import { Button } from '../ui/button';

type BookReview = {
   isopen: boolean;
   onClose: () => void;
};

export const BookReview: React.FC<BookReview> = ({ isopen, onClose }) => {
   return (
      <Dialog open={isopen} onOpenChange={onClose}>
         <DialogTrigger asChild>Open</DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Add review</DialogTitle>
               <DialogDescription>Add a review to the book</DialogDescription>
            </DialogHeader>
            <Label htmlFor="reviewtext">Your Review</Label>
            <Textarea id="reviewtext" />
            <DialogFooter className="sm:justify-end">
               <DialogClose asChild>
                  <Button type="button">Save</Button>
               </DialogClose>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
};
