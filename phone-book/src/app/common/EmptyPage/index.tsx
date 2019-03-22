import * as React from 'react';
import EmptyPageStyles from './styles';
import { Paper } from '@material-ui/core';

const EmptyPage: React.StatelessComponent<{}> = () => {
  return (
    <EmptyPageStyles>
      <Paper className="page-message-container">
        No contacts found...
      </Paper>
    </EmptyPageStyles>
  );
};

export default EmptyPage;
