import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withDimensionObserver } from '../../context/Dimension';
import withClientReady from '../../HOC/withClientReady';
import { mapRoutineCreators } from '../../actions/actionRoutines';
import { getOutfitPoint, getOutfitCollections, getOutfitComments, activateOutfitTab, postOutfitComment } from '../../actions';
import Tabs from '../../components/Tabs';
import { LampIcon, MessageIcon, TagIcon } from '../../components/SVG';
import ClothesTab from '../../pages/Outfit/ClothesTab';
import { OUTFIT_TABS } from '../../config';
import CollectionsTab from '../../pages/Outfit/CollectionsTab';
import CommentsTab from '../../pages/Outfit/CommentsTab';
import { numberMetricFormat } from '../../utils/helpers';



class OutfitSidebar extends Component {
    state = {
        comment: ''
    };

    componentDidMount() {
        const {points, getOutfitPoint} = this.props;

        if (Array.isArray(points) && points.length > 0) {
            getOutfitPoint.trigger({points});
            this.toggleTab(OUTFIT_TABS.CLOTHES, points[0].id);
        }
    }

    componentDidUpdate(prevProps) {
        const {isCollectionsLoading, isCommentsLoading, points, outfit_id, activeTab, comments, collections, isAuthenticated} = this.props;

        if (prevProps.outfit_id !== outfit_id && Array.isArray(points)) {
            //Need to wrap by timeout to come over limitations of monitorSaga
            setTimeout(() => this.props.getOutfitPoint.trigger({points: points}));
        }

        if (prevProps.activeTab !== activeTab && activeTab === OUTFIT_TABS.WEAR_IT && !isCollectionsLoading && !collections.length) {
            this.props.getOutfitCollections.trigger({outfitId: outfit_id});
        }

        if (prevProps.activeTab !== activeTab && activeTab === OUTFIT_TABS.COMMENTS && !isCommentsLoading && !comments.length) {
            this.props.getOutfitComments.trigger({outfitId: outfit_id});
        }

        if (prevProps.isAuthenticated !== isAuthenticated) {
            this.toggleTab(OUTFIT_TABS.CLOTHES, points[0].id);
        }
    }

    toggleTab = (tabId, subTabId) => {
        const params = {};
        if (tabId && this.props.activeTab !== tabId) params.activeTab = tabId;
        if (subTabId && this.props.activeSubTab !== String(subTabId)) params.activeSubTab = String(subTabId);

        if (Object.keys(params).length > 0) this.props.activateOutfitTab(params);
    };
    changeSubTab = this.toggleTab.bind(null, null);

    postComment = () => {
        this.state.comment && this.props.postOutfitComment({author: 'Test author', text: this.state.comment});
        this.setState({comment: ''});
    };

    handleCommentChange = (e) => {
        this.setState({comment: e.target.value});
    };

    render() {
        const {pointsData, activeTab, activeSubTab, isAuthenticated, no_comments, comments, collections} = this.props;

        return (
            <div className="outfit-sidebar">
                <Tabs activeTab={activeTab} className="sidebar-tabs" toggleFn={this.toggleTab}>
                    <Tabs.Item id={OUTFIT_TABS.CLOTHES}>
                        <Tabs.Header>
                            <TagIcon className="is-rotated"/>
                            <span>{OUTFIT_TABS.CLOTHES}</span>
                        </Tabs.Header>
                        <Tabs.Body className="with-custom-scroll">
                            {Array.isArray(pointsData) && pointsData.length > 0 &&
                                <ClothesTab
                                    points={pointsData}
                                    activeTab={activeSubTab}
                                    toggleTab={this.changeSubTab}
                                    isLoggedIn={isAuthenticated}
                                    className="sidebar-tabs"
                                />
                            }
                        </Tabs.Body>
                    </Tabs.Item>

                    <Tabs.Item id={OUTFIT_TABS.WEAR_IT}>
                        <Tabs.Header>
                            <LampIcon/>
                            <span>{OUTFIT_TABS.WEAR_IT}</span>
                        </Tabs.Header>
                        <Tabs.Body className="with-custom-scroll">
                            {Array.isArray(collections) && collections.length > 0 &&
                                <CollectionsTab items={collections}/>
                            }
                        </Tabs.Body>
                    </Tabs.Item>

                    <Tabs.Item id={OUTFIT_TABS.COMMENTS}>
                        <Tabs.Header>
                            <MessageIcon/>
                            <span>
                                {OUTFIT_TABS.COMMENTS}
                                <span>({no_comments ? numberMetricFormat(no_comments, 1) : 0})</span>
                            </span>
                        </Tabs.Header>
                        <Tabs.Body className="with-custom-scroll">
                            {Array.isArray(comments) && comments.length > 0 &&
                                <CommentsTab
                                    items={comments}
                                    comment={this.state.comment}
                                    postComment={this.postComment}
                                    handleCommentChange={this.handleCommentChange}
                                />
                            }
                        </Tabs.Body>
                    </Tabs.Item>
                </Tabs>
            </div>
        );
    }
}

function mapStateToProps({
    outfit: {data, pointsData, activeSubTab, activeTab, comments, collections, isCollectionsLoading, isCommentsLoading},
    auth: {isAuthenticated}
}) {
    return {...data, pointsData, activeTab, activeSubTab, isAuthenticated, comments, collections, isCollectionsLoading, isCommentsLoading};
}

export default compose(
    withClientReady,
    withDimensionObserver,
    connect(
        mapStateToProps,
        mapRoutineCreators({getOutfitPoint, getOutfitCollections, getOutfitComments, activateOutfitTab, postOutfitComment})
    )
)(OutfitSidebar);
