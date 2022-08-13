import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { MdClose } from 'react-icons/md';
import styled from 'styled-components';
import { borderRadius, grayColor, yellowColor } from '../../constants';
import {
  MeDocument,
  MeQuery,
  useUpdateUserMutation,
} from '../../generated/graphql';
import FormButton from './FormButton';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  max-width: 650px;
  width: 100%;
  max-height: 70vh;
  overflow: auto;
  padding: 0 2rem 2rem;
  background-color: white;
  border-radius: ${borderRadius};
  position: relative;

  h1 {
    position: sticky;
    padding: 3rem 0 0.5rem;
    background-color: white;
    top: 0;
    text-align: center;
    margin-bottom: 1.5rem;
    z-index: 999;

    & > span:nth-child(1) {
      position: absolute;
      font-size: 3rem;
      color: black;
      right: -2rem;
      top: 0;
      z-index: 99;

      &:hover {
        cursor: pointer;
        color: ${yellowColor};
      }
    }
  }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  & > div:nth-child(3) {
    width: max-content;
  }

  & > div:last-child {
    flex-direction: row;
    align-items: center;
  }
`;

const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  label {
    font-size: 1.2rem;
    font-weight: 600;
  }

  input {
    outline: none;
    border-radius: 10px;
    background-color: white;
    padding: 1rem;
    border: 1px solid ${yellowColor};

    &:focus {
      border: 2px solid ${yellowColor};
    }
  }

  img {
    width: 100px;
    height: 100px;
  }

  div {
    display: flex;
    align-items: center;
    gap: 2rem;

    button {
      padding: 0.8rem;
      background-color: ${grayColor};
      border-radius: 8px;
      border: 2px solid ${yellowColor};
      font-weight: 500;
      position: relative;

      input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
      }

      &:hover {
        background-color: ${yellowColor};
        font-weight: 600;
      }
    }
  }
`;

interface IProps {
  username?: string;
  avatar?: string;
  closeModal: () => void;
}

const UserModal = ({ username, avatar, closeModal }: IProps) => {
  const [updateUser, { loading, data }] = useUpdateUserMutation();
  const [usernameInfo, setUsernameInfo] = useState(username || '');
  const [avatarInfo, setAvatarInfo] = useState(avatar || '');
  const [uploadLoading, setUploadLoading] = useState(false);

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadLoading(true);
    const formData = new FormData();
    formData.append('file', (e.target.files as FileList)[0]);
    formData.append('upload_preset', 'uploadTaskly');

    const data = await fetch(
      'https://api.cloudinary.com/v1_1/dzo2rkafy/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    ).then((res) => res.json());

    setAvatarInfo(data.secure_url);
    setUploadLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateUser({
      variables: {
        updateInput: {
          username: usernameInfo,
          avatar: avatarInfo,
        },
      },
      update(cache, { data }) {
        if (data?.update.success) {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              me: {
                avatar: avatarInfo,
                username: usernameInfo,
              },
            },
          });
          toast.success('User updated');
          closeModal();
        }
      },
    });
  };

  return (
    <Container>
      <Modal>
        <h1>
          User Info
          <span onClick={closeModal}>
            <MdClose />
          </span>
        </h1>
        <FormContainer action="" onSubmit={handleSubmit}>
          <FormControl>
            <label htmlFor="">Username</label>
            <input
              type="text"
              onChange={(e) => setUsernameInfo(e.target.value)}
              name={username}
              value={usernameInfo}
            />
            {!data?.update.success && (
              <span style={{ color: 'red', fontWeight: 600 }}>
                {data?.update.message}
              </span>
            )}
          </FormControl>
          <FormControl>
            <label htmlFor="">Avatar</label>
            <div>
              <img src={avatarInfo} alt="" />
              <button disabled={uploadLoading} type="button">
                Choose Avatar
                <span>
                  <input type="file" onChange={handleUploadImage} />
                </span>
              </button>
            </div>
          </FormControl>
          <FormButton disabled={loading} text="Update" />
        </FormContainer>
      </Modal>
    </Container>
  );
};

export default UserModal;
