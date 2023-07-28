import dayjs from 'dayjs';

import { Address, Order, OrderAddress } from '@types';
import { german } from '../lang';

export const formatPrice = (price: number) => {
  if (!price && isNaN(price)) {
    return null;
  }

  return `${(price / 100).toFixed(2).replace('.', ',')} €`;
};

export const formatNumber = (value: number | string) => {
  if (!value && value !== 0) {
    return null;
  }
  return String(value).replace('.', ',');
};

export const formatAddress = (address: OrderAddress | Address) => {
  return `${address?.streetLine1 ? address?.streetLine1 + ',' : ''} ${address?.postalCode ?? ''} ${
    address?.city ?? ''
  }`;
};

/**
 * Returns a formatted timeframe of the delivery timeframe of the given order
 * @param order Order, the timeframe should be displayed from
 * @param strings Translation strings
 */
export const formatDeliveryTimeFrame = (order: Order | undefined, strings: typeof german) => {
  const date = dayjs(order?.customFields?.earliestDeliveryTime).format('dd. DD.MM');
  const timeFrom = dayjs(order?.customFields?.earliestDeliveryTime).format('HH:mm');
  const timeUntil = dayjs(order?.customFields?.latestDeliveryTime).format('HH:mm');

  return `${date} | ${timeFrom} - ${timeUntil} ${strings.dashboard.hour}`;
};
