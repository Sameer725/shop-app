import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

import { useAuthData } from '@contexts';
import { APPLE_LOGIN, FACEBOOK_LOGIN, GOOGLE_LOGIN } from '@graphqlDocuments';
import { AuthScreens } from '@routes/routes';
import { AppleAuthData, AuthenticationResult, FacebookAuthInput, GoogleAuthInput, KsNavigation } from '@types';
import { useToastNotification } from './useToastNotification';

export enum SocialButtonType {
  APPLE = 'apple',
  FACEBOOK = 'facebook',
  GOOGLE = 'google',
}

const getDocumentNode = (btnType: SocialButtonType) => {
  switch (btnType) {
    case SocialButtonType.FACEBOOK:
      return FACEBOOK_LOGIN;
    case SocialButtonType.GOOGLE:
      return GOOGLE_LOGIN;
    case SocialButtonType.APPLE:
      return APPLE_LOGIN;
    default:
      return GOOGLE_LOGIN;
  }
};

export interface UserDetails {
  id: string;
  lastName?: string;
  firstName?: string;
  email?: string;
  loginType: SocialButtonType;
}

export const useSocialLoginMutation = (userDetail: UserDetails) => {
  const { dispatchUpdateLogin } = useAuthData();
  const { showGeneralErrorToast } = useToastNotification();

  const navigation: KsNavigation = useNavigation();

  const onError = () => {
    showGeneralErrorToast();
  };

  const onCompleted = ({ authenticate }: { authenticate: AuthenticationResult }) => {
    switch (authenticate.__typename) {
      case 'CurrentUser':
        dispatchUpdateLogin({
          isLoggedIn: true,
          isGuestUser: false,
        });

        break;
      case 'InvalidCredentialsError':
        navigation.navigate(AuthScreens.REGISTER_SCREEN, userDetail);
        break;
      default:
        onError();
        break;
    }
  };

  return useMutation<
    {
      authenticate: AuthenticationResult;
    },
    {
      input: FacebookAuthInput | GoogleAuthInput | AppleAuthData;
    }
  >(getDocumentNode(userDetail.loginType), {
    notifyOnNetworkStatusChange: true,
    onError,
    onCompleted,
  });
};
