import * as React from 'react';
import { Field, FieldArray, InjectedFormProps, reduxForm } from 'redux-form';
import validate from './validate';
import renderField from './renderField';
import renderPhones from './renderPhones';
import ContactFormStyles from './styles';
import { Button } from '@material-ui/core';

interface AppContactForm {
  title?: string;
  forEdit?: boolean;
}

class ContactForm extends React.Component<AppContactForm & InjectedFormProps<{}>, {}> {

  public render() {
    const {pristine, reset, submitting, handleSubmit, forEdit, title} = this.props;
    return (
      <ContactFormStyles>
        <h3>{title}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <Field name="firstName" type="text" component={renderField} label="First name"/>
            <Field name="lastName" type="text" component={renderField} label="Last Name"/>
            <FieldArray name="phones" component={renderPhones}/>
            <div className="buttons-container">
              <Button
                color="primary"
                type="submit"
                disabled={forEdit ? submitting : submitting || pristine}
                variant="contained"
              >
                Submit
              </Button>
              <Button
                color="secondary"
                type="button"
                disabled={pristine || submitting}
                onClick={reset}
                variant="contained"
              >
                Clear
              </Button>
            </div>
          </div>
        </form>
      </ContactFormStyles>
    );
  }
}

export default reduxForm({
  form: 'contactPhones',
  validate,
  // @ts-ignore
})(ContactForm);