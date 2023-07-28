import React, { useLayoutEffect, useMemo } from 'react';
import { Pressable, TextStyle, ViewStyle } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { ProductStockStatus } from '@constants';
import { useGlobalSettings, useLocalizedData } from '@contexts';
import { ProductVariant } from '@types';
import { formatPrice } from '@utils';
import { Box } from '../Box';
import { Button, ButtonSize, ButtonType } from '../Button';
import { Text } from '../Text';
import { useProductOrderHandler } from './ProductOrderHandler';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: true,
};

export interface ProductOrderButtonProps {
  item?: ProductVariant;
  maxWidth?: number;
  isWidthPercentage?: boolean;
  disabledWidth?: number | string;
  height?: number;
  type?: ProductOrderButtonType;
  count?: number;
}

export enum ProductOrderButtonType {
  SMALL = 'SMALL',
  LARGE = 'LARGE',
  MEDIUM = 'MEDIUM',
}

const BASE_SIZE = theme.spacing.s10;
const DEFAULT_SIZE_LONG = 90;

// #region AnimatedBaseButton
const AnimatedBox = Animated.createAnimatedComponent(Box);
const AnimatedIcon = Animated.createAnimatedComponent(KsIcon);

const triggerHaptic = () => {
  return ReactNativeHapticFeedback.trigger('soft', options);
};

const useButtonAnimatedStyles = (initialValue: number = 0, maxWidth: number, isPercentage?: boolean) => {
  const animatedValue = useSharedValue(initialValue);

  const inputRange = [0, 1];

  // Animated styles for button container, width, backgroundColor, borderColor and the borderWidth
  // To animate transition of button if product is added to basket
  const containerStyle = useAnimatedStyle(() => {
    const clamp = Extrapolate.CLAMP;
    const widthOutputRange = [BASE_SIZE, maxWidth];
    const colorOutputRange = [theme.colors.white, theme.colors.primary500];
    const borderWidthOutputRange = [theme.borderWidth.b1, 0];
    const borderColorOutputRange = [theme.colors.primary500, 'transparent'];

    const width = interpolate(animatedValue.value, inputRange, widthOutputRange, clamp);
    return {
      width: isPercentage && animatedValue.value ? `${width}%` : width,
      backgroundColor: interpolateColor(animatedValue.value, inputRange, colorOutputRange, 'RGB'),
      borderColor: interpolateColor(animatedValue.value, inputRange, borderColorOutputRange, 'RGB'),
      borderWidth: interpolate(animatedValue.value, inputRange, borderWidthOutputRange, clamp),
    };
  }, []);

  const delayedStyle = useAnimatedStyle(() => {
    return {
      display: animatedValue.value > 0 ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: animatedValue.value,
    };
  }, []);

  const iconStyle = useAnimatedStyle(() => {
    const colorOutputRange = [theme.colors.primary500, theme.colors.white];
    return {
      color: interpolateColor(animatedValue.value, [0, 1], colorOutputRange, 'RGB'),
    };
  }, []);

  return useMemo(() => ({ animatedValue, containerStyle, iconStyle, delayedStyle }), []);
};

interface AnimatedButtonProps {
  onPress?: () => void;
  iconName: string | KS_ICON;
  iconStyle: ViewStyle | TextStyle;
  style?: ViewStyle;
}

const BaseAnimatedButton = (props: AnimatedButtonProps) => {
  const { onPress, iconStyle, iconName, style } = props;

  const onButtonPress = () => {
    onPress?.();
    triggerHaptic();
  };

  return (
    <Pressable onPress={onButtonPress} hitSlop={20}>
      <AnimatedBox style={style} width={BASE_SIZE} alignItems="center" justifyContent="center">
        <AnimatedIcon name={iconName} style={[iconStyle]} size={theme.spacing.s5} />
      </AnimatedBox>
    </Pressable>
  );
};
// #endregion AnimatedBaseButton

// #region DisableButton
const DisabledButton = (props: ProductOrderButtonProps) => {
  const { maxWidth, disabledWidth, height, item } = props;
  const { strings } = useLocalizedData();

  return (
    <Box
      borderRadius={theme.radii.md}
      height={height ?? BASE_SIZE}
      width={disabledWidth ?? maxWidth}
      justifyContent="center"
      alignItems="center"
      backgroundColor="gray100"
    >
      <Text variant={height && height > BASE_SIZE ? 'text-lg' : 'text-xs'} fontWeight="600" fontFamily="Inter-SemiBold">
        {item?.product?.customFields?.isFreshProduct ? strings.product.backTomorrow : strings.product.backSoon}
      </Text>
    </Box>
  );
};
// #endregion DisableButton

// #region ProductOrderButton
interface ButtonProps {
  count: number;
  maxWidth: number;
  height?: number;
  isWidthPercentage?: boolean;
  onRemove: () => void;
  onAdd: () => void;
  deleteIconName?: string | KS_ICON;
}

