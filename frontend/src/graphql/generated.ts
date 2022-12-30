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
};

export type CreateUsernameResponse = {
  __typename?: 'CreateUsernameResponse';
  error?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUsername?: Maybe<CreateUsernameResponse>;
};


export type MutationCreateUsernameArgs = {
  username?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  searchUsers?: Maybe<Array<Maybe<User>>>;
};


export type QuerySearchUsersArgs = {
  username?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type CreateUsernameMutationVariables = Exact<{
  username?: InputMaybe<Scalars['String']>;
}>;


export type CreateUsernameMutation = { __typename?: 'Mutation', createUsername?: { __typename?: 'CreateUsernameResponse', error?: string | null, success?: boolean | null } | null };

export type SearchUsersQueryVariables = Exact<{
  username?: InputMaybe<Scalars['String']>;
}>;


export type SearchUsersQuery = { __typename?: 'Query', searchUsers?: Array<{ __typename?: 'User', id?: string | null, username?: string | null } | null> | null };


export const CreateUsernameDocument = gql`
    mutation CreateUsername($username: String) {
  createUsername(username: $username) {
    error
    success
  }
}
    `;
export type CreateUsernameMutationFn = Apollo.MutationFunction<CreateUsernameMutation, CreateUsernameMutationVariables>;

/**
 * __useCreateUsernameMutation__
 *
 * To run a mutation, you first call `useCreateUsernameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUsernameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUsernameMutation, { data, loading, error }] = useCreateUsernameMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useCreateUsernameMutation(baseOptions?: Apollo.MutationHookOptions<CreateUsernameMutation, CreateUsernameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUsernameMutation, CreateUsernameMutationVariables>(CreateUsernameDocument, options);
      }
export type CreateUsernameMutationHookResult = ReturnType<typeof useCreateUsernameMutation>;
export type CreateUsernameMutationResult = Apollo.MutationResult<CreateUsernameMutation>;
export type CreateUsernameMutationOptions = Apollo.BaseMutationOptions<CreateUsernameMutation, CreateUsernameMutationVariables>;
export const SearchUsersDocument = gql`
    query SearchUsers($username: String) {
  searchUsers(username: $username) {
    id
    username
  }
}
    `;

/**
 * __useSearchUsersQuery__
 *
 * To run a query within a React component, call `useSearchUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUsersQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useSearchUsersQuery(baseOptions?: Apollo.QueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, options);
      }
export function useSearchUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, options);
        }
export type SearchUsersQueryHookResult = ReturnType<typeof useSearchUsersQuery>;
export type SearchUsersLazyQueryHookResult = ReturnType<typeof useSearchUsersLazyQuery>;
export type SearchUsersQueryResult = Apollo.QueryResult<SearchUsersQuery, SearchUsersQueryVariables>;