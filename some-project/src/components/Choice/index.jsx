import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/fp/noop';
import cn from 'classnames';

import { CheckMarkIcon } from '../SVG';



const Choice = ({label, name, id, color, icon, onChange, ...rest}) => (
    <div className="choice">
        <input id={id} name={name} type="checkbox" onChange={onChange} className="choice__input" {...rest}/>
        <label htmlFor={id} className="choice__label">
            <div
                className={cn('choice__checkbox', {'with-color': color, 'with-icon': icon})}
                style={{backgroundColor: `${color || null}`, backgroundImage: `${icon ? `url(${icon})` : null}`}}
            >
                <CheckMarkIcon/>
            </div>

            <span>{label}</span>
        </label>
    </div>
);

Choice.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    color: PropTypes.string,
    icon: PropTypes.string,
    onChange: PropTypes.func
};
Choice.defaultProps = {
    onChange: noop
};

export default React.memo(Choice);
