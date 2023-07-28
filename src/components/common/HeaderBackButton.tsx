import { HeaderBackButtonProps } from '@react-navigation/elements';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { NativeStackNavigationHelpers } from 'react-native-screens/lib/typescript/native-stack/types';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { Button, ButtonSize, ButtonType } from '@components/common/Button';
import { ProfileSettingsScreens } from '@routes/routes';

export const HEADER_BACK_BUTTON_WIDTH = theme.spacing.s8;
export const HEADER_BACK_BUTTON_MARGIN = theme.spacing.s3;

interface Props {
  navigation: NativeStackNavigationHelpers;
  backButtonProps: HeaderBackButtonProps;
}

export const HeaderBackButton: React.FC<Props> = (props) => {
  const { backButtonProps, navigation } = props;

  if (!backButtonProps?.canGoBack || !navigation) {
    return <></>;
  }

  const route = useRoute();

  return (
    <Button
      onPress={() => navigation.goBack()}
      type={ButtonType.OUTLINE}
      style={{
        marginHorizontal: HEADER_BACK_BUTTON_MARGIN,
        borderColor: route.name === ProfileSettingsScreens.DELETE_ACCOUNT ? theme.colors.white : theme.colors.gray600,
      }}
      size={ButtonSize.SM}
      leadingIcon={<KsIcon name={KS_ICON.ARROW_LEFT_2} color={theme.colors.defaultTextColor} size={16} />}
      width={HEADER_BACK_BUTTON_WIDTH}
    />
  );
};
