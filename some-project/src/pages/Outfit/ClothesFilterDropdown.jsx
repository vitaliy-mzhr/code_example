import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Range } from 'rc-slider';

import Choice from '../../components/Choice';
import { CrossIcon, SearchIcon } from '../../components/SVG';



class ClothesFilterDropdown extends Component {
    ref = React.createRef();

    render() {
        const {
            activeSizes, activeBrands, activePrices, activeSales, currencySymbol, sizes, brands, price,
            sale, onPriceChange, onSaleChange, onChoiceChange, brandsSearchVal, searchBrand
        } = this.props;

        return (
            <div className="clothes-filters__dropdown" ref={this.ref}>
                <div className="clothes-filters__ranges">
                    {price.min > 0 && price.max > 0 && (
                        <div>
                            <div className="clothes-filters__title">Price:</div>
                            <div className="clothes-filters__range">
                                <Range
                                    allowCross={false}
                                    defaultValue={[price.min, price.max]}
                                    value={[activePrices[0] || price.min, activePrices[1] || price.max]}
                                    min={price.min}
                                    max={price.max}
                                    trackStyle={[{backgroundColor: '#033076'}]}
                                    handleStyle={[
                                        {borderColor: '#033076', marginLeft: '-9px', marginTop: '-7px', width: '18px', height: '18px', willChange: 'left'},
                                        {borderColor: '#033076', marginLeft: '-9px', marginTop: '-7px', width: '18px', height: '18px', willChange: 'right'}
                                    ]}
                                    onChange={onPriceChange}
                                />
                            </div>
                            <div className="clothes-filters__range-values">
                                <div>{currencySymbol}{activePrices[0] || price.min}</div>
                                <div>{currencySymbol}{activePrices[1] || price.max}</div>
                            </div>
                        </div>
                    )}

                    {sale.min > 0 && sale.max > 0 && (
                        <div>
                            <div className="clothes-filters__title">Sale:</div>
                            <div className="clothes-filters__range">
                                <Range
                                    allowCross={false}
                                    defaultValue={[sale.min, sale.max]}
                                    value={[activeSales[0] || sale.min, activeSales[1] || sale.max]}
                                    min={sale.min}
                                    max={sale.max}
                                    trackStyle={[{backgroundColor: '#033076'}]}
                                    handleStyle={[
                                        {borderColor: '#033076', marginLeft: '-9px', marginTop: '-7px', width: '18px', height: '18px', willChange: 'left'},
                                        {borderColor: '#033076', marginLeft: '-9px', marginTop: '-7px', width: '18px', height: '18px', willChange: 'right'}
                                    ]}
                                    onChange={onSaleChange}
                                />
                            </div>
                            <div className="clothes-filters__range-values">
                                <div>{activeSales[0] || sale.min}%</div>
                                <div>{activeSales[1] || sale.max}%</div>
                            </div>
                        </div>
                    )}
                </div>

                {sizes.length > 0 && (
                    <div className="clothes-filters__choices">
                        <div className="clothes-filters__title">Sizes:</div>
                        <div className="clothes-filters__choices-list with-custom-scroll scrollable">
                            {sizes.map((val, index) => (
                                <Choice
                                    key={index}
                                    label={val}
                                    id={val}
                                    name={val}
                                    onChange={onChoiceChange}
                                    data-filter-choice={val}
                                    data-filter-type="sizes"
                                    checked={activeSizes.indexOf(val) >= 0}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {(brands.length > 0 || searchBrand) && (
                    <div className="clothes-filters__choices">
                        <div className="clothes-filters__title">Brands:</div>
                        <div className="clothes-filters__search">
                            <SearchIcon className="clothes-filters__search-label"/>
                            <input placeholder="Find a brand" value={brandsSearchVal} type="text" onChange={searchBrand}/>
                            {brandsSearchVal && <CrossIcon className="clothes-filters__search-clear" onClick={searchBrand}/>}
                        </div>
                        <div className="clothes-filters__choices-list with-custom-scroll scrollable">
                            {brands.map((val, index) => (
                                <Choice
                                    key={index}
                                    label={val}
                                    id={val}
                                    name={val}
                                    onChange={onChoiceChange}
                                    data-filter-choice={val}
                                    data-filter-type="brands"
                                    checked={activeBrands.indexOf(val) >= 0}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

ClothesFilterDropdown.propTypes = {
    onPriceChange: PropTypes.func,
    onSaleChange: PropTypes.func,
    onChoiceChange: PropTypes.func,
    searchBrand: PropTypes.func,
    activeSizes: PropTypes.array,
    activeBrands: PropTypes.array,
    activePrices: PropTypes.array,
    activeSales: PropTypes.array,
    brands: PropTypes.array,
    sizes: PropTypes.array,
    price: PropTypes.object,
    sale: PropTypes.object,
    currencySymbol: PropTypes.string,
    brandsSearchVal: PropTypes.string
};

export default ClothesFilterDropdown;
