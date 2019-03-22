import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import get from 'lodash/fp/get';

import TabBody from './TabBody';
import TabHeader from './TabHeader';
import EyeIcon from '../SVG/EyeIcon';
import TabFilters from './TabFilters';



export const TabsContext = React.createContext();

class Tabs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: this.props.activeTab || null,
            toggleTab: this.toggleTab
        };
    }

    toggleTab = (e, id) => {
        const tabId = get('currentTarget.dataset.tabId', e);

        if (!this.props.toggleFn && (tabId || id)) {
            this.setState({activeTab: tabId || id});
        } else if (this.props.toggleFn && (tabId || id)) {
            this.props.toggleFn(tabId || id);
        }
    };

    getComponents(componentName) {
        const components = [];
        React.Children.forEach(this.props.children, (compItem) => {
            const id = compItem.props.id;
            React.Children.forEach(compItem.props.children, (comp) => {
                if (comp.type.name === componentName) {
                    components.push(React.cloneElement(comp, {
                        ...comp.props,
                        id,
                        key: id
                    }));
                }
            });
        });
        return components;
    }

    buildHeader() {
        return this.getComponents(TabHeader.name);
    }

    buildBody() {
        return this.getComponents(TabBody.name);
    }

    buildFilters() {
        return this.getComponents(TabFilters.name);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.activeTab !== this.props.activeTab) {
            this.setState({activeTab: this.props.activeTab});
        }
    }

    render() {
        const {className, showSubheader} = this.props;

        return (
            <div className={cn('tabs', className)}>
                <TabsContext.Provider value={this.state}>
                    <div className="tabs__header">
                        <div className="tabs__header-inner">
                            <div className="tabs__names">
                                {this.buildHeader()}
                            </div>
                            <div className="tabs__filters">{this.buildFilters()}</div>
                        </div>
                        {showSubheader &&
                            <div className="tabs__subheader">
                                <span className="tabs__matches"><EyeIcon/>Visual matches</span>
                            </div>
                        }
                    </div>
                    <div className="tabs__body">{this.buildBody()}</div>
                </TabsContext.Provider>
            </div>
        );
    }

    static Body = TabBody;
    static Header = TabHeader;
    static Filters = TabFilters;
    static Item = ({children}) => children;
}

Tabs.propTypes = {
    activeTab: PropTypes.string,
    showSubheader: PropTypes.bool,
    toggleFn: PropTypes.func
};

Tabs.Item.displayName = 'Tabs.Item';

Tabs.Item.propTypes = {
    id: PropTypes.string.isRequired
};

export default Tabs;
