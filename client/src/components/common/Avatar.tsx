import styled from 'styled-components';
import AppLogo from '../../assets/logo.jpg';

interface IProps {
  size: 'sm' | 'lg';
  cursor?: boolean;
  src?: string;
  onClick?: () => void;
}

interface ImageProps {
  size: 'sm' | 'lg';
  cursor: number;
}

const ImageContainer = styled.div<ImageProps>`
  width: ${(p) => (p.size === 'sm' ? '40px' : '60px')};
  height: ${(p) => (p.size === 'sm' ? '40px' : '60px')};
  position: relative;
  cursor: ${(p) => (p.cursor ? 'pointer' : 'none')};

  &:hover {
    opacity: ${(p) => (p.cursor ? 0.6 : 1)};
  }
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
`;

const Avatar = ({ size, cursor, src, onClick }: IProps) => {
  return (
    <ImageContainer onClick={onClick} size={size} cursor={cursor ? 1 : 0}>
      <Image alt="" src={src || AppLogo} />
    </ImageContainer>
  );
};

export default Avatar;
