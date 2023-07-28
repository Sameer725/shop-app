import { gql } from '@apollo/client';
import { DocumentNode } from 'graphql';

export const REGISTRATION_MUTATION: DocumentNode = gql`
  mutation RegisterCustomerAccount($input: RegisterCustomerInput!) {
    registerCustomerAccount(input: $input) {
      ... on Success {
        success
      }
    }
  }
`;

export const LOGIN_MUTATION: DocumentNode = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ... on CurrentUser {
        id
        identifier
      }

      ... on InvalidCredentialsError {
        message
      }
    }
  }
`;

export const LOGOUT_MUTATION: DocumentNode = gql`
  mutation LogoutCustomer {
    logoutCustomer {
      success
    }
  }
`;

export const FACEBOOK_LOGIN: DocumentNode = gql`
  mutation FacebookAuthenticate($input: FacebookAuthInput) {
    authenticate(input: { facebook: $input }) {
      ... on CurrentUser {
        id
        identifier
      }
    }
  }
`;

export const GOOGLE_LOGIN: DocumentNode = gql`
  mutation GoogleAuthenticate($input: GoogleAuthInput) {
    authenticate(input: { google: $input }) {
      ... on CurrentUser {
        id
        identifier
      }
    }
  }
`;

export const APPLE_LOGIN: DocumentNode = gql`
  mutation AppleAuthenticate($input: AppleAuthData) {
    authenticate(input: { apple: $input }) {
      ... on CurrentUser {
        id
        identifier
      }
    }
  }
`;

export const CREATE_WAITING_LIST_MUTATION: DocumentNode = gql`
  mutation CreateWaitingList($email: String!, $postalCode: String!) {
    createWaitingList(input: { email: $email, postalCode: $postalCode }) {
      id
    }
  }
`;

export const REQUEST_PASSWORD_RESET_MUTATION: DocumentNode = gql`
  mutation RequestPasswordReset($emailAddress: String!) {
    requestPasswordReset(emailAddress: $emailAddress) {
      __typename
    }
  }
`;

export const RESET_PASSWORD_MUTATION: DocumentNode = gql`
  mutation ResetPassword($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password) {
      ... on CurrentUser {
        id
        identifier
      }
      ... on PasswordResetTokenInvalidError {
        message
      }
      ... on PasswordResetTokenExpiredError {
        message
      }
    }
  }
`;
