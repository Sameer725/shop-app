import React from 'react';
import { StyleSheet, View } from 'react-native';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { Divider } from '@components';

const styles = StyleSheet.create({
  lineContainer: { width: '100%', paddingHorizontal: theme.spacing.s3 },
});

const trailingIcon = (icon: KS_ICON) => <KsIcon name={icon} size={theme.spacing.s4} color={theme.colors.gray700} />;
export const ArrowIcon = trailingIcon(KS_ICON.ARROW_RIGHT_3);
export const ExternalLinkIcon = trailingIcon(KS_ICON.EXPORT_3);
export const Line = (
  <View style={styles.lineContainer}>
    <Divider color="gray100" />
  </View>
);
