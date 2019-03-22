import * as React from 'react';
import { TextField } from '@material-ui/core';

const renderField = (props: any) => {
  const {input, label, meta: {touched, error}} = props;
  return (
    <TextField
      label={label}
      helperText={error}
      error={touched && !!error}
      {...input}
    />
  );
};

export default renderField;
