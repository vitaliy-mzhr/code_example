import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/fp/get';

// Actions
import { mapRoutineCreators } from '../../actions/actionRoutines';
import { getUserCollectionsDetails, userAddCollection, userRemoveCollection } from '../../actions';
// Components
import GroupHeader from '../../components/MyLibrary/GroupHeader';
import CollectionsListItem from './CollectionsListItem';
import { SearchIcon } from '../../components/SVG';
import LinkTo from '../../components/LinkTo';
import ContentSlider from '../../components/ContentSlider';
// Utils
import { isTouchSupported } from '../../utils/helpers';



class MyCollections extends Component {
    state = {
        activeItem: null
    };

    componentDidMount() {
        const { data } = this.props;
        this.props.getUserCollectionsDetails.trigger(data);
    }

    itemAction = (e) => {
        e.stopPropagation();
        e.preventDefault();

        const slug = get('currentTarget.dataset.slug', e);
        const isRemove = get('currentTarget.dataset.actionRemove', e) || null;
        if (!slug || isRemove === null) {
            return;
        }

        const {userAddCollection, userRemoveCollection} = this.props;

        if (isRemove === 'true') {
            userRemoveCollection.trigger({slug});
        } else if (isRemove === 'false') {
            userAddCollection.trigger({slug});
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
            <div className="my-library my-collections">
                <div className="my-library__content">
                    <h1>My Collections</h1>

                    {data.map(({category_name, category_slug, category_type, collections}) =>
                        Array.isArray(collections) && collections.length > 0 && (
                            <div key={category_name} className="my-library__group">

                                <GroupHeader pageType="collections" titleType={category_name} showModeBtn/>

                                <ContentSlider scrollLength={316}>
                                    <div className="flex">
                                        <div className="my-library__group-list">
                                            {collections &&
                                                collections.map((params) => (
                                                    <CollectionsListItem
                                                        key={params.id}
                                                        params={params}
                                                        categoryType={category_type}
                                                        categoryName={category_name}
                                                        isActive={this.state.activeItem === params.id}
                                                        onActivate={this.activateItem}
                                                        onAction={this.itemAction}
                                                        observerOptions={{rootMargin: '300px 150px 300px 150px'}}
                                                    />
                                                ))
                                            }
                                        </div>

                                        <div className="my-collections__browse-card-wrap">
                                            <LinkTo to={`/${category_type}/${category_slug}`} className="my-collections__browse-card">
                                                <SearchIcon />
                                                Browse Work Collections
                                            </LinkTo>
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

function mapStateToProps({ userCollections: { data } }) {
    return { data };
}

export default connect(
    mapStateToProps,
    mapRoutineCreators({ getUserCollectionsDetails, userAddCollection, userRemoveCollection })
)(MyCollections);
