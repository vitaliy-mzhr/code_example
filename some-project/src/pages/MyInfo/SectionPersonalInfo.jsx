import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

// Components
import { CheckMarkIcon } from '../../components/SVG';
import RenderPersonalSelect from './renderPersonalSelect';
import RenderPersonalInput from './renderPersonalInput';
// CONFIG
import { BIRTH_DATE_VALUES } from './profileHelpers';



class SectionPersonalInfo extends PureComponent {
    state = {
        first_name: this.props.user.first_name || '',
        last_name: this.props.user.last_name || '',
        birth_date_day: this.props.user.birth_date_day || null,
        birth_date_month: this.props.user.birth_date_month || null,
        birth_date_year: this.props.user.birth_date_year || null
    };

    handleChangeInput = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleBlur = (event) => {
        const { name, value } = event.target;
        const { user } = this.props;
        const propsValue = user[name] || '';
        if (propsValue !== value) {
            this.props.updateUser({ propName: name, values: this.state });
        }
    }

    handleChangeSelect = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value || null }, () => {
            this.props.updateUser({ propName: name, values: this.state });
        });
    }

    render() {
        const { first_name, last_name, birth_date_day, birth_date_month, birth_date_year } = this.state;

        return (
            <Fragment>
                <div className="my-info-page__input-group">
                    <RenderPersonalInput
                        name="first_name"
                        value={first_name}
                        placeholder="First name"
                        label="First name:"
                        id="firstNameMyInfo"
                        handleChangeInput={this.handleChangeInput}
                        handleBlur={this.handleBlur}
                    />
                </div>

                <div className="my-info-page__input-group">
                    <RenderPersonalInput
                        name="last_name"
                        value={last_name}
                        placeholder="Last name"
                        label="Last name:"
                        id="lastNameMyInfo"
                        handleChangeInput={this.handleChangeInput}
                        handleBlur={this.handleBlur}
                    />
                </div>

                <div className="my-info-page__input-group-dob">
                    <label>Birth date:</label>

                    <RenderPersonalSelect
                        name="birth_date_day"
                        value={birth_date_day}
                        firstOptionValue="Day"
                        data={BIRTH_DATE_VALUES.DAYS}
                        handleChangeSelect={this.handleChangeSelect}
                    />

                    <RenderPersonalSelect
                        name="birth_date_month"
                        value={birth_date_month}
                        firstOptionValue="Month"
                        data={BIRTH_DATE_VALUES.MONTHS}
                        handleChangeSelect={this.handleChangeSelect}
                    />

                    <RenderPersonalSelect
                        name="birth_date_year"
                        value={birth_date_year}
                        firstOptionValue="Year"
                        data={BIRTH_DATE_VALUES.YEARS}
                        handleChangeSelect={this.handleChangeSelect}
                    />

                    <div className="my-info-page__message-wrapper">
                        <div id="birth_date" className="my-info-page__saved">
                            <CheckMarkIcon className="my-info-page__saved-icon"/>
                            <span>Auto saved</span>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

SectionPersonalInfo.propTypes = {
    user: PropTypes.object,
    updateUser: PropTypes.func.isRequired
};

SectionPersonalInfo.defaultProps = {
    user: null,
};

export default SectionPersonalInfo;
