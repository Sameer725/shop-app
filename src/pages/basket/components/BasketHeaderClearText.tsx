import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Modal, Portal } from 'react-native-paper';

import theme from '@assets/theme/theme';
import { Button, ButtonSize, ButtonType, Text } from '@components';
import { useLocalizedData, useOrderAction, useOrderLines } from '@contexts';
import { useToastNotification } from '@hooks';

export const BasketHeaderClearText = () => {
  const { strings } = useLocalizedData();
  const { showGeneralErrorToast } = useToastNotification();

  const [showModal, setShowModal] = useState(false);

  const openModal = useCallback(() => {
    setShowModal(true);
  }, []);
  const closeModal = useCallback(() => setShowModal(false), []);
  const [isLoading, setIsLoading] = useState(false);

  const { onRemoveItems } = useOrderAction();

  const { isEmpty } = useOrderLines();

  const removeAllOrderLine = async () => {
    try {
      setIsLoading(true);
      await onRemoveItems();
      setIsLoading(false);
    } catch {
      showGeneralErrorToast();
      setIsLoading(false);
    }
    closeModal();
  };

  const renderModal = () => {
    return (
      <Portal>
        <Modal visible={showModal} onDismiss={closeModal} contentContainerStyle={styles.container}>
          <Text variant="heading-sm" marginTop="s1" marginBottom="s8" textAlign="center">
            {strings.basket.emptyCartHeader}
          </Text>

          <Text variant="text-sm" marginBottom="s8" textAlign="center">
            {strings.basket.emptyCartText}
          </Text>

          <Button onPress={removeAllOrderLine} isLoading={isLoading}>
            {strings.basket.removeProducts}
          </Button>
          <Button marginTop="s4" onPress={closeModal} type={ButtonType.OUTLINE}>
            {strings.basket.keepProducts}
          </Button>
        </Modal>
      </Portal>
    );
  };

  return isEmpty ? null : (
    <>
      <Button onPress={openModal} size={ButtonSize.SM} type={ButtonType.GHOST}>
        {strings.basket.clearBasket}
      </Button>
      {renderModal()}
    </>
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
