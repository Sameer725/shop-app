import { useMutation } from '@apollo/client';
import React from 'react';
import { useForm } from 'react-hook-form';

import { Box, Button, ModalPopUp, OutlinedInput, Text } from '@components';
import { useLocalizedData } from '@contexts';
import { REQUEST_PAYOUT } from '@graphqlDocuments/wallet.graphql';
import { useToastNotification } from '@hooks';
import { RequestPayoutMutation, RequestPayoutMutationVariables } from '@types';

interface Props {
  showPayout: boolean;
  payOutTotalValue: number;
  closePayout: () => void;
  payOutTotal: string;
}

export const WalletWithdrawModal: React.FC<Props> = (props) => {
  const { showPayout, closePayout, payOutTotal, payOutTotalValue } = props;

  const { strings } = useLocalizedData();

  const { showGeneralErrorToast, showInfoToast } = useToastNotification();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { amount: '' },
  });

  const [requestPayout, { loading }] = useMutation<RequestPayoutMutation, RequestPayoutMutationVariables>(
    REQUEST_PAYOUT,
    {
      onCompleted: () => showInfoToast(strings.profileSettings.wallet.requestWithdrawSuccess),
      onError: () => showGeneralErrorToast(),
    }
  );

  const submitRequest = (submitData: { amount: string }) => {
    const amount = Number((Number(submitData.amount) * 100).toFixed());

    void requestPayout({
      variables: { amount },
    });
    setValue('amount', '');
    closePayout();
  };

  return (
    <ModalPopUp
      isVisible={showPayout}
      header={strings.profileSettings.wallet.requestCreditWithdrawal}
      onClose={closePayout}
    >
      <Text variant="text-md" textAlign="center">
        {strings.profileSettings.wallet.withdrawalInfo}
      </Text>
      <Text variant="heading-sm" textAlign="center">
        {strings.profileSettings.wallet.availableAmount.replace(':xAmount', payOutTotal)}
      </Text>
      <Box>
        <OutlinedInput
          error={
            errors.amount
              ? errors.amount.type === 'required'
                ? strings.profileSettings.wallet.withdrawAmountValidationRequired
                : strings.profileSettings.wallet.withdrawAmountValidationMax
              : null
          }
          rules={{
            max: payOutTotalValue / 100,
            required: true,
          }}
          keyboardType="numeric"
          control={control}
          name="amount"
          label={strings.profileSettings.wallet.requestedAmount}
          blurOnSubmit={true}
          returnKeyType="send"
          autoComplete="off"
          autoCorrect={false}
        />
      </Box>
      <Button isLoading={loading} onPress={handleSubmit(submitRequest)} marginTop="s5">
        {strings.profileSettings.wallet.requestWithdrawal}
      </Button>
    </ModalPopUp>
  );
};
