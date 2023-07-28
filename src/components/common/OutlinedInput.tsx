import React, { RefObject, useState } from 'react';
import { Control, Controller, FieldPath, RegisterOptions } from 'react-hook-form';
import { StyleProp, StyleSheet, TextInput as NativeTextInput, ViewStyle } from 'react-native';
import { TextInput } from 'react-native-paper';
import { TextInputProps } from 'react-native-paper/lib/typescript/components/TextInput/TextInput';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { Box } from './Box';
import { Text } from './Text';

export interface InputProps<T>
  extends Omit<TextInputProps, 'theme' | 'secureTextEntry' | 'activeOutlineColor' | 'error'> {
  control: Control<T>;
  name: FieldPath<T>;
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
  error: string | null;
  isPassword?: boolean;
  isEmail?: boolean;
  style?: StyleProp<ViewStyle>;
  inputRef?: OutlineInputRef;
}

export type OutlineInputRef = RefObject<NativeTextInput>;

export const OutlinedInput = <T,>(props: InputProps<T>): JSX.Element => {
  const {
    control,
    error,
    inputRef,
    isEmail,
    isPassword,
    name,
    rules,
    onBlur: customOnBlur,
    ...rest
  }: InputProps<T> = props;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box style={rest.style}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            autoCapitalize="none"
            keyboardType={isEmail ? 'email-address' : undefined}
            autoComplete={isEmail ? 'email' : undefined}
            autoCorrect={isEmail ? false : undefined}
            spellCheck={isEmail ? false : undefined}
            {...rest}
            theme={{ roundness: theme.radii.md }}
            selectionColor={theme.colors.defaultTextColor}
            ref={inputRef}
            mode="outlined"
            style={styles.textInput}
            activeOutlineColor={theme.colors.primary500}
            outlineColor={theme.colors.gray500}
            placeholderTextColor={theme.colors.textColorPlaceholder}
            value={String(value)}
            error={!!error}
            secureTextEntry={isPassword && !showPassword}
            onBlur={() => {
              onBlur();
              customOnBlur?.(value);
            }}
            onChangeText={onChange}
          />
        )}
      />
      {isPassword ? (
        <Box style={styles.iconContainer}>
          <KsIcon
            name={showPassword ? KS_ICON.EYE : KS_ICON.EYE_SLASH}
            color={theme.colors.defaultTextColor}
            size={25}
            onPress={() => {
              setShowPassword(!showPassword);
            }}
          />
        </Box>
      ) : null}
      {error ? (
        <Box paddingHorizontal="s3" paddingTop="s1" paddingLeft="s1">
          <Text variant="text-xs" style={styles.errorText}>
            {error}
          </Text>
        </Box>
      ) : null}
    </Box>
  );
};

const styles = StyleSheet.create({
  textInput: {
    ...theme.textVariants['text-sm'],
    height: 46,
    backgroundColor: theme.colors.white,
  },
  iconContainer: {
    position: 'absolute',
    right: theme.spacing.s3,
    top: theme.spacing.s5,
  },
  errorText: { color: theme.colors.error500 },
});
