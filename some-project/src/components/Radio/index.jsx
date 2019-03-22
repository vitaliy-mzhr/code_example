import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/fp/noop';



const Radio = ({label, name, id, value, onChange, ...rest}) => (
    <div className="radio">
        <input id={id} name={name} type="radio" onChange={onChange} value={value} className="radio__input" {...rest}/>
        <label htmlFor={id} className="radio__label">
            <div className="radio__element"/>
            {label && <span>{label}</span>}
        </label>
    </div>
);

Radio.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func
};
Radio.defaultProps = {
    onChange: noop
};

export default Radio;
