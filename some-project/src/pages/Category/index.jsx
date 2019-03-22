import Head from 'next/head';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/fp/get';

import { Router } from '../../../routes';
import { PRODUCT_NAME } from '../../config';
import { isTouchSupported } from '../../utils/helpers';
import CategoryListItem from './CategoryListItem';
import { mapRoutineCreators } from '../../actions/actionRoutines';
import { userAddCollection, userRemoveCollection } from '../../actions';



class Category extends Component {
    state = {
        activeItem: null
    };

    itemAction = (e) => {
        e.preventDefault();

        const slug = get('currentTarget.dataset.slug', e);
        const isRemove = get('currentTarget.dataset.actionRemove', e) || null;
        if (!slug || isRemove === null) {
            return;
        }

        const {userRemoveCollection, userAddCollection, isAuthenticated, data: {id: categoryId}} = this.props;

        if (!isAuthenticated) {
            Router.pushRoute('signup');
            return;
        }

        if (isRemove === 'true') {
            userRemoveCollection.trigger({slug, categoryId});
        } else if (isRemove === 'false') {
            userAddCollection.trigger({slug, categoryId});
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
        const {data: {name, collections, category_type}} = this.props;

        return (
            <Fragment>
                <Head>
                    <title>
                        {name} dress code collections - {PRODUCT_NAME}
                    </title>
                </Head>

                <div className="category-page">
                    <div className="masonry__list">
                        {collections &&
                            collections.map((params) => (
                                <CategoryListItem
                                    key={params.id}
                                    params={params}
                                    categoryType={category_type}
                                    categoryName={name}
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

function mapStateToProps({category, auth: {isAuthenticated}}) {
    return {
        ...category,
        isAuthenticated
    };
}

export default connect(mapStateToProps, mapRoutineCreators({userAddCollection, userRemoveCollection}))(Category);
