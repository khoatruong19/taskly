import { Form, Formik, FormikHelpers } from 'formik';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FormButton from '../components/common/FormButton';
import InputField from '../components/common/InputField';
import AuthLayout from '../components/layout/auth/AuthLayout';
import { yellowColor } from '../constants';
import { RegisterInput, useRegisterUserMutation } from '../generated/graphql';
import { mapFieldErrors } from '../helper/mapFieldErrors';

const Header = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  color: ${yellowColor};
`;

export const SmallLink = styled.p`
  font-size: 0.8rem;
  color: black;
  text-decoration: underline;
  text-align: center;
  margin: 1rem auto 0;
  width: max-content;

  &:hover {
    font-weight: 700;
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const [registerUser, { data: _data, error: _error, loading: _loading }] =
    useRegisterUserMutation();
  const initialValues = { username: '', password: '', confirmedPassword: '' };
  const handleRegisterSubmit = async (
    values: RegisterInput & { confirmedPassword: string },
    { setErrors }: FormikHelpers<RegisterInput & { confirmedPassword: string }>
  ) => {
    if (values.confirmedPassword !== values.password) {
      setErrors({
        password: 'Not matched!',
        confirmedPassword: 'Not matched!',
      });
      return;
    }
    const { confirmedPassword, ...rest } = values;
    const response = await registerUser({
      variables: {
        registerInput: rest,
      },
    });
    if (response.data?.register?.errors) {
      setErrors(mapFieldErrors(response.data.register.errors));
    } else if (response.data?.register.success) {
      toast.success(`${response.data?.register.message}`);
      navigate('/login');
    }
  };
  return (
    <AuthLayout>
      <Header>Register</Header>
      <Formik initialValues={initialValues} onSubmit={handleRegisterSubmit}>
        {({ isSubmitting, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <InputField
              type="text"
              name="username"
              label="Username"
              placeholder="Username..."
            />
            <InputField
              type="password"
              name="password"
              label="Password"
              placeholder="Password..."
            />
            <InputField
              type="password"
              name="confirmedPassword"
              label="Confirm password"
              placeholder="Confirm password..."
            />
            <FormButton text="Register" disabled={isSubmitting} />
          </Form>
        )}
      </Formik>

      <SmallLink>
        <Link to="/login">Already have an account? Login!</Link>
      </SmallLink>
    </AuthLayout>
  );
};

export default Register;
