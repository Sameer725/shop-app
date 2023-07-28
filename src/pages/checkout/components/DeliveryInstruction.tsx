import React, { useRef } from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';

import theme from '@assets/theme/theme';
import { Box, Checkbox, Text } from '@components';
import { useLocalizedData } from '@contexts';
import { CustomFieldInterface, FormValue } from '../formHelper';
import { CheckoutCard } from './CheckoutCard';
import { DeliveryDate } from './DeliveryDate';

interface DeliveryInstructionProps extends FormValue {
  onChangeCustomField: (variables: CustomFieldInterface) => void;
  scrollToPosition: (y: number) => void;
}
export const DeliveryInstruction = (props: DeliveryInstructionProps) => {
  const { formValue, onChangeCustomField, scrollToPosition } = props;
  const {
    strings: { checkout },
  } = useLocalizedData();

  const { control, getValues, setValue } = formValue;

  const notesRef = useRef<View>(null);
  const scrollOnFocus = () =>
    notesRef?.current?.measure((x, y, width, height, pageX, pageY) => scrollToPosition(pageY));

  const updateDoNotRing = () => {
    const newValue = !getValues().doNotRing;

    const updateValues: CustomFieldInterface = { doNotRing: newValue };
    if (newValue) {
      updateValues.canDropOrder = true;
      setValue('canDropOrder', true);
    }

    void onChangeCustomField(updateValues);
  };

  return (
    <CheckoutCard title={checkout.deliveryInstruction.name}>
      <DeliveryDate />
      <Box paddingRight="s4">
        <Box flexDirection="row" marginBottom="s6" justifyContent="space-between" alignItems="center">
          <Text variant="text-sm">{checkout.deliveryInstruction.doNotRing}</Text>
          <Checkbox
            control={control}
            rules={{
              required: false,
            }}
            name="doNotRing"
            onChange={updateDoNotRing}
          />
        </Box>

        <Box flexDirection="row" marginBottom="s6" justifyContent="space-between" alignItems="center">
          <Text variant="text-sm">{checkout.deliveryInstruction.canDropOrder}</Text>
          <Checkbox
            control={control}
            rules={{
              required: false,
            }}
            name="canDropOrder"
            onChange={() => {
              void onChangeCustomField({ canDropOrder: !getValues().canDropOrder });
            }}
          />
        </Box>
      </Box>

      <View ref={notesRef} renderToHardwareTextureAndroid>
        <Controller
          name="notes"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onFocus={scrollOnFocus}
              style={styles.textInput}
              placeholder={checkout.deliveryInstruction.notesPlaceholder}
              value={String(value)}
              onChangeText={onChange}
              mode="outlined"
              multiline={true}
              numberOfLines={3}
              outlineColor={theme.colors.gray100}
              returnKeyType="done"
              blurOnSubmit={true}
              onBlur={() => {
                onBlur();
                void onChangeCustomField({ notes: getValues().notes });
              }}
            />
          )}
        />
      </View>
    </CheckoutCard>
  );
};

const styles = StyleSheet.create({
  textInput: {
    ...theme.textVariants['text-md'],
    backgroundColor: theme.colors.gray050,
  },
});
