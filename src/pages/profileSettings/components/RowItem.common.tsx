import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import theme from '@assets/theme/theme';
import { Text } from '@components';

interface Props {
  label: string;
  icon?: React.ReactNode;
  onPress?: () => unknown;
}

export const RowItem: React.FC<Props> = (props) => {
  const { icon, label, onPress } = props;

  return (
    <Pressable style={styles.item} onPress={onPress}>
      <Text variant="heading-xs">{label}</Text>
      {icon}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: theme.spacing.s12,
    paddingHorizontal: theme.spacing.s5,
  },
});
