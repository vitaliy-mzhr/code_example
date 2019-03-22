// Utils
import { getTypeOf } from './helpers';



export function parseResponseErrors (errorData, isSingle) {
    const formErrors = {};
    if (getTypeOf(errorData) === 'object') {
        if (!isSingle) {
            for (const [key, value] of Object.entries(errorData)) {
                formErrors[key] = Array.isArray(value) ? value[0] : value;
            }
        } else {
            const firstError = Object.entries(errorData)[0];
            formErrors[firstError[0]] = firstError[1][0];
        }
    }
    formErrors['_error'] = Object.values(formErrors)[0] || 'Something went wrong';
    delete formErrors['non_field_errors'];
    return formErrors;
}
