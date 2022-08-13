import styled from 'styled-components';
import { yellowColor } from '../../constants';

const Button = styled.button<{ forbidden: boolean }>`
  border: none;
  background-color: ${yellowColor};
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  padding: 1rem;
  width: max-content;
  display: block;
  margin: 2rem auto 0;
  border-radius: 10px;
  cursor: pointer;
  opacity: ${(p) => (p.forbidden ? 0.6 : 1)};

  &:hover {
    opacity: 0.6;
  }
`;

interface IProps {
  disabled: boolean;
  text: string;
}

const FormButton = ({ disabled, text }: IProps) => {
  return (
    <Button forbidden={disabled} disabled={disabled} type="submit">
      {text}
    </Button>
  );
};

export default FormButton;
