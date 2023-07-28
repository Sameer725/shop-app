import React, { useCallback, useMemo, useState } from 'react';

import { Button, ButtonType } from '../components/common/Button';
import { ModalPopUp } from '../components/common/ModalPopUp';
import { useAuthData, useLocalizedData } from '../contexts';

export const useAuthGuard = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const { loginStatus, dispatchUpdateLogin } = useAuthData();
  const { strings } = useLocalizedData();

  const closeShowLoginPopup = () => setShowLoginPopup(false);

  const authGuard = useCallback(
    <T extends () => ReturnType<T>>(callback: T) =>
      () => {
        if (loginStatus.isGuestUser) {
          setShowLoginPopup(true);
          return;
        }

        return callback();
      },
    [loginStatus.isGuestUser]
  );

  const navigateToLogin = () => {
    dispatchUpdateLogin({
      isLoggedIn: false,
      isGuestUser: false,
    });
  };

  const LoginPopUp = useCallback(
    () => (
      <ModalPopUp
        isVisible={showLoginPopup}
        header={strings.product.authModalHeader}
        text={strings.product.authModalText}
        onClose={closeShowLoginPopup}
      >
        <Button onPress={navigateToLogin} type={ButtonType.PRIMARY}>
          {strings.product.joinNow}
        </Button>

        <Button onPress={closeShowLoginPopup} type={ButtonType.PRIMARY_WHITE}>
          {strings.product.keepBrowsing}
        </Button>
      </ModalPopUp>
    ),
    [showLoginPopup]
  );

  return useMemo(() => ({ closeShowLoginPopup, LoginPopUp, authGuard }), [authGuard, LoginPopUp]);
};
