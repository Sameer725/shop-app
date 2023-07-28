import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable } from 'react-native';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { Box } from './Box';
import { Text } from './Text';

interface BottomSheetHeaderProps {
  title: string;
}

export const BottomSheetHeader: React.FC<BottomSheetHeaderProps> = (props: BottomSheetHeaderProps) => {
  const { title } = props;
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();

  return (
    <>
      <Box
        marginBottom="s4"
        marginHorizontal="s2"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text variant="heading-lg">{title}</Text>
        <Pressable onPress={goBack}>
          <Box
            height={theme.spacing.s8}
            width={theme.spacing.s8}
            borderRadius={theme.radii['3xl']}
            backgroundColor="gray100"
            alignItems="center"
            justifyContent="center"
          >
            <KsIcon name={KS_ICON.CLOSE} size={theme.spacing.s5} color={theme.colors.gray700} />
          </Box>
        </Pressable>
      </Box>
      <Box height={theme.spacing.px} borderRadius={theme.radii.lg} backgroundColor="gray300" />
    </>
  );
};
