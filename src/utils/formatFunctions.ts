export const getBookKey = (key: string | undefined) => {
   if (key) {
      const id = key.split('/')[2];
      return id;
   }
};

export const formatNames = (names: string[] | undefined) => {
   if (names) {
      const joinNames = names.join(' ');
      return joinNames;
   }
};
