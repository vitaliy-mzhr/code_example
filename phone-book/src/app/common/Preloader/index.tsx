import * as React from 'react';
import { CircularProgress } from '@material-ui/core';
import PreloaderStyles from './styles';

const Preloader: React.StatelessComponent<{}> = () => (
  <PreloaderStyles>
    <CircularProgress/>
  </PreloaderStyles>
);

export default Preloader;
