import React, { useState } from 'react';
import Picker, { IEmojiData, SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;

  span {
    cursor: pointer;
    font-size: 1.5rem;
  }

  & > div {
    position: absolute;
    top: 0;
    left: 3rem;
  }
`;

interface IProps {
  icon: string;
  setIcon: (value: string) => void;
}
const EmojiPicker = ({ icon, setIcon }: IProps) => {
  const [openPicker, setOpenPicker] = useState(false);

  const onEmojiClick = (
    _event: React.MouseEvent<Element>,
    data: IEmojiData
  ) => {
    setIcon(data.emoji);
    setOpenPicker(false);
  };
  return (
    <Container>
      <span onClick={() => setOpenPicker(!openPicker)}>{icon}</span>
      {openPicker && (
        <div>
          <Picker
            onEmojiClick={onEmojiClick}
            disableAutoFocus={true}
            skinTone={SKIN_TONE_MEDIUM_DARK}
            groupNames={{ smileys_people: 'PEOPLE' }}
            native
          />
        </div>
      )}
    </Container>
  );
};

export default EmojiPicker;
