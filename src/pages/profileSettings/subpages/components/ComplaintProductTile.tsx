import { useActionSheet } from '@expo/react-native-action-sheet';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { BaseProductOrderButton, Box, Text } from '@components';
import { ProductTileImage, ProductTileType } from '@components/common/ProductTile/ProductTileImage';
import { useLocalizedData } from '@contexts';
import { ProductVariant } from '@types';
import { RequestOrderComplaintInput, RequestOrderComplaintItem } from '../ComplaintScreen';

interface BaseProductTileProps {
  item: ProductVariant;
  orderedQuantity: number;
  index: number;
  complaintData: RequestOrderComplaintItem;
  setComplaintData: Dispatch<SetStateAction<RequestOrderComplaintInput>>;
  setErrorPosition: Dispatch<SetStateAction<number>>;
}

export const ComplaintProductTile = (props: BaseProductTileProps) => {
  const { item, orderedQuantity, complaintData, setComplaintData, index, setErrorPosition } = props;

  const { strings } = useLocalizedData();
  const [initialPosition, setInitialPosition] = useState<number>();

  const setReason = (reason: string) => {
    setComplaintData((prevState) => {
      const prevArray = [...prevState.items];
      prevArray[index].reason = reason;
      prevArray[index].error = false;
      return { ...prevState, items: prevArray };
    });
  };

  const addQuantity = () => {
    if (complaintData.quantity < orderedQuantity) {
      setComplaintData((prevState) => {
        const prevArray = [...prevState.items];
        prevArray[index].quantity = prevArray[index].quantity + 1;
        return { ...prevState, items: prevArray };
      });
    }
  };

  const removeQuantity = () => {
    if (complaintData.quantity > 0) {
      setComplaintData((prevState) => {
        const prevArray = [...prevState.items];
        if (prevArray[index].quantity === 1) {
          prevArray[index].reason = '';
          prevArray[index].error = false;
        }
        prevArray[index].quantity = prevArray[index].quantity - 1;
        return { ...prevState, items: prevArray };
      });
    }
  };

  const productRef = useRef<View>(null);

  const setLayout = () => {
    if (productRef?.current && !initialPosition) {
      productRef?.current?.measure((x, y, width, height, pageX, pageY) => {
        setInitialPosition(pageY - height);
      });
    }
  };

  useEffect(() => {
    if (complaintData.error && initialPosition) {
      setErrorPosition(initialPosition);
    }
  }, [complaintData.error]);

  const { showActionSheetWithOptions } = useActionSheet();

  const actionSheetOptions = [
    strings.profileSettings.complain.reasonNotArrived,
    strings.profileSettings.complain.reasonWrongProduct,
    strings.profileSettings.complain.reasonQualityDefect,
    strings.cancel,
  ];

  const cancelButtonIndex = 3;

  const showActionSheet = () => {
    showActionSheetWithOptions(
      {
        options: actionSheetOptions,
        cancelButtonIndex,
        showSeparators: true,
      },
      handleActionSheetPress
    );
  };

  const handleActionSheetPress = (selectedIndex?: number) => {
    if (selectedIndex === 0 || (selectedIndex && selectedIndex < cancelButtonIndex)) {
      setReason(actionSheetOptions[selectedIndex]);
    }
  };

  return (
    <Box ref={productRef} onLayout={setLayout}>
      <Box flex={1} flexDirection="row" alignItems="center">
        <ProductTileImage
          facetValues={item?.product?.facetValues}
          discount={item?.discountPercentage ?? 0}
          preview={
            item?.featuredAsset?.preview || item?.product?.featuredAsset?.preview
              ? `${String(item?.featuredAsset?.preview ?? item?.product?.featuredAsset?.preview)}?preset=small`
              : undefined
          }
          type={ProductTileType.HORIZONTAL}
        />
        <Text variant="text-md-sb" textAlign="right" style={{ minWidth: theme.spacing.s8 }}>
          {orderedQuantity}x
        </Text>
        <Box marginHorizontal="s4" flex={1}>
          <Text
            numberOfLines={3}
            textBreakStrategy="balanced"
            lineBreakMode="tail"
            variant="text-2xs-sb"
            lineHeight={11}
            marginBottom="s1"
          >
            {item?.displayName}
          </Text>
        </Box>

        <BaseProductOrderButton
          onRemove={removeQuantity}
          onAdd={addQuantity}
          count={complaintData.quantity}
          maxWidth={90}
          isWidthPercentage={false}
          deleteIconName={KS_ICON.MINUS}
        />
      </Box>
      {complaintData.quantity ? (
        <Pressable onPress={showActionSheet} renderToHardwareTextureAndroid>
          <Box
            alignItems="center"
            justifyContent="space-between"
            flexDirection="row"
            padding="s2"
            borderWidth={theme.borderWidth.b1}
            borderColor={complaintData.error ? 'error500' : 'gray500'}
            borderRadius={theme.radii.lg}
          >
            <Text style={styles.text} variant="text-sm" lineBreakMode="middle" textBreakStrategy="balanced">
              {complaintData.reason === '' ? strings.profileSettings.complain.selectReason : complaintData.reason}
            </Text>
            <KsIcon name={KS_ICON.ARROW_DOWN_1} size={theme.spacing.s4} color={theme.colors.gray700} />
          </Box>
        </Pressable>
      ) : null}
    </Box>
  );
};

const styles = StyleSheet.create({
  text: {
    flex: 1,
    flexWrap: 'wrap',
  },
});
