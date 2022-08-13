import { MutationResponse } from '../types/MutationResponse';

export const serverErrorReturn = (): MutationResponse => {
  return {
    code: 500,
    success: false,
    message: 'Something is wrong with server',
  };
};
