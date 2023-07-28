import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { ToastType, useToast } from 'react-native-toast-notifications';
import { ToastOptions } from 'react-native-toast-notifications/lib/typescript/toast';

import theme from '@assets/theme/theme';
import { Box } from '../components/common/Box';
import { useLocalizedData } from '../contexts/LocalizationContext';

export const useToastNotification = () => {
  const { strings } = useLocalizedData();
  const toast: ToastType = useToast();
  const toastRef = useRef<string | undefined>();

  const onCLoseToast = () => {
    if (toastRef.current) {
      toastRef.current = undefined;
    }
  };

  const defaultOptions: ToastOptions = {
    placement: 'bottom',
    duration: 4000,
    animationType: 'slide-in',
    textStyle: styles.textStyle,
    onClose: onCLoseToast,
  };

  const showToast = (displayText: string | JSX.Element, options: ToastOptions) => {
    if (toastRef.current) {
      toast.update(toastRef.current, displayText, options);
      return;
    }

    const generatedToast = toast.show(displayText, options);
    toastRef.current = generatedToast;
  };

  const showGeneralErrorToast = (): void => {
    showErrorToast(strings.generalError);
  };

  const showErrorToast = (title: string): void => {
    showToast(title, { ...defaultOptions, type: 'danger' });
  };

  const showInfoToast = (title: string): void => {
    showToast(title, {
      ...defaultOptions,
      type: 'normal',
      normalColor: theme.colors.toastInfoColor,
    });
  };

  const showSuccessToast = (title: string, infoText?: string): void => {
    const displayText = infoText ? (
      <Box width={'100%'}>
        <Text style={styles.titleTextStyle}>{title}</Text>
        <Text style={styles.infoTextStyle}>{infoText}</Text>
      </Box>
    ) : (
      title
    );

    showToast(displayText, {
      ...defaultOptions,
      type: 'normal',
      normalColor: theme.colors.primary500,
    });
  };

  return { showGeneralErrorToast, showErrorToast, showInfoToast, showSuccessToast };
};

const styles = StyleSheet.create({
  textStyle: {
    ...theme.textVariants['text-md'],
    paddingHorizontal: theme.spacing.s2,
    flex: 1,
  },
  titleTextStyle: {
    ...theme.textVariants['heading-sm'],
    color: theme.colors.white,
    paddingHorizontal: theme.spacing.s2,
    flex: 1,
  },
  infoTextStyle: {
    ...theme.textVariants['text-sm'],
    color: theme.colors.white,
    paddingHorizontal: theme.spacing.s2,
    flex: 1,
  },
});
