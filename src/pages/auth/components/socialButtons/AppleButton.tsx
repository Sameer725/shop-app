import { appleAuth } from '@invertase/react-native-apple-authentication';
import { useRestyle } from '@shopify/restyle';
import React, { useState } from 'react';
import { ActivityIndicator, Pressable } from 'react-native';

import AppleLogo from '@assets/icons/appleIcon.svg';
import theme from '@assets/theme/theme';
import { Box } from '@components';
import { SocialButtonType, UserDetails, useSocialLoginMutation } from '@hooks/useSocialLoginMutation';
import {
  SocialButtonProps,
  socialButtonRestyleFunctions,
  SocialButtonRestyleProps,
  socialButtonStyles,
} from './socialButton.common';

export const AppleButton: React.FC<SocialButtonProps> = (props) => {
  const { ...rest } = props;

  const themeProps = useRestyle(socialButtonRestyleFunctions, rest as SocialButtonRestyleProps);

  const [userDetail, setUserDetail] = useState<UserDetails>({
    id: '',
    loginType: SocialButtonType.APPLE,
  });

  const [socialLogin, { loading: isLoading }] = useSocialLoginMutation(userDetail);

  const loginWithApple = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // Get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

      // Use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED && appleAuthRequestResponse.identityToken) {
        setUserDetail({
          loginType: SocialButtonType.APPLE,
          firstName: appleAuthRequestResponse.fullName?.givenName ?? '',
          lastName: appleAuthRequestResponse.fullName?.familyName ?? '',
          email: appleAuthRequestResponse.email ?? '',
          id: appleAuthRequestResponse.identityToken,
        });

        await socialLogin({
          variables: {
            input: {
              token: appleAuthRequestResponse.identityToken,
              firstName: appleAuthRequestResponse.fullName?.givenName ?? '',
              lastName: appleAuthRequestResponse.fullName?.familyName ?? '',
            },
          },
        });
      }
    } catch {}
  };

  const buttonStyle = ({ pressed }: { pressed: boolean }) => [
    {
      opacity: pressed ? 0.5 : 1,
      backgroundColor: theme.colors.white,
    },
    socialButtonStyles.container,
  ];

  return (
    <Box {...themeProps}>
      <Pressable onPress={loginWithApple} disabled={isLoading} style={buttonStyle}>
        {isLoading ? (
          <ActivityIndicator style={socialButtonStyles.loader} color="black" />
        ) : (
          <AppleLogo width={20} height={20} />
        )}
      </Pressable>
    </Box>
  );
};
