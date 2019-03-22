import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/fp/noop';

import { PlusIcon, PlusIconActive } from '../SVG';



const AddBtn = ({isOn, onClick}) => (
    <span className="ls-header__add-btn" onClick={onClick}>
        {isOn && <PlusIconActive/>}
        {!isOn && <PlusIcon/>}
    </span>
);

AddBtn.propTypes = {
    onClick: PropTypes.func,
    isOn: PropTypes.bool
};
AddBtn.defaultProps = {
    isOn: false,
    onClick: noop
};

export default AddBtn;

