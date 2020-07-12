import React, { useRef, useEffect, useState } from 'react';
import { useField } from '@unform/core';
import { MdAddAPhoto } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import api from '~/services/api';

import { Container } from './styles';

function AvatarInput() {
  const { id: urlId } = useParams();
  const { fieldName, defaultValue, registerField } = useField('avatar_id');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    async function loadPhotoPreview() {
      const { data } = await api.get(`delivers/${urlId}`);
      setPreview(data.avatar?.url);
    }
    if (urlId) {
      loadPhotoPreview();
    }
  }, []);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
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
          <h4>Adicionar foto</h4>
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
