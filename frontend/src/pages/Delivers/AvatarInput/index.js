import React, { useRef, useEffect, useState } from 'react';
import { useField } from '@rocketseat/unform';
import { MdAddAPhoto } from 'react-icons/md';
import PropTypes from 'prop-types';
import api from '~/services/api';

import { Container } from './styles';

function AvatarInput({ tag }) {
  const { defaultValue, registerField } = useField('avatar');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, registerField]);

  async function handleChange(event) {
    const data = new FormData();
    data.append('file', event.target.files[0]);
    const response = await api.post('files', data);
    const { id, url } = response.data;
    setFile(id);
    setPreview(url);
  }

  return (
    <Container htmlFor="avatar">
      {preview === undefined ? (
        <div>
          <MdAddAPhoto
            size={50}
            style={{ opacity: '0.2', marginTop: '30px' }}
          />
          <h4>{tag} foto</h4>
        </div>
      ) : (
        <div>
          <img
            src={
              preview || 'https://api.adorable.io/avatars/50/abott@adorable.png'
            }
            alt=""
          />
        </div>
      )}

      <input
        type="file"
        id="avatar"
        accept="image/*"
        data-file={file}
        onChange={handleChange}
        ref={ref}
      />
    </Container>
  );
}

export default AvatarInput;

AvatarInput.propTypes = {
  tag: PropTypes.string.isRequired,
};
