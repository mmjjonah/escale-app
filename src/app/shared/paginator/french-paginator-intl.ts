import { MatPaginatorIntl } from '@angular/material/paginator';

const frRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length === 0 || pageSize === 0) { return `0 / ${length}`; }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex = startIndex < length ?
    Math.min(startIndex + pageSize, length) :
    startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} / ${length}`;
}

export function getFrenchPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Élément par page:';
  paginatorIntl.nextPageLabel = 'Suivant';
  paginatorIntl.previousPageLabel = 'Précédent';
  paginatorIntl.getRangeLabel = frRangeLabel;

  return paginatorIntl;
}
