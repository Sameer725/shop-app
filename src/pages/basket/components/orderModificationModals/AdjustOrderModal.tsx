import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

import { Box, Button, ButtonType, ModalPopUp, Text } from '@components';
import { useLocalizedData } from '@contexts';

interface ModalParams {
  displayName: string;
  stock: number;
  quantity: number;
  uri: string;
  onPress: () => void;
}

export const useAdjustOrderModal = (params: ModalParams) => {
  const { displayName, stock, quantity, uri, onPress } = params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const hideModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);
  const { strings } = useLocalizedData();

  const AdjustOrderModal = useCallback(
    () => (
      <ModalPopUp
        isVisible={isModalVisible}
        isCloseIconVisible={false}
        header={strings.basket.adjustOrderItemHeader}
        text={`Du hast vom folgenden Produkt ${quantity} im Warenkorb, es sind aber nur noch ${stock} verfügbar.`}
      >
        <Box flexDirection="row">
          <FastImage
            source={{
              uri,
            }}
            style={styles.img}
          />
          <Box flex={1} justifyContent="center" paddingLeft="s3">
            <Text lineBreakMode="tail" numberOfLines={2} variant="heading-xs">
              {displayName}
            </Text>
          </Box>
        </Box>

        <Button
          type={ButtonType.PRIMARY}
          onPress={() => {
            onPress();
            hideModal();
          }}
        >
          {strings.basket.updateNow}
        </Button>
      </ModalPopUp>
    ),
    [isModalVisible]
  );

  return useMemo(() => ({ AdjustOrderModal, showModal }), [AdjustOrderModal, showModal]);
};

const styles = StyleSheet.create({
  img: {
    height: 100,
    width: 100,
  },
});
