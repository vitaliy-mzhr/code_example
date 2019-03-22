import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { AccordionContext } from './';



class AccordionPanel extends Component {
    ref = React.createRef();
    fullHeight = 0;

    componentDidMount() {
        this.fullHeight = this.ref.current.scrollHeight;
    }

    render() {
        const {title, id, className, children} = this.props;

        return (
            <AccordionContext.Consumer>
                {({togglePanel, activePanels}) => {
                    const isActive = activePanels.indexOf(id) >= 0;

                    return (
                        <div className={cn('accordion__panel', className, {'is-active': isActive})}>
                            <Fragment>
                                <div className="accordion__panel-head" data-panel-id={id} onClick={togglePanel}>
                                    <span>{title}</span>
                                </div>

                                <div
                                    className="accordion__panel-body"
                                    style={{height: isActive ? `${this.fullHeight}px` : '0'}}
                                    ref={this.ref}
                                >
                                    {children}
                                </div>
                            </Fragment>
                        </div>
                    );
                }}
            </AccordionContext.Consumer>
        );
    }
}

AccordionPanel.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default AccordionPanel;
