import { useEffect, useRef, useState } from 'react';
import {
  FaBackward,
  FaForward,
  FaPause,
  FaPlay,
  FaRandom,
} from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { MdOutlineRepeat, MdOutlineRepeatOne } from 'react-icons/md';
import styled from 'styled-components';
import { borderRadius, grayColor, yellowColor } from '../../constants';
import '../../styles/progressBar.css';

const Container = styled.div`
  width: 100%;
  background-color: ${grayColor};
  margin-top: 6rem;
  border-radius: ${borderRadius};
`;

const Wrapper = styled.div`
  padding: 2rem;
  position: relative;
`;

const AudioMenuButton = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
  cursor: pointer;

  span {
    color: lightgray;
    font-size: 1.2rem;

    &:hover {
      color: gray;
    }
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 3rem;
  height: 3rem;
  border-radius: 10px;
  overflow: hidden;
  & > img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AudioInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  align-items: flex-start;

  h1 {
    font-size: 1.2rem;
  }

  span {
    font-size: 0.9rem;
    font-weight: 500;
  }
`;

const ProgressBarContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 0.5rem;
`;

const DurationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-size: 0.8rem;
    font-weight: 500;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1rem;

  span {
    cursor: pointer;
    font-size: 1.2rem;

    &:hover {
      opacity: 0.6;
    }
  }

  & > span:nth-child(3) {
    width: 3.5rem;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${yellowColor};
    border-radius: 50%;
  }
`;

const AudioPlayer = () => {
  const [repeat, _setRepeat] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioPlayer = useRef<HTMLAudioElement>(null); // reference our audio component
  const progressBar = useRef<HTMLInputElement>(null); // reference our progress bar
  const animationRef = useRef<any>(); // reference the animation
  useEffect(() => {
    if (audioPlayer.current && progressBar.current) {
      const seconds = Math.floor(audioPlayer.current.duration);
      setDuration(seconds);
      progressBar.current.max = `${seconds}`;
    }
  }, [
    audioPlayer?.current?.onloadedmetadata,
    audioPlayer?.current?.readyState,
  ]);

  const calculateTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const whilePlaying = () => {
    if (progressBar.current && audioPlayer.current) {
      progressBar.current.value = audioPlayer.current.currentTime.toString();
      changePlayerCurrentTime();
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  };

  const changeRange = () => {
    if (progressBar.current && audioPlayer.current) {
      audioPlayer.current.currentTime = Number(progressBar.current.value);
      changePlayerCurrentTime();
    }
  };

  const changePlayerCurrentTime = () => {
    if (progressBar.current) {
      progressBar.current.style.setProperty(
        '--seek-before-width',
        `${(Number(progressBar.current.value) / duration) * 100}%`
      );
      setCurrentTime(Number(progressBar.current.value));
    }
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (audioPlayer.current) {
      if (!prevValue) {
        audioPlayer.current.play();
        animationRef.current = requestAnimationFrame(whilePlaying);
      } else {
        audioPlayer.current.pause();
        cancelAnimationFrame(animationRef.current);
      }
    }
  };

  const backThirty = () => {
    if (progressBar.current) {
      progressBar.current.value = (
        Number(progressBar.current.value) - 30
      ).toString();
      changeRange();
    }
  };

  const forwardThirty = () => {
    if (progressBar.current) {
      progressBar.current.value = (
        Number(progressBar.current.value) + 30
      ).toString();
      changeRange();
    }
  };

  return (
    <Container>
      <Wrapper>
        <Header>
          <audio
            ref={audioPlayer}
            src="https://res.cloudinary.com/dzo2rkafy/video/upload/v1660303128/Crash_Adams_Give_Me_A_Kiss_ribait.mp3"
            preload="metadata"
          ></audio>
          <ImageContainer>
            <img
              src="https://yt3.ggpht.com/ytc/AMLnZu8d_ae-Ne1CeYtv1ARy9IngDnVVKh2nUaYg16tgqQ=s176-c-k-c0x00ffffff-no-rj"
              alt=""
            />
          </ImageContainer>
          <AudioInfo>
            <h1>Give me a kiss</h1>
            <span>Crash Adams</span>
          </AudioInfo>
        </Header>
        <ProgressBarContainer>
          <input
            className="progressBar"
            type="range"
            defaultValue="0"
            ref={progressBar}
            onChange={changeRange}
          />
        </ProgressBarContainer>
        <DurationContainer>
          <span>{calculateTime(currentTime)}</span>
          <span>
            {' '}
            {duration && !isNaN(duration) && calculateTime(duration)}
          </span>
        </DurationContainer>
        <ButtonsContainer>
          <span>
            <FaRandom />
          </span>
          <span onClick={backThirty}>
            <FaBackward />
          </span>
          <span onClick={togglePlayPause}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </span>
          <span onClick={forwardThirty}>
            <FaForward />
          </span>
          <span>{repeat ? <MdOutlineRepeatOne /> : <MdOutlineRepeat />}</span>
        </ButtonsContainer>
        <AudioMenuButton>
          <span>
            <FiMenu />
          </span>
        </AudioMenuButton>
      </Wrapper>
    </Container>
  );
};

export default AudioPlayer;
