import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/fp/get';

// Components
import RenderAddressSelect from './renderAddressSelect';
import RenderAddressInput from './renderAddressInput';
// CONFIG
import { US_STATES_VALUES, COUNTRIES_VALUES } from './profileHelpers';



class SectionAddressInfo extends PureComponent {
    state = {
        line1: get('userAddress.line1', this.props) || null,
        line2: get('userAddress.line2', this.props) || null,
        city: get('userAddress.city', this.props) || null,
        state: get('userAddress.state', this.props) || null,
        zip_code: get('userAddress.zip_code', this.props) || null,
        country: get('userAddress.country', this.props) || null
    };

    handleChangeInput = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value || null });
    }

    handleBlur = (event) => {
        const { name, value } = event.target;
        const { userAddress } = this.props;
        const propsValue = get(name, userAddress) || '';
        if (propsValue !== value) {
            this.props.updateUser({ propName: name, values: { address: this.state } });
        }
    }

    handleChangeSelect = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value || null }, () => {
            this.props.updateUser({ propName: name, values: { address: this.state } });
        });
    }

    render() {
        const { line1, line2, city, state, zip_code, country } = this.state;

        return (
            <Fragment>
                <div className="my-info-page__input-group-address">
                    <RenderAddressInput
                        name="line1"
                        value={line1}
                        placeholder="Address line 1"
                        isFirst={true}
                        handleChangeInput={this.handleChangeInput}
                        handleBlur={this.handleBlur}
                    />

                    <RenderAddressInput
                        name="line2"
                        value={line2}
                        placeholder="Address line 2"
                        handleChangeInput={this.handleChangeInput}
                        handleBlur={this.handleBlur}
                    />

                    <RenderAddressInput
                        name="city"
                        value={city}
                        placeholder="City"
                        handleChangeInput={this.handleChangeInput}
                        handleBlur={this.handleBlur}
                    />

                    <RenderAddressSelect
                        name="state"
                        value={state}
                        firstOptionValue="State (US only)"
                        data={US_STATES_VALUES}
                        handleChangeSelect={this.handleChangeSelect}
                    />

                    <RenderAddressInput
                        name="zip_code"
                        value={zip_code}
                        placeholder="Zip code"
                        handleChangeInput={this.handleChangeInput}
                        handleBlur={this.handleBlur}
                    />

                    <RenderAddressSelect
                        name="country"
                        value={country}
                        firstOptionValue="Country"
                        isLast={true}
                        data={COUNTRIES_VALUES}
                        handleChangeSelect={this.handleChangeSelect}
                    />
                </div>
            </Fragment>
        );
    }
}

SectionAddressInfo.propTypes = {
    userAddress: PropTypes.object,
    updateUser: PropTypes.func.isRequired
};

SectionAddressInfo.defaultProps = {
    userAddress: null,
};

export default SectionAddressInfo;
