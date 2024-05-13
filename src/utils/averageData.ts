export const averagePageCalc = (pages: number, booksRead: number) => {
   const averagePagesPerBook = pages / booksRead;
   return Math.round(averagePagesPerBook);
};

export const averageScore = (score: number, booksRead: number) => {
   const averageScorePerBook = score / booksRead;
   return Math.round(averageScorePerBook);
};

export const findMostCommonAuthor = (allAuthors: string[]) => {
   const authorCounts = allAuthors.reduce((counts: { [author: string]: number }, author) => {
      counts[author] = (counts[author] || 0) + 1;
      return counts;
   }, {});
   const sortedAuthors = Object.entries(authorCounts)
      .sort(([, countA], [, countB]) => countB - countA)
      .map(([author]) => author);

   return sortedAuthors.slice(0, 3);
};
