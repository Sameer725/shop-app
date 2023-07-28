import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React from 'react';
import Animated from 'react-native-reanimated';

import { Box, Text } from '@components';
import { useLocalizedData } from '@contexts';
import { useScreenAnimation } from '@hooks';
import { AuthLayout } from '@layouts';
import { AuthScreens } from '@routes/routes';
import { KsNavigation } from '@types';

const AnimatedBox = Animated.createAnimatedComponent(Box);

export const WelcomeScreen: React.FC = () => {
  const { strings } = useLocalizedData();
  const navigation: KsNavigation = useNavigation();

  const { slideUpAnimationStyle } = useScreenAnimation({
    initialValue: 1,
    finalValue: 0,
  });

  const navigateToLogin = () => {
    navigation.navigate(AuthScreens.LOGIN_SCREEN);
  };

  useFocusEffect(() => {
    setTimeout(() => {
      void navigateToLogin();
    }, 1000);
  });

  return (
    <AuthLayout>
      <Box flex={1}>
        <AnimatedBox justifyContent="flex-end" flex={1} marginBottom="s10" maxWidth={230}>
          <AnimatedBox style={slideUpAnimationStyle}>
            <Text variant="heading-sm" color="white">
              {strings.auth.welcomePage1}
            </Text>
          </AnimatedBox>
          <AnimatedBox style={slideUpAnimationStyle}>
            <Text variant="heading-3xl" color="white" marginTop="s4">
              {strings.auth.welcomePage2}
            </Text>
          </AnimatedBox>
        </AnimatedBox>
      </Box>
    </AuthLayout>
  );
};
