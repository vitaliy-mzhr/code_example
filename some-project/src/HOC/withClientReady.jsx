import React, { Component } from 'react';



const withClientReady = (BaseComponent) => {
    const displayName = BaseComponent.displayName || BaseComponent.name || 'Component';

    class BaseComponentWrapper extends Component {
        static displayName = `withClientReady(${displayName})`;

        state = {
            clientReady: false,
        };

        componentDidMount() {
            this.setState({clientReady: true});
        }

        render() {
            return <BaseComponent {...this.props} isClientReady={this.state.clientReady}/>;
        }
    }

    return BaseComponentWrapper;
};

export default withClientReady;
