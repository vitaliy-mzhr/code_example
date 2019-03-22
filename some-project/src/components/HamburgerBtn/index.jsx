import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/fp/noop';
import cn from 'classnames';



const HamburgerBtn = ({onClick, isOn}) => (
    <div className={cn('hamburger-btn', {'is-active': isOn})} onClick={onClick}>
        <span className="hamburger-btn__line"/>
        <span className="hamburger-btn__line"/>
        <span className="hamburger-btn__line"/>
    </div>
);

HamburgerBtn.propTypes = {
    isOn: PropTypes.bool.isRequired,
    onClick: PropTypes.func
};
HamburgerBtn.defaultProps = {
    onClick: noop
};

export default HamburgerBtn;

