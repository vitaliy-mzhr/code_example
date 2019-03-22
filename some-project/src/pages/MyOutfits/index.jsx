import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import { mapRoutineCreators } from '../../actions/actionRoutines';
import { getUserOutfitsSavedList, getUserOutfitsPurchasedList, getUserOutfitsViewedList } from '../../actions';
// Components
import GroupHeader from '../../components/MyLibrary/GroupHeader';
import HorizontalList from './HorizontalList';
import VerticalList from './VerticalList';
// Config
import { USER_COLLECTION_OUTFITS_PER_PAGE } from '../../config';



class MyOutfits extends Component {
    state = {
        isGridMode: {
            saved_list: false,
            purchased_list: false,
            viewed_list: false,
        },
        showModeBtn: {
            saved_list: false,
            purchased_list: false,
            viewed_list: false
        },
    };

    handleLoadMore = (outfitsType, offset) => {
        const limit = USER_COLLECTION_OUTFITS_PER_PAGE;

        switch (outfitsType) {
            case 'saved_list':
                this.props.getUserOutfitsSavedList.trigger({ offset, limit });
                break;
            case 'purchased_list':
                this.props.getUserOutfitsPurchasedList.trigger({ offset, limit });
                break;
            case 'viewed_list':
                this.props.getUserOutfitsViewedList.trigger({ offset, limit });
                break;
            default:
                break;
        }
    };

    changeMode = (key, status) => {
        const isGridMode = {...this.state.isGridMode};
        isGridMode[key] = status;
        this.setState({isGridMode});
    }

    onIsScrollableChange = (status, outfitsType) => {
        this.setState((prevState) => ({
            ...prevState,
            showModeBtn: {
                ...prevState.showModeBtn,
                [outfitsType]: status
            }
        }));
    }

    render() {
        const {outfits} = this.props;
        const { isGridMode, showModeBtn } = this.state;

        return (
            <div className="my-library my-outfits">
                <div className="my-library__content">
                    <h1>My Outfits</h1>

                    {Object.entries(outfits).map(([outfitsType, { results, count } ]) =>
                        Array.isArray(results) && results.length > 0 && (
                            <div key={outfitsType} className="my-library__group">

                                <GroupHeader
                                    pageType="outfits"
                                    changeMode={this.changeMode}
                                    titleType={outfitsType}
                                    isGridMode={isGridMode[outfitsType]}
                                    showModeBtn={showModeBtn[outfitsType]}
                                />

                                {isGridMode[outfitsType] && (
                                    <VerticalList
                                        handleLoadMore={this.handleLoadMore}
                                        results={results}
                                        count={count}
                                        outfitsType={outfitsType}
                                    />
                                )}

                                {!isGridMode[outfitsType] && (
                                    <HorizontalList
                                        handleLoadMore={this.handleLoadMore}
                                        onIsScrollableChange={this.onIsScrollableChange}
                                        results={results}
                                        limit={USER_COLLECTION_OUTFITS_PER_PAGE}
                                        outfitsType={outfitsType}
                                    />
                                )}

                            </div>
                        )
                    )}
                </div>
            </div>
        );
    }
}

function mapStateToProps({userOutfits: { outfits }}) {
    return {outfits};
}

export default connect(
    mapStateToProps,
    mapRoutineCreators({ getUserOutfitsSavedList, getUserOutfitsPurchasedList, getUserOutfitsViewedList })
)(MyOutfits);
