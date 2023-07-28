import React from 'react';
import { Pressable } from 'react-native';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { Box, ShadowBox, Text } from '@components';
import { useLocalizedData } from '@contexts';
import { AuthMethod } from '@types';

interface CustomerInfoCardProps {
  authenticationMethod?: string;
  label: string;
  value: string;
  onPress?: () => void | undefined;
}

interface AuthMethodTextType {
  [key: string]: string;
}

export const CustomerInfoCard: React.FC<CustomerInfoCardProps> = (props) => {
  const { authenticationMethod, label, value, onPress } = props;

  const { strings } = useLocalizedData();

  const authMethodText: AuthMethodTextType = {
    [AuthMethod.APPLE]: strings.profileSettings.personalData.createdWithApple,
    [AuthMethod.FACEBOOK]: strings.profileSettings.personalData.createdWithFacebook,
    [AuthMethod.GOOGLE]: strings.profileSettings.personalData.createdWithGoogle,
  };

  const authenticationMethodText: string | null = authenticationMethod ? authMethodText[authenticationMethod] : null;

  return (
    <>
      <Box flexDirection="row" alignItems="center" marginTop="s3">
        <ShadowBox
          backgroundColor="white"
          borderRadius={theme.radii.xl}
          padding="s3"
          containerViewStyle={{
            flex: 1,
          }}
        >
          <Box>
            <Text variant="text-2xs-r">{label}</Text>
            <Text variant="text-xs-sb" numberOfLines={1} lineBreakMode="tail">
              {value}
            </Text>
          </Box>
        </ShadowBox>
        {onPress ? (
          <Pressable onPress={onPress}>
            <Box padding="s3" marginLeft="s3" justifyContent="center" alignItems="center">
              <KsIcon name={KS_ICON.EDIT} color={theme.colors.defaultTextColor} size={24} />
            </Box>
          </Pressable>
        ) : null}
      </Box>
      {authenticationMethod ? (
        <Text variant="text-xs" padding="s1">
          {authenticationMethodText}
        </Text>
      ) : null}
    </>
  );
};
