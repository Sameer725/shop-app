import React, { useCallback, useMemo, useState } from 'react';

import { Button, ButtonType } from '../../components/common/Button';
import { ModalPopUp } from '../../components/common/ModalPopUp';
import { useAuthData } from '../AuthContext';
import { useLocalizedData } from '../LocalizationContext';

export const useAuthGuard = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const { loginStatus, dispatchUpdateLogin } = useAuthData();
  const { strings } = useLocalizedData();

  const closeShowLoginPopup = useCallback(() => setShowLoginPopup(false), []);

  const isAuthenticated = useCallback(() => {
    if (!loginStatus.userDetail?.id) {
      setShowLoginPopup(true);
      return false;
    }

    return true;
  }, [loginStatus.userDetail?.id]);

  const navigateToLogin = () => {
    dispatchUpdateLogin({
      isLoggedIn: false,
    });
    closeShowLoginPopup();
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

  return useMemo(() => ({ LoginPopUp, isAuthenticated }), [isAuthenticated, LoginPopUp]);
};
