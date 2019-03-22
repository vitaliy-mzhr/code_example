import * as React from 'react';
import NavBarStyles from './styles';
import { AppBar, Toolbar, Input, Typography, Tooltip, IconButton } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { NavButton } from '../../components';
import { Link } from 'react-router-dom';

interface AppNavBarProps {
  isMainPage: boolean;
  isOnSearch: boolean;
  handleRedirect: () => void;
  handleSearch: (e: any) => void;
  inputValue: string;
  clearInput: () => void;
}

const NavBar: React.StatelessComponent<AppNavBarProps> = (
  {isOnSearch, handleRedirect, inputValue, handleSearch, clearInput, isMainPage}) => (
    <NavBarStyles>
      <AppBar position="static">
        <Toolbar className="app-bar">
          <NavButton clearInput={clearInput} showBackArrow={!isMainPage}/>
          <Typography className="title" variant="title" color="inherit" noWrap={true}>
            Phone-book app
          </Typography>
          <div className="flex-grow"/>
          {isOnSearch ? (
            <div className="search-container">
              <div className="search-icon">
                <Search/>
              </div>
              <Input
                value={inputValue}
                autoFocus={isOnSearch}
                placeholder="Search…"
                disableUnderline={true}
                onChange={handleSearch}
                className={`search-input ${isOnSearch ? 'add-transition' : ''}`}
                onClick={handleRedirect}
              />
            </div>
          ) : (
            <Tooltip title={'Search contact'}>
              <Link to={'/search'}>
                <IconButton className="search-button">
                  <Search/>
                </IconButton>
              </Link>
            </Tooltip>
          )}
        </Toolbar>

      </AppBar>
    </NavBarStyles>
  );

export default NavBar;
