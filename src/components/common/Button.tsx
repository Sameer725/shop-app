import {
  BaseTheme,
  composeRestyleFunctions,
  layout,
  LayoutProps,
  spacing,
  SpacingProps,
  useRestyle,
} from '@shopify/restyle';
import { ResponsiveValue } from '@shopify/restyle/dist/types';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, PressableProps, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import theme, { Theme } from '@assets/theme/theme';
import { Box } from './Box';
import { Text } from './Text';

export enum ButtonType {
  PRIMARY = 'primary',
  PRIMARY_ERROR = 'primaryError',
  PRIMARY_WHITE = 'primaryWhite',
  OUTLINE = 'outline',
  GHOST = 'ghost',
  GHOST_INVERTED = 'ghostInverted',
}

export enum ButtonSize {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

type AlignContent = 'flex-start' | 'center' | 'flex-end';
type Align = 'left' | 'center' | 'right';

const alignMap = new Map<Align | undefined, AlignContent>([
  ['left', 'flex-start'],
  ['center', 'center'],
  ['right', 'flex-end'],
]);

interface Props extends PressableProps, SpacingProps<Theme>, LayoutProps<Theme> {
  onPress: () => void;
  type?: ButtonType;
  children?: string | React.ReactNode;
  width?: string | number;
  flexibleWidth?: boolean;
  align?: Align;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  size?: ButtonSize;
  isLoading?: boolean;
  style?: Omit<
    ViewStyle,
    | 'alignSelf'
    | 'alignItems'
    | 'borderRadius'
    | 'flexDirection'
    | 'paddingHorizontal'
    | 'height'
    | 'backgroundColor'
    | 'borderWidth'
  >;
  textColor?: ResponsiveValue<keyof Theme['colors'], Theme> | undefined;
  disabled?: boolean;
  numberOfLines?: number;
}

type RestyleProps = SpacingProps<Theme> &
  LayoutProps<Theme> & {
    style?: StyleProp<ViewStyle>;
  };
const restyleFunctions = composeRestyleFunctions<BaseTheme, RestyleProps>([layout, spacing]);

export const Button: React.FC<Props> = (props) => {
  const {
    onPress,
    children,
    width,
    flexibleWidth,
    align,
    leadingIcon,
    trailingIcon,
    isLoading,
    style = {},
    textColor: overwritingTextColor,
    disabled = false,
    numberOfLines,
    ...rest
  } = props;
  const type: ButtonType = props.type ?? ButtonType.PRIMARY;
  const size: ButtonSize = props.size ?? ButtonSize.LG;
  const buttonWidth: string | number = width ?? '100%';
  const themeProps = useRestyle(restyleFunctions, rest as RestyleProps);

  const alignContent: AlignContent = alignMap.get(align) ?? 'center';
  const isIconOnly = (leadingIcon || trailingIcon) && !children;

  const [buttonSizeStyle, setButtonSizeStyle] = useState<ViewStyle>({});
  const [textVariant, setTextVariant] = useState<'text-xs-sb' | `text-${ButtonSize}` | undefined>(undefined);
  const [textColor, setTextColor] = useState<'white' | 'defaultTextColor'>('defaultTextColor');
  const [buttonTypeStyle, setButtonTypeStyle] = useState<ViewStyle>({});

  useEffect(() => {
    setButtonSizeStyle(styles[size] ?? {});
    setTextVariant(getTextVariant());
  }, [size]);

  useEffect(() => {
    setTextColor(getTextColor());
    setButtonTypeStyle(styles[type] ?? {});
  }, [type]);

  const getTextVariant = () => {
    switch (size) {
      case ButtonSize.XS:
        return 'text-xs-sb';
      case ButtonSize.SM:
      case ButtonSize.MD:
      case ButtonSize.LG:
        return `text-${size}` as `text-${ButtonSize}`;
    }
  };

  const getTextColor = () => {
    switch (type) {
      case ButtonType.PRIMARY:
      case ButtonType.PRIMARY_ERROR:
      case ButtonType.GHOST_INVERTED:
        return 'white';
      default:
      case ButtonType.GHOST:
      case ButtonType.PRIMARY_WHITE:
      case ButtonType.OUTLINE:
        return 'defaultTextColor';
    }
  };

  const buttonStyle = ({ pressed }: { pressed: boolean }) => [
    {
      opacity: pressed || disabled ? 0.5 : 1,
      width: flexibleWidth ? undefined : buttonWidth,
      justifyContent: alignContent,
    },
    buttonSizeStyle,
    buttonTypeStyle,
    styles.container,
    style,
    isIconOnly ? styles.noPadding : null,
  ];

  return (
    <Box {...themeProps}>
      <Pressable onPress={onPress} disabled={(disabled ?? false) || isLoading} style={buttonStyle}>
        {isLoading ? (
          <ActivityIndicator color={textColor} />
        ) : (
          <>
            {leadingIcon ? <Box marginRight={children ? 's3' : undefined}>{leadingIcon}</Box> : null}
            <Text
              variant={textVariant}
              textAlign={align}
              fontWeight="600"
              fontFamily="Inter-SemiBold"
              color={overwritingTextColor ?? textColor}
              lineBreakMode="tail"
              numberOfLines={numberOfLines ?? undefined}
            >
              {children}
            </Text>
            {trailingIcon ? <Box marginLeft="s3">{trailingIcon}</Box> : null}
          </>
        )}
      </Pressable>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: theme.radii.md,
    flexDirection: 'row',
  },

  // Sizes
  lg: {
    paddingHorizontal: theme.spacing.s4,
    height: theme.spacing.s12,
  },
  md: {
    paddingHorizontal: theme.spacing.s4,
    height: theme.spacing.s10,
  },
  sm: {
    paddingHorizontal: theme.spacing.s3,
    height: theme.spacing.s8,
  },
  xs: {
    paddingHorizontal: theme.spacing.s2,
    height: theme.spacing.s6,
  },

  noPadding: {
    paddingHorizontal: 0,
  },

  // Types
  primary: {
    backgroundColor: theme.colors.primary500,
  },
  primaryError: {
    backgroundColor: theme.colors.error500,
  },
  primaryWhite: {
    backgroundColor: theme.colors.background,
    borderWidth: theme.borderWidth.b1,
    borderColor: theme.colors.gray200,
  },
  outline: {
    borderWidth: theme.borderWidth.b1,
    borderColor: theme.colors.gray200,
  },
  ghost: {},
  ghostInverted: {},
});
