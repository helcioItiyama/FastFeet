/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';

function Select({ name, ...rest }) {
  const selectRef = useRef();

  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'select.state.value',
      getValue: (ref) => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }
          return ref.select.state.value.map((option) => option.value);
        }
        if (!ref.select.state.value) {
          return '';
        }
        return ref.select.state.value.value;
      },
      clearValue(ref) {
        ref.select.select.clearValue();
      },
      setValue(ref, value) {
        ref.select.select.setValue(value);
      },
    });
  }, [fieldName, registerField]);

  return (
    <AsyncSelect
      ref={selectRef}
      defaultValue={defaultValue}
      classNamePrefix="react-select"
      {...rest}
    />
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Select;
