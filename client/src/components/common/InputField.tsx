import { useField } from 'formik';
import styled from 'styled-components';
import { yellowColor } from '../../constants';

interface IProps {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  textarea?: boolean;
}

const Container = styled.div<{ error: string | undefined }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  label {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  input,
  textarea {
    outline: none;
    border-radius: 10px;
    background-color: white;
    padding: 1rem;
    border: solid ${(p) => (p.error ? '2px red' : `1px ${yellowColor}`)};

    &:focus {
      border: 2px solid ${yellowColor};
    }
  }

  p {
    font-size: 1.2rem;
    font-weight: 600;
    color: red;
    margin-top: 0.5rem;
  }
`;

const InputField = (props: IProps) => {
  const [field, { error }] = useField(props);
  return (
    <Container error={error}>
      <label htmlFor={field.name}>{props.label}</label>
      {props.textarea ? (
        <textarea
          {...field}
          name={field.name}
          placeholder={props.placeholder}
          id=""
        />
      ) : (
        <input
          {...field}
          name={field.name}
          placeholder={props.placeholder}
          type={props.type}
        />
      )}
      {error && <p>{error}</p>}
    </Container>
  );
};

export default InputField;
