import React, { Component } from 'react';



export class LeftSidebar extends Component {
    render() {
        const {sidebarData: SidebarContent} = this.props;

        return (
            <aside className="left-sidebar">
                <div className="left-sidebar__inner">
                    <SidebarContent/>
                </div>
            </aside>
        );
    }
}

export default LeftSidebar;
