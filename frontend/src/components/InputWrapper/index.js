import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

function InputWrapper({ children }) {
  return <Container>{children}</Container>;
}

export default InputWrapper;

InputWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
};