export const BaseProductOrderButton = (props: ButtonProps) => {
  const { count, maxWidth, height, onAdd, onRemove, isWidthPercentage, deleteIconName = KS_ICON.TRASH } = props;

  const { animatedValue, containerStyle, iconStyle, delayedStyle } = useButtonAnimatedStyles(
    count,
    maxWidth,
    isWidthPercentage
  );

  useLayoutEffect(() => {
    animatedValue.value = withTiming(count > 0 ? 1 : 0);
  }, [count]);

  return (
    <AnimatedBox
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      overflow="hidden"
      height={height ?? BASE_SIZE}
      borderRadius={theme.radii.md}
      style={containerStyle as ViewStyle}
    >
      <BaseAnimatedButton
        iconStyle={iconStyle as ViewStyle | TextStyle}
        style={delayedStyle}
        iconName={count === 1 ? deleteIconName : KS_ICON.MINUS}
        onPress={onRemove}
      />
      <AnimatedBox style={delayedStyle}>
        <Text color="white" variant="heading-2xs">
          {count}
        </Text>
      </AnimatedBox>
      <BaseAnimatedButton iconStyle={iconStyle as ViewStyle | TextStyle} iconName={KS_ICON.ADD} onPress={onAdd} />
    </AnimatedBox>
  );
};

const MediumProductOrderButton = (props: ButtonProps & { price: number }) => {
  const { onAdd, count, price, height } = props;

  return count === 0 ? (
    <Button onPress={onAdd} type={ButtonType.PRIMARY} width={90} size={ButtonSize.MD}>
      {formatPrice(price) ?? ''}
    </Button>
  ) : (
    <BaseProductOrderButton {...props} height={height ?? theme.spacing.s10} />
  );
};

const LargeProductOrderButton = (props: ButtonProps) => {
  const { onAdd, count, height } = props;
  const { strings } = useLocalizedData();

  return count === 0 ? (
    <Button
      onPress={onAdd}
      leadingIcon={<KsIcon name={KS_ICON.BAG_2} color={theme.colors.white} size={18} />}
      type={ButtonType.PRIMARY}
    >
      {strings.product.inTheBag}
    </Button>
  ) : (
    <Box
      flex={1}
      flexDirection="row"
      borderRadius={theme.radii.md}
      backgroundColor="gray200"
      height={height ?? theme.spacing.s12}
      alignItems="center"
    >
      <Box flex={1} justifyContent="center" marginLeft="s5">
        <Text variant="text-md" fontWeight="600" fontFamily="Inter-SemiBold">
          {strings.product.alreadyInTheBag}
        </Text>
      </Box>
      <Box>
        <BaseProductOrderButton {...props} maxWidth={150} height={height ?? theme.spacing.s12} />
      </Box>
    </Box>
  );
};

const OrderButton = (props: ProductOrderButtonProps) => {
  const {
    item,
    maxWidth = DEFAULT_SIZE_LONG,
    disabledWidth,
    type = ProductOrderButtonType.SMALL,
    height,
    isWidthPercentage,
    count,
  } = props;

  if (!item) {
    return null;
  }

  const { onAddPress, onRemovePress } = useProductOrderHandler(item);
  const { isFreshProductStockRelevant } = useGlobalSettings();

  // Display disabled button if is no freshProduct and Out Of Stock
  // Or if isFreshProduct and the product stock should be used/ considered
  const isFreshProduct = item?.product?.customFields?.isFreshProduct;

  if (
    (isFreshProduct && isFreshProductStockRelevant) || !isFreshProduct
      ? item?.stockLevel === ProductStockStatus.OUT_OF_STOCK
      : false
  ) {
    return <DisabledButton maxWidth={maxWidth} disabledWidth={disabledWidth} height={height} item={item} />;
  }

  let UsedButton;
  switch (type) {
    case ProductOrderButtonType.SMALL:
    default:
      UsedButton = BaseProductOrderButton;
      break;
    case ProductOrderButtonType.MEDIUM:
      UsedButton = MediumProductOrderButton;
      break;
    case ProductOrderButtonType.LARGE:
      UsedButton = LargeProductOrderButton;
      break;
  }

  return (
    <>
      <UsedButton
        count={count ?? 0}
        maxWidth={maxWidth}
        isWidthPercentage={isWidthPercentage}
        height={height}
        onAdd={() => void onAddPress()}
        onRemove={() => void onRemovePress()}
        price={item.priceWithTax ?? 0}
      />
    </>
  );
};
// #endregion ProductOrderButton

export const ProductOrderButton = React.memo(OrderButton, (prevProps, nextProps) => {
  if (
    prevProps.count !== nextProps.count ||
    nextProps.item?.product?.customFields?.isFreshProduct ||
    prevProps.item?.stockLevel !== nextProps.item?.stockLevel
  ) {
    return false;
  }

  return true;
});
