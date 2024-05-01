export const getBookId = (key: string | undefined) => {
   if (key) {
      const id = key.split('/')[2];
      return id;
   }
};
