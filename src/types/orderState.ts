export enum OrderState {
  CREATED = 'Created',
  ADDING_ITEMS = 'AddingItems',
  ARRANGING_PAYMENT = 'ArrangingPayment',
  PAYMENT_AUTHORIZED = 'PaymentAuthorized',
  PAYMENT_SETTLED = 'PaymentSettled',
  PARTIALLY_SHIPPED = 'PartiallyShipped',
  SHIPPED = 'Shipped',
  PARTIALLY_DELIVERED = 'PartiallyDelivered',
  DELIVERED = 'Delivered',
  MODIFYING = 'Modifying',
  ARRANGING_ADDITIONAL_PAYMENT = 'ArrangingAdditionalPayment',
  CANCELLED = 'Cancelled',
}
