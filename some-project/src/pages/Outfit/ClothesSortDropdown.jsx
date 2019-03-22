import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Radio from '../../components/Radio';



class ClothesSortDropdown extends Component {
    ref = React.createRef();

    render() {
        const {onSort, priceSort, saleSort} = this.props;

        return (
            <div className="clothes-filters__dropdown clothes-filters__dropdown--small" ref={this.ref}>
                <div className="clothes-filters__sort">
                    <div className="clothes-filters__title">Price:</div>
                    <div className="clothes-filters__sort-btns">
                        <Radio
                            id="priceASC"
                            name="priceSort"
                            onChange={onSort}
                            value="ASC"
                            defaultChecked={priceSort === 'ASC'}
                            label="Lowest to Highest"
                            data-sort-category="price"
                        />
                        <Radio
                            id="priceDESC"
                            name="priceSort"
                            onChange={onSort}
                            value="DESC"
                            defaultChecked={priceSort === 'DESC'}
                            label="Highest to Lowest"
                            data-sort-category="price"
                        />
                    </div>
                </div>

                <div className="clothes-filters__sort">
                    <div className="clothes-filters__title">Sale:</div>
                    <div className="clothes-filters__sort-btns">
                        <Radio
                            id="saleASC"
                            name="saleSort"
                            onChange={onSort}
                            value="ASC"
                            defaultChecked={saleSort === 'ASC'}
                            label="Lowest to Highest"
                            data-sort-category="sale"
                        />
                        <Radio
                            id="saleDESC"
                            name="saleSort"
                            onChange={onSort}
                            value="DESC"
                            defaultChecked={saleSort === 'DESC'}
                            label="Highest to Lowest"
                            data-sort-category="sale"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

ClothesSortDropdown.propTypes = {
    onSort: PropTypes.func,
    priceSort: PropTypes.string,
    saleSort: PropTypes.string
};

export default ClothesSortDropdown;
