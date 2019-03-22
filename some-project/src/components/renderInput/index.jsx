import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';



const renderInput = ({ id, input, meta: { touched, error }, ...rest }) => (
    <input
        id={id}
        className={cn({ 'is-invalid': error && touched })}
        {...input}
        {...rest}
    />
);

renderInput.propTypes = {
    id: PropTypes.string.isRequired,
};

export default renderInput;
