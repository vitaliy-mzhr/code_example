import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

// Components
import { CheckMarkIcon } from '../../components/SVG';



const renderPersonalInput = ({ name, value, placeholder, label, id, handleChangeInput, handleBlur }) => (
    <Fragment>
        <label htmlFor={id}>{label}</label>

        <input
            id={id}
            type="text"
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={handleChangeInput}
            onBlur={handleBlur}
            className="my-info-page__input"
        />

        <div className="my-info-page__message-wrapper">
            <span className={cn('my-info-page__recommended', { 'hide': value })}>(Recommended)</span>
            <div id={name} className="my-info-page__saved-with-background">
                <CheckMarkIcon className="my-info-page__saved-icon"/>
                <span>Auto saved</span>
            </div>
        </div>
    </Fragment>
);

renderPersonalInput.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    handleChangeInput: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired
};

export default renderPersonalInput;
