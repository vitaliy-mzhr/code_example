import React from 'react';
import PropTypes from 'prop-types';



const renderPersonalSelect = ({ name, value, firstOptionValue, data, handleChangeSelect }) => (
    <select
        className="my-info-page__select"
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
);

renderPersonalSelect.propTypes = {
    name: PropTypes.string.isRequired,
    firstOptionValue: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    handleChangeSelect: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

renderPersonalSelect.defaultProps = {
    value: null,
};

export default renderPersonalSelect;
