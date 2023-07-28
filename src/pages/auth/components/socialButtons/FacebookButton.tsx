import { useRestyle } from '@shopify/restyle';
import React, { useState } from 'react';
import { ActivityIndicator, Pressable } from 'react-native';
import { GraphRequest, GraphRequestManager, LoginManager, LoginResult } from 'react-native-fbsdk';

import FacebookLogo from '@assets/icons/facebookIcon.svg';
import theme from '@assets/theme/theme';
import { Box } from '@components';
import { SocialButtonType, UserDetails, useSocialLoginMutation, useToastNotification } from '@hooks';
import {
  SocialButtonProps,
  socialButtonRestyleFunctions,
  SocialButtonRestyleProps,
  socialButtonStyles,
} from './socialButton.common';

interface FacebookUserInfo {
  id: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  last_name: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  first_name: string;
}

export const FacebookButton: React.FC<SocialButtonProps> = (props) => {
  const { ...rest } = props;
  const { showGeneralErrorToast } = useToastNotification();

  const themeProps = useRestyle(socialButtonRestyleFunctions, rest as SocialButtonRestyleProps);

  const [userDetail, setUserDetail] = useState<UserDetails>({
    id: '',
    loginType: SocialButtonType.FACEBOOK,
  });

  const [socialLogin, { loading: isLoading }] = useSocialLoginMutation(userDetail);

  const loginWithFacebook = () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      (result: LoginResult) => {
        if (result.isCancelled) {
          return;
        } else {
          const infoRequest: GraphRequest = new GraphRequest(
            '/me?',
            {
              parameters: {
                fields: {
                  // eslint-disable-next-line id-blacklist
                  string: 'id, first_name, last_name',
                },
              },
            },
            (error, userInfo) => {
              if (error || !userInfo) {
                showGeneralErrorToast();
                return;
              }

              const info = userInfo as FacebookUserInfo;

              setUserDetail({
                loginType: SocialButtonType.FACEBOOK,
                firstName: info.first_name,
                lastName: info.last_name,
                id: info.id,
              });

              void socialLogin({
                variables: {
                  input: {
                    id: info.id,
                    user: {
                      firstName: info.first_name,
                      lastName: info.last_name,
                    },
                  },
                },
              });
            }
          );
          new GraphRequestManager().addRequest(infoRequest).start();
        }
      },
      () => showGeneralErrorToast()
    );
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
      <Pressable onPress={loginWithFacebook} disabled={isLoading} style={buttonStyle}>
        {isLoading ? (
          <ActivityIndicator style={socialButtonStyles.loader} color={theme.colors.facebookBlue} />
        ) : (
          <FacebookLogo width={20} height={20} />
        )}
      </Pressable>
    </Box>
  );
};
