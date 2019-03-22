import { Field } from 'redux-form';
import * as React from 'react';
import renderField from './renderField';
import { AsYouType } from 'libphonenumber-js';
import RenderPhonesStyles from './renderPhonesStyles';
import { IconButton, Tooltip, Paper } from '@material-ui/core';
import { AddRounded, RemoveRounded } from '@material-ui/icons';

const normalizePhone = (value: string) => {
  const onlyNums = value.replace(/[^\d]/g, '');
  return new AsYouType().input(`+${onlyNums}`);
};

const renderPhones = (props: any) => {
  const { fields, meta: { error } } = props;
  return (
    <RenderPhonesStyles>
      <div className="add-phone-container">
        <Tooltip title={'Add Phone'}>
            <IconButton onClick={() => fields.push()}>
              <AddRounded/>
            </IconButton>
        </Tooltip>
      </div>
      {fields.map((phone: any, index: number) =>
        <div key={index} className="phones-container">
          <Tooltip title={`Remove Phone No.${index + 1}`}>
            <IconButton onClick={() => fields.remove(index)}>
              <RemoveRounded/>
            </IconButton>
          </Tooltip>
          <Field
            name={phone}
            type="text"
            component={renderField}
            label={`Phone No.${index + 1}`}
            normalize={normalizePhone}
          />
        </div>
      )}
      {error && <Paper >
        <p className="error">
          {error}
        </p>
      </Paper>}

    </RenderPhonesStyles>
  );
};

export default renderPhones;
