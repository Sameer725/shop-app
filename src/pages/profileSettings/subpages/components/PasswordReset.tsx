import { useMutation } from '@apollo/client';
import React, { useState } from 'react';

import { Box, Button, ButtonSize, ButtonType, ModalPopUp } from '@components';
import { useLocalizedData } from '@contexts';
import { REQUEST_PASSWORD_RESET_MUTATION } from '@graphqlDocuments';
import { useToastNotification } from '@hooks';
import { RequestPasswordReset } from '@types';

interface PasswordResetProps {
  emailAddress: string;
}

export const PasswordReset: React.FC<PasswordResetProps> = (props) => {
  const { emailAddress } = props;

  const { showGeneralErrorToast, showInfoToast } = useToastNotification();
  const { strings } = useLocalizedData();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showModal = () => {
    resetMutationStatus();
    setIsModalVisible(true);
  };

  const hideModal = () => {
    resetMutationStatus();
    setIsModalVisible(false);
  };

  const [requestPasswordReset, { loading: isLoading, reset: resetMutationStatus }] = useMutation<
    {
      requestPasswordReset: RequestPasswordReset.RequestPasswordReset;
    },
    RequestPasswordReset.Variables
  >(REQUEST_PASSWORD_RESET_MUTATION, {
    variables: { emailAddress },
    notifyOnNetworkStatusChange: true,
    onError: () => {
      hideModal();
      showGeneralErrorToast();
    },
    onCompleted: () => {
      hideModal();
      showInfoToast(strings.profileSettings.personalData.emailSent);
    },
  });

  return (
    <>
      <Box alignItems="flex-end">
        <Button width="auto" onPress={showModal} type={ButtonType.GHOST} size={ButtonSize.SM} marginTop="s2">
          {strings.auth.forgetPassword}
        </Button>
      </Box>

      <ModalPopUp
        isVisible={isModalVisible}
        header={strings.profileSettings.personalData.forgotPassword}
        text={strings.profileSettings.personalData.sendingPasswordResetMail}
        isCloseIconVisible={false}
        onClose={hideModal}
      >
        <Button type={ButtonType.PRIMARY} onPress={requestPasswordReset} isLoading={isLoading}>
          {strings.profileSettings.personalData.resetPasswordNow}
        </Button>
        <Button type={ButtonType.PRIMARY_WHITE} onPress={hideModal}>
          {strings.cancel}
        </Button>
      </ModalPopUp>
    </>
  );
};
