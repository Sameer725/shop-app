import React from 'react';
import { ScrollView, StatusBar } from 'react-native';

import theme from '@assets/theme/theme';
import { Box } from '@components';
import { useAuthData } from '@contexts';
import { HelpTile } from './components/HelpTile';
import { LegalTile } from './components/LegalTile';
import { OrderSlider } from './components/OrderSlider';
import { SettingsFooter } from './components/SettingsFooter';
import { SettingsTile } from './components/SettingsTile';
import { WalletTotal } from './components/WalletTotal';

export const ProfileSettingsScreen: React.FC = () => {
  const { loginStatus } = useAuthData();

  return (
    <>
      <StatusBar backgroundColor={theme.colors.white} barStyle="dark-content" animated={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {loginStatus.isGuestUser ? null : (
          <>
            <OrderSlider />
            <WalletTotal />
          </>
        )}

        <Box marginHorizontal="s3" marginVertical="s5">
          {loginStatus.isGuestUser ? null : <SettingsTile />}

          <HelpTile />

          <LegalTile />

          <SettingsFooter />
        </Box>
      </ScrollView>
    </>
  );
};
