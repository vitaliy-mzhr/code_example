import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

// Components
import { CheckMarkIcon } from '../../components/SVG';



const renderAddressSelect = ({ name, value, firstOptionValue, isLast, data, handleChangeSelect }) => (
    <Fragment>
        <select
            className="my-info-page__select-address"
            name={name}
            value={value || ''}
            onChange={handleChangeSelect}
        >
            <option value="">{firstOptionValue}</option>
            {data.map(item => (
                <option value={item} key={item}>
                    {item}
                </option>
            ))}
        </select>

        <div className="my-info-page__message-wrapper">
            <div
                id={name}
                className={cn('my-info-page__saved', { 'is-address': !isLast, 'is-address-last': isLast })}
            >
                <CheckMarkIcon className="my-info-page__saved-icon" />
                <span>Auto saved</span>
            </div>
        </div>
    </Fragment>
);

renderAddressSelect.propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    firstOptionValue: PropTypes.string.isRequired,
    handleChangeSelect: PropTypes.func.isRequired,
    value: PropTypes.string,
    isLast: PropTypes.bool
};

renderAddressSelect.defaultProps = {
    value: null,
    isLast: false
};

export default renderAddressSelect;
