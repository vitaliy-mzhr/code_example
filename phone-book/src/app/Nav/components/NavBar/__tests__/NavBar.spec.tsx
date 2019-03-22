import * as React from 'react';
import { shallow } from 'enzyme';
import NavBar from '../../NavBar';

interface AppNavBarProps {
  isMainPage: boolean;
  isOnSearch: boolean;
  handleRedirect: () => void;
  handleSearch: (e: any) => void;
  inputValue: string;
  clearInput: () => void;
}

describe('NavBar component test', () => {

  it('NavBar component renders correctly', () => {
    const mockProps: AppNavBarProps = {
      isMainPage: true,
      isOnSearch: false,
      handleRedirect: jest.fn(),
      handleSearch: jest.fn(),
      inputValue: 'sdas',
      clearInput: jest.fn(),
    };
    expect(shallow(<NavBar {...mockProps}/>)).toMatchSnapshot();
  });

  it('NavBar component renders correctly with different props', () => {
    const mockProps: AppNavBarProps = {
      isMainPage: false,
      isOnSearch: true,
      handleRedirect: jest.fn(),
      handleSearch: jest.fn(),
      inputValue: '1',
      clearInput: jest.fn(),
    };
    expect(shallow(<NavBar {...mockProps}/>)).toMatchSnapshot();
  });
});