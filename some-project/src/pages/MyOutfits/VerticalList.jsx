import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

// Components
import OutfitCard from '../../components/OutfitCard';



class VerticalList extends Component {
    _handleLoadMore = () => {
        const {results, outfitsType} = this.props;
        this.props.handleLoadMore(outfitsType, results.length);
    }

    render() {
        const {results, count} = this.props;

        return (
            <Fragment>

                <div className={cn('collection', 'my-outfits__group-collection')}>
                    {results &&
                        results.map(({api_image, outfit_id}) => (
                            <div className="collection__item" key={outfit_id}>
                                <OutfitCard
                                    image={api_image.image_600x600}
                                    id={outfit_id}
                                    observerOptions={{rootMargin: '400px 0px 400px 0px'}}
                                />
                            </div>
                        ))
                    }
                </div>

                {results.length < count && (
                    <div className="my-outfits__group-btn-container">
                        <button className="btn my-outfits__group-btn" onClick={this._handleLoadMore}>
                            Load more
                        </button>
                    </div>
                )}

            </Fragment>
        );
    }
}

VerticalList.propTypes = {
    handleLoadMore: PropTypes.func.isRequired,
    results: PropTypes.array.isRequired,
    count: PropTypes.number.isRequired,
    outfitsType: PropTypes.string.isRequired
};

export default VerticalList;
