import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';

import MailSentSuccessIconSVG from '@assets/illustrations/mailSentSuccessIcon.svg';
import { Box, Button, ButtonType, Text } from '@components';
import { useLocalizedData } from '@contexts';
import { AuthScreens } from '@routes/routes';
import { KsNavigation } from '@types';

interface Props {
  sendEmail: () => void;
  isLoading: boolean;
}

export const PasswordRequestSuccess: React.FC<Props> = (props) => {
  const { strings } = useLocalizedData();
  const navigation: KsNavigation = useNavigation();
  const { sendEmail, isLoading } = props;
  const navigateToLogin = () => {
    navigation.navigate(AuthScreens.LOGIN_SCREEN);
  };

  return (
    <>
      <Text variant="heading-xs">{strings.auth.passwordRequestSentMessage}</Text>

      <MailSentSuccessIconSVG height={160} width={160} style={styles.mail} />

      <Box>
        <Button onPress={navigateToLogin} type={ButtonType.PRIMARY} marginBottom="s4">
          {strings.auth.backToStart}
        </Button>
        <Button onPress={sendEmail} type={ButtonType.OUTLINE} isLoading={isLoading} marginBottom="s8">
          {strings.auth.resendEmail}
        </Button>
      </Box>
    </>
  );
};

const styles = StyleSheet.create({
  mail: {
    alignSelf: 'center',
    height: 160,
    width: 160,
  },
});
