import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

// Components
import { CheckMarkIcon } from '../../components/SVG';



const renderAddressInput = ({ name, value, placeholder, isFirst, handleChangeInput, handleBlur }) => (
    <Fragment>
        { isFirst && <label>Shipping Address:</label> }

        <input
            type="text"
            placeholder={placeholder}
            name={name}
            className="my-info-page__input-address"
            value={value || ''}
            onChange={handleChangeInput}
            onBlur={handleBlur}
        />

        <div className="my-info-page__message-wrapper">
            <div
                id={name}
                className={cn('my-info-page__saved', { 'is-address': !isFirst, 'is-address-with-label': isFirst })}
            >
                <CheckMarkIcon className="my-info-page__saved-icon"/>
                <span>Auto saved</span>
            </div>
        </div>
    </Fragment>
);

renderAddressInput.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    handleChangeInput: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    value: PropTypes.string,
    isFirst: PropTypes.bool
};

renderAddressInput.defaultProps = {
    value: '',
    isFirst: false
};

export default renderAddressInput;
