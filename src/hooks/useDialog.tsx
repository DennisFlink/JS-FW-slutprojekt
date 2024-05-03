import { useState } from 'react';

export const useDialog = () => {
   const [isOpen, setIsOpen] = useState(false);
   const openDialog = () => {
      setIsOpen((prevState) => !prevState);
   };
   const closeDialog = () => {
      setIsOpen((prevState) => !prevState);
   };
   return {
      isOpen,
      openDialog,
      closeDialog,
   };
};
