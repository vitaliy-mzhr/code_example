import Head from 'next/head';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/fp/get';

import { Router } from '../../../routes';
import { PRODUCT_NAME } from '../../config';
import { isTouchSupported } from '../../utils/helpers';
import StylistsListItem from './StylistsListItem';
import { mapRoutineCreators } from '../../actions/actionRoutines';
import { followStylist, unfollowStylist } from '../../actions';



class Stylists extends Component {
    state = {
        activeItem: null
    };

    itemAction = (e) => {
        e.preventDefault();

        const slug = get('currentTarget.dataset.slug', e);
        const isUnfollow = get('currentTarget.dataset.actionUnfollow', e) || null;
        if (!slug || isUnfollow === null) {
            return;
        }

        const {followStylist, unfollowStylist, isAuthenticated} = this.props;

        if (!isAuthenticated) {
            Router.pushRoute('signup');
            return;
        }

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
        const {data} = this.props;

        return (
            <Fragment>
                <Head>
                    <title>
                        Stylists curating outfits - {PRODUCT_NAME}
                    </title>
                </Head>

                <div className="stylists-page">
                    <div className="masonry__list">
                        {data.collections &&
                            data.collections.map((params) => (
                                <StylistsListItem
                                    key={params.id}
                                    params={params}
                                    isActive={this.state.activeItem === params.id}
                                    onActivate={this.activateItem}
                                />
                            ))
                        }
                    </div>
                </div>
            </Fragment>
        );
    }
}

function mapStateToProps({stylists, auth: {isAuthenticated}}) {
    return {
        ...stylists,
        isAuthenticated
    };
}

export default connect(mapStateToProps, mapRoutineCreators({followStylist, unfollowStylist}))(Stylists);
