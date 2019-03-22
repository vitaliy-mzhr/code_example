import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import BackLink from '../BackLink';
import { ArrowIcon } from '../SVG';
import SaveBtn from './SaveBtn';
import AddBtn from './AddBtn';



const LSHeader = ({title, subtitle, withBorder, className, showBackBtn, onAdd, onSave, isSaved, isAdded, withShare}, ref) => (
    <div
        className={cn('ls-header', className, {'with-border': withBorder, 'with-btn': onSave || onAdd || withShare})}
        ref={ref}
    >
        {showBackBtn && (
            <BackLink>
                <ArrowIcon className="ls-header__back-btn"/>
            </BackLink>
        )}

        {title && <h1>{ title }</h1>}
        {subtitle && <h3>{ subtitle }</h3>}

        {onSave && <SaveBtn isOn={isSaved} onClick={onSave}/>}
        {onAdd && <AddBtn isOn={isAdded} onClick={onAdd}/>}
    </div>
);

const RefSidebarHeader = React.forwardRef(LSHeader);

RefSidebarHeader.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    onAdd: PropTypes.func,
    onSave: PropTypes.func,
    withBorder: PropTypes.bool,
    isSaved: PropTypes.bool,
    isAdded: PropTypes.bool,
    withShare: PropTypes.bool,
    showBackBtn: PropTypes.bool
};
RefSidebarHeader.defaultProps = {
    title: '',
    subtitle: '',
    withBorder: false,
    withShare: false,
    showBackBtn: true
};

export default RefSidebarHeader;
