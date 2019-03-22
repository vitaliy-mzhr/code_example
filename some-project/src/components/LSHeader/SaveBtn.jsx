import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/fp/noop';

import { HeartIcon, HeartIconFilled } from '../SVG';



const SaveBtn = ({isOn, onClick}) => (
    <span className="ls-header__save-btn" onClick={onClick}>
        {isOn && <HeartIconFilled/>}
        {!isOn && <HeartIcon/>}
    </span>
);

SaveBtn.propTypes = {
    onClick: PropTypes.func,
    isOn: PropTypes.bool
};
SaveBtn.defaultProps = {
    isOn: false,
    onClick: noop
};

export default SaveBtn;

