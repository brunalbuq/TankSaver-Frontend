import React from 'react';
import { Image} from '@chakra-ui/react';
import logo from './image/logo.svg';

export const Logo = props => {
  return <Image  src={logo} {...props} />
};
