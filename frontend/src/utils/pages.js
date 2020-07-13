/* eslint-disable no-plusplus */
export function paginate(selectedPage, totalPages) {
  const pages = [];
  let oldPage;

  for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
    const firstAndLastPage = currentPage === 1 || currentPage === totalPages;
    const pagesBeforeSelectedPage = selectedPage >= currentPage - 2;
    const pagesAfterSelectedPage = selectedPage <= currentPage + 2;

    if (
      firstAndLastPage ||
      (pagesBeforeSelectedPage && pagesAfterSelectedPage)
    ) {
      if (oldPage && currentPage - oldPage > 2) {
        pages.push('...');
      }
      if (oldPage && currentPage - oldPage === 2) {
        pages.push(oldPage + 1);
      }
      pages.push(currentPage);
      oldPage = currentPage;
    }
  }
  return pages;
}
