import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  NormalizedCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AsyncStorageKeys } from '@constants';
import { LoginStatusData } from '@contexts';
import { API_URL, DEFAULT_CHANNEL } from '@env';
import { ORDER_DISCOUNT_TYPE_POLICY, ORDER_LIST_TYPE_POLICY } from '@utils/apolloTypePolicies';

const httpLink: ApolloLink = createHttpLink({
  uri: API_URL,
});

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext() as {
      response: { headers: Map<string, string> };
    };

    const authToken = context.response.headers.get('vendure-auth-token');

    if (authToken) {
      void AsyncStorage.setItem(AsyncStorageKeys.AUTH_TOKEN, authToken);
    }

    return response;
  });
});

const authLink: ApolloLink = setContext(
  async (
    operation,
    { headers }: { headers: { [key: string]: string } }
  ): Promise<{ headers: { [key: string]: string } }> => {
    const loginStatusDataString: string | null = await AsyncStorage.getItem(AsyncStorageKeys.LOGIN_STATUS_DATA);

    const authToken: string | null = await AsyncStorage.getItem(AsyncStorageKeys.AUTH_TOKEN);

    const defaultChannelToken: string =
      (await AsyncStorage.getItem(AsyncStorageKeys.DEFAULT_CHANNEL_TOKEN)) ?? DEFAULT_CHANNEL;

    if (authToken) {
      headers = { ...headers, Authorization: `Bearer ${authToken}` };
    }

    if (loginStatusDataString === null) {
      return { headers };
    }

    const loginStatusData: LoginStatusData = JSON.parse(loginStatusDataString) as LoginStatusData;

    if (!loginStatusData.userDetail?.channelToken && !defaultChannelToken) {
      return { headers };
    }

    return {
      headers: {
        ...headers,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'vendure-token': loginStatusData.userDetail?.channelToken ?? defaultChannelToken ?? '',
      },
    };
  }
);

export const client: ApolloClient<NormalizedCacheObject | NormalizedCache> = new ApolloClient({
  link: afterwareLink.concat(authLink.concat(httpLink)),
  credentials: 'include',
  cache: new InMemoryCache({
    resultCaching: false,
    typePolicies: {
      OrderList: ORDER_LIST_TYPE_POLICY,
      Order: { ...ORDER_DISCOUNT_TYPE_POLICY, merge: true },
    },
  }),
});
