import React from 'react';
import { Dimensions, Platform, Pressable, StyleSheet } from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import Modal from 'react-native-modal';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { Box } from './Box';
import { Text } from './Text';

interface ModalProps {
  isVisible: boolean;
  header?: string;
  text?: string;
  isCloseIconVisible?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

const deviceHeight = Platform.OS === 'ios' ? Dimensions.get('window').height : ExtraDimensions.getRealWindowHeight();

export const ModalPopUp: React.FC<ModalProps> = (props) => {
  const { isVisible, header, text, onClose, isCloseIconVisible = true, children } = props;

  return (
    <Modal
      isVisible={isVisible}
      onModalHide={onClose}
      onBackButtonPress={onClose}
      backdropOpacity={0.48}
      onBackdropPress={onClose}
      statusBarTranslucent
      deviceHeight={deviceHeight}
    >
      <Box style={styles.container}>
        {isCloseIconVisible ? (
          <Pressable style={styles.closeIconContainer} onPress={onClose}>
            <KsIcon name={KS_ICON.CLOSE} color={theme.colors.gray600} size={32} />
          </Pressable>
        ) : null}

        {header ? (
          <Text variant="heading-sm" marginTop="s1" marginBottom="s8" textAlign="center">
            {header}
          </Text>
        ) : null}
        {text ? (
          <Text variant="text-sm" marginBottom="s8" textAlign="center">
            {text}
          </Text>
        ) : null}

        <Box marginBottom="s3" style={styles.childContainer}>
          {(Array.isArray(children) ? children : [children]).map((child, index) => (
            <Box marginTop={index === 0 ? undefined : 's4'} key={index}>
              {child}
            </Box>
          ))}
        </Box>
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
  closeIconContainer: {
    alignSelf: 'flex-end',
  },
  childContainer: {
    maxHeight: deviceHeight - 200,
  },
});
