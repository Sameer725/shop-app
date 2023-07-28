import { useLazyQuery, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import theme from '@assets/theme/theme';
import { FocusAwareStatusBar, OrderCostOverview } from '@components';
import { useOrderAction, useOrderLines, useOrderState } from '@contexts';
import { GET_SAVED_PAYMENT_METHODS, SET_ORDER_CUSTOM_FIELD, UPDATE_ORDER_SHIPPING_ADDRESS } from '@graphqlDocuments';
import { BasketScreens } from '@routes/routes';
import {
  CreateAddressInput,
  KsNavigation,
  LanguageCode,
  Order,
  SavedPaymentMethods,
  SetOrderCustomFieldsMutation,
  SetOrderCustomFieldsMutationVariables,
  UpdateOrderCustomFieldsInput,
} from '@types';
import { DeliveryDetail, DeliveryInstruction, Footer, GiftAndPromotion, PaymentInformation } from './components';
import { getDefaultAddressValue, getDefaultValues } from './formHelper';

export const CheckoutScreen = () => {
  const { activeOrder } = useOrderState();
  const { isEmpty } = useOrderLines();
  const { setActiveOrder } = useOrderAction();
  const [updateCustomField] = useMutation<SetOrderCustomFieldsMutation, SetOrderCustomFieldsMutationVariables>(
    SET_ORDER_CUSTOM_FIELD
  );
  const formValue = useForm({ defaultValues: getDefaultValues(activeOrder) });
  const [updateShippingDetails] = useMutation<{ setOrderShippingAddress: Order }>(UPDATE_ORDER_SHIPPING_ADDRESS);
  const containerRef = useRef<ScrollView>(null);
  const navigation: KsNavigation = useNavigation();

  // To Load Saved Payment Methods and store in cache
  const [loadPaymentData] = useLazyQuery<SavedPaymentMethods.Query, SavedPaymentMethods.Variables>(
    GET_SAVED_PAYMENT_METHODS
  );

  useEffect(() => {
    void loadPaymentData();
  }, []);

  const [addGiftCouponToWallet, setAddGiftCouponToWallet] = useState('');

  // TODO: ADD separate listeners for checkbox values so that we dont see flickering issue and remove isDisabled state of checkboxes
  useEffect(() => {
    const defaultValues = getDefaultValues(activeOrder);

    formValue.setValue('fullName', defaultValues.fullName);
    formValue.setValue('canDropOrder', defaultValues.canDropOrder);
    formValue.setValue('doNotRing', defaultValues.doNotRing);
    formValue.setValue('notes', defaultValues.notes);
    formValue.setValue('phoneNumber', defaultValues.phoneNumber);
  }, []);

  useEffect(() => {
    formValue.setValue('address', getDefaultAddressValue(activeOrder));
  }, [activeOrder]);

  const onChangeCustomField = async (variables: UpdateOrderCustomFieldsInput) => {
    try {
      const { data } = await updateCustomField({
        variables: { customFields: variables },
      });
      if (data?.setOrderCustomFields && data?.setOrderCustomFields.__typename === 'Order') {
        if (activeOrder) {
          const updatedActiveOrder = {
            ...activeOrder,
            customFields: { ...activeOrder?.customFields, ...data.setOrderCustomFields.customFields },
          };

          setActiveOrder(updatedActiveOrder as Order);
        }
      }
    } catch {}
  };

  const onUpdateShippingDetails = async () => {
    const shippingAddress = { ...activeOrder?.shippingAddress };
    delete shippingAddress.__typename;
    const input: CreateAddressInput = {
      ...shippingAddress,
      fullName: formValue.getValues().fullName,
      streetLine1: activeOrder?.shippingAddress?.streetLine1 ?? '',
      phoneNumber: formValue.getValues().phoneNumber,
      countryCode: LanguageCode.De,
    };
    try {
      const { data } = await updateShippingDetails({
        variables: { input },
      });
      if (data?.setOrderShippingAddress && data?.setOrderShippingAddress.__typename === 'Order') {
        setActiveOrder(data.setOrderShippingAddress);
      }
    } catch {}
  };

  const updateActiveOrder = (order: Order) => {
    if (activeOrder) {
      const updatedOrderCustomFields = { ...activeOrder.customFields, ...order.customFields };

      setActiveOrder({ ...activeOrder, ...order, customFields: updatedOrderCustomFields });
    }
  };

  const onPayNow = () => {
    if (formValue.formState.errors.fullName || formValue.formState.errors.address) {
      return;
    }
    navigation.navigate(BasketScreens.PAYMENT, { addToWallet: addGiftCouponToWallet });
  };

  useLayoutEffect(() => {
    if (formValue.formState.errors.fullName || formValue.formState.errors.address) {
      scrollToPosition(0);
    }
  }, [formValue.formState.errors.fullName, formValue.formState.errors.address]);

  const scrollToPosition = (y: number) => containerRef.current?.scrollTo({ animated: true, x: 0, y });

  useEffect(() => {
    const couponDiscounts = activeOrder?.discounts.filter((discount) => discount.description.startsWith('KS-'));
    if (couponDiscounts?.length) {
      const foundGiftCoupon =
        couponDiscounts.find(
          (discount) => discount.initialValue && Number(discount.initialValue) - Math.abs(discount.amountWithTax) > 0
        )?.description ?? '';

      setAddGiftCouponToWallet(foundGiftCoupon);
    } else {
      setAddGiftCouponToWallet('');
    }
  }, [activeOrder]);

  return (
    <>
      <FocusAwareStatusBar backgroundColor={theme.colors.white} barStyle="dark-content" animated={true} />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        ref={containerRef}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <DeliveryDetail formValue={formValue} onUpdateShippingDetails={onUpdateShippingDetails} />
        <DeliveryInstruction
          scrollToPosition={scrollToPosition}
          onChangeCustomField={onChangeCustomField}
          formValue={formValue}
        />
        <GiftAndPromotion
          scrollToPosition={scrollToPosition}
          discounts={activeOrder?.discounts ?? []}
          setActiveOrder={updateActiveOrder}
          setAddGiftCouponToWallet={setAddGiftCouponToWallet}
          addGiftCouponToWallet={addGiftCouponToWallet}
        />
        {activeOrder ? <OrderCostOverview order={activeOrder} /> : null}
        <PaymentInformation />
      </ScrollView>
      <Footer
        totalQuantity={activeOrder?.totalQuantity ?? 0}
        totalWithTax={activeOrder?.totalWithTax ?? 0}
        onPress={formValue.handleSubmit(onPayNow)}
        isEmpty={isEmpty}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.s3,
    paddingTop: theme.spacing.s5,
    paddingBottom: theme.spacing.s6,
  },
});
