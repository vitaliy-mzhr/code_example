// JSONS
import COUNTRIES_VALUES from './countries-values.json';
import US_STATES_VALUES from './us-states-values.json';
// Utils
import { rangeArray } from '../../utils/helpers';



function getListOfYears() {
    const currentYear = new Date().getFullYear();
    return rangeArray(-(currentYear-13), -(currentYear-110), 1, (num)=> num * -1);
}

const BIRTH_DATE_VALUES = {
    DAYS: rangeArray(1, 31),
    MONTHS: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
    YEARS: getListOfYears()
};

export {
    BIRTH_DATE_VALUES,
    US_STATES_VALUES,
    COUNTRIES_VALUES
};
