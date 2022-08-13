import { UserMutationResponse } from '../types/user/UserMutationResponse';

export const userInputValidation = (
  username: string,
  password: string,
  avatar?: string
): UserMutationResponse | true => {
  if (username.length < 3) {
    return {
      code: 400,
      success: false,
      errors: [
        {
          field: 'username',
          message: 'Username must be greater than 2!',
        },
      ],
    };
  }

  if (password.length < 3) {
    return {
      code: 400,
      success: false,
      errors: [
        {
          field: 'password',
          message: 'Password must be greater than 2!',
        },
        {
          field: 'confirmedPassword',
          message: 'Password must be greater than 2!',
        },
      ],
    };
  }

  return true;
};
