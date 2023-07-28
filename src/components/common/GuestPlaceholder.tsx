import React from 'react';

import { KS_ICON } from '@assets/icons';
import { useAuthData, useLocalizedData } from '@contexts';
import { Button, ButtonType } from './Button';
import { PlaceHolder } from './PlaceHolder';

export const GuestPlaceholder = () => {
  const { dispatchUpdateLogin } = useAuthData();
  const { strings } = useLocalizedData();

  const navigateToLogin = () =>
    dispatchUpdateLogin({
      isLoggedIn: false,
      isGuestUser: false,
    });

  return (
    <PlaceHolder name={KS_ICON.GUEST_LOGIN} title={strings.guestUserHeader} content={[strings.guestUserSubHeader]}>
      <Button onPress={navigateToLogin} type={ButtonType.PRIMARY}>
        {strings.registerNow}
      </Button>
    </PlaceHolder>
  );
};
