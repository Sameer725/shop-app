import CheckBox, { CheckBoxProps } from '@react-native-community/checkbox';
import React from 'react';
import { Control, Controller, FieldPath, RegisterOptions } from 'react-hook-form';
import { Platform, StyleSheet } from 'react-native';

import theme from '@assets/theme/theme';

export interface CheckboxProps<T> extends CheckBoxProps {
  control: Control<T>;
  name: FieldPath<T>;
  rules?: Omit<
    RegisterOptions,
    'min' | 'max' | 'maxLength' | 'minLength' | 'pattern' | 'validate' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >;
  isError?: boolean;
  isDisabled?: boolean;
}

export const Checkbox = <T,>(props: CheckboxProps<T>): JSX.Element => {
  const { control, isError, isDisabled, name, rules, ...rest } = props;

  const fillColor: string = isError ? theme.colors.error500 : theme.colors.primary500;

  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      render={({ field: { onChange, value } }) => (
        <CheckBox
          {...rest}
          style={[Platform.OS === 'android' ? styles.checkboxAndroid : styles.checkbox]}
          boxType="square"
          disabled={isDisabled ?? false}
          value={value !== null ? (value as boolean) : undefined}
          onValueChange={onChange}
          tintColor={fillColor}
          onFillColor={fillColor}
          onTintColor={fillColor}
          tintColors={{
            true: fillColor,
            false: isError ? theme.colors.error500 : undefined,
          }}
          onCheckColor={theme.colors.white}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: theme.spacing.s5,
    height: theme.spacing.s5,
  },
  checkboxAndroid: {
    transform: [{ scale: 1.2 }],
  },
});
