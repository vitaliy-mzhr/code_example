import { AppContact } from '../app/Contact/interfaces';
import { uniq } from 'lodash';

export const compareNames = (a: any, b: any) => {
  const nameA: string = a.name.first.toLowerCase();
  const nameB: string = b.name.first.toLowerCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
};

export const getFirstChart = (array: AppContact[], index: number) => array[index].name.first.charAt(0).toLowerCase();

export const insertDividers = (array: AppContact[]) => {
  if (array.length === 0) {
    return array;
  }
  const result: any[] = [{
    divider: getFirstChart(array, 0),
  }];
  for (let i = 0; i < array.length - 1; i++) {
    if (getFirstChart(array, i) !== getFirstChart(array, i + 1)) {
      result.push(array[i], {
        divider: getFirstChart(array, i + 1),
      });
    } else {
      result.push(array[i]);
    }
  }
  result.push(array[array.length - 1]);
  return result;
};

const filterPhones = (phones: string[], input: string): boolean => {
  const numInput: number = +input;
  const result: string[] = phones.filter((phone) => phone.includes(input)
    || phone.replace(/\D+/g, '').includes(numInput.toString()));
  return !!result.length;
};

export const filterContacts = (contacts: AppContact[], input: string) => {
  return contacts.filter((contact) =>
    filterPhones(contact.phone, input)
    || contact.name.first.toLowerCase().includes(input.toLowerCase())
    || contact.name.last.toLowerCase().includes(input.toLowerCase()));
};

export const checkIfPhonesUnique = (phones: string[]): boolean => uniq(phones).length === phones.length;