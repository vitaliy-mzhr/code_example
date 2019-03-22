import * as React from 'react';
import ContactsDividerStyles from './styles';
import { Paper, Typography } from '@material-ui/core';

interface AppContactsDividerProps {
  divider: string;
}

class ContactsDivider extends React.PureComponent<AppContactsDividerProps, {}> {
  public render() {
    const {divider} = this.props;
    return (
      <ContactsDividerStyles>
        <Paper className="divider" >
          <Typography variant="headline" component="p" className="title">
            {divider.toUpperCase()}
          </Typography>
        </Paper>
      </ContactsDividerStyles>
    );
  }
}

export default ContactsDivider;
