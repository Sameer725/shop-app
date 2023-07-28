export enum AuthScreens {
  ADDRESS_SELECTION_SCREEN = 'AddressSelectionScreen',
  BROWSE_AS_GUEST_SCREEN = 'BrowseAsGuestScreen',
  FORGET_PASSWORD_SCREEN = 'ForgetPasswordScreen',
  LOGIN_SCREEN = 'LoginScreen',
  LOGIN_WITH_EMAIL_SCREEN = 'LoginWithEmailScreen',
  REGISTER_SCREEN = 'RegisterScreen',
  RESET_PASSWORD_SCREEN = 'ResetPasswordScreen',
  WAITING_LIST_INPUT_SCREEN = 'WaitingListInputScreen',
  WAITING_LIST_SUCCESS_SCREEN = 'WaitingListSuccessScreen',
  WELCOME_SCREEN = 'WelcomeScreen',
}

export enum BasketScreens {
  BASKET = 'Basket',
  CHECKOUT = 'Checkout',
  ORDER_DELIVERY_DATE_SELECTION_SCREEN = 'OrderDeliveryDateSelectionScreen',
  ORDER_DELIVERY_ADDRESS_NEW = 'OrderDeliveryAddressNew',
  PAYMENT = 'Payment',
  PAYPAL_WEBVIEW = 'PayPalWebView',
}

export enum CommonScreens {
  PRODUCER_DETAILS_SCREEN = 'ProducerDetails',
  PRODUCT_DETAILS_SCREEN = 'ProductDetailsScreen',
  DELIVERY_DATE_SELECTION_SCREEN = 'DeliveryDateSelectionScreen',
}

export enum DashboardScreens {
  COLLECTION_OVERVIEW_SCREEN = 'CollectionOverviewScreen',
  DASHBOARD_LANDING_SCREEN = 'DashboardLandingScreen',
  PRODUCER_LIST_SCREEN = 'ProducerListScreen',
  RECIPE_DETAILS_SCREEN = 'RecipeDetails',
  RECIPE_SCREEN = 'RecipeScreen',
  SPECIAL_DETAILS_SCREEN = 'SpecialDetails',
  DELIVERY_ADDRESS_NEW = 'DeliveryAddressNew',
}

export enum FavoritesScreens {
  FAVORITES = 'Favorites',
}

export enum PaymentScreens {
  APPLE_PAY = 'ApplePay',
  CREDIT_CARD_SELECTION_SCREEN = 'CreditCardSelectionScreen',
  CREDIT_CARD_CARD_NEW_SCREEN = 'CreditCardNewScreen',
  GOOGLE_PAY = 'GooglePay',
  INVOICE = 'Invoice',
  PAYMENT_OPTIONS = 'PaymentOptions',
  PAYPAL = 'PayPal',
  SEPA_PAY_SELECTION_SCREEN = 'SepaPaySelectionScreen',
  SEPA_PAY_NEW_SCREEN = 'SepaPayNewScreen',
}

export enum ProductSearchScreens {
  PRODUCT_SEARCH = 'ProductSearch',
}

export enum ProfileSettingsScreens {
  ADDRESS_EDIT = 'AddressEdit',
  ADDRESS_LIST = 'AddressList',
  ADDRESS_NEW = 'AddressNew',
  CHANGE_PASSWORD = 'ChangePassword',
  COMPLAINT_SCREEN = 'ComplaintScreen',
  DELETE_ACCOUNT = 'DeleteAccount',
  ORDER_DETAILS = 'OrderDetails',
  ORDER_LIST = 'OrderList',
  PERSONAL_DATA = 'PersonalData',
  PROFILE_SETTINGS = 'ProfileSettings',
  UPDATE_EMAIL = 'UpdateEmail',
  SAVED_PAYMENT_METHODS = 'SavedPaymentMethods',
  WALLET_DETAILS_SCREEN = 'WalletDetailsScreen',
}

export enum RootRoutes {
  AUTHENTICATED = 'Authenticated',
  UNAUTHENTICATED = 'UnAuthenticated',
}

export enum Tabs {
  BASKET = 'BasketTab',
  DASHBOARD = 'DashboardTab',
  FAVORITES = 'FavoritesTab',
  PRODUCT_SEARCH = 'ProductSearchTab',
  PROFILE_SETTINGS = 'ProfileSettingsTab',
}
