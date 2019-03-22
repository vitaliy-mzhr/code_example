export const rangeArray = (start = 1, end, step = 1, fn) => {
    function* range(start, end, step, fn) {
        while (start <= end) {
            yield fn ? fn(start) : start;
            start += step;
        }
    }

    return Array.from(range(start, end, step, fn));
};



export const getTypeOf = (val) => ({}.toString.call(val).slice(8, -1).toLowerCase());



export const isPrimitive = (val) => {
    const valType = getTypeOf(val);
    return valType !== 'object' && valType !== 'function' && valType !== 'array';
};



export const arePrimitivesDiffer = (targetObj, compareObj) => {
    const targetObjKeys = Object.keys(targetObj).filter((val) => isPrimitive(targetObj[val]));
    const compareObjKeys = Object.keys(compareObj).filter((val) => isPrimitive(compareObj[val]));

    if (targetObjKeys.length !== compareObjKeys.length) return true;

    for (let i = targetObjKeys.length - 1; i >= 0; i--) {
        if (compareObjKeys.indexOf(targetObjKeys[i]) === -1 ||
            compareObj[targetObjKeys[i]] !== targetObj[targetObjKeys[i]]) {
            return true;
        }
    }

    return false;
};



export const isTouchSupported = () => process.browser && ('ontouchstart' in document.documentElement);



export const isMobile = () => (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));



export function scrollbarVisible(element) {
    return element.scrollHeight > element.clientHeight;
}



export const numberMetricFormat = (num, digits) => {
    if (num === undefined) return;

    const si = [
        { value: 1, symbol: ''},
        { value: 1e3, symbol: 'K' },
        { value: 1e6, symbol: 'M' },
        { value: 1e9, symbol: 'B' },
        { value: 1e12, symbol: 'T' },
        { value: 1e15, symbol: 'P' },
        { value: 1e18, symbol: 'E' }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let i;

    for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
            break;
        }
    }

    if (num < 1 && num > 0) {
        return num.toFixed(2);
    }

    return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
};

export const convertToBytes = (value, unit) => {
    switch (unit) {
        case 'k':
            return value * (2**10);
        case 'm':
            return value * (2**20);
        case 'g':
            return value * (2**30);
        default:
            return value;
    }
};
