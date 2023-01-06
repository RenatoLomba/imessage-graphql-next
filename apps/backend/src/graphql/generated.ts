export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  latestMessage?: Maybe<Message>;
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

export type Message = {
  __typename?: 'Message';
  createdAt: Scalars['Date'];
  id: Scalars['String'];
  participant: Participant;
  text: Scalars['String'];
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
  users: Array<User>;
};


export type QueryUsersArgs = {
  username: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  conversationCreated?: Maybe<Conversation>;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};
