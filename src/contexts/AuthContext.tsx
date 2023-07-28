import { useApolloClient } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { createContext, ReactNode, useContext, useEffect, useReducer } from 'react';

import { AsyncStorageKeys } from '@constants';
import { ACTIVE_CUSTOMER_QUERY } from '@graphqlDocuments';
import { AuthScreens } from '@routes/routes';
import { Customer, KsNavigation } from '@types';
import { useMountEffect } from '../hooks/useMountEffect';

interface UserDetail {
  id: string;
  firstName: string;
  channelToken?: string;
  isOfLegalAge?: boolean;
}

export interface LoginStatusData {
  isLoggedIn: boolean;
  isGuestUser: boolean;
  userDetail?: UserDetail;
}

interface ReducerProps {
  loginStatus: LoginStatusData;
  browseInDefaultChannel?: boolean;
  dispatchUpdateLogin: (loginStatusData: LoginStatusData, type?: ActionType) => void;
  dispatchUpdateUser: (userDetail: Partial<UserDetail>) => void;
}

export enum ActionType {
  LOGIN = 'login',
  BROWSE_IN_DEFAULT_CHANNEL = 'browseInDefaultChannel',
}

interface Action {
  type: ActionType;
  payload: LoginStatusData;
}

const Reducer: (prevState: ReducerProps, action: Action) => ReducerProps = (
  prevState: ReducerProps,
  action: Action
): ReducerProps => {
  switch (action.type) {
    case ActionType.LOGIN:
      return {
        ...prevState,
        loginStatus: action.payload,
        browseInDefaultChannel: false,
      };
    case ActionType.BROWSE_IN_DEFAULT_CHANNEL:
      return {
        ...prevState,
        loginStatus: action.payload,
        browseInDefaultChannel: true,
      };
    default:
      return prevState;
  }
};

const initialState: ReducerProps = {
  loginStatus: {
    isLoggedIn: false,
    isGuestUser: false,
  },
  dispatchUpdateLogin: () => {
    return;
  },
  dispatchUpdateUser: () => {
    return;
  },
};

export const AuthContext: React.Context<ReducerProps> = createContext<ReducerProps>(initialState);

interface AuthProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthProps> = (props: AuthProps) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const client = useApolloClient();
  const navigation: KsNavigation = useNavigation();

  const isUserLoggedIn: () => Promise<{ loginStatus: LoginStatusData; type: ActionType }> = async () => {
    const loginStatusDataString: string | null = await AsyncStorage.getItem(AsyncStorageKeys.LOGIN_STATUS_DATA);
    if (loginStatusDataString !== null) {
      let parsedLoginStatus: LoginStatusData;
      try {
        parsedLoginStatus = JSON.parse(loginStatusDataString) as LoginStatusData;
        return { loginStatus: parsedLoginStatus, type: ActionType.LOGIN };
      } catch {
        await AsyncStorage.removeItem(AsyncStorageKeys.LOGIN_STATUS_DATA);
      }
    }
    return { loginStatus: initialState.loginStatus, type: ActionType.LOGIN };
  };

  const updateLoginData = (loginStatusData: LoginStatusData, type: ActionType) => {
    dispatch({ type, payload: loginStatusData });
  };

  useEffect(() => {
    void isUserLoggedIn().then(({ loginStatus: loginValue, type }) => {
      updateLoginData(loginValue, type);
    });
  }, []);

  useMountEffect(() => {
    void client
      .query<{ activeCustomer: Customer }>({ query: ACTIVE_CUSTOMER_QUERY, fetchPolicy: 'no-cache' })
      .then(({ data }) => {
        if (!data || !data.activeCustomer) {
          const payload: LoginStatusData = {
            isLoggedIn: false,
            isGuestUser: false,
            userDetail: undefined,
          };
          if (payload.isLoggedIn !== state.loginStatus.isLoggedIn) {
            dispatchUpdateLogin(payload);
            navigation.navigate(AuthScreens.LOGIN_SCREEN);
          }
        }

        if (state.loginStatus.isLoggedIn && !state.loginStatus.isGuestUser && !state.loginStatus.userDetail) {
          const payload: LoginStatusData = {
            isLoggedIn: true,
            isGuestUser: false,
            userDetail: {
              id: data.activeCustomer?.id,
              firstName: data.activeCustomer?.firstName,
              channelToken: data.activeCustomer?.customFields?.activeChannel?.token,
              isOfLegalAge: data.activeCustomer?.customFields?.isOfLegalAge ?? false,
            },
          };

          // Navigate to address screen if no channelToken is given, which means the user has no address selected yet
          // In case the user wants to browse in the default channel, he will not be navigated to the address screen
          if (
            !state.browseInDefaultChannel &&
            payload.userDetail?.id !== undefined &&
            !payload.userDetail?.channelToken
          ) {
            navigation.navigate(AuthScreens.ADDRESS_SELECTION_SCREEN, {
              emailAddress: data.activeCustomer.emailAddress,
            });
            return;
          }

          dispatchUpdateLogin(payload);
        }
      });
  }, [state.loginStatus]);

  const dispatchUpdateLogin = (loginValue: LoginStatusData, type?: ActionType) => {
    void AsyncStorage.setItem(AsyncStorageKeys.LOGIN_STATUS_DATA, JSON.stringify(loginValue));
    updateLoginData(loginValue, type ?? ActionType.LOGIN);

    if (!loginValue.isLoggedIn) {
      // Reset/clear the cache without re-fetching active queries
      void client.clearStore();
      void AsyncStorage.removeItem(AsyncStorageKeys.AUTH_TOKEN);
    }
  };

  const dispatchUpdateUser: (userDetail: Partial<UserDetail>) => Promise<void> = async (
    userDetail: Partial<UserDetail>
  ) => {
    try {
      const userDataString = (await AsyncStorage.getItem(AsyncStorageKeys.LOGIN_STATUS_DATA)) as string;

      const userData: LoginStatusData = JSON.parse(userDataString) as LoginStatusData;

      userData.userDetail = { ...userData.userDetail, ...userDetail } as UserDetail;

      dispatchUpdateLogin(userData);
    } catch {
      return;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loginStatus: state.loginStatus,
        dispatchUpdateLogin,
        dispatchUpdateUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuthData: () => ReducerProps = () => useContext(AuthContext);
