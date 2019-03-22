import { isValidNumber } from 'libphonenumber-js';
import { checkIfPhonesUnique } from '../../../helpers';

interface AppFormValues {
  firstName: string;
  lastName: string;
  phones: string[];
}

const validate = (values: AppFormValues) => {
  const errors: any = {};

  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }
  if (!values.phones || !values.phones.length) {
    errors.phones = {_error: 'At least one phone must be entered'};
  } else if (!checkIfPhonesUnique(values.phones)) {
    errors.phones = {_error: 'Phones should be unique'};
  } else {
    const phonesArrayErrors: string[] = [];
    values.phones.forEach((phone, index) => {
      if (!phone || !phone.length) {
        phonesArrayErrors[index] = 'Required';
      }
      if (phone && !isValidNumber(phone)) {
        phonesArrayErrors[index] = 'Invalid phone number';
      }
    });
    if (phonesArrayErrors.length) {
      errors.phones = phonesArrayErrors;
    }
  }
  return errors;
};

export default validate;
