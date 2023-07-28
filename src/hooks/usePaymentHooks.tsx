import { useMutation } from '@apollo/client';
import { CommonActions, useNavigation } from '@react-navigation/native';

import { useLocalizedData, useOrderAction, useOrderState } from '@contexts';
import { MARK_ORDER_AS_INACTIVE, TRANSITION_ORDER_TO_STATE } from '@graphqlDocuments';
import { BasketScreens, ProfileSettingsScreens, Tabs } from '@routes/routes';
import {
  ErrorType,
  KsNavigation,
  TransitionOrderToStateMutation,
  TransitionOrderToStateMutationVariables,
} from '@types';
import { formatPrice } from '@utils';
import { useToastNotification } from './useToastNotification';

export const usePaymentHooks = () => {
  const navigation: KsNavigation = useNavigation();
  const { showErrorToast, showGeneralErrorToast } = useToastNotification();
  const { strings } = useLocalizedData();

  const { activeOrder } = useOrderState();
  const { refetchOrder } = useOrderAction();

  const [transitionOrder] = useMutation<TransitionOrderToStateMutation, TransitionOrderToStateMutationVariables>(
    TRANSITION_ORDER_TO_STATE
  );

  const [markOrderAsInactive] = useMutation(MARK_ORDER_AS_INACTIVE, {
    onCompleted: () => {
      refetchOrder();

      // Reset Dashboard navigation since all categories are reloaded
      const navigateAction = CommonActions.reset({
        index: 1,
        routes: [{ name: Tabs.DASHBOARD }],
      });

      navigation.dispatch(navigateAction);

      navigation.navigate(Tabs.PROFILE_SETTINGS, {
        screen: ProfileSettingsScreens.ORDER_DETAILS,
        initial: false,
        params: {
          orderId: activeOrder?.id,
        },
      });
    },
    update: (cache) => {
      // Remove orders query from the cache which is included in activeCustomer
      cache.evict({ fieldName: 'activeCustomer' });
      cache.evict({ fieldName: 'wallet' });
    },
  });

  const transitionOrderToState = async (variables: TransitionOrderToStateMutationVariables) => {
    return transitionOrder({
      variables,
    });
  };

  const onSuccess = () => {
    if (activeOrder?.totalQuantity === 0) {
      return;
    }

    void markOrderAsInactive();
  };

  const onError = (errorMessage: string) => {
    if (errorMessage?.includes(ErrorType.OT_001)) {
      refetchOrder();
      navigation.navigate(BasketScreens.CHECKOUT);
      showErrorToast(strings.checkout.error.OT_001);
    } else if (errorMessage?.includes(ErrorType.OT_002)) {
      refetchOrder();
      navigation.navigate(BasketScreens.CHECKOUT);
      showErrorToast(strings.checkout.error.OT_002);
    } else if (errorMessage?.includes(ErrorType.OT_003)) {
      navigation.navigate(BasketScreens.BASKET);
    } else if (errorMessage?.includes(ErrorType.OT_004)) {
      refetchOrder();
      navigation.navigate(BasketScreens.CHECKOUT);
      showErrorToast(strings.checkout.error.OT_004);
    } else if (errorMessage?.includes(ErrorType.OT_005)) {
      refetchOrder();
      navigation.navigate(BasketScreens.CHECKOUT);
      showErrorToast(strings.checkout.error.OT_005);
    } else {
      refetchOrder();
      navigation.navigate(BasketScreens.CHECKOUT);
      showGeneralErrorToast();
    }
  };

  const totalWithTax = activeOrder?.totalWithTax ?? 0;
  const usedWalletValue = activeOrder?.customFields?.usedWalletValue ?? 0;
  const formattedTotalWithTax = formatPrice(totalWithTax - (activeOrder?.customFields?.usedWalletValue ?? 0));

  return {
    onSuccess,
    onError,
    transitionOrderToState,
    totalWithTax,
    usedWalletValue,
    formattedTotalWithTax,
  };
};
