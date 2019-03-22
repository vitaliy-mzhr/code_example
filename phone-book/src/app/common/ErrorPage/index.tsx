import * as React from 'react';
import ErrorPageStyles from './styles';
import { Paper } from '@material-ui/core';

interface AppErrorPageProps {
  error: string;
}

const ErrorPage: React.StatelessComponent<AppErrorPageProps> = ({error}) => {
  return (
    <ErrorPageStyles>
      <Paper className="page-message-container">
        Error occurred: {error}
      </Paper>
    </ErrorPageStyles>
  );
};

export default ErrorPage;
