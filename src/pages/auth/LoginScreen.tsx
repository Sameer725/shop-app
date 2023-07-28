import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Platform, Pressable } from 'react-native';
import Animated from 'react-native-reanimated';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { Box, Button, ButtonSize, ButtonType, Text } from '@components';
import { useLocalizedData } from '@contexts';
import { useScreenAnimation } from '@hooks';
import { AuthLayout } from '@layouts';
import { AuthScreens } from '@routes/routes';
import { KsNavigation } from '@types';
import { AppleButton } from './components/socialButtons/AppleButton';
// Import { FacebookButton } from './components/socialButtons/FacebookButton';
import { GoogleButton } from './components/socialButtons/GoogleButton';

const AnimatedBox = Animated.createAnimatedComponent(Box);

export const LoginScreen: React.FC = () => {
  const { strings } = useLocalizedData();
  const navigation: KsNavigation = useNavigation();
  const { slideUpAnimationStyle } = useScreenAnimation();

  const navigateToBrowseAsGuest = () => {
    navigation.navigate(AuthScreens.BROWSE_AS_GUEST_SCREEN);
  };

  const navigateToLoginWithMail = () => {
    navigation.navigate(AuthScreens.LOGIN_WITH_EMAIL_SCREEN);
  };

  const navigateToRegister = () => {
    navigation.navigate(AuthScreens.REGISTER_SCREEN);
  };

  return (
    <AuthLayout>
      <Box flex={1}>
        <AnimatedBox style={slideUpAnimationStyle} justifyContent="flex-end" flex={1}>
          <Text variant="heading-xl" color="white" marginBottom="s5">
            {strings.auth.loginHeading}
          </Text>

          <Box flexDirection="row" marginBottom="s5" justifyContent="space-between">
            {Platform.OS === 'ios' ? <AppleButton marginRight="s3" flex={1} /> : null}
            <GoogleButton flex={1} />
            {/* <FacebookButton marginLeft="s3" flex={1} /> */}
          </Box>

          <Button
            onPress={navigateToRegister}
            type={ButtonType.PRIMARY_WHITE}
            leadingIcon={<KsIcon name={KS_ICON.SMS} color={theme.colors.defaultTextColor} size={20} />}
            align="center"
            marginBottom="s5"
          >
            {strings.auth.registerWithEmail}
          </Button>

          <Box flexDirection="row" justifyContent="center" marginBottom="s8">
            <Text variant="heading-xs" textAlign="center" color="white" marginRight="s2">
              {strings.auth.alreadyHaveAnAccount}
            </Text>
            <Pressable onPress={navigateToLoginWithMail}>
              <Text variant="heading-xs" textAlign="center" color="white" textDecorationLine="underline">
                {strings.auth.emailLogin}
              </Text>
            </Pressable>
          </Box>

          <Button
            onPress={navigateToBrowseAsGuest}
            type={ButtonType.GHOST_INVERTED}
            size={ButtonSize.SM}
            marginBottom="s8"
          >
            {strings.auth.browseAsGuest}
          </Button>
        </AnimatedBox>
      </Box>
    </AuthLayout>
  );
};
