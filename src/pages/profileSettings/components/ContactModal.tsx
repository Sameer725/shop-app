import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { Box, Button, ButtonType, Text } from '@components';
import { SUPPORT_EMAIL, SUPPORT_PHONE } from '@constants/contact';
import { useLocalizedData } from '@contexts';
import { openUrlInBrowser } from '@utils';

interface ContactModalProps {
  isVisible: boolean;
  onClose: () => void;
  openComplaintModal: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = (props) => {
  const { isVisible, onClose = () => null, openComplaintModal } = props;
  const { strings } = useLocalizedData();

  const [isComplainSelected, setIsComplainSelected] = useState(false);

  const openEmailLink = async () => {
    try {
      await openUrlInBrowser(`mailto:${SUPPORT_EMAIL}`);
    } catch {}
  };

  const openPhoneLink = async () => {
    const phoneNumberWithoutSpaces = SUPPORT_PHONE.replace(/\s/g, '');

    try {
      await openUrlInBrowser(`tel:${phoneNumberWithoutSpaces}`);
    } catch {}
  };

  const onModalHide = () => {
    if (isComplainSelected) {
      openComplaintModal();
    }
    setIsComplainSelected(false);
  };

  const openOrderComplaint = () => {
    setIsComplainSelected(true);
    onClose();
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} statusBarTranslucent onModalHide={onModalHide}>
      <Box style={styles.container}>
        <Text variant="heading-sm" marginBottom="s8" textAlign="center">
          {strings.profileSettings.help.contact}
        </Text>

        <Button
          leadingIcon={<KsIcon name={KS_ICON.TRUCK_FAST} color={theme.colors.white} size={theme.spacing.s5} />}
          onPress={openOrderComplaint}
        >
          {strings.profileSettings.complain.complain}
        </Button>

        <Text variant="text-xs" marginTop="s2" marginBottom="s8" style={{ fontWeight: '500' }}>
          {strings.profileSettings.complain.complainContactInfo}
        </Text>

        <Button
          leadingIcon={<KsIcon name={KS_ICON.SMS} color={theme.colors.white} size={theme.spacing.s5} />}
          onPress={openEmailLink}
        >
          {SUPPORT_EMAIL}
        </Button>

        <Text variant="text-xs" marginTop="s2" marginBottom="s8" style={{ fontWeight: '500' }}>
          {strings.profileSettings.help.emailResponseTime}
        </Text>

        <Button
          leadingIcon={<KsIcon name={KS_ICON.CALL} color={theme.colors.white} size={theme.spacing.s5} />}
          onPress={openPhoneLink}
        >
          {SUPPORT_PHONE}
        </Button>

        <Text variant="text-xs" marginTop="s2" marginBottom="s8" style={{ fontWeight: '500' }}>
          {strings.profileSettings.help.freeOfCharge}
          {'\n'}
          {strings.profileSettings.help.supportHours}
        </Text>

        <Button onPress={onClose} type={ButtonType.OUTLINE}>
          {strings.cancel}
        </Button>
      </Box>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
    borderRadius: theme.radii.xl,
    padding: theme.spacing.s4,
    width: '90%',
  },
});
