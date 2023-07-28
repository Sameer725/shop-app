import React from 'react';
import { ImageBackground, ImageSourcePropType, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BackgroundImage from '@assets/img/backgroundImage.jpg';
import theme from '@assets/theme/theme';
import { Box, ScreenWrapper } from '@components';
import { FocusAwareStatusBar } from '../components/common/FocusAwareStatusBar';

interface Props {
  children: React.ReactNode;
  noBackground?: boolean;
}

export const AuthLayout: React.FC<Props> = (props) => {
  const { children, noBackground } = props;

  const insets = useSafeAreaInsets();

  if (noBackground) {
    return (
      <ScreenWrapper>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{
            flex: 1,
            backgroundColor: theme.colors.background,
            marginTop: insets.top,
            marginBottom: insets.bottom,
            paddingHorizontal: theme.spacing.s3,
          }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }}
          >
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </ScreenWrapper>
    );
  }
  return (
    <>
      <FocusAwareStatusBar hidden={false} translucent={true} backgroundColor="transparent" barStyle="light-content" />
      <ImageBackground
        style={styles.backgroundImage}
        resizeMode="cover"
        source={BackgroundImage as ImageSourcePropType}
      >
        <Box
          flex={1}
          style={{ paddingTop: insets.top, paddingBottom: insets.bottom, paddingHorizontal: theme.spacing.s3 }}
        >
          {children}
        </Box>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
});
