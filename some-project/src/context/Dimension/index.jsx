import React, { Component } from 'react';
import verge from 'verge';
import debounce from 'lodash/fp/debounce';



const DimensionContext = React.createContext();

class DimensionProvider extends Component {
    state = {
        vh: verge.viewportH(),
        vw: verge.viewportW()
    };
    ticking = false;

    componentDidMount() {
        window.addEventListener('resize', this.onResizeDebounced);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResizeDebounced);
    }

    onResize = () => {
        if (!this.ticking) {
            requestAnimationFrame(() => {
                this.setState({
                    vh: verge.viewportH(),
                    vw: verge.viewportW()
                });
                this.ticking = false;
            });
            this.ticking = true;
        }
    };
    onResizeDebounced = debounce(100, this.onResize);

    render() {
        return (
            <DimensionContext.Provider value={this.state}>
                {this.props.children}
            </DimensionContext.Provider>
        );
    }
}



function withDimensionObserver(Component) {
    return function ConnectedComponent(props) {
        return (
            <DimensionContext.Consumer>
                {(dimensions) => <Component {...props} {...dimensions}/>}
            </DimensionContext.Consumer>
        );
    };
}



export {withDimensionObserver, DimensionProvider};
