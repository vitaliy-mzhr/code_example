import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/fp/get';
import cn from 'classnames';

import AccordionPanel from './AccordionPanel';



export const AccordionContext = React.createContext();

class Accordion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMulti: this.props.multi,
            activePanels: [],
            togglePanel: this.togglePanel
        };
    }

    togglePanel = (e) => {
        const panelId = get('currentTarget.dataset.panelId', e);

        if (!panelId) {
            return true;

        } else if (this.props.multi) {
            const index = this.state.activePanels.indexOf(panelId);
            this.setState((prevState) => ({
                ...prevState,
                activePanels: (index >= 0 )
                    ? prevState.activePanels.filter((val) => val !== panelId)
                    : [...prevState.activePanels, panelId]
            }));

        } else {
            this.setState((prevState) => ({
                ...prevState,
                activePanels: (prevState.activePanels[0] === panelId) ? [] : [panelId]
            }));
        }
    };

    render() {
        const {className, children} = this.props;

        return (
            <div className={cn('accordion', className)}>
                <AccordionContext.Provider value={this.state}>
                    {children}
                </AccordionContext.Provider>
            </div>
        );
    }

    static Panel = AccordionPanel;
}

Accordion.propTypes = {
    multi: PropTypes.bool
};
Accordion.defaultProps = {
    multi: false
};

export default Accordion;
