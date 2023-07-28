import { UseFormReturn } from 'react-hook-form';

import { Order } from '@types';
import { formatAddress } from '@utils';

export const defaultValues = {
  fullName: '',
  address: '',
  canDropOrder: false,
  doNotRing: false,
  notes: '',
  phoneNumber: '',
};

export type FormData = typeof defaultValues;
export interface FormValue {
  formValue: UseFormReturn<FormData>;
}
export interface CustomFieldInterface {
  canDropOrder?: boolean;
  doNotRing?: boolean;
  notes?: string;
}

export const getDefaultValues = (activeOrder?: Order): typeof defaultValues => {
  const fullName = activeOrder?.shippingAddress?.fullName
    ? activeOrder?.shippingAddress?.fullName
    : `${activeOrder?.customer?.firstName ?? ''}  ${activeOrder?.customer?.lastName ?? ''}`;
  const phoneNumber = activeOrder?.customer?.phoneNumber ?? '';

  return {
    ...defaultValues,
    fullName,
    address: activeOrder?.shippingAddress?.postalCode ? formatAddress(activeOrder?.shippingAddress) : '',
    canDropOrder: activeOrder?.customFields?.canDropOrder ?? false,
    doNotRing: activeOrder?.customFields?.doNotRing ?? false,
    notes: activeOrder?.customFields?.notes ?? '',
    phoneNumber,
  };
};

export const getDefaultAddressValue = (activeOrder?: Order): string => {
  return activeOrder?.shippingAddress?.postalCode ? formatAddress(activeOrder?.shippingAddress) : '';
};
