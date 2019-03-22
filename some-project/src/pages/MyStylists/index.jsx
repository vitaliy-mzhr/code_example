import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/fp/get';

// Actions
import { mapRoutineCreators } from '../../actions/actionRoutines';
import { followStylist, unfollowStylist } from '../../actions';
// Components
import GroupHeader from '../../components/MyLibrary/GroupHeader';
import StylistsListItem from './StylistsListItem';
import ContentSlider from '../../components/ContentSlider';
// Utils
import { isTouchSupported } from '../../utils/helpers';



class MyCollections extends Component {
    state = {
        activeItem: null
    };

    itemAction = (e) => {
        e.stopPropagation();
        e.preventDefault();

        const slug = get('currentTarget.dataset.slug', e);
        const isUnfollow = get('currentTarget.dataset.actionUnfollow', e) || null;
        if (!slug || isUnfollow === null) {
            return;
        }

        const {followStylist, unfollowStylist} = this.props;

        if (isUnfollow === 'true') {
            unfollowStylist.trigger({slug});
        } else if (isUnfollow === 'false') {
            followStylist.trigger({slug});
        }
    };

    activateItem = (e) => {
        if (isTouchSupported() && e.cancelable) {
            const id = +get('currentTarget.dataset.id', e) || '';

            if (this.state.activeItem !== id) {
                e.preventDefault();
                this.setState((prevState) => ({
                    activeItem: prevState.activeItem !== id ? id : null
                }));
            }
        }
    };

    render() {
        const { data } = this.props;

        return (
            <div className="my-library my-stylists">
                <div className="my-library__content">
                    <h1>My Stylists</h1>

                    {Object.entries(data).map(([stylistsType, stylists]) =>
                        Array.isArray(stylists) && stylists.length > 0 && (
                            <div key={stylistsType} className="my-library__group">

                                <GroupHeader pageType="stylists" titleType={stylistsType} showModeBtn/>

                                <ContentSlider scrollLength={316} updatesWatcherVal={stylists.length}>
                                    <div className="flex">
                                        <div className="my-library__group-list">
                                            {stylists &&
                                                stylists.map((params) => (
                                                    <StylistsListItem
                                                        key={params.id}
                                                        params={params}
                                                        isActive={this.state.activeItem === params.id}
                                                        onActivate={this.activateItem}
                                                        onAction={this.itemAction}
                                                        observerOptions={{rootMargin: '300px 150px 300px 150px'}}
                                                    />
                                                ))
                                            }
                                        </div>
                                    </div>
                                </ContentSlider>

                            </div>
                        )
                    )}
                </div>
            </div>
        );
    }
}

function mapStateToProps({ userStylists: { data } }) {
    return { data };
}

export default connect(
    mapStateToProps,
    mapRoutineCreators({ followStylist, unfollowStylist })
)(MyCollections);
