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
  Date: any;
};

export type Conversation = {
  __typename?: 'Conversation';
  createdAt: Scalars['Date'];
  id: Scalars['String'];
  participants: Array<Participant>;
  updatedAt: Scalars['Date'];
};

export type CreateConversationMutationResponse = {
  __typename?: 'CreateConversationMutationResponse';
  id: Scalars['String'];
};

export type CreateUsernameResponse = {
  __typename?: 'CreateUsernameResponse';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createConversation: CreateConversationMutationResponse;
  createUsername: CreateUsernameResponse;
};


export type MutationCreateConversationArgs = {
  participants: Array<Scalars['String']>;
};


export type MutationCreateUsernameArgs = {
  username: Scalars['String'];
};

export type Participant = {
  __typename?: 'Participant';
  hasSeenLatestMessage: Scalars['Boolean'];
  id: Scalars['String'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  conversations: Array<Conversation>;
  users: Array<UsersQueryResponse>;
};


export type QueryUsersArgs = {
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type UsersQueryResponse = {
  __typename?: 'UsersQueryResponse';
  id: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type CreateConversationMutationVariables = Exact<{
  participants: Array<Scalars['String']> | Scalars['String'];
}>;


export type CreateConversationMutation = { __typename?: 'Mutation', createConversation: { __typename?: 'CreateConversationMutationResponse', id: string } };

export type CreateUsernameMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type CreateUsernameMutation = { __typename?: 'Mutation', createUsername: { __typename?: 'CreateUsernameResponse', error?: string | null, success: boolean } };

export type ConversationsQueryVariables = Exact<{ [key: string]: never; }>;


export type ConversationsQuery = { __typename?: 'Query', conversations: Array<{ __typename?: 'Conversation', id: string, participants: Array<{ __typename?: 'Participant', id: string, hasSeenLatestMessage: boolean, user: { __typename?: 'User', id: string, username?: string | null } }> }> };

export type UsersQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'UsersQueryResponse', id: string, image?: string | null, username?: string | null }> };


export const CreateConversationDocument = gql`
    mutation CreateConversation($participants: [String!]!) {
  createConversation(participants: $participants) {
    id
  }
}
    `;
export type CreateConversationMutationFn = Apollo.MutationFunction<CreateConversationMutation, CreateConversationMutationVariables>;

/**
 * __useCreateConversationMutation__
 *
 * To run a mutation, you first call `useCreateConversationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateConversationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createConversationMutation, { data, loading, error }] = useCreateConversationMutation({
 *   variables: {
 *      participants: // value for 'participants'
 *   },
 * });
 */
export function useCreateConversationMutation(baseOptions?: Apollo.MutationHookOptions<CreateConversationMutation, CreateConversationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateConversationMutation, CreateConversationMutationVariables>(CreateConversationDocument, options);
      }
export type CreateConversationMutationHookResult = ReturnType<typeof useCreateConversationMutation>;
export type CreateConversationMutationResult = Apollo.MutationResult<CreateConversationMutation>;
export type CreateConversationMutationOptions = Apollo.BaseMutationOptions<CreateConversationMutation, CreateConversationMutationVariables>;
export const CreateUsernameDocument = gql`
    mutation CreateUsername($username: String!) {
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
export const ConversationsDocument = gql`
    query Conversations {
  conversations {
    id
    participants {
      id
      hasSeenLatestMessage
      user {
        id
        username
      }
    }
  }
}
    `;

/**
 * __useConversationsQuery__
 *
 * To run a query within a React component, call `useConversationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useConversationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConversationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useConversationsQuery(baseOptions?: Apollo.QueryHookOptions<ConversationsQuery, ConversationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConversationsQuery, ConversationsQueryVariables>(ConversationsDocument, options);
      }
export function useConversationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConversationsQuery, ConversationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConversationsQuery, ConversationsQueryVariables>(ConversationsDocument, options);
        }
export type ConversationsQueryHookResult = ReturnType<typeof useConversationsQuery>;
export type ConversationsLazyQueryHookResult = ReturnType<typeof useConversationsLazyQuery>;
export type ConversationsQueryResult = Apollo.QueryResult<ConversationsQuery, ConversationsQueryVariables>;
export const UsersDocument = gql`
    query Users($username: String!) {
  users(username: $username) {
    id
    image
    username
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUsersQuery(baseOptions: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;