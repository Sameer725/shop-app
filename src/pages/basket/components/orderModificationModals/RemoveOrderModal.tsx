import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

import theme from '@assets/theme/theme';
import { Box, Button, ButtonType, ModalPopUp, Text } from '@components';
import { useLocalizedData } from '@contexts';

interface ModalParams {
  displayName: string;
  uri: string;
  onPress: () => void;
}

export const useRemoveOrderModal = (params: ModalParams) => {
  const { displayName, uri, onPress } = params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const hideModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);
  const { strings } = useLocalizedData();

  const RemoveOrderModal = useCallback(
    () => (
      <ModalPopUp
        isVisible={isModalVisible}
        isCloseIconVisible={false}
        header={strings.basket.productNotAvilableHeader}
        text={strings.basket.productNotAvilableText}
      >
        <Box flexDirection="row">
          <Box>
            <FastImage
              source={{
                uri,
              }}
              style={styles.img}
            />
            <Box
              borderRadius={theme.radii.md}
              height={theme.spacing.s8}
              width={100}
              justifyContent="center"
              alignItems="center"
              backgroundColor="gray100"
              style={{
                marginTop: -theme.spacing.s4,
              }}
            >
              <Text variant="text-xs" fontWeight="600" fontFamily="Inter-SemiBold">
                {strings.product.backSoon}
              </Text>
            </Box>
          </Box>

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

  return useMemo(() => ({ RemoveOrderModal, showModal }), [RemoveOrderModal, showModal]);
};

const styles = StyleSheet.create({
  img: {
    height: 100,
    width: 100,
  },
});
