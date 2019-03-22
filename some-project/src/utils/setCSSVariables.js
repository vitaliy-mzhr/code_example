import kebabCase from 'lodash/fp/kebabCase';



function _setVar(e, prop, val) {
    e.style.setProperty(`--${kebabCase(prop)}`, val);
}

function setCSSVariables(el, varsToSet = {}, prefix = '') {
    const element = el || document.documentElement;
    const setElVar = _setVar.bind(null, element);

    for (const [key, value] of Object.entries(varsToSet)) {
        const CSSVar = prefix ? `${prefix}-${key}` : key;
        setElVar(CSSVar, value);
    }
}

export default setCSSVariables;
