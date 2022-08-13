import { Form, Formik, FormikHelpers } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FormButton from '../components/common/FormButton';
import InputField from '../components/common/InputField';
import AuthLayout from '../components/layout/auth/AuthLayout';
import { yellowColor } from '../constants';
import { useAuthContext } from '../context/AuthContext';
import { LoginInput, useLoginUserMutation } from '../generated/graphql';
import { mapFieldErrors } from '../helper/mapFieldErrors';
import JWTManager from '../utils/jwt';
import { SmallLink } from './Register';

const Header = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  color: ${yellowColor};
`;

const Login = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuthContext();
  const [loginUser, { data: _data, error: _error, loading: _loading }] =
    useLoginUserMutation();
  const initialValues = { username: '', password: '' };
  const handleLoginSubmit = async (
    values: LoginInput,
    { setErrors }: FormikHelpers<LoginInput>
  ) => {
    const response = await loginUser({
      variables: {
        loginInput: values,
      },
    });
    if (response.data?.login?.errors) {
      setErrors(mapFieldErrors(response.data.login.errors));
    } else if (response.data?.login.user) {
      JWTManager.setToken(response.data?.login.accessToken as string);
      setIsAuthenticated(true);

      navigate('/');
    }
  };
  return (
    <AuthLayout>
      <Header>Login</Header>
      <Formik initialValues={initialValues} onSubmit={handleLoginSubmit}>
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
            <FormButton text="Login" disabled={isSubmitting} />
          </Form>
        )}
      </Formik>
      <SmallLink>
        <Link to="/register">Don't have an acoount? Register!</Link>
      </SmallLink>
    </AuthLayout>
  );
};

export default Login;
