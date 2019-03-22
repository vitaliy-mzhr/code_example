import * as React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ArrowBackRounded, AddRounded } from '@material-ui/icons';

interface AppNavButtonProps {
  showBackArrow: boolean;
  clearInput: () => void;
}

const NavButton: React.StatelessComponent<AppNavButtonProps> = ({showBackArrow, clearInput}) => (
  showBackArrow ? (
    <Tooltip title={'Back to contacts'}>
      <Link to={'/'}>
        <IconButton className="home-button" onClick={clearInput}>
          <ArrowBackRounded/>
        </IconButton>
      </Link>
    </Tooltip>
    )
    : (
      <Tooltip title={'Add contact'}>
      <Link to={'/add'}>
        <IconButton className="home-button" onClick={clearInput}>
          <AddRounded/>
        </IconButton>
      </Link>
    </Tooltip>
    )
);

export default NavButton;