import { useEffect, useState } from 'react';
import styled from 'styled-components';
import cloudy from '../../assets/cloudy.png';
import rain from '../../assets/rain.png';
import sunny from '../../assets/sunny.png';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
  font-size: 1.2rem;
  font-weight: 500;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 6rem;
  height: 6rem;

  & > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Weather = () => {
  const [info, setInfo] = useState('');
  useEffect(() => {
    const getWeather = async () => {
      const res = await fetch(
        'http://api.weatherapi.com/v1/current.json?key=a56e657543ed4df8a4a54915220408&q=Hanoi&aqi=no',
        {
          method: 'GET',
        }
      );
      const data = (await res.json()) as {
        current: { condition: { text: string } };
      };
      setInfo(data.current.condition.text);
    };
    getWeather();
  }, []);

  return (
    <Container>
      <ImageContainer>
        <img
          src={
            info.includes('cloudy')
              ? cloudy
              : info.includes('rain')
              ? rain
              : sunny
          }
          alt=""
        />
      </ImageContainer>
      {info}
    </Container>
  );
};

export default Weather;
