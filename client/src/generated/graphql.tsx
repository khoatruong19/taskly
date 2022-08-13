import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type CreateDayTaskInput = {
  date: Scalars['String'];
  description: Scalars['String'];
  icon?: InputMaybe<Scalars['String']>;
  time: Scalars['DateTime'];
  title: Scalars['String'];
};

export type CreateWeeklyTaskInput = {
  date: Scalars['String'];
  description: Scalars['String'];
  icon?: InputMaybe<Scalars['String']>;
  time?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type DayTask = {
  __typename?: 'DayTask';
  date: Scalars['String'];
  description: Scalars['String'];
  done: Scalars['Boolean'];
  icon: Scalars['String'];
  id: Scalars['ID'];
  time: Scalars['DateTime'];
  title: Scalars['String'];
  userId: Scalars['String'];
};

export type DayTaskMutationResponse = MutationResponse & {
  __typename?: 'DayTaskMutationResponse';
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  task?: Maybe<DayTask>;
  tasks: Array<DayTask>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createDayTask: DayTaskMutationResponse;
  createWeeklyTask: WeeklyTaskMutationResponse;
  deleteDayTask: DayTaskMutationResponse;
  deleteWeeklyTask: WeeklyTaskMutationResponse;
  login: UserMutationResponse;
  logout: UserMutationResponse;
  register: UserMutationResponse;
  toggleDayTask: DayTaskMutationResponse;
  update: UserMutationResponse;
  updateDayTask: DayTaskMutationResponse;
  updateWeeklyTask: WeeklyTaskMutationResponse;
};


export type MutationCreateDayTaskArgs = {
  createInput: CreateDayTaskInput;
};


export type MutationCreateWeeklyTaskArgs = {
  createInput: CreateWeeklyTaskInput;
};


export type MutationDeleteDayTaskArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteWeeklyTaskArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationLogoutArgs = {
  userId: Scalars['ID'];
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};


export type MutationToggleDayTaskArgs = {
  ID: Scalars['ID'];
};


export type MutationUpdateArgs = {
  updateInput: UpdateInput;
};


export type MutationUpdateDayTaskArgs = {
  updateInput: UpdateDayTaskInput;
};


export type MutationUpdateWeeklyTaskArgs = {
  updateInput: UpdateWeeklyTaskInput;
};

export type MutationResponse = {
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  getAllWeeklyTasks?: Maybe<WeeklyTaskMutationResponse>;
  getDayTasksByDate?: Maybe<DayTaskMutationResponse>;
  hello: Scalars['String'];
  me?: Maybe<User>;
};


export type QueryGetDayTasksByDateArgs = {
  date: Scalars['String'];
};


export type QueryHelloArgs = {
  name: Scalars['String'];
};

export type RegisterInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UpdateDayTaskInput = {
  date: Scalars['String'];
  description: Scalars['String'];
  icon?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  time: Scalars['DateTime'];
  title: Scalars['String'];
};

export type UpdateInput = {
  avatar: Scalars['String'];
  username: Scalars['String'];
};

export type UpdateWeeklyTaskInput = {
  date: Scalars['String'];
  description: Scalars['String'];
  icon?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  time?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  avatar: Scalars['String'];
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type UserMutationResponse = MutationResponse & {
  __typename?: 'UserMutationResponse';
  accessToken?: Maybe<Scalars['String']>;
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type WeeklyTask = {
  __typename?: 'WeeklyTask';
  date: Scalars['String'];
  description: Scalars['String'];
  icon: Scalars['String'];
  id: Scalars['ID'];
  time?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  userId: Scalars['String'];
};

export type WeeklyTaskMutationResponse = MutationResponse & {
  __typename?: 'WeeklyTaskMutationResponse';
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  task?: Maybe<WeeklyTask>;
  tasks?: Maybe<Array<WeeklyTask>>;
};

export type CreateDayTaskMutationVariables = Exact<{
  createInput: CreateDayTaskInput;
}>;


export type CreateDayTaskMutation = { __typename?: 'Mutation', createDayTask: { __typename?: 'DayTaskMutationResponse', code: number, success: boolean, message?: string | null, task?: { __typename?: 'DayTask', id: string, description: string, title: string, icon: string, done: boolean, time: any, date: string } | null } };

export type CreateWeeklyTaskMutationVariables = Exact<{
  createInput: CreateWeeklyTaskInput;
}>;


export type CreateWeeklyTaskMutation = { __typename?: 'Mutation', createWeeklyTask: { __typename?: 'WeeklyTaskMutationResponse', code: number, success: boolean, message?: string | null, task?: { __typename?: 'WeeklyTask', id: string, title: string, description: string, icon: string, time?: string | null, date: string } | null } };

export type DeleteDayTaskMutationVariables = Exact<{
  deleteDayTaskId: Scalars['ID'];
}>;


export type DeleteDayTaskMutation = { __typename?: 'Mutation', deleteDayTask: { __typename?: 'DayTaskMutationResponse', code: number, success: boolean, message?: string | null } };

export type DeleteWeeklyTaskMutationVariables = Exact<{
  deleteWeeklyTaskId: Scalars['ID'];
}>;


export type DeleteWeeklyTaskMutation = { __typename?: 'Mutation', deleteWeeklyTask: { __typename?: 'WeeklyTaskMutationResponse', code: number, success: boolean, message?: string | null } };

export type LoginUserMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', login: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, accessToken?: string | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: string, username: string } | null } };

export type LogoutUserMutationVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type LogoutUserMutation = { __typename?: 'Mutation', logout: { __typename?: 'UserMutationResponse', code: number, success: boolean } };

export type RegisterUserMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', register: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type ToggleDayTaskMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ToggleDayTaskMutation = { __typename?: 'Mutation', toggleDayTask: { __typename?: 'DayTaskMutationResponse', code: number, success: boolean, message?: string | null, task?: { __typename?: 'DayTask', id: string, description: string, title: string, icon: string, done: boolean, time: any, date: string } | null } };

export type UpdateDayTaskMutationVariables = Exact<{
  updateInput: UpdateDayTaskInput;
}>;


export type UpdateDayTaskMutation = { __typename?: 'Mutation', updateDayTask: { __typename?: 'DayTaskMutationResponse', code: number, success: boolean, message?: string | null, task?: { __typename?: 'DayTask', id: string, description: string, title: string, icon: string, done: boolean, time: any, date: string } | null } };

export type UpdateUserMutationVariables = Exact<{
  updateInput: UpdateInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', update: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'User', username: string, avatar: string } | null } };

export type UpdateWeeklyTaskMutationVariables = Exact<{
  updateInput: UpdateWeeklyTaskInput;
}>;


export type UpdateWeeklyTaskMutation = { __typename?: 'Mutation', updateWeeklyTask: { __typename?: 'WeeklyTaskMutationResponse', code: number, success: boolean, message?: string | null, task?: { __typename?: 'WeeklyTask', title: string, description: string } | null } };

export type GetDayTasksQueryVariables = Exact<{
  date: Scalars['String'];
}>;


export type GetDayTasksQuery = { __typename?: 'Query', getDayTasksByDate?: { __typename?: 'DayTaskMutationResponse', code: number, success: boolean, message?: string | null, tasks: Array<{ __typename?: 'DayTask', id: string, description: string, title: string, icon: string, done: boolean, time: any, date: string }> } | null };

export type GetAllWeeklyTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllWeeklyTasksQuery = { __typename?: 'Query', getAllWeeklyTasks?: { __typename?: 'WeeklyTaskMutationResponse', code: number, success: boolean, message?: string | null, tasks?: Array<{ __typename?: 'WeeklyTask', id: string, title: string, description: string, icon: string, date: string, time?: string | null }> | null } | null };

export type ExampleQueryQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type ExampleQueryQuery = { __typename?: 'Query', hello: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', username: string, avatar: string } | null };


export const CreateDayTaskDocument = gql`
    mutation CreateDayTask($createInput: CreateDayTaskInput!) {
  createDayTask(createInput: $createInput) {
    code
    success
    message
    task {
      id
      description
      title
      icon
      done
      time
      date
    }
  }
}
    `;
export type CreateDayTaskMutationFn = Apollo.MutationFunction<CreateDayTaskMutation, CreateDayTaskMutationVariables>;

/**
 * __useCreateDayTaskMutation__
 *
 * To run a mutation, you first call `useCreateDayTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDayTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDayTaskMutation, { data, loading, error }] = useCreateDayTaskMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateDayTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateDayTaskMutation, CreateDayTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDayTaskMutation, CreateDayTaskMutationVariables>(CreateDayTaskDocument, options);
      }
export type CreateDayTaskMutationHookResult = ReturnType<typeof useCreateDayTaskMutation>;
export type CreateDayTaskMutationResult = Apollo.MutationResult<CreateDayTaskMutation>;
export type CreateDayTaskMutationOptions = Apollo.BaseMutationOptions<CreateDayTaskMutation, CreateDayTaskMutationVariables>;
export const CreateWeeklyTaskDocument = gql`
    mutation CreateWeeklyTask($createInput: CreateWeeklyTaskInput!) {
  createWeeklyTask(createInput: $createInput) {
    code
    success
    message
    task {
      id
      title
      description
      icon
      time
      date
    }
  }
}
    `;
export type CreateWeeklyTaskMutationFn = Apollo.MutationFunction<CreateWeeklyTaskMutation, CreateWeeklyTaskMutationVariables>;

/**
 * __useCreateWeeklyTaskMutation__
 *
 * To run a mutation, you first call `useCreateWeeklyTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWeeklyTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWeeklyTaskMutation, { data, loading, error }] = useCreateWeeklyTaskMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateWeeklyTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateWeeklyTaskMutation, CreateWeeklyTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWeeklyTaskMutation, CreateWeeklyTaskMutationVariables>(CreateWeeklyTaskDocument, options);
      }
export type CreateWeeklyTaskMutationHookResult = ReturnType<typeof useCreateWeeklyTaskMutation>;
export type CreateWeeklyTaskMutationResult = Apollo.MutationResult<CreateWeeklyTaskMutation>;
export type CreateWeeklyTaskMutationOptions = Apollo.BaseMutationOptions<CreateWeeklyTaskMutation, CreateWeeklyTaskMutationVariables>;
export const DeleteDayTaskDocument = gql`
    mutation DeleteDayTask($deleteDayTaskId: ID!) {
  deleteDayTask(id: $deleteDayTaskId) {
    code
    success
    message
  }
}
    `;
export type DeleteDayTaskMutationFn = Apollo.MutationFunction<DeleteDayTaskMutation, DeleteDayTaskMutationVariables>;

/**
 * __useDeleteDayTaskMutation__
 *
 * To run a mutation, you first call `useDeleteDayTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDayTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDayTaskMutation, { data, loading, error }] = useDeleteDayTaskMutation({
 *   variables: {
 *      deleteDayTaskId: // value for 'deleteDayTaskId'
 *   },
 * });
 */
export function useDeleteDayTaskMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDayTaskMutation, DeleteDayTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDayTaskMutation, DeleteDayTaskMutationVariables>(DeleteDayTaskDocument, options);
      }
export type DeleteDayTaskMutationHookResult = ReturnType<typeof useDeleteDayTaskMutation>;
export type DeleteDayTaskMutationResult = Apollo.MutationResult<DeleteDayTaskMutation>;
export type DeleteDayTaskMutationOptions = Apollo.BaseMutationOptions<DeleteDayTaskMutation, DeleteDayTaskMutationVariables>;
export const DeleteWeeklyTaskDocument = gql`
    mutation DeleteWeeklyTask($deleteWeeklyTaskId: ID!) {
  deleteWeeklyTask(id: $deleteWeeklyTaskId) {
    code
    success
    message
  }
}
    `;
export type DeleteWeeklyTaskMutationFn = Apollo.MutationFunction<DeleteWeeklyTaskMutation, DeleteWeeklyTaskMutationVariables>;

/**
 * __useDeleteWeeklyTaskMutation__
 *
 * To run a mutation, you first call `useDeleteWeeklyTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWeeklyTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWeeklyTaskMutation, { data, loading, error }] = useDeleteWeeklyTaskMutation({
 *   variables: {
 *      deleteWeeklyTaskId: // value for 'deleteWeeklyTaskId'
 *   },
 * });
 */
export function useDeleteWeeklyTaskMutation(baseOptions?: Apollo.MutationHookOptions<DeleteWeeklyTaskMutation, DeleteWeeklyTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteWeeklyTaskMutation, DeleteWeeklyTaskMutationVariables>(DeleteWeeklyTaskDocument, options);
      }
export type DeleteWeeklyTaskMutationHookResult = ReturnType<typeof useDeleteWeeklyTaskMutation>;
export type DeleteWeeklyTaskMutationResult = Apollo.MutationResult<DeleteWeeklyTaskMutation>;
export type DeleteWeeklyTaskMutationOptions = Apollo.BaseMutationOptions<DeleteWeeklyTaskMutation, DeleteWeeklyTaskMutationVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    code
    success
    message
    errors {
      field
      message
    }
    user {
      id
      username
    }
    accessToken
  }
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const LogoutUserDocument = gql`
    mutation LogoutUser($userId: ID!) {
  logout(userId: $userId) {
    code
    success
  }
}
    `;
export type LogoutUserMutationFn = Apollo.MutationFunction<LogoutUserMutation, LogoutUserMutationVariables>;

/**
 * __useLogoutUserMutation__
 *
 * To run a mutation, you first call `useLogoutUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutUserMutation, { data, loading, error }] = useLogoutUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useLogoutUserMutation(baseOptions?: Apollo.MutationHookOptions<LogoutUserMutation, LogoutUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutUserMutation, LogoutUserMutationVariables>(LogoutUserDocument, options);
      }
export type LogoutUserMutationHookResult = ReturnType<typeof useLogoutUserMutation>;
export type LogoutUserMutationResult = Apollo.MutationResult<LogoutUserMutation>;
export type LogoutUserMutationOptions = Apollo.BaseMutationOptions<LogoutUserMutation, LogoutUserMutationVariables>;
export const RegisterUserDocument = gql`
    mutation RegisterUser($registerInput: RegisterInput!) {
  register(registerInput: $registerInput) {
    code
    success
    message
    errors {
      field
      message
    }
  }
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const ToggleDayTaskDocument = gql`
    mutation ToggleDayTask($id: ID!) {
  toggleDayTask(ID: $id) {
    code
    success
    message
    task {
      id
      description
      title
      icon
      done
      time
      date
    }
  }
}
    `;
export type ToggleDayTaskMutationFn = Apollo.MutationFunction<ToggleDayTaskMutation, ToggleDayTaskMutationVariables>;

/**
 * __useToggleDayTaskMutation__
 *
 * To run a mutation, you first call `useToggleDayTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleDayTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleDayTaskMutation, { data, loading, error }] = useToggleDayTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useToggleDayTaskMutation(baseOptions?: Apollo.MutationHookOptions<ToggleDayTaskMutation, ToggleDayTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleDayTaskMutation, ToggleDayTaskMutationVariables>(ToggleDayTaskDocument, options);
      }
export type ToggleDayTaskMutationHookResult = ReturnType<typeof useToggleDayTaskMutation>;
export type ToggleDayTaskMutationResult = Apollo.MutationResult<ToggleDayTaskMutation>;
export type ToggleDayTaskMutationOptions = Apollo.BaseMutationOptions<ToggleDayTaskMutation, ToggleDayTaskMutationVariables>;
export const UpdateDayTaskDocument = gql`
    mutation UpdateDayTask($updateInput: UpdateDayTaskInput!) {
  updateDayTask(updateInput: $updateInput) {
    code
    success
    message
    task {
      id
      description
      title
      icon
      done
      time
      date
    }
  }
}
    `;
export type UpdateDayTaskMutationFn = Apollo.MutationFunction<UpdateDayTaskMutation, UpdateDayTaskMutationVariables>;

/**
 * __useUpdateDayTaskMutation__
 *
 * To run a mutation, you first call `useUpdateDayTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDayTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDayTaskMutation, { data, loading, error }] = useUpdateDayTaskMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateDayTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDayTaskMutation, UpdateDayTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDayTaskMutation, UpdateDayTaskMutationVariables>(UpdateDayTaskDocument, options);
      }
export type UpdateDayTaskMutationHookResult = ReturnType<typeof useUpdateDayTaskMutation>;
export type UpdateDayTaskMutationResult = Apollo.MutationResult<UpdateDayTaskMutation>;
export type UpdateDayTaskMutationOptions = Apollo.BaseMutationOptions<UpdateDayTaskMutation, UpdateDayTaskMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($updateInput: UpdateInput!) {
  update(updateInput: $updateInput) {
    code
    success
    message
    user {
      username
      avatar
    }
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UpdateWeeklyTaskDocument = gql`
    mutation UpdateWeeklyTask($updateInput: UpdateWeeklyTaskInput!) {
  updateWeeklyTask(updateInput: $updateInput) {
    code
    success
    message
    task {
      title
      description
    }
  }
}
    `;
export type UpdateWeeklyTaskMutationFn = Apollo.MutationFunction<UpdateWeeklyTaskMutation, UpdateWeeklyTaskMutationVariables>;

/**
 * __useUpdateWeeklyTaskMutation__
 *
 * To run a mutation, you first call `useUpdateWeeklyTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWeeklyTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWeeklyTaskMutation, { data, loading, error }] = useUpdateWeeklyTaskMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateWeeklyTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWeeklyTaskMutation, UpdateWeeklyTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWeeklyTaskMutation, UpdateWeeklyTaskMutationVariables>(UpdateWeeklyTaskDocument, options);
      }
export type UpdateWeeklyTaskMutationHookResult = ReturnType<typeof useUpdateWeeklyTaskMutation>;
export type UpdateWeeklyTaskMutationResult = Apollo.MutationResult<UpdateWeeklyTaskMutation>;
export type UpdateWeeklyTaskMutationOptions = Apollo.BaseMutationOptions<UpdateWeeklyTaskMutation, UpdateWeeklyTaskMutationVariables>;
export const GetDayTasksDocument = gql`
    query GetDayTasks($date: String!) {
  getDayTasksByDate(date: $date) {
    code
    success
    message
    tasks {
      id
      description
      title
      icon
      done
      time
      date
    }
  }
}
    `;

/**
 * __useGetDayTasksQuery__
 *
 * To run a query within a React component, call `useGetDayTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDayTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDayTasksQuery({
 *   variables: {
 *      date: // value for 'date'
 *   },
 * });
 */
export function useGetDayTasksQuery(baseOptions: Apollo.QueryHookOptions<GetDayTasksQuery, GetDayTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDayTasksQuery, GetDayTasksQueryVariables>(GetDayTasksDocument, options);
      }
export function useGetDayTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDayTasksQuery, GetDayTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDayTasksQuery, GetDayTasksQueryVariables>(GetDayTasksDocument, options);
        }
export type GetDayTasksQueryHookResult = ReturnType<typeof useGetDayTasksQuery>;
export type GetDayTasksLazyQueryHookResult = ReturnType<typeof useGetDayTasksLazyQuery>;
export type GetDayTasksQueryResult = Apollo.QueryResult<GetDayTasksQuery, GetDayTasksQueryVariables>;
export const GetAllWeeklyTasksDocument = gql`
    query GetAllWeeklyTasks {
  getAllWeeklyTasks {
    code
    success
    message
    tasks {
      id
      title
      description
      icon
      date
      time
    }
  }
}
    `;

/**
 * __useGetAllWeeklyTasksQuery__
 *
 * To run a query within a React component, call `useGetAllWeeklyTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllWeeklyTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllWeeklyTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllWeeklyTasksQuery(baseOptions?: Apollo.QueryHookOptions<GetAllWeeklyTasksQuery, GetAllWeeklyTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllWeeklyTasksQuery, GetAllWeeklyTasksQueryVariables>(GetAllWeeklyTasksDocument, options);
      }
export function useGetAllWeeklyTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllWeeklyTasksQuery, GetAllWeeklyTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllWeeklyTasksQuery, GetAllWeeklyTasksQueryVariables>(GetAllWeeklyTasksDocument, options);
        }
export type GetAllWeeklyTasksQueryHookResult = ReturnType<typeof useGetAllWeeklyTasksQuery>;
export type GetAllWeeklyTasksLazyQueryHookResult = ReturnType<typeof useGetAllWeeklyTasksLazyQuery>;
export type GetAllWeeklyTasksQueryResult = Apollo.QueryResult<GetAllWeeklyTasksQuery, GetAllWeeklyTasksQueryVariables>;
export const ExampleQueryDocument = gql`
    query ExampleQuery($name: String!) {
  hello(name: $name)
}
    `;

/**
 * __useExampleQueryQuery__
 *
 * To run a query within a React component, call `useExampleQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useExampleQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExampleQueryQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useExampleQueryQuery(baseOptions: Apollo.QueryHookOptions<ExampleQueryQuery, ExampleQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExampleQueryQuery, ExampleQueryQueryVariables>(ExampleQueryDocument, options);
      }
export function useExampleQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExampleQueryQuery, ExampleQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExampleQueryQuery, ExampleQueryQueryVariables>(ExampleQueryDocument, options);
        }
export type ExampleQueryQueryHookResult = ReturnType<typeof useExampleQueryQuery>;
export type ExampleQueryLazyQueryHookResult = ReturnType<typeof useExampleQueryLazyQuery>;
export type ExampleQueryQueryResult = Apollo.QueryResult<ExampleQueryQuery, ExampleQueryQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    username
    avatar
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;