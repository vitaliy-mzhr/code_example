import * as React from 'react';
import { BaseLayout } from '../../layouts';
import NotFoundStyles from './styles';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

const NotFound = () => (
  <BaseLayout>
    <NotFoundStyles>
      <h2>
        Page not found...
      </h2>
      <Link to={'/'}>
        <Button variant="contained" color="primary">
          Back to main page
        </Button>
      </Link>
    </NotFoundStyles>
  </BaseLayout>
);

export default NotFound;
