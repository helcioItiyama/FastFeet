import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

function Input({ name }) {
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const inputRef = useRef(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return <input ref={inputRef} defaultValue={defaultValue} />;
}

export default Input;

Input.propTypes = {
  name: PropTypes.string.isRequired,
};
