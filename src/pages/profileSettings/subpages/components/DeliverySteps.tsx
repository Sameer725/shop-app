import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { Box, Divider, Text } from '@components';
import { useLocalizedData } from '@contexts';
import { OrderState } from '@types';

interface Props {
  status?: string;
}

export const DeliverySteps: React.FC<Props> = (props) => {
  const { status } = props;

  const { strings } = useLocalizedData();

  const [stepsActive, setStepsActive] = useState<1 | 2 | 3 | undefined>(1);

  useEffect(() => {
    switch (status) {
      case OrderState.ARRANGING_PAYMENT:
      case OrderState.ARRANGING_ADDITIONAL_PAYMENT:
      case OrderState.PAYMENT_AUTHORIZED:
      case OrderState.PAYMENT_SETTLED:
        setStepsActive(1);
        break;
      case OrderState.PARTIALLY_SHIPPED:
      case OrderState.SHIPPED:
      case OrderState.PARTIALLY_DELIVERED:
        setStepsActive(2);
        break;
      case OrderState.DELIVERED:
        setStepsActive(3);
        break;
      case OrderState.CANCELLED:
        setStepsActive(undefined);
        break;
      default:
        setStepsActive(1);
        break;
    }
  }, [status]);

  const Bubble = ({ active, label }: { active: boolean; label: string }) => (
    <Box style={[styles.step, active ? styles.stepActive : null]}>
      {active ? <KsIcon name={KS_ICON.TICK} size={theme.spacing.s5} color={theme.colors.white} /> : null}

      <Text
        variant="text-xs-sb"
        style={[
          styles.stepLabel,
          {
            color: active ? theme.colors.defaultTextColor : theme.colors.textColorPlaceholder,
          },
        ]}
      >
        {label}
      </Text>
    </Box>
  );

  const CanceledBubble = () => (
    <Box style={[styles.step, { backgroundColor: theme.colors.error500 }]}>
      <KsIcon name={KS_ICON.CLOSE} size={theme.spacing.s5} color={theme.colors.white} />

      <Text variant="text-xs-sb" style={[styles.stepLabel, styles.stepLabelCancelled]}>
        {strings.profileSettings.order.orderState.cancelled}
      </Text>
    </Box>
  );

  return (
    <Box
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      marginTop="s5"
      paddingBottom="s8"
      overflow="hidden"
    >
      {stepsActive === undefined ? (
        <>
          <Divider thickness={theme.borderWidth.b3} color="gray300" width="50%" />
          {CanceledBubble()}
          <Divider thickness={theme.borderWidth.b3} color="gray300" width="50%" />
        </>
      ) : (
        <>
          {Bubble({
            active: stepsActive >= 1,
            label: strings.profileSettings.order.orderState.confirmed,
          })}
          <Divider thickness={theme.borderWidth.b3} color="gray300" width={theme.spacing.s12 * 2} />
          {Bubble({
            active: stepsActive >= 2,
            label: strings.profileSettings.order.orderState.shipped,
          })}
          <Divider thickness={theme.borderWidth.b3} color="gray300" width={theme.spacing.s12 * 2} />
          {Bubble({
            active: stepsActive >= 3,
            label: strings.profileSettings.order.orderState.delivered,
          })}
        </>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  step: {
    // Adjust vertical alignment of the icon on Android.
    // We do not apply this to iOS, as it would decenter the icon.
    ...Platform.select({
      android: {
        justifyContent: 'center',
      },
    }),
    height: theme.spacing.s5,
    width: theme.spacing.s5,
    borderRadius: theme.spacing.s5 * 0.5,
    marginHorizontal: theme.spacing.px * 2,
    backgroundColor: theme.colors.gray300,
  },
  stepActive: {
    backgroundColor: theme.colors.primary500,
  },
  stepLabel: {
    position: 'absolute',
    left: '50%',
    top: theme.spacing.s8,
    width: 200,
    textAlign: 'center',
    transform: [{ translateX: -100 }],
  },
  stepLabelCancelled: {
    color: theme.colors.error500,
  },
});
