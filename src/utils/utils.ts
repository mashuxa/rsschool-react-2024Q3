import { createObjectCsvStringifier } from 'csv-writer';
import { Person } from '../types.ts';

export const generateCsvBlob = (data: Person[]): Blob => {
  const csvStringifier = createObjectCsvStringifier({
    header: [
      { id: 'name', title: 'Name' },
      { id: 'birth_year', title: 'Birth Year' },
      { id: 'mass', title: 'Mass' },
    ],
  });

  const csvContent = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(data);

  return new Blob([csvContent], { type: 'text/csv' });
};

export const normalizePersons = (data: Person[]) => {
  return data.map((data) => ({
    ...data,
    id: data.url.slice(0, -1).split('/').pop() || '',
  }));
};
