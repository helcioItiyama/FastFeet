/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';

function Select({ name, ...rest }) {
  const selectRef = useRef();

  const { fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'select.state.value.value',
    });
  }, [fieldName, registerField]);

  return (
    <AsyncSelect ref={selectRef} classNamePrefix="react-select" {...rest} />
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Select;
