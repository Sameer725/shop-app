import React from 'react';

import { GuestPlaceholder, ScreenWrapper } from '@components';
import { useAuthData } from '@contexts';
import { Favorites } from './components/Favorites';

export const FavoritesScreen: React.FC = () => {
  const { loginStatus } = useAuthData();

  return (
    <>
      {loginStatus.isGuestUser ? (
        <ScreenWrapper>
          <GuestPlaceholder />
        </ScreenWrapper>
      ) : (
        <Favorites />
      )}
    </>
  );
};
