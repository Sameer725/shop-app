/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
  Upload: any;
};

export type ActiveOrderResult = NoActiveOrderError | Order;

export type AddItemsToOrderInput = {
  productVariantId: Scalars['ID'];
  quantity: Scalars['Int'];
};

export type AddPaymentToOrderResult = IneligiblePaymentMethodError | NoActiveOrderError | Order | OrderPaymentStateError | OrderStateTransitionError | PaymentDeclinedError | PaymentFailedError;

export type Address = Node & {
  __typename?: 'Address';
  city?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  country: Country;
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<AddressCustomFields>;
  defaultBillingAddress?: Maybe<Scalars['Boolean']>;
  defaultShippingAddress?: Maybe<Scalars['Boolean']>;
  fullName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  phoneNumber?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  streetLine1: Scalars['String'];
  streetLine2?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type AddressAutoCompletion = {
  __typename?: 'AddressAutoCompletion';
  address?: Maybe<AddressFormat>;
  isInArea?: Maybe<Scalars['Boolean']>;
};

export type AddressCustomFields = {
  __typename?: 'AddressCustomFields';
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  placeId?: Maybe<Scalars['String']>;
};

export type AddressFormat = {
  __typename?: 'AddressFormat';
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['String']>;
  longitude?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  placeId?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  streetNumber?: Maybe<Scalars['String']>;
};

export type AdjustOrderLineInput = {
  orderLineId: Scalars['ID'];
  quantity: Scalars['Int'];
};

export type Adjustment = {
  __typename?: 'Adjustment';
  adjustmentSource: Scalars['String'];
  amount: Scalars['Int'];
  description: Scalars['String'];
  type: AdjustmentType;
};

export enum AdjustmentType {
  DistributedOrderPromotion = 'DISTRIBUTED_ORDER_PROMOTION',
  Other = 'OTHER',
  Promotion = 'PROMOTION'
}

/** Returned when attempting to set the Customer for an Order when already logged in. */
export type AlreadyLoggedInError = ErrorResult & {
  __typename?: 'AlreadyLoggedInError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type AppleAuthData = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  token: Scalars['String'];
};

export type ApplyCouponCodeResult = CouponCodeExpiredError | CouponCodeInvalidError | CouponCodeLimitError | Order;

export type Asset = Node & {
  __typename?: 'Asset';
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  fileSize: Scalars['Int'];
  focalPoint?: Maybe<Coordinate>;
  height: Scalars['Int'];
  id: Scalars['ID'];
  mimeType: Scalars['String'];
  name: Scalars['String'];
  preview: Scalars['String'];
  source: Scalars['String'];
  thumbnail: Scalars['String'];
  type: AssetType;
  updatedAt: Scalars['DateTime'];
  width: Scalars['Int'];
};

export type AssetList = PaginatedList & {
  __typename?: 'AssetList';
  items: Array<Asset>;
  totalItems: Scalars['Int'];
};

export enum AssetType {
  Binary = 'BINARY',
  Image = 'IMAGE',
  Video = 'VIDEO'
}

export type AuthenticationInput = {
  apple?: InputMaybe<AppleAuthData>;
  facebook?: InputMaybe<FacebookAuthInput>;
  google?: InputMaybe<GoogleAuthInput>;
  native?: InputMaybe<NativeAuthInput>;
};

export type AuthenticationMethod = Node & {
  __typename?: 'AuthenticationMethod';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  strategy: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type AuthenticationResult = CurrentUser | InvalidCredentialsError | NotVerifiedError;

export type BooleanCustomFieldConfig = CustomField & {
  __typename?: 'BooleanCustomFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  internal?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Array<LocalizedString>>;
  list: Scalars['Boolean'];
  name: Scalars['String'];
  nullable?: Maybe<Scalars['Boolean']>;
  readonly?: Maybe<Scalars['Boolean']>;
  type: Scalars['String'];
  ui?: Maybe<Scalars['JSON']>;
};

/** Operators for filtering on a list of Boolean fields */
export type BooleanListOperators = {
  inList: Scalars['Boolean'];
};

/** Operators for filtering on a Boolean field */
export type BooleanOperators = {
  eq?: InputMaybe<Scalars['Boolean']>;
  isNull?: InputMaybe<Scalars['Boolean']>;
};

export type Channel = Node & {
  __typename?: 'Channel';
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  currencyCode: CurrencyCode;
  customFields?: Maybe<ChannelCustomFields>;
  defaultLanguageCode: LanguageCode;
  defaultShippingZone?: Maybe<Zone>;
  defaultTaxZone?: Maybe<Zone>;
  id: Scalars['ID'];
  pricesIncludeTax: Scalars['Boolean'];
  token: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ChannelCustomFields = {
  __typename?: 'ChannelCustomFields';
  address?: Maybe<Address>;
};

export type Collection = Node & {
  __typename?: 'Collection';
  assets: Array<Asset>;
  breadcrumbs: Array<CollectionBreadcrumb>;
  children?: Maybe<Array<Collection>>;
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  description: Scalars['String'];
  featuredAsset?: Maybe<Asset>;
  filters: Array<ConfigurableOperation>;
  id: Scalars['ID'];
  languageCode?: Maybe<LanguageCode>;
  name: Scalars['String'];
  parent?: Maybe<Collection>;
  position: Scalars['Int'];
  productVariants: ProductVariantList;
  slug: Scalars['String'];
  translations: Array<CollectionTranslation>;
  updatedAt: Scalars['DateTime'];
};


export type CollectionProductVariantsArgs = {
  options?: InputMaybe<ProductVariantListOptions>;
};

export type CollectionBreadcrumb = {
  __typename?: 'CollectionBreadcrumb';
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type CollectionFilterParameter = {
  createdAt?: InputMaybe<DateOperators>;
  description?: InputMaybe<StringOperators>;
  id?: InputMaybe<IdOperators>;
  languageCode?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  position?: InputMaybe<NumberOperators>;
  slug?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type CollectionList = PaginatedList & {
  __typename?: 'CollectionList';
  items: Array<Collection>;
  totalItems: Scalars['Int'];
};

export type CollectionListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<CollectionFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<CollectionSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']>;
};

/**
 * Which Collections are present in the products returned
 * by the search, and in what quantity.
 */
export type CollectionResult = {
  __typename?: 'CollectionResult';
  collection: Collection;
  count: Scalars['Int'];
};

export type CollectionSortParameter = {
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  position?: InputMaybe<SortOrder>;
  slug?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type CollectionTranslation = {
  __typename?: 'CollectionTranslation';
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  slug: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ConfigArg = {
  __typename?: 'ConfigArg';
  name: Scalars['String'];
  value: Scalars['String'];
};

export type ConfigArgDefinition = {
  __typename?: 'ConfigArgDefinition';
  defaultValue?: Maybe<Scalars['JSON']>;
  description?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  list: Scalars['Boolean'];
  name: Scalars['String'];
  required: Scalars['Boolean'];
  type: Scalars['String'];
  ui?: Maybe<Scalars['JSON']>;
};

export type ConfigArgInput = {
  name: Scalars['String'];
  /** A JSON stringified representation of the actual value */
  value: Scalars['String'];
};

export type ConfigurableOperation = {
  __typename?: 'ConfigurableOperation';
  args: Array<ConfigArg>;
  code: Scalars['String'];
};

export type ConfigurableOperationDefinition = {
  __typename?: 'ConfigurableOperationDefinition';
  args: Array<ConfigArgDefinition>;
  code: Scalars['String'];
  description: Scalars['String'];
};

export type ConfigurableOperationInput = {
  arguments: Array<ConfigArgInput>;
  code: Scalars['String'];
};

export type Coordinate = {
  __typename?: 'Coordinate';
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type Country = Node & {
  __typename?: 'Country';
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  enabled: Scalars['Boolean'];
  id: Scalars['ID'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  translations: Array<CountryTranslation>;
  updatedAt: Scalars['DateTime'];
};

export type CountryList = PaginatedList & {
  __typename?: 'CountryList';
  items: Array<Country>;
  totalItems: Scalars['Int'];
};

export type CountryTranslation = {
  __typename?: 'CountryTranslation';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

/** Returned if the provided coupon code is invalid */
export type CouponCodeExpiredError = ErrorResult & {
  __typename?: 'CouponCodeExpiredError';
  couponCode: Scalars['String'];
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/** Returned if the provided coupon code is invalid */
export type CouponCodeInvalidError = ErrorResult & {
  __typename?: 'CouponCodeInvalidError';
  couponCode: Scalars['String'];
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/** Returned if the provided coupon code is invalid */
export type CouponCodeLimitError = ErrorResult & {
  __typename?: 'CouponCodeLimitError';
  couponCode: Scalars['String'];
  errorCode: ErrorCode;
  limit: Scalars['Int'];
  message: Scalars['String'];
};

export type CreateAddressCustomFieldsInput = {
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  placeId?: InputMaybe<Scalars['String']>;
};

export type CreateAddressInput = {
  city?: InputMaybe<Scalars['String']>;
  company?: InputMaybe<Scalars['String']>;
  countryCode: Scalars['String'];
  customFields?: InputMaybe<CreateAddressCustomFieldsInput>;
  defaultBillingAddress?: InputMaybe<Scalars['Boolean']>;
  defaultShippingAddress?: InputMaybe<Scalars['Boolean']>;
  fullName?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  postalCode?: InputMaybe<Scalars['String']>;
  province?: InputMaybe<Scalars['String']>;
  streetLine1: Scalars['String'];
  streetLine2?: InputMaybe<Scalars['String']>;
};

export type CreateCustomerCustomFieldsInput = {
  activeChannelId?: InputMaybe<Scalars['ID']>;
  isOfLegalAge?: InputMaybe<Scalars['Boolean']>;
  subscribeToNewsletterOnRegistration?: InputMaybe<Scalars['Boolean']>;
};

export type CreateCustomerInput = {
  customFields?: InputMaybe<CreateCustomerCustomFieldsInput>;
  emailAddress: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type CreateWaitingListInput = {
  email: Scalars['String'];
  postalCode: Scalars['String'];
};

/**
 * @description
 * ISO 4217 currency code
 *
 * @docsCategory common
 */
export enum CurrencyCode {
  /** United Arab Emirates dirham */
  Aed = 'AED',
  /** Afghan afghani */
  Afn = 'AFN',
  /** Albanian lek */
  All = 'ALL',
  /** Armenian dram */
  Amd = 'AMD',
  /** Netherlands Antillean guilder */
  Ang = 'ANG',
  /** Angolan kwanza */
  Aoa = 'AOA',
  /** Argentine peso */
  Ars = 'ARS',
  /** Australian dollar */
  Aud = 'AUD',
  /** Aruban florin */
  Awg = 'AWG',
  /** Azerbaijani manat */
  Azn = 'AZN',
  /** Bosnia and Herzegovina convertible mark */
  Bam = 'BAM',
  /** Barbados dollar */
  Bbd = 'BBD',
  /** Bangladeshi taka */
  Bdt = 'BDT',
  /** Bulgarian lev */
  Bgn = 'BGN',
  /** Bahraini dinar */
  Bhd = 'BHD',
  /** Burundian franc */
  Bif = 'BIF',
  /** Bermudian dollar */
  Bmd = 'BMD',
  /** Brunei dollar */
  Bnd = 'BND',
  /** Boliviano */
  Bob = 'BOB',
  /** Brazilian real */
  Brl = 'BRL',
  /** Bahamian dollar */
  Bsd = 'BSD',
  /** Bhutanese ngultrum */
  Btn = 'BTN',
  /** Botswana pula */
  Bwp = 'BWP',
  /** Belarusian ruble */
  Byn = 'BYN',
  /** Belize dollar */
  Bzd = 'BZD',
  /** Canadian dollar */
  Cad = 'CAD',
  /** Congolese franc */
  Cdf = 'CDF',
  /** Swiss franc */
  Chf = 'CHF',
  /** Chilean peso */
  Clp = 'CLP',
  /** Renminbi (Chinese) yuan */
  Cny = 'CNY',
  /** Colombian peso */
  Cop = 'COP',
  /** Costa Rican colon */
  Crc = 'CRC',
  /** Cuban convertible peso */
  Cuc = 'CUC',
  /** Cuban peso */
  Cup = 'CUP',
  /** Cape Verde escudo */
  Cve = 'CVE',
  /** Czech koruna */
  Czk = 'CZK',
  /** Djiboutian franc */
  Djf = 'DJF',
  /** Danish krone */
  Dkk = 'DKK',
  /** Dominican peso */
  Dop = 'DOP',
  /** Algerian dinar */
  Dzd = 'DZD',
  /** Egyptian pound */
  Egp = 'EGP',
  /** Eritrean nakfa */
  Ern = 'ERN',
  /** Ethiopian birr */
  Etb = 'ETB',
  /** Euro */
  Eur = 'EUR',
  /** Fiji dollar */
  Fjd = 'FJD',
  /** Falkland Islands pound */
  Fkp = 'FKP',
  /** Pound sterling */
  Gbp = 'GBP',
  /** Georgian lari */
  Gel = 'GEL',
  /** Ghanaian cedi */
  Ghs = 'GHS',
  /** Gibraltar pound */
  Gip = 'GIP',
  /** Gambian dalasi */
  Gmd = 'GMD',
  /** Guinean franc */
  Gnf = 'GNF',
  /** Guatemalan quetzal */
  Gtq = 'GTQ',
  /** Guyanese dollar */
  Gyd = 'GYD',
  /** Hong Kong dollar */
  Hkd = 'HKD',
  /** Honduran lempira */
  Hnl = 'HNL',
  /** Croatian kuna */
  Hrk = 'HRK',
  /** Haitian gourde */
  Htg = 'HTG',
  /** Hungarian forint */
  Huf = 'HUF',
  /** Indonesian rupiah */
  Idr = 'IDR',
  /** Israeli new shekel */
  Ils = 'ILS',
  /** Indian rupee */
  Inr = 'INR',
  /** Iraqi dinar */
  Iqd = 'IQD',
  /** Iranian rial */
  Irr = 'IRR',
  /** Icelandic króna */
  Isk = 'ISK',
  /** Jamaican dollar */
  Jmd = 'JMD',
  /** Jordanian dinar */
  Jod = 'JOD',
  /** Japanese yen */
  Jpy = 'JPY',
  /** Kenyan shilling */
  Kes = 'KES',
  /** Kyrgyzstani som */
  Kgs = 'KGS',
  /** Cambodian riel */
  Khr = 'KHR',
  /** Comoro franc */
  Kmf = 'KMF',
  /** North Korean won */
  Kpw = 'KPW',
  /** South Korean won */
  Krw = 'KRW',
  /** Kuwaiti dinar */
  Kwd = 'KWD',
  /** Cayman Islands dollar */
  Kyd = 'KYD',
  /** Kazakhstani tenge */
  Kzt = 'KZT',
  /** Lao kip */
  Lak = 'LAK',
  /** Lebanese pound */
  Lbp = 'LBP',
  /** Sri Lankan rupee */
  Lkr = 'LKR',
  /** Liberian dollar */
  Lrd = 'LRD',
  /** Lesotho loti */
  Lsl = 'LSL',
  /** Libyan dinar */
  Lyd = 'LYD',
  /** Moroccan dirham */
  Mad = 'MAD',
  /** Moldovan leu */
  Mdl = 'MDL',
  /** Malagasy ariary */
  Mga = 'MGA',
  /** Macedonian denar */
  Mkd = 'MKD',
  /** Myanmar kyat */
  Mmk = 'MMK',
  /** Mongolian tögrög */
  Mnt = 'MNT',
  /** Macanese pataca */
  Mop = 'MOP',
  /** Mauritanian ouguiya */
  Mru = 'MRU',
  /** Mauritian rupee */
  Mur = 'MUR',
  /** Maldivian rufiyaa */
  Mvr = 'MVR',
  /** Malawian kwacha */
  Mwk = 'MWK',
  /** Mexican peso */
  Mxn = 'MXN',
  /** Malaysian ringgit */
  Myr = 'MYR',
  /** Mozambican metical */
  Mzn = 'MZN',
  /** Namibian dollar */
  Nad = 'NAD',
  /** Nigerian naira */
  Ngn = 'NGN',
  /** Nicaraguan córdoba */
  Nio = 'NIO',
  /** Norwegian krone */
  Nok = 'NOK',
  /** Nepalese rupee */
  Npr = 'NPR',
  /** New Zealand dollar */
  Nzd = 'NZD',
  /** Omani rial */
  Omr = 'OMR',
  /** Panamanian balboa */
  Pab = 'PAB',
  /** Peruvian sol */
  Pen = 'PEN',
  /** Papua New Guinean kina */
  Pgk = 'PGK',
  /** Philippine peso */
  Php = 'PHP',
  /** Pakistani rupee */
  Pkr = 'PKR',
  /** Polish złoty */
  Pln = 'PLN',
  /** Paraguayan guaraní */
  Pyg = 'PYG',
  /** Qatari riyal */
  Qar = 'QAR',
  /** Romanian leu */
  Ron = 'RON',
  /** Serbian dinar */
  Rsd = 'RSD',
  /** Russian ruble */
  Rub = 'RUB',
  /** Rwandan franc */
  Rwf = 'RWF',
  /** Saudi riyal */
  Sar = 'SAR',
  /** Solomon Islands dollar */
  Sbd = 'SBD',
  /** Seychelles rupee */
  Scr = 'SCR',
  /** Sudanese pound */
  Sdg = 'SDG',
  /** Swedish krona/kronor */
  Sek = 'SEK',
  /** Singapore dollar */
  Sgd = 'SGD',
  /** Saint Helena pound */
  Shp = 'SHP',
  /** Sierra Leonean leone */
  Sll = 'SLL',
  /** Somali shilling */
  Sos = 'SOS',
  /** Surinamese dollar */
  Srd = 'SRD',
  /** South Sudanese pound */
  Ssp = 'SSP',
  /** São Tomé and Príncipe dobra */
  Stn = 'STN',
  /** Salvadoran colón */
  Svc = 'SVC',
  /** Syrian pound */
  Syp = 'SYP',
  /** Swazi lilangeni */
  Szl = 'SZL',
  /** Thai baht */
  Thb = 'THB',
  /** Tajikistani somoni */
  Tjs = 'TJS',
  /** Turkmenistan manat */
  Tmt = 'TMT',
  /** Tunisian dinar */
  Tnd = 'TND',
  /** Tongan paʻanga */
  Top = 'TOP',
  /** Turkish lira */
  Try = 'TRY',
  /** Trinidad and Tobago dollar */
  Ttd = 'TTD',
  /** New Taiwan dollar */
  Twd = 'TWD',
  /** Tanzanian shilling */
  Tzs = 'TZS',
  /** Ukrainian hryvnia */
  Uah = 'UAH',
  /** Ugandan shilling */
  Ugx = 'UGX',
  /** United States dollar */
  Usd = 'USD',
  /** Uruguayan peso */
  Uyu = 'UYU',
  /** Uzbekistan som */
  Uzs = 'UZS',
  /** Venezuelan bolívar soberano */
  Ves = 'VES',
  /** Vietnamese đồng */
  Vnd = 'VND',
  /** Vanuatu vatu */
  Vuv = 'VUV',
  /** Samoan tala */
  Wst = 'WST',
  /** CFA franc BEAC */
  Xaf = 'XAF',
  /** East Caribbean dollar */
  Xcd = 'XCD',
  /** CFA franc BCEAO */
  Xof = 'XOF',
  /** CFP franc (franc Pacifique) */
  Xpf = 'XPF',
  /** Yemeni rial */
  Yer = 'YER',
  /** South African rand */
  Zar = 'ZAR',
  /** Zambian kwacha */
  Zmw = 'ZMW',
  /** Zimbabwean dollar */
  Zwl = 'ZWL'
}

export type CurrentUser = {
  __typename?: 'CurrentUser';
  channels: Array<CurrentUserChannel>;
  id: Scalars['ID'];
  identifier: Scalars['String'];
};

export type CurrentUserChannel = {
  __typename?: 'CurrentUserChannel';
  code: Scalars['String'];
  id: Scalars['ID'];
  permissions: Array<Permission>;
  token: Scalars['String'];
};

export type CustomField = {
  description?: Maybe<Array<LocalizedString>>;
  internal?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Array<LocalizedString>>;
  list: Scalars['Boolean'];
  name: Scalars['String'];
  nullable?: Maybe<Scalars['Boolean']>;
  readonly?: Maybe<Scalars['Boolean']>;
  type: Scalars['String'];
  ui?: Maybe<Scalars['JSON']>;
};

export type CustomFieldConfig = BooleanCustomFieldConfig | DateTimeCustomFieldConfig | FloatCustomFieldConfig | IntCustomFieldConfig | LocaleStringCustomFieldConfig | RelationCustomFieldConfig | StringCustomFieldConfig | TextCustomFieldConfig;

export type Customer = Node & {
  __typename?: 'Customer';
  addresses?: Maybe<Array<Address>>;
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<CustomerCustomFields>;
  emailAddress: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  orders: OrderList;
  phoneNumber?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
};


export type CustomerOrdersArgs = {
  options?: InputMaybe<OrderListOptions>;
};

export type CustomerCustomFields = {
  __typename?: 'CustomerCustomFields';
  activeChannel?: Maybe<Channel>;
  customerNumber?: Maybe<Scalars['Int']>;
  isOfLegalAge?: Maybe<Scalars['Boolean']>;
  subscribeToNewsletterOnRegistration?: Maybe<Scalars['Boolean']>;
};

export type CustomerFilterParameter = {
  createdAt?: InputMaybe<DateOperators>;
  customerNumber?: InputMaybe<NumberOperators>;
  emailAddress?: InputMaybe<StringOperators>;
  firstName?: InputMaybe<StringOperators>;
  id?: InputMaybe<IdOperators>;
  isOfLegalAge?: InputMaybe<BooleanOperators>;
  lastName?: InputMaybe<StringOperators>;
  phoneNumber?: InputMaybe<StringOperators>;
  subscribeToNewsletterOnRegistration?: InputMaybe<BooleanOperators>;
  title?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type CustomerGroup = Node & {
  __typename?: 'CustomerGroup';
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  customers: CustomerList;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};


export type CustomerGroupCustomersArgs = {
  options?: InputMaybe<CustomerListOptions>;
};

export type CustomerList = PaginatedList & {
  __typename?: 'CustomerList';
  items: Array<Customer>;
  totalItems: Scalars['Int'];
};

export type CustomerListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<CustomerFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<CustomerSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']>;
};

export type CustomerSortParameter = {
  activeChannel?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  customerNumber?: InputMaybe<SortOrder>;
  emailAddress?: InputMaybe<SortOrder>;
  firstName?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isOfLegalAge?: InputMaybe<SortOrder>;
  lastName?: InputMaybe<SortOrder>;
  phoneNumber?: InputMaybe<SortOrder>;
  subscribeToNewsletterOnRegistration?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

/** Operators for filtering on a list of Date fields */
export type DateListOperators = {
  inList: Scalars['DateTime'];
};

/** Operators for filtering on a DateTime field */
export type DateOperators = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  between?: InputMaybe<DateRange>;
  eq?: InputMaybe<Scalars['DateTime']>;
  isNull?: InputMaybe<Scalars['Boolean']>;
};

export type DateRange = {
  end: Scalars['DateTime'];
  start: Scalars['DateTime'];
};

/**
 * Expects the same validation formats as the `<input type="datetime-local">` HTML element.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local#Additional_attributes
 */
export type DateTimeCustomFieldConfig = CustomField & {
  __typename?: 'DateTimeCustomFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  internal?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Array<LocalizedString>>;
  list: Scalars['Boolean'];
  max?: Maybe<Scalars['String']>;
  min?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  nullable?: Maybe<Scalars['Boolean']>;
  readonly?: Maybe<Scalars['Boolean']>;
  step?: Maybe<Scalars['Int']>;
  type: Scalars['String'];
  ui?: Maybe<Scalars['JSON']>;
};

export type DeletionResponse = {
  __typename?: 'DeletionResponse';
  message?: Maybe<Scalars['String']>;
  result: DeletionResult;
};

export enum DeletionResult {
  /** The entity was successfully deleted */
  Deleted = 'DELETED',
  /** Deletion did not take place, reason given in message */
  NotDeleted = 'NOT_DELETED'
}

export type DeliveryDate = Node & {
  __typename?: 'DeliveryDate';
  deliveryWeekday: Scalars['Int'];
  earliestDeliveryTime: Scalars['String'];
  hasCapacity?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  latestDeliveryTime: Scalars['String'];
  maxCapacity?: Maybe<Scalars['Int']>;
  orderByDay: Scalars['Int'];
  orderByTime: Scalars['String'];
  orderByTimeDate?: Maybe<Scalars['DateTime']>;
};

export type Discount = {
  __typename?: 'Discount';
  adjustmentSource: Scalars['String'];
  amount: Scalars['Int'];
  amountWithTax: Scalars['Int'];
  description: Scalars['String'];
  initialValue?: Maybe<Scalars['Int']>;
  type: AdjustmentType;
};

/** Returned when attempting to create a Customer with an email address already registered to an existing User. */
export type EmailAddressConflictError = ErrorResult & {
  __typename?: 'EmailAddressConflictError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export enum ErrorCode {
  AlreadyLoggedInError = 'ALREADY_LOGGED_IN_ERROR',
  CouponCodeExpiredError = 'COUPON_CODE_EXPIRED_ERROR',
  CouponCodeInvalidError = 'COUPON_CODE_INVALID_ERROR',
  CouponCodeLimitError = 'COUPON_CODE_LIMIT_ERROR',
  EmailAddressConflictError = 'EMAIL_ADDRESS_CONFLICT_ERROR',
  IdentifierChangeTokenExpiredError = 'IDENTIFIER_CHANGE_TOKEN_EXPIRED_ERROR',
  IdentifierChangeTokenInvalidError = 'IDENTIFIER_CHANGE_TOKEN_INVALID_ERROR',
  IneligiblePaymentMethodError = 'INELIGIBLE_PAYMENT_METHOD_ERROR',
  IneligibleShippingMethodError = 'INELIGIBLE_SHIPPING_METHOD_ERROR',
  InsufficientStockError = 'INSUFFICIENT_STOCK_ERROR',
  InvalidCredentialsError = 'INVALID_CREDENTIALS_ERROR',
  MissingPasswordError = 'MISSING_PASSWORD_ERROR',
  NativeAuthStrategyError = 'NATIVE_AUTH_STRATEGY_ERROR',
  NegativeQuantityError = 'NEGATIVE_QUANTITY_ERROR',
  NotVerifiedError = 'NOT_VERIFIED_ERROR',
  NoActiveOrderError = 'NO_ACTIVE_ORDER_ERROR',
  OrderLimitError = 'ORDER_LIMIT_ERROR',
  OrderModificationError = 'ORDER_MODIFICATION_ERROR',
  OrderPaymentStateError = 'ORDER_PAYMENT_STATE_ERROR',
  OrderStateTransitionError = 'ORDER_STATE_TRANSITION_ERROR',
  PasswordAlreadySetError = 'PASSWORD_ALREADY_SET_ERROR',
  PasswordResetTokenExpiredError = 'PASSWORD_RESET_TOKEN_EXPIRED_ERROR',
  PasswordResetTokenInvalidError = 'PASSWORD_RESET_TOKEN_INVALID_ERROR',
  PasswordValidationError = 'PASSWORD_VALIDATION_ERROR',
  PaymentDeclinedError = 'PAYMENT_DECLINED_ERROR',
  PaymentFailedError = 'PAYMENT_FAILED_ERROR',
  UnknownError = 'UNKNOWN_ERROR',
  VerificationTokenExpiredError = 'VERIFICATION_TOKEN_EXPIRED_ERROR',
  VerificationTokenInvalidError = 'VERIFICATION_TOKEN_INVALID_ERROR'
}

export type ErrorResult = {
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type FacebookAuthInput = {
  id: Scalars['String'];
  user: FacebookAuthUserInput;
};

export type FacebookAuthUserInput = {
  email?: InputMaybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type Facet = Node & {
  __typename?: 'Facet';
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  translations: Array<FacetTranslation>;
  updatedAt: Scalars['DateTime'];
  values: Array<FacetValue>;
};

export type FacetFilterParameter = {
  code?: InputMaybe<StringOperators>;
  createdAt?: InputMaybe<DateOperators>;
  id?: InputMaybe<IdOperators>;
  languageCode?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type FacetList = PaginatedList & {
  __typename?: 'FacetList';
  items: Array<Facet>;
  totalItems: Scalars['Int'];
};

export type FacetListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<FacetFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<FacetSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']>;
};

export type FacetSortParameter = {
  code?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type FacetTranslation = {
  __typename?: 'FacetTranslation';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type FacetValue = Node & {
  __typename?: 'FacetValue';
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  facet: Facet;
  id: Scalars['ID'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  translations: Array<FacetValueTranslation>;
  updatedAt: Scalars['DateTime'];
};

/**
 * Used to construct boolean expressions for filtering search results
 * by FacetValue ID. Examples:
 *
 * * ID=1 OR ID=2: `{ facetValueFilters: [{ or: [1,2] }] }`
 * * ID=1 AND ID=2: `{ facetValueFilters: [{ and: 1 }, { and: 2 }] }`
 * * ID=1 AND (ID=2 OR ID=3): `{ facetValueFilters: [{ and: 1 }, { or: [2,3] }] }`
 */
export type FacetValueFilterInput = {
  and?: InputMaybe<Scalars['ID']>;
  or?: InputMaybe<Array<Scalars['ID']>>;
};

/**
 * Which FacetValues are present in the products returned
 * by the search, and in what quantity.
 */
export type FacetValueResult = {
  __typename?: 'FacetValueResult';
  count: Scalars['Int'];
  facetValue: FacetValue;
};

export type FacetValueTranslation = {
  __typename?: 'FacetValueTranslation';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Favorite = Node & {
  __typename?: 'Favorite';
  customer: Customer;
  id: Scalars['ID'];
  productVariant: ProductVariant;
};

export type FavoriteFilterParameter = {
  collectionId?: InputMaybe<IdOperators>;
  id?: InputMaybe<IdOperators>;
};

export type FavoriteList = PaginatedList & {
  __typename?: 'FavoriteList';
  items: Array<Favorite>;
  totalItems: Scalars['Int'];
};

export type FavoriteListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<FavoriteFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<FavoriteSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']>;
};

export type FavoriteSortParameter = {
  id?: InputMaybe<SortOrder>;
};

export type FloatCustomFieldConfig = CustomField & {
  __typename?: 'FloatCustomFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  internal?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Array<LocalizedString>>;
  list: Scalars['Boolean'];
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  nullable?: Maybe<Scalars['Boolean']>;
  readonly?: Maybe<Scalars['Boolean']>;
  step?: Maybe<Scalars['Float']>;
  type: Scalars['String'];
  ui?: Maybe<Scalars['JSON']>;
};

export type Fulfillment = Node & {
  __typename?: 'Fulfillment';
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  method: Scalars['String'];
  orderItems: Array<OrderItem>;
  state: Scalars['String'];
  summary: Array<FulfillmentLineSummary>;
  trackingCode?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type FulfillmentLineSummary = {
  __typename?: 'FulfillmentLineSummary';
  orderLine: OrderLine;
  quantity: Scalars['Int'];
};

export type GiftCoupon = Node & {
  __typename?: 'GiftCoupon';
  activatedAt?: Maybe<Scalars['DateTime']>;
  code?: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
  couponNumber: Scalars['Int'];
  createdBy?: Maybe<Scalars['ID']>;
  currentValue: Scalars['Float'];
  expiresAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  initialValue: Scalars['Float'];
  status?: Maybe<Scalars['String']>;
};

export enum GlobalFlag {
  False = 'FALSE',
  Inherit = 'INHERIT',
  True = 'TRUE'
}

export type GoogleAuthInput = {
  token: Scalars['String'];
};

export type HistoryEntry = Node & {
  __typename?: 'HistoryEntry';
  createdAt: Scalars['DateTime'];
  data: Scalars['JSON'];
  id: Scalars['ID'];
  type: HistoryEntryType;
  updatedAt: Scalars['DateTime'];
};

export type HistoryEntryFilterParameter = {
  createdAt?: InputMaybe<DateOperators>;
  id?: InputMaybe<IdOperators>;
  type?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type HistoryEntryList = PaginatedList & {
  __typename?: 'HistoryEntryList';
  items: Array<HistoryEntry>;
  totalItems: Scalars['Int'];
};

export type HistoryEntryListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<HistoryEntryFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<HistoryEntrySortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']>;
};

export type HistoryEntrySortParameter = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum HistoryEntryType {
  CustomerAddedToGroup = 'CUSTOMER_ADDED_TO_GROUP',
  CustomerAddressCreated = 'CUSTOMER_ADDRESS_CREATED',
  CustomerAddressDeleted = 'CUSTOMER_ADDRESS_DELETED',
  CustomerAddressUpdated = 'CUSTOMER_ADDRESS_UPDATED',
  CustomerDetailUpdated = 'CUSTOMER_DETAIL_UPDATED',
  CustomerEmailUpdateRequested = 'CUSTOMER_EMAIL_UPDATE_REQUESTED',
  CustomerEmailUpdateVerified = 'CUSTOMER_EMAIL_UPDATE_VERIFIED',
  CustomerNote = 'CUSTOMER_NOTE',
  CustomerPasswordResetRequested = 'CUSTOMER_PASSWORD_RESET_REQUESTED',
  CustomerPasswordResetVerified = 'CUSTOMER_PASSWORD_RESET_VERIFIED',
  CustomerPasswordUpdated = 'CUSTOMER_PASSWORD_UPDATED',
  CustomerRegistered = 'CUSTOMER_REGISTERED',
  CustomerRemovedFromGroup = 'CUSTOMER_REMOVED_FROM_GROUP',
  CustomerVerified = 'CUSTOMER_VERIFIED',
  OrderCancellation = 'ORDER_CANCELLATION',
  OrderCouponApplied = 'ORDER_COUPON_APPLIED',
  OrderCouponRemoved = 'ORDER_COUPON_REMOVED',
  OrderFulfillment = 'ORDER_FULFILLMENT',
  OrderFulfillmentTransition = 'ORDER_FULFILLMENT_TRANSITION',
  OrderModified = 'ORDER_MODIFIED',
  OrderNote = 'ORDER_NOTE',
  OrderPaymentTransition = 'ORDER_PAYMENT_TRANSITION',
  OrderRefundTransition = 'ORDER_REFUND_TRANSITION',
  OrderStateTransition = 'ORDER_STATE_TRANSITION'
}

export type Holiday = Node & {
  __typename?: 'Holiday';
  description?: Maybe<Scalars['String']>;
  endsAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isFullDay: Scalars['Boolean'];
  province?: Maybe<Scalars['String']>;
  startsAt: Scalars['DateTime'];
  type: Scalars['String'];
};

export type HolidayQueryOptions = {
  fromDate?: InputMaybe<Scalars['DateTime']>;
  province?: InputMaybe<Scalars['String']>;
  toDate?: InputMaybe<Scalars['DateTime']>;
  type?: InputMaybe<Scalars['String']>;
};

/** Operators for filtering on a list of ID fields */
export type IdListOperators = {
  inList: Scalars['ID'];
};

/** Operators for filtering on an ID field */
export type IdOperators = {
  eq?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  isNull?: InputMaybe<Scalars['Boolean']>;
  notEq?: InputMaybe<Scalars['String']>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
};

/**
 * Returned if the token used to change a Customer's email address is valid, but has
 * expired according to the `verificationTokenDuration` setting in the AuthOptions.
 */
export type IdentifierChangeTokenExpiredError = ErrorResult & {
  __typename?: 'IdentifierChangeTokenExpiredError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/**
 * Returned if the token used to change a Customer's email address is either
 * invalid or does not match any expected tokens.
 */
export type IdentifierChangeTokenInvalidError = ErrorResult & {
  __typename?: 'IdentifierChangeTokenInvalidError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/** Returned when attempting to add a Payment using a PaymentMethod for which the Order is not eligible. */
export type IneligiblePaymentMethodError = ErrorResult & {
  __typename?: 'IneligiblePaymentMethodError';
  eligibilityCheckerMessage?: Maybe<Scalars['String']>;
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/** Returned when attempting to set a ShippingMethod for which the Order is not eligible */
export type IneligibleShippingMethodError = ErrorResult & {
  __typename?: 'IneligibleShippingMethodError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/** Returned when attempting to add more items to the Order than are available */
export type InsufficientStockError = ErrorResult & {
  __typename?: 'InsufficientStockError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  order: Order;
  quantityAvailable: Scalars['Int'];
};

export type IntCustomFieldConfig = CustomField & {
  __typename?: 'IntCustomFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  internal?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Array<LocalizedString>>;
  list: Scalars['Boolean'];
  max?: Maybe<Scalars['Int']>;
  min?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  nullable?: Maybe<Scalars['Boolean']>;
  readonly?: Maybe<Scalars['Boolean']>;
  step?: Maybe<Scalars['Int']>;
  type: Scalars['String'];
  ui?: Maybe<Scalars['JSON']>;
};

/** Returned if the user authentication credentials are not valid */
export type InvalidCredentialsError = ErrorResult & {
  __typename?: 'InvalidCredentialsError';
  authenticationError: Scalars['String'];
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type Invoice = {
  __typename?: 'Invoice';
  createdAt?: Maybe<Scalars['DateTime']>;
  customerEmail: Scalars['String'];
  downloadUrl: Scalars['String'];
  id: Scalars['ID'];
  invoiceNumber: Scalars['Int'];
  orderCode: Scalars['String'];
  orderId: Scalars['String'];
};

/**
 * @description
 * Languages in the form of a ISO 639-1 language code with optional
 * region or script modifier (e.g. de_AT). The selection available is based
 * on the [Unicode CLDR summary list](https://unicode-org.github.io/cldr-staging/charts/37/summary/root.html)
 * and includes the major spoken languages of the world and any widely-used variants.
 *
 * @docsCategory common
 */
export enum LanguageCode {
  /** Afrikaans */
  Af = 'af',
  /** Akan */
  Ak = 'ak',
  /** Amharic */
  Am = 'am',
  /** Arabic */
  Ar = 'ar',
  /** Assamese */
  As = 'as',
  /** Azerbaijani */
  Az = 'az',
  /** Belarusian */
  Be = 'be',
  /** Bulgarian */
  Bg = 'bg',
  /** Bambara */
  Bm = 'bm',
  /** Bangla */
  Bn = 'bn',
  /** Tibetan */
  Bo = 'bo',
  /** Breton */
  Br = 'br',
  /** Bosnian */
  Bs = 'bs',
  /** Catalan */
  Ca = 'ca',
  /** Chechen */
  Ce = 'ce',
  /** Corsican */
  Co = 'co',
  /** Czech */
  Cs = 'cs',
  /** Church Slavic */
  Cu = 'cu',
  /** Welsh */
  Cy = 'cy',
  /** Danish */
  Da = 'da',
  /** German */
  De = 'de',
  /** Austrian German */
  DeAt = 'de_AT',
  /** Swiss High German */
  DeCh = 'de_CH',
  /** Dzongkha */
  Dz = 'dz',
  /** Ewe */
  Ee = 'ee',
  /** Greek */
  El = 'el',
  /** English */
  En = 'en',
  /** Australian English */
  EnAu = 'en_AU',
  /** Canadian English */
  EnCa = 'en_CA',
  /** British English */
  EnGb = 'en_GB',
  /** American English */
  EnUs = 'en_US',
  /** Esperanto */
  Eo = 'eo',
  /** Spanish */
  Es = 'es',
  /** European Spanish */
  EsEs = 'es_ES',
  /** Mexican Spanish */
  EsMx = 'es_MX',
  /** Estonian */
  Et = 'et',
  /** Basque */
  Eu = 'eu',
  /** Persian */
  Fa = 'fa',
  /** Dari */
  FaAf = 'fa_AF',
  /** Fulah */
  Ff = 'ff',
  /** Finnish */
  Fi = 'fi',
  /** Faroese */
  Fo = 'fo',
  /** French */
  Fr = 'fr',
  /** Canadian French */
  FrCa = 'fr_CA',
  /** Swiss French */
  FrCh = 'fr_CH',
  /** Western Frisian */
  Fy = 'fy',
  /** Irish */
  Ga = 'ga',
  /** Scottish Gaelic */
  Gd = 'gd',
  /** Galician */
  Gl = 'gl',
  /** Gujarati */
  Gu = 'gu',
  /** Manx */
  Gv = 'gv',
  /** Hausa */
  Ha = 'ha',
  /** Hebrew */
  He = 'he',
  /** Hindi */
  Hi = 'hi',
  /** Croatian */
  Hr = 'hr',
  /** Haitian Creole */
  Ht = 'ht',
  /** Hungarian */
  Hu = 'hu',
  /** Armenian */
  Hy = 'hy',
  /** Interlingua */
  Ia = 'ia',
  /** Indonesian */
  Id = 'id',
  /** Igbo */
  Ig = 'ig',
  /** Sichuan Yi */
  Ii = 'ii',
  /** Icelandic */
  Is = 'is',
  /** Italian */
  It = 'it',
  /** Japanese */
  Ja = 'ja',
  /** Javanese */
  Jv = 'jv',
  /** Georgian */
  Ka = 'ka',
  /** Kikuyu */
  Ki = 'ki',
  /** Kazakh */
  Kk = 'kk',
  /** Kalaallisut */
  Kl = 'kl',
  /** Khmer */
  Km = 'km',
  /** Kannada */
  Kn = 'kn',
  /** Korean */
  Ko = 'ko',
  /** Kashmiri */
  Ks = 'ks',
  /** Kurdish */
  Ku = 'ku',
  /** Cornish */
  Kw = 'kw',
  /** Kyrgyz */
  Ky = 'ky',
  /** Latin */
  La = 'la',
  /** Luxembourgish */
  Lb = 'lb',
  /** Ganda */
  Lg = 'lg',
  /** Lingala */
  Ln = 'ln',
  /** Lao */
  Lo = 'lo',
  /** Lithuanian */
  Lt = 'lt',
  /** Luba-Katanga */
  Lu = 'lu',
  /** Latvian */
  Lv = 'lv',
  /** Malagasy */
  Mg = 'mg',
  /** Maori */
  Mi = 'mi',
  /** Macedonian */
  Mk = 'mk',
  /** Malayalam */
  Ml = 'ml',
  /** Mongolian */
  Mn = 'mn',
  /** Marathi */
  Mr = 'mr',
  /** Malay */
  Ms = 'ms',
  /** Maltese */
  Mt = 'mt',
  /** Burmese */
  My = 'my',
  /** Norwegian Bokmål */
  Nb = 'nb',
  /** North Ndebele */
  Nd = 'nd',
  /** Nepali */
  Ne = 'ne',
  /** Dutch */
  Nl = 'nl',
  /** Flemish */
  NlBe = 'nl_BE',
  /** Norwegian Nynorsk */
  Nn = 'nn',
  /** Nyanja */
  Ny = 'ny',
  /** Oromo */
  Om = 'om',
  /** Odia */
  Or = 'or',
  /** Ossetic */
  Os = 'os',
  /** Punjabi */
  Pa = 'pa',
  /** Polish */
  Pl = 'pl',
  /** Pashto */
  Ps = 'ps',
  /** Portuguese */
  Pt = 'pt',
  /** Brazilian Portuguese */
  PtBr = 'pt_BR',
  /** European Portuguese */
  PtPt = 'pt_PT',
  /** Quechua */
  Qu = 'qu',
  /** Romansh */
  Rm = 'rm',
  /** Rundi */
  Rn = 'rn',
  /** Romanian */
  Ro = 'ro',
  /** Moldavian */
  RoMd = 'ro_MD',
  /** Russian */
  Ru = 'ru',
  /** Kinyarwanda */
  Rw = 'rw',
  /** Sanskrit */
  Sa = 'sa',
  /** Sindhi */
  Sd = 'sd',
  /** Northern Sami */
  Se = 'se',
  /** Sango */
  Sg = 'sg',
  /** Sinhala */
  Si = 'si',
  /** Slovak */
  Sk = 'sk',
  /** Slovenian */
  Sl = 'sl',
  /** Samoan */
  Sm = 'sm',
  /** Shona */
  Sn = 'sn',
  /** Somali */
  So = 'so',
  /** Albanian */
  Sq = 'sq',
  /** Serbian */
  Sr = 'sr',
  /** Southern Sotho */
  St = 'st',
  /** Sundanese */
  Su = 'su',
  /** Swedish */
  Sv = 'sv',
  /** Swahili */
  Sw = 'sw',
  /** Congo Swahili */
  SwCd = 'sw_CD',
  /** Tamil */
  Ta = 'ta',
  /** Telugu */
  Te = 'te',
  /** Tajik */
  Tg = 'tg',
  /** Thai */
  Th = 'th',
  /** Tigrinya */
  Ti = 'ti',
  /** Turkmen */
  Tk = 'tk',
  /** Tongan */
  To = 'to',
  /** Turkish */
  Tr = 'tr',
  /** Tatar */
  Tt = 'tt',
  /** Uyghur */
  Ug = 'ug',
  /** Ukrainian */
  Uk = 'uk',
  /** Urdu */
  Ur = 'ur',
  /** Uzbek */
  Uz = 'uz',
  /** Vietnamese */
  Vi = 'vi',
  /** Volapük */
  Vo = 'vo',
  /** Wolof */
  Wo = 'wo',
  /** Xhosa */
  Xh = 'xh',
  /** Yiddish */
  Yi = 'yi',
  /** Yoruba */
  Yo = 'yo',
  /** Chinese */
  Zh = 'zh',
  /** Simplified Chinese */
  ZhHans = 'zh_Hans',
  /** Traditional Chinese */
  ZhHant = 'zh_Hant',
  /** Zulu */
  Zu = 'zu'
}

export type LocaleStringCustomFieldConfig = CustomField & {
  __typename?: 'LocaleStringCustomFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  internal?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Array<LocalizedString>>;
  length?: Maybe<Scalars['Int']>;
  list: Scalars['Boolean'];
  name: Scalars['String'];
  nullable?: Maybe<Scalars['Boolean']>;
  pattern?: Maybe<Scalars['String']>;
  readonly?: Maybe<Scalars['Boolean']>;
  type: Scalars['String'];
  ui?: Maybe<Scalars['JSON']>;
};

export type LocalizedString = {
  __typename?: 'LocalizedString';
  languageCode: LanguageCode;
  value: Scalars['String'];
};

export enum LogicalOperator {
  And = 'AND',
  Or = 'OR'
}

/** Returned when attempting to register or verify a customer account without a password, when one is required. */
export type MissingPasswordError = ErrorResult & {
  __typename?: 'MissingPasswordError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addGiftCouponToWallet: Wallet;
  /** Adds an item to the order. If custom fields are defined on the OrderLine entity, a third argument 'customFields' will be available. */
  addItemToOrder: UpdateOrderItemsResult;
  addItemsToOrder: UpdateOrderItemsResult;
  /** Add a Payment to the Order */
  addPaymentToOrder: AddPaymentToOrderResult;
  /** Adjusts an OrderLine. If custom fields are defined on the OrderLine entity, a third argument 'customFields' of type `OrderLineCustomFieldsInput` will be available. */
  adjustOrderLine: UpdateOrderItemsResult;
  adjustOrderLines: UpdateOrderItemsResult;
  adjustProductVariantInOrder: UpdateOrderItemsResult;
  /** Applies the given coupon code to the active Order */
  applyCouponCode: ApplyCouponCodeResult;
  applyGiftCouponCode: Order;
  applyWalletTotal: Order;
  /** Authenticates the user using a named authentication strategy */
  authenticate: AuthenticationResult;
  /** Create a new Customer Address */
  createCustomerAddress: Address;
  createPaypalPayment?: Maybe<Scalars['String']>;
  createProductSuggestion?: Maybe<Scalars['Boolean']>;
  createSetupIntent: SetupIntent;
  createStripePaymentIntent?: Maybe<Scalars['String']>;
  createWaitingList: WaitingList;
  deleteCustomer: DeletionResponse;
  /** Delete an existing Address */
  deleteCustomerAddress: Success;
  deleteSavedPaymentMethod?: Maybe<Scalars['Boolean']>;
  /** Authenticates the user using the native authentication strategy. This mutation is an alias for `authenticate({ native: { ... }})` */
  login: NativeAuthenticationResult;
  /** End the current authenticated session */
  logout: Success;
  logoutCustomer: Success;
  markOrderAsInactive?: Maybe<Scalars['Boolean']>;
  /** Regenerate and send a verification token for a new Customer registration. Only applicable if `authOptions.requireVerification` is set to true. */
  refreshCustomerVerification: RefreshCustomerVerificationResult;
  /**
   * Register a Customer account with the given credentials. There are three possible registration flows:
   *
   * _If `authOptions.requireVerification` is set to `true`:_
   *
   * 1. **The Customer is registered _with_ a password**. A verificationToken will be created (and typically emailed to the Customer). That
   *    verificationToken would then be passed to the `verifyCustomerAccount` mutation _without_ a password. The Customer is then
   *    verified and authenticated in one step.
   * 2. **The Customer is registered _without_ a password**. A verificationToken will be created (and typically emailed to the Customer). That
   *    verificationToken would then be passed to the `verifyCustomerAccount` mutation _with_ the chosen password of the Customer. The Customer is then
   *    verified and authenticated in one step.
   *
   * _If `authOptions.requireVerification` is set to `false`:_
   *
   * 3. The Customer _must_ be registered _with_ a password. No further action is needed - the Customer is able to authenticate immediately.
   */
  registerCustomerAccount: RegisterCustomerAccountResult;
  /** Remove all OrderLine from the Order */
  removeAllOrderLines: RemoveOrderItemsResult;
  /** Removes the given coupon code from the active Order */
  removeCouponCode?: Maybe<Order>;
  removeGiftCouponCode: Order;
  removeItemFromOrder: UpdateOrderItemsResult;
  /** Remove an OrderLine from the Order */
  removeOrderLine: RemoveOrderItemsResult;
  removeWalletTotal: Order;
  requestOrderComplaint?: Maybe<Scalars['Boolean']>;
  /** Requests a password reset email to be sent */
  requestPasswordReset?: Maybe<RequestPasswordResetResult>;
  /**
   * Request to update the emailAddress of the active Customer. If `authOptions.requireVerification` is enabled
   * (as is the default), then the `identifierChangeToken` will be assigned to the current User and
   * a IdentifierChangeRequestEvent will be raised. This can then be used e.g. by the EmailPlugin to email
   * that verification token to the Customer, which is then used to verify the change of email address.
   */
  requestUpdateCustomerEmailAddress: RequestUpdateCustomerEmailAddressResult;
  requestWalletPayout?: Maybe<Scalars['Boolean']>;
  /** Resets a Customer's password based on the provided token */
  resetPassword: ResetPasswordResult;
  /** Set the Customer for the Order. Required only if the Customer is not currently logged in */
  setCustomerForOrder: SetCustomerForOrderResult;
  /** Sets the billing address for this order */
  setOrderBillingAddress: ActiveOrderResult;
  /** Allows any custom fields to be set for the active order */
  setOrderCustomFields: ActiveOrderResult;
  /** Sets the shipping address for this order */
  setOrderShippingAddress: ActiveOrderResult;
  /** Sets the shipping method by id, which can be obtained with the `eligibleShippingMethods` query */
  setOrderShippingMethod: SetOrderShippingMethodResult;
  subscribeToNewsletter?: Maybe<Scalars['Boolean']>;
  toggleFavorite?: Maybe<Scalars['Boolean']>;
  /** Transitions an Order to a new state. Valid next states can be found by querying `nextOrderStates` */
  transitionOrderToState?: Maybe<TransitionOrderToStateResult>;
  unsubscribeFromNewsletter?: Maybe<Scalars['Boolean']>;
  /** Update an existing Customer */
  updateCustomer: Customer;
  /** Update an existing Address */
  updateCustomerAddress: Address;
  /**
   * Confirm the update of the emailAddress with the provided token, which has been generated by the
   * `requestUpdateCustomerEmailAddress` mutation.
   */
  updateCustomerEmailAddress: UpdateCustomerEmailAddressResult;
  /** Update the password of the active Customer */
  updateCustomerPassword: UpdateCustomerPasswordResult;
  updateOrderDeliveryDate: Order;
  /**
   * Verify a Customer email address with the token sent to that address. Only applicable if `authOptions.requireVerification` is set to true.
   *
   * If the Customer was not registered with a password in the `registerCustomerAccount` mutation, the password _must_ be
   * provided here.
   */
  verifyCustomerAccount: VerifyCustomerAccountResult;
};


export type MutationAddGiftCouponToWalletArgs = {
  giftCouponCode: Scalars['String'];
};


export type MutationAddItemToOrderArgs = {
  productVariantId: Scalars['ID'];
  quantity: Scalars['Int'];
};


export type MutationAddItemsToOrderArgs = {
  items: Array<AddItemsToOrderInput>;
};


export type MutationAddPaymentToOrderArgs = {
  input: PaymentInput;
};


export type MutationAdjustOrderLineArgs = {
  orderLineId: Scalars['ID'];
  quantity: Scalars['Int'];
};


export type MutationAdjustOrderLinesArgs = {
  items: Array<AdjustOrderLineInput>;
};


export type MutationAdjustProductVariantInOrderArgs = {
  productVariantId: Scalars['ID'];
  quantity: Scalars['Int'];
};


export type MutationApplyCouponCodeArgs = {
  couponCode: Scalars['String'];
};


export type MutationApplyGiftCouponCodeArgs = {
  code: Scalars['String'];
};


export type MutationAuthenticateArgs = {
  input: AuthenticationInput;
  rememberMe?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCreateCustomerAddressArgs = {
  input: CreateAddressInput;
};


export type MutationCreateProductSuggestionArgs = {
  productName: Scalars['String'];
};


export type MutationCreateWaitingListArgs = {
  input: CreateWaitingListInput;
};


export type MutationDeleteCustomerAddressArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteSavedPaymentMethodArgs = {
  paymentMethodId: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  rememberMe?: InputMaybe<Scalars['Boolean']>;
  username: Scalars['String'];
};


export type MutationRefreshCustomerVerificationArgs = {
  emailAddress: Scalars['String'];
};


export type MutationRegisterCustomerAccountArgs = {
  input: RegisterCustomerInput;
};


export type MutationRemoveCouponCodeArgs = {
  couponCode: Scalars['String'];
};


export type MutationRemoveGiftCouponCodeArgs = {
  code: Scalars['String'];
};


export type MutationRemoveItemFromOrderArgs = {
  productVariantId: Scalars['ID'];
  quantity: Scalars['Int'];
};


export type MutationRemoveOrderLineArgs = {
  orderLineId: Scalars['ID'];
};


export type MutationRequestOrderComplaintArgs = {
  input: RequestOrderComplaintInput;
};


export type MutationRequestPasswordResetArgs = {
  emailAddress: Scalars['String'];
};


export type MutationRequestUpdateCustomerEmailAddressArgs = {
  newEmailAddress: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRequestWalletPayoutArgs = {
  amount: Scalars['Int'];
};


export type MutationResetPasswordArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationSetCustomerForOrderArgs = {
  input: CreateCustomerInput;
};


export type MutationSetOrderBillingAddressArgs = {
  input: CreateAddressInput;
};


export type MutationSetOrderCustomFieldsArgs = {
  input: UpdateOrderInput;
};


export type MutationSetOrderShippingAddressArgs = {
  input: CreateAddressInput;
};


export type MutationSetOrderShippingMethodArgs = {
  shippingMethodId: Scalars['ID'];
};


export type MutationToggleFavoriteArgs = {
  productVariantId: Scalars['String'];
};


export type MutationTransitionOrderToStateArgs = {
  state: Scalars['String'];
};


export type MutationUpdateCustomerArgs = {
  input: UpdateCustomerInput;
};


export type MutationUpdateCustomerAddressArgs = {
  input: UpdateAddressInput;
};


export type MutationUpdateCustomerEmailAddressArgs = {
  token: Scalars['String'];
};


export type MutationUpdateCustomerPasswordArgs = {
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationUpdateOrderDeliveryDateArgs = {
  deliveryDateId: Scalars['ID'];
};


export type MutationVerifyCustomerAccountArgs = {
  password?: InputMaybe<Scalars['String']>;
  token: Scalars['String'];
};

export type NativeAuthInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

/** Returned when attempting an operation that relies on the NativeAuthStrategy, if that strategy is not configured. */
export type NativeAuthStrategyError = ErrorResult & {
  __typename?: 'NativeAuthStrategyError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type NativeAuthenticationResult = CurrentUser | InvalidCredentialsError | NativeAuthStrategyError | NotVerifiedError;

/** Returned when attempting to set a negative OrderLine quantity. */
export type NegativeQuantityError = ErrorResult & {
  __typename?: 'NegativeQuantityError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/**
 * Returned when invoking a mutation which depends on there being an active Order on the
 * current session.
 */
export type NoActiveOrderError = ErrorResult & {
  __typename?: 'NoActiveOrderError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type Node = {
  id: Scalars['ID'];
};

/**
 * Returned if `authOptions.requireVerification` is set to `true` (which is the default)
 * and an unverified user attempts to authenticate.
 */
export type NotVerifiedError = ErrorResult & {
  __typename?: 'NotVerifiedError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/** Operators for filtering on a list of Number fields */
export type NumberListOperators = {
  inList: Scalars['Float'];
};

/** Operators for filtering on a Int or Float field */
export type NumberOperators = {
  between?: InputMaybe<NumberRange>;
  eq?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  isNull?: InputMaybe<Scalars['Boolean']>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
};

export type NumberRange = {
  end: Scalars['Float'];
  start: Scalars['Float'];
};

export type Order = Node & {
  __typename?: 'Order';
  /** An order is active as long as the payment process has not been completed */
  active: Scalars['Boolean'];
  billingAddress?: Maybe<OrderAddress>;
  /** A unique code for the Order */
  code: Scalars['String'];
  /** An array of all coupon codes applied to the Order */
  couponCodes: Array<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  currencyCode: CurrencyCode;
  customFields?: Maybe<OrderCustomFields>;
  customer?: Maybe<Customer>;
  discounts: Array<Discount>;
  fulfillments?: Maybe<Array<Fulfillment>>;
  history: HistoryEntryList;
  id: Scalars['ID'];
  lines: Array<OrderLine>;
  missingAmountToFreeShipping?: Maybe<Scalars['Int']>;
  missingAmountToMOV?: Maybe<Scalars['Int']>;
  /**
   * The date & time that the Order was placed, i.e. the Customer
   * completed the checkout and the Order is no longer "active"
   */
  orderPlacedAt?: Maybe<Scalars['DateTime']>;
  payments?: Maybe<Array<Payment>>;
  /** Promotions applied to the order. Only gets populated after the payment process has completed. */
  promotions: Array<Promotion>;
  shipping: Scalars['Int'];
  shippingAddress?: Maybe<OrderAddress>;
  shippingLines: Array<ShippingLine>;
  shippingWithTax: Scalars['Int'];
  state: Scalars['String'];
  /**
   * The subTotal is the total of all OrderLines in the Order. This figure also includes any Order-level
   * discounts which have been prorated (proportionally distributed) amongst the OrderItems.
   * To get a total of all OrderLines which does not account for prorated discounts, use the
   * sum of `OrderLine.discountedLinePrice` values.
   */
  subTotal: Scalars['Int'];
  subTotalNoDiscounts?: Maybe<Scalars['Int']>;
  /** Same as subTotal, but inclusive of tax */
  subTotalWithTax: Scalars['Int'];
  /**
   * Surcharges are arbitrary modifications to the Order total which are neither
   * ProductVariants nor discounts resulting from applied Promotions. For example,
   * one-off discounts based on customer interaction, or surcharges based on payment
   * methods.
   */
  surcharges: Array<Surcharge>;
  /** A summary of the taxes being applied to this Order */
  taxSummary: Array<OrderTaxSummary>;
  /** Equal to subTotal plus shipping */
  total: Scalars['Int'];
  totalQuantity: Scalars['Int'];
  /** The final payable amount. Equal to subTotalWithTax plus shippingWithTax */
  totalWithTax: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};


export type OrderHistoryArgs = {
  options?: InputMaybe<HistoryEntryListOptions>;
};

export type OrderAddress = {
  __typename?: 'OrderAddress';
  city?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  customFields?: Maybe<AddressCustomFields>;
  fullName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  streetLine1?: Maybe<Scalars['String']>;
  streetLine2?: Maybe<Scalars['String']>;
};

export type OrderCustomFields = {
  __typename?: 'OrderCustomFields';
  canDropOrder?: Maybe<Scalars['Boolean']>;
  deliveryDate?: Maybe<DeliveryDate>;
  doNotRing?: Maybe<Scalars['Boolean']>;
  earliestDeliveryTime?: Maybe<Scalars['DateTime']>;
  isInvoicePaid?: Maybe<Scalars['Boolean']>;
  latestDeliveryTime?: Maybe<Scalars['DateTime']>;
  notes?: Maybe<Scalars['String']>;
  orderByTimeDate?: Maybe<Scalars['DateTime']>;
  usedWalletValue?: Maybe<Scalars['Int']>;
};

export type OrderFilterParameter = {
  active?: InputMaybe<BooleanOperators>;
  canDropOrder?: InputMaybe<BooleanOperators>;
  code?: InputMaybe<StringOperators>;
  createdAt?: InputMaybe<DateOperators>;
  currencyCode?: InputMaybe<StringOperators>;
  doNotRing?: InputMaybe<BooleanOperators>;
  earliestDeliveryTime?: InputMaybe<DateOperators>;
  id?: InputMaybe<IdOperators>;
  isInvoicePaid?: InputMaybe<BooleanOperators>;
  latestDeliveryTime?: InputMaybe<DateOperators>;
  missingAmountToFreeShipping?: InputMaybe<NumberOperators>;
  missingAmountToMOV?: InputMaybe<NumberOperators>;
  notes?: InputMaybe<StringOperators>;
  orderByTimeDate?: InputMaybe<DateOperators>;
  orderPlacedAt?: InputMaybe<DateOperators>;
  shipping?: InputMaybe<NumberOperators>;
  shippingWithTax?: InputMaybe<NumberOperators>;
  state?: InputMaybe<StringOperators>;
  subTotal?: InputMaybe<NumberOperators>;
  subTotalNoDiscounts?: InputMaybe<NumberOperators>;
  subTotalWithTax?: InputMaybe<NumberOperators>;
  total?: InputMaybe<NumberOperators>;
  totalQuantity?: InputMaybe<NumberOperators>;
  totalWithTax?: InputMaybe<NumberOperators>;
  updatedAt?: InputMaybe<DateOperators>;
  usedWalletValue?: InputMaybe<NumberOperators>;
};

export type OrderItem = Node & {
  __typename?: 'OrderItem';
  adjustments: Array<Adjustment>;
  cancelled: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  /**
   * The price of a single unit including discounts, excluding tax.
   *
   * If Order-level discounts have been applied, this will not be the
   * actual taxable unit price (see `proratedUnitPrice`), but is generally the
   * correct price to display to customers to avoid confusion
   * about the internal handling of distributed Order-level discounts.
   */
  discountedUnitPrice: Scalars['Int'];
  /** The price of a single unit including discounts and tax */
  discountedUnitPriceWithTax: Scalars['Int'];
  fulfillment?: Maybe<Fulfillment>;
  id: Scalars['ID'];
  /**
   * The actual unit price, taking into account both item discounts _and_ prorated (proportionally-distributed)
   * Order-level discounts. This value is the true economic value of the OrderItem, and is used in tax
   * and refund calculations.
   */
  proratedUnitPrice: Scalars['Int'];
  /** The proratedUnitPrice including tax */
  proratedUnitPriceWithTax: Scalars['Int'];
  refundId?: Maybe<Scalars['ID']>;
  taxLines: Array<TaxLine>;
  taxRate: Scalars['Float'];
  /** The price of a single unit, excluding tax and discounts */
  unitPrice: Scalars['Int'];
  /** The price of a single unit, including tax but excluding discounts */
  unitPriceWithTax: Scalars['Int'];
  unitTax: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

/** Returned when the maximum order size limit has been reached. */
export type OrderLimitError = ErrorResult & {
  __typename?: 'OrderLimitError';
  errorCode: ErrorCode;
  maxItems: Scalars['Int'];
  message: Scalars['String'];
};

export type OrderLine = Node & {
  __typename?: 'OrderLine';
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  /** The price of the line including discounts, excluding tax */
  discountedLinePrice: Scalars['Int'];
  /** The price of the line including discounts and tax */
  discountedLinePriceWithTax: Scalars['Int'];
  /**
   * The price of a single unit including discounts, excluding tax.
   *
   * If Order-level discounts have been applied, this will not be the
   * actual taxable unit price (see `proratedUnitPrice`), but is generally the
   * correct price to display to customers to avoid confusion
   * about the internal handling of distributed Order-level discounts.
   */
  discountedUnitPrice: Scalars['Int'];
  /** The price of a single unit including discounts and tax */
  discountedUnitPriceWithTax: Scalars['Int'];
  discounts: Array<Discount>;
  featuredAsset?: Maybe<Asset>;
  fulfillments?: Maybe<Array<Fulfillment>>;
  id: Scalars['ID'];
  items: Array<OrderItem>;
  /** The total price of the line excluding tax and discounts. */
  linePrice: Scalars['Int'];
  /** The total price of the line including tax but excluding discounts. */
  linePriceWithTax: Scalars['Int'];
  /** The total tax on this line */
  lineTax: Scalars['Int'];
  order: Order;
  pricePerUnit?: Maybe<Scalars['String']>;
  productVariant: ProductVariant;
  /**
   * The actual line price, taking into account both item discounts _and_ prorated (proportionally-distributed)
   * Order-level discounts. This value is the true economic value of the OrderLine, and is used in tax
   * and refund calculations.
   */
  proratedLinePrice: Scalars['Int'];
  /** The proratedLinePrice including tax */
  proratedLinePriceWithTax: Scalars['Int'];
  /**
   * The actual unit price, taking into account both item discounts _and_ prorated (proportionally-distributed)
   * Order-level discounts. This value is the true economic value of the OrderItem, and is used in tax
   * and refund calculations.
   */
  proratedUnitPrice: Scalars['Int'];
  /** The proratedUnitPrice including tax */
  proratedUnitPriceWithTax: Scalars['Int'];
  quantity: Scalars['Int'];
  taxLines: Array<TaxLine>;
  taxRate: Scalars['Float'];
  /** The price of a single unit, excluding tax and discounts */
  unitPrice: Scalars['Int'];
  /** Non-zero if the unitPrice has changed since it was initially added to Order */
  unitPriceChangeSinceAdded: Scalars['Int'];
  /** The price of a single unit, including tax but excluding discounts */
  unitPriceWithTax: Scalars['Int'];
  /** Non-zero if the unitPriceWithTax has changed since it was initially added to Order */
  unitPriceWithTaxChangeSinceAdded: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type OrderList = PaginatedList & {
  __typename?: 'OrderList';
  items: Array<Order>;
  totalItems: Scalars['Int'];
};

export type OrderListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<OrderFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<OrderSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']>;
};

/** Returned when attempting to modify the contents of an Order that is not in the `AddingItems` state. */
export type OrderModificationError = ErrorResult & {
  __typename?: 'OrderModificationError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/** Returned when attempting to add a Payment to an Order that is not in the `ArrangingPayment` state. */
export type OrderPaymentStateError = ErrorResult & {
  __typename?: 'OrderPaymentStateError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type OrderSortParameter = {
  canDropOrder?: InputMaybe<SortOrder>;
  code?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  deliveryDate?: InputMaybe<SortOrder>;
  doNotRing?: InputMaybe<SortOrder>;
  earliestDeliveryTime?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isInvoicePaid?: InputMaybe<SortOrder>;
  latestDeliveryTime?: InputMaybe<SortOrder>;
  missingAmountToFreeShipping?: InputMaybe<SortOrder>;
  missingAmountToMOV?: InputMaybe<SortOrder>;
  notes?: InputMaybe<SortOrder>;
  orderByTimeDate?: InputMaybe<SortOrder>;
  orderPlacedAt?: InputMaybe<SortOrder>;
  shipping?: InputMaybe<SortOrder>;
  shippingWithTax?: InputMaybe<SortOrder>;
  state?: InputMaybe<SortOrder>;
  subTotal?: InputMaybe<SortOrder>;
  subTotalNoDiscounts?: InputMaybe<SortOrder>;
  subTotalWithTax?: InputMaybe<SortOrder>;
  total?: InputMaybe<SortOrder>;
  totalQuantity?: InputMaybe<SortOrder>;
  totalWithTax?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  usedWalletValue?: InputMaybe<SortOrder>;
};

/** Returned if there is an error in transitioning the Order state */
export type OrderStateTransitionError = ErrorResult & {
  __typename?: 'OrderStateTransitionError';
  errorCode: ErrorCode;
  fromState: Scalars['String'];
  message: Scalars['String'];
  toState: Scalars['String'];
  transitionError: Scalars['String'];
};

/**
 * A summary of the taxes being applied to this order, grouped
 * by taxRate.
 */
export type OrderTaxSummary = {
  __typename?: 'OrderTaxSummary';
  /** A description of this tax */
  description: Scalars['String'];
  /** The total net price or OrderItems to which this taxRate applies */
  taxBase: Scalars['Int'];
  /** The taxRate as a percentage */
  taxRate: Scalars['Float'];
  /** The total tax being applied to the Order at this taxRate */
  taxTotal: Scalars['Int'];
};

export type PaginatedList = {
  items: Array<Node>;
  totalItems: Scalars['Int'];
};

export type PartialStripeBillingDetails = {
  __typename?: 'PartialStripeBillingDetails';
  name?: Maybe<Scalars['String']>;
};

export type PartialStripePaymentMethod = {
  __typename?: 'PartialStripePaymentMethod';
  billing_details?: Maybe<PartialStripeBillingDetails>;
  card?: Maybe<PartialStripePaymentMethodCard>;
  id?: Maybe<Scalars['String']>;
  sepa_debit?: Maybe<PartialStripePaymentMethodSepaDebit>;
  type: Scalars['String'];
};

export type PartialStripePaymentMethodCard = {
  __typename?: 'PartialStripePaymentMethodCard';
  brand: Scalars['String'];
  exp_month: Scalars['Int'];
  exp_year: Scalars['Int'];
  issuer?: Maybe<Scalars['String']>;
  last4: Scalars['String'];
};

export type PartialStripePaymentMethodSepaDebit = {
  __typename?: 'PartialStripePaymentMethodSepaDebit';
  bank_code?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  last4?: Maybe<Scalars['String']>;
};

/** Returned when attempting to verify a customer account with a password, when a password has already been set. */
export type PasswordAlreadySetError = ErrorResult & {
  __typename?: 'PasswordAlreadySetError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/**
 * Returned if the token used to reset a Customer's password is valid, but has
 * expired according to the `verificationTokenDuration` setting in the AuthOptions.
 */
export type PasswordResetTokenExpiredError = ErrorResult & {
  __typename?: 'PasswordResetTokenExpiredError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/**
 * Returned if the token used to reset a Customer's password is either
 * invalid or does not match any expected tokens.
 */
export type PasswordResetTokenInvalidError = ErrorResult & {
  __typename?: 'PasswordResetTokenInvalidError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/** Returned when attempting to register or verify a customer account where the given password fails password validation. */
export type PasswordValidationError = ErrorResult & {
  __typename?: 'PasswordValidationError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  validationErrorMessage: Scalars['String'];
};

export type Payment = Node & {
  __typename?: 'Payment';
  amount: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  errorMessage?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  metadata?: Maybe<Scalars['JSON']>;
  method: Scalars['String'];
  refunds: Array<Refund>;
  state: Scalars['String'];
  transactionId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

/** Returned when a Payment is declined by the payment provider. */
export type PaymentDeclinedError = ErrorResult & {
  __typename?: 'PaymentDeclinedError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  paymentErrorMessage: Scalars['String'];
};

/** Returned when a Payment fails due to an error. */
export type PaymentFailedError = ErrorResult & {
  __typename?: 'PaymentFailedError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  paymentErrorMessage: Scalars['String'];
};

/** Passed as input to the `addPaymentToOrder` mutation. */
export type PaymentInput = {
  /**
   * This field should contain arbitrary data passed to the specified PaymentMethodHandler's `createPayment()` method
   * as the "metadata" argument. For example, it could contain an ID for the payment and other
   * data generated by the payment provider.
   */
  metadata: Scalars['JSON'];
  /** This field should correspond to the `code` property of a PaymentMethod. */
  method: Scalars['String'];
};

export type PaymentMethod = Node & {
  __typename?: 'PaymentMethod';
  checker?: Maybe<ConfigurableOperation>;
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  description: Scalars['String'];
  enabled: Scalars['Boolean'];
  handler: ConfigurableOperation;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type PaymentMethodQuote = {
  __typename?: 'PaymentMethodQuote';
  code: Scalars['String'];
  customFields?: Maybe<Scalars['JSON']>;
  description: Scalars['String'];
  eligibilityMessage?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isEligible: Scalars['Boolean'];
  name: Scalars['String'];
};

/**
 * @description
 * Permissions for administrators and customers. Used to control access to
 * GraphQL resolvers via the {@link Allow} decorator.
 *
 * ## Understanding Permission.Owner
 *
 * `Permission.Owner` is a special permission which is used in some Vendure resolvers to indicate that that resolver should only
 * be accessible to the "owner" of that resource.
 *
 * For example, the Shop API `activeCustomer` query resolver should only return the Customer object for the "owner" of that Customer, i.e.
 * based on the activeUserId of the current session. As a result, the resolver code looks like this:
 *
 * @example
 * ```TypeScript
 * \@Query()
 * \@Allow(Permission.Owner)
 * async activeCustomer(\@Ctx() ctx: RequestContext): Promise<Customer | undefined> {
 *   const userId = ctx.activeUserId;
 *   if (userId) {
 *     return this.customerService.findOneByUserId(ctx, userId);
 *   }
 * }
 * ```
 *
 * Here we can see that the "ownership" must be enforced by custom logic inside the resolver. Since "ownership" cannot be defined generally
 * nor statically encoded at build-time, any resolvers using `Permission.Owner` **must** include logic to enforce that only the owner
 * of the resource has access. If not, then it is the equivalent of using `Permission.Public`.
 *
 *
 * @docsCategory common
 */
export enum Permission {
  /** Allow this user to download different csv export files - for support users only */
  AllowCsvExport = 'AllowCSVExport',
  /** Grants permissions on AllowDeliveryDateCapacity operations */
  AllowDeliveryDateCapacity = 'AllowDeliveryDateCapacity',
  /** Allow this user to enable invoice generation */
  AllowInvoicesPermission = 'AllowInvoicesPermission',
  /** Allow this user to import csv product files into the system - for support users only */
  AllowProductImport = 'AllowProductImport',
  /** Authenticated means simply that the user is logged in */
  Authenticated = 'Authenticated',
  /** Grants permission to create Administrator */
  CreateAdministrator = 'CreateAdministrator',
  /** Grants permission to create Asset */
  CreateAsset = 'CreateAsset',
  /** Grants permission to create Products, Facets, Assets, Collections */
  CreateCatalog = 'CreateCatalog',
  /** Grants permission to create Channel */
  CreateChannel = 'CreateChannel',
  /** Grants permission to create Collection */
  CreateCollection = 'CreateCollection',
  /** Grants permission to create Country */
  CreateCountry = 'CreateCountry',
  /** Grants permission to create Customer */
  CreateCustomer = 'CreateCustomer',
  /** Grants permission to create CustomerGroup */
  CreateCustomerGroup = 'CreateCustomerGroup',
  /** Grants permission to create Facet */
  CreateFacet = 'CreateFacet',
  /** Grants permission to create GiftCoupon */
  CreateGiftCoupon = 'CreateGiftCoupon',
  /** Grants permission to create Order */
  CreateOrder = 'CreateOrder',
  /** Grants permission to create PaymentMethod */
  CreatePaymentMethod = 'CreatePaymentMethod',
  /** Grants permission to create Producer */
  CreateProducer = 'CreateProducer',
  /** Grants permission to create Product */
  CreateProduct = 'CreateProduct',
  /** Grants permission to create ProductSearch */
  CreateProductSearch = 'CreateProductSearch',
  /** Grants permission to create Promotion */
  CreatePromotion = 'CreatePromotion',
  /** Grants permission to create Recipe */
  CreateRecipe = 'CreateRecipe',
  /** Grants permission to create PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
  CreateSettings = 'CreateSettings',
  /** Grants permission to create ShippingMethod */
  CreateShippingMethod = 'CreateShippingMethod',
  /** Grants permission to create Special */
  CreateSpecial = 'CreateSpecial',
  /** Grants permission to create System */
  CreateSystem = 'CreateSystem',
  /** Grants permission to create Tag */
  CreateTag = 'CreateTag',
  /** Grants permission to create TaxCategory */
  CreateTaxCategory = 'CreateTaxCategory',
  /** Grants permission to create TaxRate */
  CreateTaxRate = 'CreateTaxRate',
  /** Grants permission to create Wallet */
  CreateWallet = 'CreateWallet',
  /** Grants permission to create Zone */
  CreateZone = 'CreateZone',
  /** Allow this user to deduct an amount of a customers wallet - for support users only */
  DeductWallet = 'DeductWallet',
  /** Grants permission to delete Administrator */
  DeleteAdministrator = 'DeleteAdministrator',
  /** Grants permission to delete Asset */
  DeleteAsset = 'DeleteAsset',
  /** Grants permission to delete Products, Facets, Assets, Collections */
  DeleteCatalog = 'DeleteCatalog',
  /** Grants permission to delete Channel */
  DeleteChannel = 'DeleteChannel',
  /** Grants permission to delete Collection */
  DeleteCollection = 'DeleteCollection',
  /** Grants permission to delete Country */
  DeleteCountry = 'DeleteCountry',
  /** Grants permission to delete Customer */
  DeleteCustomer = 'DeleteCustomer',
  /** Grants permission to delete CustomerGroup */
  DeleteCustomerGroup = 'DeleteCustomerGroup',
  /** Grants permission to delete Facet */
  DeleteFacet = 'DeleteFacet',
  /** Grants permission to delete GiftCoupon */
  DeleteGiftCoupon = 'DeleteGiftCoupon',
  /** Grants permission to delete Order */
  DeleteOrder = 'DeleteOrder',
  /** Grants permission to delete PaymentMethod */
  DeletePaymentMethod = 'DeletePaymentMethod',
  /** Grants permission to delete Producer */
  DeleteProducer = 'DeleteProducer',
  /** Grants permission to delete Product */
  DeleteProduct = 'DeleteProduct',
  /** Grants permission to delete ProductSearch */
  DeleteProductSearch = 'DeleteProductSearch',
  /** Grants permission to delete Promotion */
  DeletePromotion = 'DeletePromotion',
  /** Grants permission to delete Recipe */
  DeleteRecipe = 'DeleteRecipe',
  /** Grants permission to delete PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
  DeleteSettings = 'DeleteSettings',
  /** Grants permission to delete ShippingMethod */
  DeleteShippingMethod = 'DeleteShippingMethod',
  /** Grants permission to delete Special */
  DeleteSpecial = 'DeleteSpecial',
  /** Grants permission to delete System */
  DeleteSystem = 'DeleteSystem',
  /** Grants permission to delete Tag */
  DeleteTag = 'DeleteTag',
  /** Grants permission to delete TaxCategory */
  DeleteTaxCategory = 'DeleteTaxCategory',
  /** Grants permission to delete TaxRate */
  DeleteTaxRate = 'DeleteTaxRate',
  /** Grants permission to delete Wallet */
  DeleteWallet = 'DeleteWallet',
  /** Grants permission to delete Zone */
  DeleteZone = 'DeleteZone',
  /** Owner means the user owns this entity, e.g. a Customer's own Order */
  Owner = 'Owner',
  /** Public means any unauthenticated user may perform the operation */
  Public = 'Public',
  /** Grants permission to read Administrator */
  ReadAdministrator = 'ReadAdministrator',
  /** Grants permission to read Asset */
  ReadAsset = 'ReadAsset',
  /** Grants permission to read Products, Facets, Assets, Collections */
  ReadCatalog = 'ReadCatalog',
  /** Grants permission to read Channel */
  ReadChannel = 'ReadChannel',
  /** Grants permission to read Collection */
  ReadCollection = 'ReadCollection',
  /** Grants permission to read Country */
  ReadCountry = 'ReadCountry',
  /** Grants permission to read Customer */
  ReadCustomer = 'ReadCustomer',
  /** Grants permission to read CustomerGroup */
  ReadCustomerGroup = 'ReadCustomerGroup',
  /** Grants permission to read Facet */
  ReadFacet = 'ReadFacet',
  /** Grants permission to read GiftCoupon */
  ReadGiftCoupon = 'ReadGiftCoupon',
  /** Grants permission to read Order */
  ReadOrder = 'ReadOrder',
  /** Grants permission to read PaymentMethod */
  ReadPaymentMethod = 'ReadPaymentMethod',
  /** Grants permission to read Producer */
  ReadProducer = 'ReadProducer',
  /** Grants permission to read Product */
  ReadProduct = 'ReadProduct',
  /** Grants permission to read ProductSearch */
  ReadProductSearch = 'ReadProductSearch',
  /** Grants permission to read Promotion */
  ReadPromotion = 'ReadPromotion',
  /** Grants permission to read Recipe */
  ReadRecipe = 'ReadRecipe',
  /** Grants permission to read PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
  ReadSettings = 'ReadSettings',
  /** Grants permission to read ShippingMethod */
  ReadShippingMethod = 'ReadShippingMethod',
  /** Grants permission to read Special */
  ReadSpecial = 'ReadSpecial',
  /** Grants permission to read System */
  ReadSystem = 'ReadSystem',
  /** Grants permission to read Tag */
  ReadTag = 'ReadTag',
  /** Grants permission to read TaxCategory */
  ReadTaxCategory = 'ReadTaxCategory',
  /** Grants permission to read TaxRate */
  ReadTaxRate = 'ReadTaxRate',
  /** Grants permission to read Wallet */
  ReadWallet = 'ReadWallet',
  /** Grants permission to read Zone */
  ReadZone = 'ReadZone',
  /** SuperAdmin has unrestricted access to all operations */
  SuperAdmin = 'SuperAdmin',
  /** Allow this user to top up an amount to a customers wallet - for support users only */
  TopUpWallet = 'TopUpWallet',
  /** Grants permission to update Administrator */
  UpdateAdministrator = 'UpdateAdministrator',
  /** Grants permission to update Asset */
  UpdateAsset = 'UpdateAsset',
  /** Grants permission to update Products, Facets, Assets, Collections */
  UpdateCatalog = 'UpdateCatalog',
  /** Grants permission to update Channel */
  UpdateChannel = 'UpdateChannel',
  /** Grants permission to update Collection */
  UpdateCollection = 'UpdateCollection',
  /** Grants permission to update Country */
  UpdateCountry = 'UpdateCountry',
  /** Grants permission to update Customer */
  UpdateCustomer = 'UpdateCustomer',
  /** Grants permission to update CustomerGroup */
  UpdateCustomerGroup = 'UpdateCustomerGroup',
  /** Grants permission to update Facet */
  UpdateFacet = 'UpdateFacet',
  /** Grants permission to update GiftCoupon */
  UpdateGiftCoupon = 'UpdateGiftCoupon',
  /** Grants permission to update GlobalSettings */
  UpdateGlobalSettings = 'UpdateGlobalSettings',
  /** Grants permission to update Order */
  UpdateOrder = 'UpdateOrder',
  /** Grants permission to update PaymentMethod */
  UpdatePaymentMethod = 'UpdatePaymentMethod',
  /** Grants permission to update Producer */
  UpdateProducer = 'UpdateProducer',
  /** Grants permission to update Product */
  UpdateProduct = 'UpdateProduct',
  /** Grants permission to update ProductSearch */
  UpdateProductSearch = 'UpdateProductSearch',
  /** Grants permission to update Promotion */
  UpdatePromotion = 'UpdatePromotion',
  /** Grants permission to update Recipe */
  UpdateRecipe = 'UpdateRecipe',
  /** Grants permission to update PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
  UpdateSettings = 'UpdateSettings',
  /** Grants permission to update ShippingMethod */
  UpdateShippingMethod = 'UpdateShippingMethod',
  /** Grants permission to update Special */
  UpdateSpecial = 'UpdateSpecial',
  /** Grants permission to update System */
  UpdateSystem = 'UpdateSystem',
  /** Grants permission to update Tag */
  UpdateTag = 'UpdateTag',
  /** Grants permission to update TaxCategory */
  UpdateTaxCategory = 'UpdateTaxCategory',
  /** Grants permission to update TaxRate */
  UpdateTaxRate = 'UpdateTaxRate',
  /** Grants permission to update Wallet */
  UpdateWallet = 'UpdateWallet',
  /** Grants permission to update Zone */
  UpdateZone = 'UpdateZone'
}

/** The price range where the result has more than one price */
export type PriceRange = {
  __typename?: 'PriceRange';
  max: Scalars['Int'];
  min: Scalars['Int'];
};

export type Producer = Node & {
  __typename?: 'Producer';
  address?: Maybe<Address>;
  assets?: Maybe<Array<Asset>>;
  channels?: Maybe<Array<Channel>>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  distance?: Maybe<Scalars['Float']>;
  featuredAsset?: Maybe<Asset>;
  hasDetailsPage?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  status?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type ProducerFilterParameter = {
  createdAt?: InputMaybe<DateOperators>;
  description?: InputMaybe<StringOperators>;
  distance?: InputMaybe<NumberOperators>;
  hasDetailsPage?: InputMaybe<BooleanOperators>;
  id?: InputMaybe<IdOperators>;
  name?: InputMaybe<StringOperators>;
  status?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type ProducerList = PaginatedList & {
  __typename?: 'ProducerList';
  items: Array<Producer>;
  totalItems: Scalars['Int'];
};

export type ProducerListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<ProducerFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<ProducerSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']>;
};

export type ProducerSortParameter = {
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  distance?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type Product = Node & {
  __typename?: 'Product';
  assets: Array<Asset>;
  collections: Array<Collection>;
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<ProductCustomFields>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  enabled?: Maybe<Scalars['Boolean']>;
  facetValues: Array<FacetValue>;
  featuredAsset?: Maybe<Asset>;
  id: Scalars['ID'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  optionGroups: Array<ProductOptionGroup>;
  slug: Scalars['String'];
  translations: Array<ProductTranslation>;
  updatedAt: Scalars['DateTime'];
  /** Returns a paginated, sortable, filterable list of ProductVariants */
  variantList: ProductVariantList;
  /** Returns all ProductVariants */
  variants: Array<ProductVariant>;
};


export type ProductVariantListArgs = {
  options?: InputMaybe<ProductVariantListOptions>;
};

export type ProductCustomFields = {
  __typename?: 'ProductCustomFields';
  additives?: Maybe<Scalars['String']>;
  allergens?: Maybe<Scalars['String']>;
  carbohydrate?: Maybe<Scalars['Float']>;
  fat?: Maybe<Scalars['Float']>;
  ingredients?: Maybe<Scalars['String']>;
  isFreshProduct?: Maybe<Scalars['Boolean']>;
  isGiftCoupon?: Maybe<Scalars['Boolean']>;
  kJ?: Maybe<Scalars['Float']>;
  kcal?: Maybe<Scalars['Float']>;
  orderScore?: Maybe<Scalars['Int']>;
  preparation?: Maybe<Scalars['String']>;
  producer?: Maybe<Producer>;
  protein?: Maybe<Scalars['Float']>;
  salt?: Maybe<Scalars['Float']>;
  saturatedFat?: Maybe<Scalars['Float']>;
  storage?: Maybe<Scalars['String']>;
  sugar?: Maybe<Scalars['Float']>;
};

export type ProductFilterParameter = {
  additives?: InputMaybe<StringOperators>;
  allergens?: InputMaybe<StringOperators>;
  carbohydrate?: InputMaybe<NumberOperators>;
  createdAt?: InputMaybe<DateOperators>;
  deletedAt?: InputMaybe<DateOperators>;
  description?: InputMaybe<StringOperators>;
  enabled?: InputMaybe<BooleanOperators>;
  fat?: InputMaybe<NumberOperators>;
  id?: InputMaybe<IdOperators>;
  ingredients?: InputMaybe<StringOperators>;
  isFreshProduct?: InputMaybe<BooleanOperators>;
  isGiftCoupon?: InputMaybe<BooleanOperators>;
  kJ?: InputMaybe<NumberOperators>;
  kcal?: InputMaybe<NumberOperators>;
  languageCode?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  orderScore?: InputMaybe<NumberOperators>;
  preparation?: InputMaybe<StringOperators>;
  protein?: InputMaybe<NumberOperators>;
  salt?: InputMaybe<NumberOperators>;
  saturatedFat?: InputMaybe<NumberOperators>;
  slug?: InputMaybe<StringOperators>;
  storage?: InputMaybe<StringOperators>;
  sugar?: InputMaybe<NumberOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type ProductList = PaginatedList & {
  __typename?: 'ProductList';
  items: Array<Product>;
  totalItems: Scalars['Int'];
};

export type ProductListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<ProductFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<ProductSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']>;
};

export type ProductOption = Node & {
  __typename?: 'ProductOption';
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  group: ProductOptionGroup;
  groupId: Scalars['ID'];
  id: Scalars['ID'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  translations: Array<ProductOptionTranslation>;
  updatedAt: Scalars['DateTime'];
};

export type ProductOptionGroup = Node & {
  __typename?: 'ProductOptionGroup';
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  options: Array<ProductOption>;
  translations: Array<ProductOptionGroupTranslation>;
  updatedAt: Scalars['DateTime'];
};

export type ProductOptionGroupTranslation = {
  __typename?: 'ProductOptionGroupTranslation';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ProductOptionTranslation = {
  __typename?: 'ProductOptionTranslation';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ProductSearchResult = {
  __typename?: 'ProductSearchResult';
  items: Array<Maybe<ProductVariantDocument>>;
  totalItems?: Maybe<Scalars['Int']>;
};

export type ProductSortParameter = {
  additives?: InputMaybe<SortOrder>;
  allergens?: InputMaybe<SortOrder>;
  carbohydrate?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  deletedAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  fat?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  ingredients?: InputMaybe<SortOrder>;
  isFreshProduct?: InputMaybe<SortOrder>;
  isGiftCoupon?: InputMaybe<SortOrder>;
  kJ?: InputMaybe<SortOrder>;
  kcal?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  orderScore?: InputMaybe<SortOrder>;
  preparation?: InputMaybe<SortOrder>;
  producer?: InputMaybe<SortOrder>;
  protein?: InputMaybe<SortOrder>;
  salt?: InputMaybe<SortOrder>;
  saturatedFat?: InputMaybe<SortOrder>;
  slug?: InputMaybe<SortOrder>;
  storage?: InputMaybe<SortOrder>;
  sugar?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ProductTranslation = {
  __typename?: 'ProductTranslation';
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  slug: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ProductVariant = Node & {
  __typename?: 'ProductVariant';
  assets: Array<Asset>;
  collections?: Maybe<Array<Collection>>;
  createdAt: Scalars['DateTime'];
  currencyCode: CurrencyCode;
  customFields?: Maybe<ProductVariantCustomFields>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  discountPercentage?: Maybe<Scalars['Float']>;
  displayDeposit?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  facetValues: Array<FacetValue>;
  featuredAsset?: Maybe<Asset>;
  id: Scalars['ID'];
  isFavorite?: Maybe<Scalars['Boolean']>;
  languageCode: LanguageCode;
  name: Scalars['String'];
  options: Array<ProductOption>;
  price: Scalars['Int'];
  pricePerUnit?: Maybe<Scalars['String']>;
  priceWithTax: Scalars['Int'];
  product: Product;
  productId: Scalars['ID'];
  sku: Scalars['String'];
  stock?: Maybe<Scalars['Int']>;
  stockLevel: Scalars['String'];
  taxCategory: TaxCategory;
  taxRateApplied: TaxRate;
  translations: Array<ProductVariantTranslation>;
  updatedAt: Scalars['DateTime'];
};

export type ProductVariantCustomFields = {
  __typename?: 'ProductVariantCustomFields';
  baseAmount?: Maybe<Scalars['Float']>;
  baseUnit?: Maybe<Scalars['String']>;
  depositType?: Maybe<Scalars['String']>;
  depositValue?: Maybe<Scalars['Int']>;
  isAlcoholic?: Maybe<Scalars['Boolean']>;
  originalPrice?: Maybe<Scalars['Int']>;
  packageQuantity?: Maybe<Scalars['Int']>;
};

export type ProductVariantDocument = {
  __typename?: 'ProductVariantDocument';
  baseAmount?: Maybe<Scalars['Float']>;
  baseUnit?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  channelId?: Maybe<Scalars['ID']>;
  depositType?: Maybe<Scalars['String']>;
  depositValue?: Maybe<Scalars['Int']>;
  discountPercentage?: Maybe<Scalars['String']>;
  displayDeposit?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  featuredAsset?: Maybe<Asset>;
  id?: Maybe<Scalars['ID']>;
  originalPrice?: Maybe<Scalars['Int']>;
  outOfStockThreshold?: Maybe<Scalars['Int']>;
  packageQuantity?: Maybe<Scalars['Int']>;
  pricePerUnit?: Maybe<Scalars['String']>;
  priceWithTax?: Maybe<Scalars['Int']>;
  product?: Maybe<Product>;
  productId?: Maybe<Scalars['ID']>;
  productName?: Maybe<Scalars['String']>;
  productVariantId?: Maybe<Scalars['ID']>;
  score?: Maybe<Scalars['Float']>;
  stockAllocated?: Maybe<Scalars['Int']>;
  stockLevel?: Maybe<Scalars['String']>;
  stockOnHand?: Maybe<Scalars['Int']>;
  useGlobalOutOfStockThreshold?: Maybe<Scalars['Boolean']>;
};

export type ProductVariantFilterParameter = {
  baseAmount?: InputMaybe<NumberOperators>;
  baseUnit?: InputMaybe<StringOperators>;
  createdAt?: InputMaybe<DateOperators>;
  currencyCode?: InputMaybe<StringOperators>;
  deletedAt?: InputMaybe<DateOperators>;
  depositType?: InputMaybe<StringOperators>;
  depositValue?: InputMaybe<NumberOperators>;
  discountPercentage?: InputMaybe<NumberOperators>;
  displayDeposit?: InputMaybe<StringOperators>;
  displayName?: InputMaybe<StringOperators>;
  enabled?: InputMaybe<BooleanOperators>;
  id?: InputMaybe<IdOperators>;
  isAlcoholic?: InputMaybe<BooleanOperators>;
  isFavorite?: InputMaybe<BooleanOperators>;
  languageCode?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  originalPrice?: InputMaybe<NumberOperators>;
  packageQuantity?: InputMaybe<NumberOperators>;
  price?: InputMaybe<NumberOperators>;
  pricePerUnit?: InputMaybe<StringOperators>;
  priceWithTax?: InputMaybe<NumberOperators>;
  productId?: InputMaybe<IdOperators>;
  sku?: InputMaybe<StringOperators>;
  stock?: InputMaybe<NumberOperators>;
  stockLevel?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type ProductVariantList = PaginatedList & {
  __typename?: 'ProductVariantList';
  items: Array<ProductVariant>;
  totalItems: Scalars['Int'];
};

export type ProductVariantListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<ProductVariantFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<ProductVariantSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']>;
};

export type ProductVariantSortParameter = {
  baseAmount?: InputMaybe<SortOrder>;
  baseUnit?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  deletedAt?: InputMaybe<SortOrder>;
  depositType?: InputMaybe<SortOrder>;
  depositValue?: InputMaybe<SortOrder>;
  discountPercentage?: InputMaybe<SortOrder>;
  displayDeposit?: InputMaybe<SortOrder>;
  displayName?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isAlcoholic?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  originalPrice?: InputMaybe<SortOrder>;
  packageQuantity?: InputMaybe<SortOrder>;
  price?: InputMaybe<SortOrder>;
  pricePerUnit?: InputMaybe<SortOrder>;
  priceWithTax?: InputMaybe<SortOrder>;
  productId?: InputMaybe<SortOrder>;
  sku?: InputMaybe<SortOrder>;
  stock?: InputMaybe<SortOrder>;
  stockLevel?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ProductVariantTranslation = {
  __typename?: 'ProductVariantTranslation';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Promotion = Node & {
  __typename?: 'Promotion';
  actions: Array<ConfigurableOperation>;
  conditions: Array<ConfigurableOperation>;
  couponCode?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  enabled: Scalars['Boolean'];
  endsAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  perCustomerUsageLimit?: Maybe<Scalars['Int']>;
  startsAt?: Maybe<Scalars['DateTime']>;
  updatedAt: Scalars['DateTime'];
};

export type PromotionList = PaginatedList & {
  __typename?: 'PromotionList';
  items: Array<Promotion>;
  totalItems: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  /** The active Channel */
  activeChannel: Channel;
  /** The active Customer */
  activeCustomer?: Maybe<Customer>;
  /**
   * The active Order. Will be `null` until an Order is created via `addItemToOrder`. Once an Order reaches the
   * state of `PaymentAuthorized` or `PaymentSettled`, then that Order is no longer considered "active" and this
   * query will once again return `null`.
   */
  activeOrder?: Maybe<Order>;
  autoComplete: Array<Maybe<AddressAutoCompletion>>;
  /** An array of supported Countries */
  availableCountries: Array<Country>;
  channelByPostalCode?: Maybe<Channel>;
  channels: Array<Channel>;
  checkIsSubscribedToNewsletter: Scalars['Boolean'];
  /** Returns a Collection either by its id or slug. If neither 'id' nor 'slug' is specified, an error will result. */
  collection?: Maybe<Collection>;
  /** A list of Collections available to the shop */
  collections: CollectionList;
  customerGroups?: Maybe<Array<CustomerGroup>>;
  /** Returns a list of payment methods and their eligibility based on the current active Order */
  eligiblePaymentMethods: Array<PaymentMethodQuote>;
  /** Returns a list of eligible shipping methods based on the current active Order */
  eligibleShippingMethods: Array<ShippingMethodQuote>;
  /** Returns a Facet by its id */
  facet?: Maybe<Facet>;
  /** A list of Facets available to the shop */
  facets: FacetList;
  favoriteCollections: CollectionList;
  favorites: FavoriteList;
  freshProductRestockTime?: Maybe<Scalars['String']>;
  invoiceOfOrder?: Maybe<Invoice>;
  /** Returns information about the current authenticated User */
  me?: Maybe<CurrentUser>;
  /** Returns the possible next states that the activeOrder can transition to */
  nextOrderStates: Array<Scalars['String']>;
  /**
   * Returns an Order based on the id. Note that in the Shop API, only orders belonging to the
   * currently-authenticated User may be queried.
   */
  order?: Maybe<Order>;
  /**
   * Returns an Order based on the order `code`. For guest Orders (i.e. Orders placed by non-authenticated Customers)
   * this query will only return the Order within 2 hours of the Order being placed. This allows an Order confirmation
   * screen to be shown immediately after completion of a guest checkout, yet prevents security risks of allowing
   * general anonymous access to Order data.
   */
  orderByCode?: Maybe<Order>;
  producer?: Maybe<Producer>;
  producers: ProducerList;
  producersProductVariants: ProductVariantList;
  /** Get a Product either by id or slug. If neither 'id' nor 'slug' is specified, an error will result. */
  product?: Maybe<Product>;
  productVariant: ProductVariant;
  /** Get a list of Products */
  products: ProductList;
  publicHolidays: Array<Holiday>;
  randomCollectionProductVariants: Array<ProductVariant>;
  recipe?: Maybe<Recipe>;
  recipes: RecipeList;
  rootCollections: CollectionList;
  savedPaymentMethods: Array<PartialStripePaymentMethod>;
  /** Search Products based on the criteria set by the `SearchInput` */
  search: SearchResponse;
  searchProducts?: Maybe<ProductSearchResult>;
  special?: Maybe<Special>;
  specials: SpecialList;
  upSellingProductVariants: ProductVariantList;
  wallet: Wallet;
};


export type QueryAutoCompleteArgs = {
  input?: InputMaybe<Scalars['String']>;
};


export type QueryChannelByPostalCodeArgs = {
  postalCode: Scalars['String'];
};


export type QueryCollectionArgs = {
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryCollectionsArgs = {
  options?: InputMaybe<CollectionListOptions>;
};


export type QueryFacetArgs = {
  id: Scalars['ID'];
};


export type QueryFacetsArgs = {
  options?: InputMaybe<FacetListOptions>;
};


export type QueryFavoriteCollectionsArgs = {
  options?: InputMaybe<CollectionListOptions>;
};


export type QueryFavoritesArgs = {
  options?: InputMaybe<FavoriteListOptions>;
};


export type QueryInvoiceOfOrderArgs = {
  orderId: Scalars['ID'];
};


export type QueryOrderArgs = {
  id: Scalars['ID'];
};


export type QueryOrderByCodeArgs = {
  code: Scalars['String'];
};


export type QueryProducerArgs = {
  id: Scalars['ID'];
};


export type QueryProducersArgs = {
  options?: InputMaybe<ProducerListOptions>;
};


export type QueryProducersProductVariantsArgs = {
  id: Scalars['ID'];
  options?: InputMaybe<ProductVariantListOptions>;
};


export type QueryProductArgs = {
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryProductVariantArgs = {
  id: Scalars['ID'];
};


export type QueryProductsArgs = {
  options?: InputMaybe<ProductListOptions>;
};


export type QueryPublicHolidaysArgs = {
  options?: InputMaybe<HolidayQueryOptions>;
};


export type QueryRandomCollectionProductVariantsArgs = {
  options: RandomCollectionProductVariantsOptions;
};


export type QueryRecipeArgs = {
  id: Scalars['ID'];
};


export type QueryRecipesArgs = {
  options?: InputMaybe<RecipeListOptions>;
};


export type QueryRootCollectionsArgs = {
  options?: InputMaybe<CollectionListOptions>;
};


export type QuerySavedPaymentMethodsArgs = {
  type?: InputMaybe<Scalars['String']>;
};


export type QuerySearchArgs = {
  input: SearchInput;
};


export type QuerySearchProductsArgs = {
  query?: InputMaybe<Scalars['String']>;
};


export type QuerySpecialArgs = {
  id: Scalars['ID'];
};


export type QuerySpecialsArgs = {
  options?: InputMaybe<SpecialListOptions>;
};


export type QueryUpSellingProductVariantsArgs = {
  options?: InputMaybe<ProductVariantListOptions>;
};

export type RandomCollectionProductVariantsOptions = {
  collectionId: Scalars['ID'];
  queryOptions?: InputMaybe<ProductVariantListOptions>;
};

export type Recipe = Node & {
  __typename?: 'Recipe';
  assets?: Maybe<Array<Asset>>;
  channels?: Maybe<Array<Channel>>;
  cookLevel?: Maybe<Scalars['String']>;
  cookTime?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  featuredAsset?: Maybe<Asset>;
  id: Scalars['ID'];
  ingredients?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  productVariants?: Maybe<Array<ProductVariant>>;
  status: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type RecipeFilterParameter = {
  cookLevel?: InputMaybe<StringOperators>;
  cookTime?: InputMaybe<NumberOperators>;
  createdAt?: InputMaybe<DateOperators>;
  description?: InputMaybe<StringOperators>;
  id?: InputMaybe<IdOperators>;
  ingredients?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  status?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type RecipeList = PaginatedList & {
  __typename?: 'RecipeList';
  items: Array<Recipe>;
  totalItems: Scalars['Int'];
};

export type RecipeListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<RecipeFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<RecipeSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']>;
};

export type RecipeSortParameter = {
  cookLevel?: InputMaybe<SortOrder>;
  cookTime?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  ingredients?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type RefreshCustomerVerificationResult = NativeAuthStrategyError | Success;

export type Refund = Node & {
  __typename?: 'Refund';
  adjustment: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  items: Scalars['Int'];
  metadata?: Maybe<Scalars['JSON']>;
  method?: Maybe<Scalars['String']>;
  orderItems: Array<OrderItem>;
  paymentId: Scalars['ID'];
  reason?: Maybe<Scalars['String']>;
  shipping: Scalars['Int'];
  state: Scalars['String'];
  total: Scalars['Int'];
  transactionId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type RegisterCustomerAccountResult = MissingPasswordError | NativeAuthStrategyError | PasswordValidationError | Success;

export type RegisterCustomerCustomFieldsInput = {
  activeChannelId?: InputMaybe<Scalars['ID']>;
  isOfLegalAge?: InputMaybe<Scalars['Boolean']>;
  subscribeToNewsletterOnRegistration?: InputMaybe<Scalars['Boolean']>;
};

export type RegisterCustomerInput = {
  customFields?: InputMaybe<RegisterCustomerCustomFieldsInput>;
  emailAddress: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type RelationCustomFieldConfig = CustomField & {
  __typename?: 'RelationCustomFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  entity: Scalars['String'];
  internal?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Array<LocalizedString>>;
  list: Scalars['Boolean'];
  name: Scalars['String'];
  nullable?: Maybe<Scalars['Boolean']>;
  readonly?: Maybe<Scalars['Boolean']>;
  scalarFields: Array<Scalars['String']>;
  type: Scalars['String'];
  ui?: Maybe<Scalars['JSON']>;
};

export type RemoveOrderItemsResult = Order | OrderModificationError;

export type RequestOrderComplaintInput = {
  comment?: InputMaybe<Scalars['String']>;
  items: Array<RequestOrderComplaintItem>;
  orderId: Scalars['ID'];
  refundPreference: Scalars['String'];
};

export type RequestOrderComplaintItem = {
  orderLineId: Scalars['ID'];
  quantity: Scalars['Int'];
  reason: Scalars['String'];
};

export type RequestPasswordResetResult = NativeAuthStrategyError | Success;

export type RequestUpdateCustomerEmailAddressResult = EmailAddressConflictError | InvalidCredentialsError | NativeAuthStrategyError | Success;

export type ResetPasswordResult = CurrentUser | NativeAuthStrategyError | NotVerifiedError | PasswordResetTokenExpiredError | PasswordResetTokenInvalidError | PasswordValidationError;

export type Role = Node & {
  __typename?: 'Role';
  channels: Array<Channel>;
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  permissions: Array<Permission>;
  updatedAt: Scalars['DateTime'];
};

export type RoleList = PaginatedList & {
  __typename?: 'RoleList';
  items: Array<Role>;
  totalItems: Scalars['Int'];
};

export type SearchInput = {
  collectionId?: InputMaybe<Scalars['ID']>;
  collectionSlug?: InputMaybe<Scalars['String']>;
  facetValueFilters?: InputMaybe<Array<FacetValueFilterInput>>;
  facetValueIds?: InputMaybe<Array<Scalars['ID']>>;
  facetValueOperator?: InputMaybe<LogicalOperator>;
  groupByProduct?: InputMaybe<Scalars['Boolean']>;
  inStock?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<SearchResultSortParameter>;
  take?: InputMaybe<Scalars['Int']>;
  term?: InputMaybe<Scalars['String']>;
};

export type SearchReindexResponse = {
  __typename?: 'SearchReindexResponse';
  success: Scalars['Boolean'];
};

export type SearchResponse = {
  __typename?: 'SearchResponse';
  collections: Array<CollectionResult>;
  facetValues: Array<FacetValueResult>;
  items: Array<SearchResult>;
  totalItems: Scalars['Int'];
};

export type SearchResult = {
  __typename?: 'SearchResult';
  /** An array of ids of the Collections in which this result appears */
  collectionIds: Array<Scalars['ID']>;
  currencyCode: CurrencyCode;
  description: Scalars['String'];
  facetIds: Array<Scalars['ID']>;
  facetValueIds: Array<Scalars['ID']>;
  inStock: Scalars['Boolean'];
  price: SearchResultPrice;
  priceWithTax: SearchResultPrice;
  productAsset?: Maybe<SearchResultAsset>;
  productId: Scalars['ID'];
  productName: Scalars['String'];
  productVariantAsset?: Maybe<SearchResultAsset>;
  productVariantId: Scalars['ID'];
  productVariantName: Scalars['String'];
  /** A relevance score for the result. Differs between database implementations */
  score: Scalars['Float'];
  sku: Scalars['String'];
  slug: Scalars['String'];
};

export type SearchResultAsset = {
  __typename?: 'SearchResultAsset';
  focalPoint?: Maybe<Coordinate>;
  id: Scalars['ID'];
  preview: Scalars['String'];
};

/** The price of a search result product, either as a range or as a single price */
export type SearchResultPrice = PriceRange | SinglePrice;

export type SearchResultSortParameter = {
  name?: InputMaybe<SortOrder>;
  price?: InputMaybe<SortOrder>;
};

export type SetCustomerForOrderResult = AlreadyLoggedInError | EmailAddressConflictError | NoActiveOrderError | Order;

export type SetOrderShippingMethodResult = IneligibleShippingMethodError | NoActiveOrderError | Order | OrderModificationError;

export type SetupIntent = {
  __typename?: 'SetupIntent';
  clientSecret: Scalars['String'];
  setupIntentId: Scalars['String'];
};

export type ShippingLine = {
  __typename?: 'ShippingLine';
  discountedPrice: Scalars['Int'];
  discountedPriceWithTax: Scalars['Int'];
  discounts: Array<Discount>;
  id: Scalars['ID'];
  price: Scalars['Int'];
  priceWithTax: Scalars['Int'];
  shippingMethod: ShippingMethod;
};

export type ShippingMethod = Node & {
  __typename?: 'ShippingMethod';
  calculator: ConfigurableOperation;
  checker: ConfigurableOperation;
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<ShippingMethodCustomFields>;
  description: Scalars['String'];
  fulfillmentHandlerCode: Scalars['String'];
  id: Scalars['ID'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  translations: Array<ShippingMethodTranslation>;
  updatedAt: Scalars['DateTime'];
};

export type ShippingMethodCustomFields = {
  __typename?: 'ShippingMethodCustomFields';
  deliveryDates?: Maybe<Array<DeliveryDate>>;
};

export type ShippingMethodList = PaginatedList & {
  __typename?: 'ShippingMethodList';
  items: Array<ShippingMethod>;
  totalItems: Scalars['Int'];
};

export type ShippingMethodQuote = {
  __typename?: 'ShippingMethodQuote';
  code: Scalars['String'];
  customFields?: Maybe<ShippingMethodCustomFields>;
  description: Scalars['String'];
  id: Scalars['ID'];
  /** Any optional metadata returned by the ShippingCalculator in the ShippingCalculationResult */
  metadata?: Maybe<Scalars['JSON']>;
  name: Scalars['String'];
  price: Scalars['Int'];
  priceWithTax: Scalars['Int'];
};

export type ShippingMethodTranslation = {
  __typename?: 'ShippingMethodTranslation';
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

/** The price value where the result has a single price */
export type SinglePrice = {
  __typename?: 'SinglePrice';
  value: Scalars['Int'];
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Special = Node & {
  __typename?: 'Special';
  category?: Maybe<Scalars['String']>;
  channels?: Maybe<Array<Channel>>;
  description?: Maybe<Scalars['String']>;
  externalLink?: Maybe<Scalars['String']>;
  featuredAsset?: Maybe<Asset>;
  id: Scalars['ID'];
  internalLink?: Maybe<Scalars['String']>;
  productVariants?: Maybe<Array<ProductVariant>>;
  sortOrder?: Maybe<Scalars['Int']>;
  status: Scalars['String'];
  title?: Maybe<Scalars['String']>;
};

export type SpecialFilterParameter = {
  category?: InputMaybe<StringOperators>;
  description?: InputMaybe<StringOperators>;
  externalLink?: InputMaybe<StringOperators>;
  id?: InputMaybe<IdOperators>;
  internalLink?: InputMaybe<StringOperators>;
  sortOrder?: InputMaybe<NumberOperators>;
  status?: InputMaybe<StringOperators>;
  title?: InputMaybe<StringOperators>;
};

export type SpecialList = PaginatedList & {
  __typename?: 'SpecialList';
  items: Array<Special>;
  totalItems: Scalars['Int'];
};

export type SpecialListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<SpecialFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<SpecialSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']>;
};

export type SpecialSortParameter = {
  category?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  externalLink?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  internalLink?: InputMaybe<SortOrder>;
  sortOrder?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
};

export type StringCustomFieldConfig = CustomField & {
  __typename?: 'StringCustomFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  internal?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Array<LocalizedString>>;
  length?: Maybe<Scalars['Int']>;
  list: Scalars['Boolean'];
  name: Scalars['String'];
  nullable?: Maybe<Scalars['Boolean']>;
  options?: Maybe<Array<StringFieldOption>>;
  pattern?: Maybe<Scalars['String']>;
  readonly?: Maybe<Scalars['Boolean']>;
  type: Scalars['String'];
  ui?: Maybe<Scalars['JSON']>;
};

export type StringFieldOption = {
  __typename?: 'StringFieldOption';
  label?: Maybe<Array<LocalizedString>>;
  value: Scalars['String'];
};

/** Operators for filtering on a list of String fields */
export type StringListOperators = {
  inList: Scalars['String'];
};

/** Operators for filtering on a String field */
export type StringOperators = {
  contains?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  isNull?: InputMaybe<Scalars['Boolean']>;
  notContains?: InputMaybe<Scalars['String']>;
  notEq?: InputMaybe<Scalars['String']>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  regex?: InputMaybe<Scalars['String']>;
};

/** Indicates that an operation succeeded, where we do not want to return any more specific information. */
export type Success = {
  __typename?: 'Success';
  success: Scalars['Boolean'];
};

export type Surcharge = Node & {
  __typename?: 'Surcharge';
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  price: Scalars['Int'];
  priceWithTax: Scalars['Int'];
  sku?: Maybe<Scalars['String']>;
  taxLines: Array<TaxLine>;
  taxRate: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type Tag = Node & {
  __typename?: 'Tag';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
  value: Scalars['String'];
};

export type TagList = PaginatedList & {
  __typename?: 'TagList';
  items: Array<Tag>;
  totalItems: Scalars['Int'];
};

export type TaxCategory = Node & {
  __typename?: 'TaxCategory';
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  isDefault: Scalars['Boolean'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type TaxLine = {
  __typename?: 'TaxLine';
  description: Scalars['String'];
  taxRate: Scalars['Float'];
};

export type TaxRate = Node & {
  __typename?: 'TaxRate';
  category: TaxCategory;
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  customerGroup?: Maybe<CustomerGroup>;
  enabled: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  value: Scalars['Float'];
  zone: Zone;
};

export type TaxRateList = PaginatedList & {
  __typename?: 'TaxRateList';
  items: Array<TaxRate>;
  totalItems: Scalars['Int'];
};

export type TextCustomFieldConfig = CustomField & {
  __typename?: 'TextCustomFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  internal?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Array<LocalizedString>>;
  list: Scalars['Boolean'];
  name: Scalars['String'];
  nullable?: Maybe<Scalars['Boolean']>;
  readonly?: Maybe<Scalars['Boolean']>;
  type: Scalars['String'];
  ui?: Maybe<Scalars['JSON']>;
};

export type TransitionOrderToStateResult = Order | OrderStateTransitionError;

export type UpdateAddressCustomFieldsInput = {
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  placeId?: InputMaybe<Scalars['String']>;
};

export type UpdateAddressInput = {
  city?: InputMaybe<Scalars['String']>;
  company?: InputMaybe<Scalars['String']>;
  countryCode?: InputMaybe<Scalars['String']>;
  customFields?: InputMaybe<UpdateAddressCustomFieldsInput>;
  defaultBillingAddress?: InputMaybe<Scalars['Boolean']>;
  defaultShippingAddress?: InputMaybe<Scalars['Boolean']>;
  fullName?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  phoneNumber?: InputMaybe<Scalars['String']>;
  postalCode?: InputMaybe<Scalars['String']>;
  province?: InputMaybe<Scalars['String']>;
  streetLine1?: InputMaybe<Scalars['String']>;
  streetLine2?: InputMaybe<Scalars['String']>;
};

export type UpdateCustomerCustomFieldsInput = {
  activeChannelId?: InputMaybe<Scalars['ID']>;
  isOfLegalAge?: InputMaybe<Scalars['Boolean']>;
  subscribeToNewsletterOnRegistration?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateCustomerEmailAddressResult = IdentifierChangeTokenExpiredError | IdentifierChangeTokenInvalidError | NativeAuthStrategyError | Success;

export type UpdateCustomerInput = {
  customFields?: InputMaybe<UpdateCustomerCustomFieldsInput>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateCustomerPasswordResult = InvalidCredentialsError | NativeAuthStrategyError | PasswordValidationError | Success;

export type UpdateOrderCustomFieldsInput = {
  canDropOrder?: InputMaybe<Scalars['Boolean']>;
  deliveryDateId?: InputMaybe<Scalars['ID']>;
  doNotRing?: InputMaybe<Scalars['Boolean']>;
  earliestDeliveryTime?: InputMaybe<Scalars['DateTime']>;
  isInvoicePaid?: InputMaybe<Scalars['Boolean']>;
  latestDeliveryTime?: InputMaybe<Scalars['DateTime']>;
  notes?: InputMaybe<Scalars['String']>;
};

export type UpdateOrderInput = {
  customFields?: InputMaybe<UpdateOrderCustomFieldsInput>;
};

export type UpdateOrderItemsResult = InsufficientStockError | NegativeQuantityError | Order | OrderLimitError | OrderModificationError;

export type User = Node & {
  __typename?: 'User';
  authenticationMethods: Array<AuthenticationMethod>;
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  identifier: Scalars['String'];
  lastLogin?: Maybe<Scalars['DateTime']>;
  roles: Array<Role>;
  updatedAt: Scalars['DateTime'];
  verified: Scalars['Boolean'];
};

/**
 * Returned if the verification token (used to verify a Customer's email address) is valid, but has
 * expired according to the `verificationTokenDuration` setting in the AuthOptions.
 */
export type VerificationTokenExpiredError = ErrorResult & {
  __typename?: 'VerificationTokenExpiredError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/**
 * Returned if the verification token (used to verify a Customer's email address) is either
 * invalid or does not match any expected tokens.
 */
export type VerificationTokenInvalidError = ErrorResult & {
  __typename?: 'VerificationTokenInvalidError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type VerifyCustomerAccountResult = CurrentUser | MissingPasswordError | NativeAuthStrategyError | PasswordAlreadySetError | PasswordValidationError | VerificationTokenExpiredError | VerificationTokenInvalidError;

export type WaitingList = Node & {
  __typename?: 'WaitingList';
  email: Scalars['String'];
  id: Scalars['ID'];
  postalCode: Scalars['String'];
};

export type Wallet = Node & {
  __typename?: 'Wallet';
  customer?: Maybe<Customer>;
  customerId: Scalars['ID'];
  id: Scalars['ID'];
  nonPayoutTotal: Scalars['Int'];
  payoutTotal: Scalars['Int'];
  walletItems?: Maybe<Array<WalletItem>>;
};

export type WalletItem = Node & {
  __typename?: 'WalletItem';
  activity: Scalars['String'];
  administratorId?: Maybe<Scalars['ID']>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  internalComment?: Maybe<Scalars['String']>;
  isPayoutPossible: Scalars['Boolean'];
  order?: Maybe<Order>;
  orderId?: Maybe<Scalars['ID']>;
  total: Scalars['Int'];
  wallet?: Maybe<Wallet>;
  walletId: Scalars['ID'];
};

export type Zone = Node & {
  __typename?: 'Zone';
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  members: Array<Country>;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

type DiscriminateUnion<T, U> = T extends U ? T : never;

export namespace AutoComplete {
  export type Variables = AutoCompleteQueryVariables;
  export type Query = AutoCompleteQuery;
  export type AutoComplete = NonNullable<(NonNullable<AutoCompleteQuery['autoComplete']>)[number]>;
  export type Address = (NonNullable<NonNullable<(NonNullable<AutoCompleteQuery['autoComplete']>)[number]>['address']>);
}

export namespace CreateCustomerAddress {
  export type Variables = CreateCustomerAddressMutationVariables;
  export type Mutation = CreateCustomerAddressMutation;
  export type CreateCustomerAddress = (NonNullable<CreateCustomerAddressMutation['createCustomerAddress']>);
  export type Country = (NonNullable<(NonNullable<CreateCustomerAddressMutation['createCustomerAddress']>)['country']>);
}

export namespace GetCustomerAddresses {
  export type Variables = GetCustomerAddressesQueryVariables;
  export type Query = GetCustomerAddressesQuery;
  export type ActiveCustomer = (NonNullable<GetCustomerAddressesQuery['activeCustomer']>);
  export type Addresses = NonNullable<(NonNullable<(NonNullable<GetCustomerAddressesQuery['activeCustomer']>)['addresses']>)[number]>;
}

export namespace UpdateCustomerAddress {
  export type Variables = UpdateCustomerAddressMutationVariables;
  export type Mutation = UpdateCustomerAddressMutation;
  export type UpdateCustomerAddress = (NonNullable<UpdateCustomerAddressMutation['updateCustomerAddress']>);
}

export namespace DeleteCustomerAddress {
  export type Variables = DeleteCustomerAddressMutationVariables;
  export type Mutation = DeleteCustomerAddressMutation;
  export type DeleteCustomerAddress = (NonNullable<DeleteCustomerAddressMutation['deleteCustomerAddress']>);
}

export namespace RegisterCustomerAccount {
  export type Variables = RegisterCustomerAccountMutationVariables;
  export type Mutation = RegisterCustomerAccountMutation;
  export type RegisterCustomerAccount = (NonNullable<RegisterCustomerAccountMutation['registerCustomerAccount']>);
  export type SuccessInlineFragment = (DiscriminateUnion<(NonNullable<RegisterCustomerAccountMutation['registerCustomerAccount']>), { __typename?: 'Success' }>);
}

export namespace Login {
  export type Variables = LoginMutationVariables;
  export type Mutation = LoginMutation;
  export type Login = (NonNullable<LoginMutation['login']>);
  export type CurrentUserInlineFragment = (DiscriminateUnion<(NonNullable<LoginMutation['login']>), { __typename?: 'CurrentUser' }>);
  export type InvalidCredentialsErrorInlineFragment = (DiscriminateUnion<(NonNullable<LoginMutation['login']>), { __typename?: 'InvalidCredentialsError' }>);
}

export namespace LogoutCustomer {
  export type Variables = LogoutCustomerMutationVariables;
  export type Mutation = LogoutCustomerMutation;
  export type LogoutCustomer = (NonNullable<LogoutCustomerMutation['logoutCustomer']>);
}

export namespace FacebookAuthenticate {
  export type Variables = FacebookAuthenticateMutationVariables;
  export type Mutation = FacebookAuthenticateMutation;
  export type Authenticate = (NonNullable<FacebookAuthenticateMutation['authenticate']>);
  export type CurrentUserInlineFragment = (DiscriminateUnion<(NonNullable<FacebookAuthenticateMutation['authenticate']>), { __typename?: 'CurrentUser' }>);
}

export namespace GoogleAuthenticate {
  export type Variables = GoogleAuthenticateMutationVariables;
  export type Mutation = GoogleAuthenticateMutation;
  export type Authenticate = (NonNullable<GoogleAuthenticateMutation['authenticate']>);
  export type CurrentUserInlineFragment = (DiscriminateUnion<(NonNullable<GoogleAuthenticateMutation['authenticate']>), { __typename?: 'CurrentUser' }>);
}

export namespace AppleAuthenticate {
  export type Variables = AppleAuthenticateMutationVariables;
  export type Mutation = AppleAuthenticateMutation;
  export type Authenticate = (NonNullable<AppleAuthenticateMutation['authenticate']>);
  export type CurrentUserInlineFragment = (DiscriminateUnion<(NonNullable<AppleAuthenticateMutation['authenticate']>), { __typename?: 'CurrentUser' }>);
}

export namespace CreateWaitingList {
  export type Variables = CreateWaitingListMutationVariables;
  export type Mutation = CreateWaitingListMutation;
  export type CreateWaitingList = (NonNullable<CreateWaitingListMutation['createWaitingList']>);
}

export namespace RequestPasswordReset {
  export type Variables = RequestPasswordResetMutationVariables;
  export type Mutation = RequestPasswordResetMutation;
  export type RequestPasswordReset = (NonNullable<RequestPasswordResetMutation['requestPasswordReset']>);
}

export namespace ResetPassword {
  export type Variables = ResetPasswordMutationVariables;
  export type Mutation = ResetPasswordMutation;
  export type ResetPassword = (NonNullable<ResetPasswordMutation['resetPassword']>);
  export type CurrentUserInlineFragment = (DiscriminateUnion<(NonNullable<ResetPasswordMutation['resetPassword']>), { __typename?: 'CurrentUser' }>);
  export type PasswordResetTokenInvalidErrorInlineFragment = (DiscriminateUnion<(NonNullable<ResetPasswordMutation['resetPassword']>), { __typename?: 'PasswordResetTokenInvalidError' }>);
  export type PasswordResetTokenExpiredErrorInlineFragment = (DiscriminateUnion<(NonNullable<ResetPasswordMutation['resetPassword']>), { __typename?: 'PasswordResetTokenExpiredError' }>);
}

export namespace Channels {
  export type Variables = ChannelsQueryVariables;
  export type Query = ChannelsQuery;
  export type Channels = NonNullable<(NonNullable<ChannelsQuery['channels']>)[number]>;
}

export namespace ActiveChannel {
  export type Variables = ActiveChannelQueryVariables;
  export type Query = ActiveChannelQuery;
  export type ActiveChannel = (NonNullable<ActiveChannelQuery['activeChannel']>);
}

export namespace CreatePaypalPayment {
  export type Variables = CreatePaypalPaymentMutationVariables;
  export type Mutation = CreatePaypalPaymentMutation;
}

export namespace CreatePaymentIntent {
  export type Variables = CreatePaymentIntentMutationVariables;
  export type Mutation = CreatePaymentIntentMutation;
}

export namespace CreateSetupIntent {
  export type Variables = CreateSetupIntentMutationVariables;
  export type Mutation = CreateSetupIntentMutation;
  export type CreateSetupIntent = (NonNullable<CreateSetupIntentMutation['createSetupIntent']>);
}

export namespace TransitionOrderToState {
  export type Variables = TransitionOrderToStateMutationVariables;
  export type Mutation = TransitionOrderToStateMutation;
  export type TransitionOrderToState = (NonNullable<TransitionOrderToStateMutation['transitionOrderToState']>);
  export type OrderInlineFragment = (DiscriminateUnion<(NonNullable<TransitionOrderToStateMutation['transitionOrderToState']>), { __typename?: 'Order' }>);
  export type ErrorResultInlineFragment = (DiscriminateUnion<(NonNullable<TransitionOrderToStateMutation['transitionOrderToState']>), { __typename?: 'ErrorResult' }>);
  export type OrderStateTransitionErrorInlineFragment = (DiscriminateUnion<(NonNullable<TransitionOrderToStateMutation['transitionOrderToState']>), { __typename?: 'OrderStateTransitionError' }>);
}

export namespace AddPaymentToOrder {
  export type Variables = AddPaymentToOrderMutationVariables;
  export type Mutation = AddPaymentToOrderMutation;
  export type AddPaymentToOrder = (NonNullable<AddPaymentToOrderMutation['addPaymentToOrder']>);
  export type OrderInlineFragment = (DiscriminateUnion<(NonNullable<AddPaymentToOrderMutation['addPaymentToOrder']>), { __typename?: 'Order' }>);
}

export namespace ApplyGiftCouponCode {
  export type Variables = ApplyGiftCouponCodeMutationVariables;
  export type Mutation = ApplyGiftCouponCodeMutation;
  export type ApplyGiftCouponCode = (NonNullable<ApplyGiftCouponCodeMutation['applyGiftCouponCode']>);
  export type OrderInlineFragment = ({ __typename: 'Order' } & Pick<(NonNullable<ApplyGiftCouponCodeMutation['applyGiftCouponCode']>), keyof OrderReturnValueFragment>);
}

export namespace RemoveGiftCouponCode {
  export type Variables = RemoveGiftCouponCodeMutationVariables;
  export type Mutation = RemoveGiftCouponCodeMutation;
  export type RemoveGiftCouponCode = (NonNullable<RemoveGiftCouponCodeMutation['removeGiftCouponCode']>);
  export type OrderInlineFragment = ({ __typename: 'Order' } & Pick<(NonNullable<RemoveGiftCouponCodeMutation['removeGiftCouponCode']>), keyof OrderReturnValueFragment>);
}

export namespace ApplyCouponCode {
  export type Variables = ApplyCouponCodeMutationVariables;
  export type Mutation = ApplyCouponCodeMutation;
  export type ApplyCouponCode = (NonNullable<ApplyCouponCodeMutation['applyCouponCode']>);
  export type OrderInlineFragment = (DiscriminateUnion<(NonNullable<ApplyCouponCodeMutation['applyCouponCode']>), { __typename?: 'Order' }>);
}

export namespace RemoveCouponCode {
  export type Variables = RemoveCouponCodeMutationVariables;
  export type Mutation = RemoveCouponCodeMutation;
  export type RemoveCouponCode = (NonNullable<RemoveCouponCodeMutation['removeCouponCode']>);
  export type OrderInlineFragment = ({ __typename: 'Order' } & Pick<(NonNullable<RemoveCouponCodeMutation['removeCouponCode']>), keyof OrderReturnValueFragment>);
}

export namespace RootCollections {
  export type Variables = RootCollectionsQueryVariables;
  export type Query = RootCollectionsQuery;
  export type RootCollections = (NonNullable<RootCollectionsQuery['rootCollections']>);
  export type Items = NonNullable<(NonNullable<(NonNullable<RootCollectionsQuery['rootCollections']>)['items']>)[number]>;
  export type FeaturedAsset = (NonNullable<NonNullable<(NonNullable<(NonNullable<RootCollectionsQuery['rootCollections']>)['items']>)[number]>['featuredAsset']>);
  export type Children = NonNullable<(NonNullable<NonNullable<(NonNullable<(NonNullable<RootCollectionsQuery['rootCollections']>)['items']>)[number]>['children']>)[number]>;
}

export namespace CollectionsFullData {
  export type Variables = CollectionsFullDataQueryVariables;
  export type Query = CollectionsFullDataQuery;
  export type RootCollections = (NonNullable<CollectionsFullDataQuery['rootCollections']>);
  export type Items = NonNullable<(NonNullable<(NonNullable<CollectionsFullDataQuery['rootCollections']>)['items']>)[number]>;
  export type Children = NonNullable<(NonNullable<NonNullable<(NonNullable<(NonNullable<CollectionsFullDataQuery['rootCollections']>)['items']>)[number]>['children']>)[number]>;
  export type ProductVariants = (NonNullable<NonNullable<(NonNullable<NonNullable<(NonNullable<(NonNullable<CollectionsFullDataQuery['rootCollections']>)['items']>)[number]>['children']>)[number]>['productVariants']>);
  export type _Items = NonNullable<(NonNullable<(NonNullable<NonNullable<(NonNullable<NonNullable<(NonNullable<(NonNullable<CollectionsFullDataQuery['rootCollections']>)['items']>)[number]>['children']>)[number]>['productVariants']>)['items']>)[number]>;
  export type CustomFields = (NonNullable<NonNullable<(NonNullable<(NonNullable<NonNullable<(NonNullable<NonNullable<(NonNullable<(NonNullable<CollectionsFullDataQuery['rootCollections']>)['items']>)[number]>['children']>)[number]>['productVariants']>)['items']>)[number]>['customFields']>);
}

export namespace GetCollectionContents {
  export type Variables = GetCollectionContentsQueryVariables;
  export type Query = GetCollectionContentsQuery;
  export type Collection = (NonNullable<GetCollectionContentsQuery['collection']>);
  export type ProductVariants = (NonNullable<(NonNullable<GetCollectionContentsQuery['collection']>)['productVariants']>);
  export type Items = NonNullable<(NonNullable<(NonNullable<(NonNullable<GetCollectionContentsQuery['collection']>)['productVariants']>)['items']>)[number]>;
  export type CustomFields = (NonNullable<NonNullable<(NonNullable<(NonNullable<(NonNullable<GetCollectionContentsQuery['collection']>)['productVariants']>)['items']>)[number]>['customFields']>);
  export type FeaturedAsset = (NonNullable<NonNullable<(NonNullable<(NonNullable<(NonNullable<GetCollectionContentsQuery['collection']>)['productVariants']>)['items']>)[number]>['featuredAsset']>);
  export type Product = (NonNullable<NonNullable<(NonNullable<(NonNullable<(NonNullable<GetCollectionContentsQuery['collection']>)['productVariants']>)['items']>)[number]>['product']>);
  export type _FeaturedAsset = (NonNullable<(NonNullable<NonNullable<(NonNullable<(NonNullable<(NonNullable<GetCollectionContentsQuery['collection']>)['productVariants']>)['items']>)[number]>['product']>)['featuredAsset']>);
  export type FacetValues = NonNullable<(NonNullable<(NonNullable<NonNullable<(NonNullable<(NonNullable<(NonNullable<GetCollectionContentsQuery['collection']>)['productVariants']>)['items']>)[number]>['product']>)['facetValues']>)[number]>;
  export type Facet = (NonNullable<NonNullable<(NonNullable<(NonNullable<NonNullable<(NonNullable<(NonNullable<(NonNullable<GetCollectionContentsQuery['collection']>)['productVariants']>)['items']>)[number]>['product']>)['facetValues']>)[number]>['facet']>);
  export type _CustomFields = (NonNullable<(NonNullable<NonNullable<(NonNullable<(NonNullable<(NonNullable<GetCollectionContentsQuery['collection']>)['productVariants']>)['items']>)[number]>['product']>)['customFields']>);
}

export namespace ActiveCustomer {
  export type Variables = ActiveCustomerQueryVariables;
  export type Query = ActiveCustomerQuery;
  export type ActiveCustomer = (NonNullable<ActiveCustomerQuery['activeCustomer']>);
  export type CustomFields = (NonNullable<(NonNullable<ActiveCustomerQuery['activeCustomer']>)['customFields']>);
  export type ActiveChannel = (NonNullable<(NonNullable<(NonNullable<ActiveCustomerQuery['activeCustomer']>)['customFields']>)['activeChannel']>);
  export type User = (NonNullable<(NonNullable<ActiveCustomerQuery['activeCustomer']>)['user']>);
  export type AuthenticationMethods = NonNullable<(NonNullable<(NonNullable<(NonNullable<ActiveCustomerQuery['activeCustomer']>)['user']>)['authenticationMethods']>)[number]>;
}

export namespace CustomerGroups {
  export type Variables = CustomerGroupsQueryVariables;
  export type Query = CustomerGroupsQuery;
  export type CustomerGroups = NonNullable<(NonNullable<CustomerGroupsQuery['customerGroups']>)[number]>;
}

export namespace UpdateCustomer {
  export type Variables = UpdateCustomerMutationVariables;
  export type Mutation = UpdateCustomerMutation;
  export type UpdateCustomer = (NonNullable<UpdateCustomerMutation['updateCustomer']>);
  export type CustomFields = (NonNullable<(NonNullable<UpdateCustomerMutation['updateCustomer']>)['customFields']>);
}

export namespace DeleteCustomer {
  export type Variables = DeleteCustomerMutationVariables;
  export type Mutation = DeleteCustomerMutation;
  export type DeleteCustomer = (NonNullable<DeleteCustomerMutation['deleteCustomer']>);
}

export namespace CheckIsSubscribedToNewsletter {
  export type Variables = CheckIsSubscribedToNewsletterQueryVariables;
  export type Query = CheckIsSubscribedToNewsletterQuery;
}

export namespace SubscribeToNewsletter {
  export type Variables = SubscribeToNewsletterMutationVariables;
  export type Mutation = SubscribeToNewsletterMutation;
}

export namespace UnsubscribeFromNewsletter {
  export type Variables = UnsubscribeFromNewsletterMutationVariables;
  export type Mutation = UnsubscribeFromNewsletterMutation;
}

export namespace UpdateCustomerPassword {
  export type Variables = UpdateCustomerPasswordMutationVariables;
  export type Mutation = UpdateCustomerPasswordMutation;
  export type UpdateCustomerPassword = (NonNullable<UpdateCustomerPasswordMutation['updateCustomerPassword']>);
  export type SuccessInlineFragment = (DiscriminateUnion<(NonNullable<UpdateCustomerPasswordMutation['updateCustomerPassword']>), { __typename?: 'Success' }>);
}

export namespace RequestUpdateCustomerEmailAddress {
  export type Variables = RequestUpdateCustomerEmailAddressMutationVariables;
  export type Mutation = RequestUpdateCustomerEmailAddressMutation;
  export type RequestUpdateCustomerEmailAddress = (NonNullable<RequestUpdateCustomerEmailAddressMutation['requestUpdateCustomerEmailAddress']>);
  export type SuccessInlineFragment = (DiscriminateUnion<(NonNullable<RequestUpdateCustomerEmailAddressMutation['requestUpdateCustomerEmailAddress']>), { __typename?: 'Success' }>);
}

export namespace ToggleFavorite {
  export type Variables = ToggleFavoriteMutationVariables;
  export type Mutation = ToggleFavoriteMutation;
}

export namespace FavoriteCollections {
  export type Variables = FavoriteCollectionsQueryVariables;
  export type Query = FavoriteCollectionsQuery;
  export type FavoriteCollections = (NonNullable<FavoriteCollectionsQuery['favoriteCollections']>);
  export type Items = NonNullable<(NonNullable<(NonNullable<FavoriteCollectionsQuery['favoriteCollections']>)['items']>)[number]>;
}

export namespace Favorites {
  export type Variables = FavoritesQueryVariables;
  export type Query = FavoritesQuery;
  export type Favorites = (NonNullable<FavoritesQuery['favorites']>);
  export type Items = NonNullable<(NonNullable<(NonNullable<FavoritesQuery['favorites']>)['items']>)[number]>;
  export type ProductVariant = (NonNullable<NonNullable<(NonNullable<(NonNullable<FavoritesQuery['favorites']>)['items']>)[number]>['productVariant']>);
}

export namespace FreshProductRestockTime {
  export type Variables = FreshProductRestockTimeQueryVariables;
  export type Query = FreshProductRestockTimeQuery;
}

export namespace PublicHolidays {
  export type Variables = PublicHolidaysQueryVariables;
  export type Query = PublicHolidaysQuery;
  export type PublicHolidays = NonNullable<(NonNullable<PublicHolidaysQuery['publicHolidays']>)[number]>;
}

export namespace GetCustomerOrders {
  export type Variables = GetCustomerOrdersQueryVariables;
  export type Query = GetCustomerOrdersQuery;
  export type ActiveCustomer = (NonNullable<GetCustomerOrdersQuery['activeCustomer']>);
  export type Orders = (NonNullable<(NonNullable<GetCustomerOrdersQuery['activeCustomer']>)['orders']>);
  export type Items = NonNullable<(NonNullable<(NonNullable<(NonNullable<GetCustomerOrdersQuery['activeCustomer']>)['orders']>)['items']>)[number]>;
  export type Customer = (NonNullable<NonNullable<(NonNullable<(NonNullable<(NonNullable<GetCustomerOrdersQuery['activeCustomer']>)['orders']>)['items']>)[number]>['customer']>);
}

export namespace GetActiveOrder {
  export type Variables = GetActiveOrderQueryVariables;
  export type Query = GetActiveOrderQuery;
  export type ActiveOrder = (NonNullable<GetActiveOrderQuery['activeOrder']>);
}

export namespace GetOrderShippingLines {
  export type Variables = GetOrderShippingLinesQueryVariables;
  export type Query = GetOrderShippingLinesQuery;
  export type ActiveOrder = (NonNullable<GetOrderShippingLinesQuery['activeOrder']>);
  export type ShippingLines = NonNullable<(NonNullable<(NonNullable<GetOrderShippingLinesQuery['activeOrder']>)['shippingLines']>)[number]>;
  export type ShippingMethod = (NonNullable<NonNullable<(NonNullable<(NonNullable<GetOrderShippingLinesQuery['activeOrder']>)['shippingLines']>)[number]>['shippingMethod']>);
  export type CustomFields = (NonNullable<(NonNullable<NonNullable<(NonNullable<(NonNullable<GetOrderShippingLinesQuery['activeOrder']>)['shippingLines']>)[number]>['shippingMethod']>)['customFields']>);
  export type DeliveryDates = NonNullable<(NonNullable<(NonNullable<(NonNullable<NonNullable<(NonNullable<(NonNullable<GetOrderShippingLinesQuery['activeOrder']>)['shippingLines']>)[number]>['shippingMethod']>)['customFields']>)['deliveryDates']>)[number]>;
}

export namespace GetSingleOrder {
  export type Variables = GetSingleOrderQueryVariables;
  export type Query = GetSingleOrderQuery;
  export type Order = (NonNullable<GetSingleOrderQuery['order']>);
  export type Discounts = NonNullable<(NonNullable<(NonNullable<GetSingleOrderQuery['order']>)['discounts']>)[number]>;
  export type Surcharges = NonNullable<(NonNullable<(NonNullable<GetSingleOrderQuery['order']>)['surcharges']>)[number]>;
  export type Customer = (NonNullable<(NonNullable<GetSingleOrderQuery['order']>)['customer']>);
  export type Lines = NonNullable<(NonNullable<(NonNullable<GetSingleOrderQuery['order']>)['lines']>)[number]>;
  export type ProductVariant = (NonNullable<NonNullable<(NonNullable<(NonNullable<GetSingleOrderQuery['order']>)['lines']>)[number]>['productVariant']>);
}

export namespace AddItemToOrder {
  export type Variables = AddItemToOrderMutationVariables;
  export type Mutation = AddItemToOrderMutation;
  export type AddItemToOrder = (NonNullable<AddItemToOrderMutation['addItemToOrder']>);
}

export namespace AddItemsToOrder {
  export type Variables = AddItemsToOrderMutationVariables;
  export type Mutation = AddItemsToOrderMutation;
  export type AddItemsToOrder = (NonNullable<AddItemsToOrderMutation['addItemsToOrder']>);
}

export namespace AdjustOrderLine {
  export type Variables = AdjustOrderLineMutationVariables;
  export type Mutation = AdjustOrderLineMutation;
  export type AdjustOrderLine = (NonNullable<AdjustOrderLineMutation['adjustOrderLine']>);
}

export namespace AdjustOrderLines {
  export type Variables = AdjustOrderLinesMutationVariables;
  export type Mutation = AdjustOrderLinesMutation;
  export type AdjustOrderLines = (NonNullable<AdjustOrderLinesMutation['adjustOrderLines']>);
}

export namespace AdjustProductVariantInOrder {
  export type Variables = AdjustProductVariantInOrderMutationVariables;
  export type Mutation = AdjustProductVariantInOrderMutation;
  export type AdjustProductVariantInOrder = (NonNullable<AdjustProductVariantInOrderMutation['adjustProductVariantInOrder']>);
}

export namespace RemoveItemFromOrder {
  export type Variables = RemoveItemFromOrderMutationVariables;
  export type Mutation = RemoveItemFromOrderMutation;
  export type RemoveItemFromOrder = (NonNullable<RemoveItemFromOrderMutation['removeItemFromOrder']>);
}

export namespace RemoveAllOrderLines {
  export type Variables = RemoveAllOrderLinesMutationVariables;
  export type Mutation = RemoveAllOrderLinesMutation;
  export type RemoveAllOrderLines = (NonNullable<RemoveAllOrderLinesMutation['removeAllOrderLines']>);
}

export namespace UpdateOrderDeliveryDate {
  export type Variables = UpdateOrderDeliveryDateMutationVariables;
  export type Mutation = UpdateOrderDeliveryDateMutation;
  export type UpdateOrderDeliveryDate = (NonNullable<UpdateOrderDeliveryDateMutation['updateOrderDeliveryDate']>);
  export type CustomFields = (NonNullable<(NonNullable<UpdateOrderDeliveryDateMutation['updateOrderDeliveryDate']>)['customFields']>);
}

export namespace UpdateOrderShippingAddress {
  export type Variables = UpdateOrderShippingAddressMutationVariables;
  export type Mutation = UpdateOrderShippingAddressMutation;
  export type SetOrderShippingAddress = (NonNullable<UpdateOrderShippingAddressMutation['setOrderShippingAddress']>);
  export type OrderInlineFragment = (DiscriminateUnion<(NonNullable<UpdateOrderShippingAddressMutation['setOrderShippingAddress']>), { __typename?: 'Order' }>);
  export type ShippingLines = NonNullable<(NonNullable<(DiscriminateUnion<(NonNullable<UpdateOrderShippingAddressMutation['setOrderShippingAddress']>), { __typename?: 'Order' }>)['shippingLines']>)[number]>;
  export type ShippingMethod = (NonNullable<NonNullable<(NonNullable<(DiscriminateUnion<(NonNullable<UpdateOrderShippingAddressMutation['setOrderShippingAddress']>), { __typename?: 'Order' }>)['shippingLines']>)[number]>['shippingMethod']>);
  export type CustomFields = (NonNullable<(NonNullable<NonNullable<(NonNullable<(DiscriminateUnion<(NonNullable<UpdateOrderShippingAddressMutation['setOrderShippingAddress']>), { __typename?: 'Order' }>)['shippingLines']>)[number]>['shippingMethod']>)['customFields']>);
  export type DeliveryDates = NonNullable<(NonNullable<(NonNullable<(NonNullable<NonNullable<(NonNullable<(DiscriminateUnion<(NonNullable<UpdateOrderShippingAddressMutation['setOrderShippingAddress']>), { __typename?: 'Order' }>)['shippingLines']>)[number]>['shippingMethod']>)['customFields']>)['deliveryDates']>)[number]>;
}

export namespace SetOrderCustomFields {
  export type Variables = SetOrderCustomFieldsMutationVariables;
  export type Mutation = SetOrderCustomFieldsMutation;
  export type SetOrderCustomFields = (NonNullable<SetOrderCustomFieldsMutation['setOrderCustomFields']>);
  export type OrderInlineFragment = (DiscriminateUnion<(NonNullable<SetOrderCustomFieldsMutation['setOrderCustomFields']>), { __typename?: 'Order' }>);
  export type CustomFields = (NonNullable<(DiscriminateUnion<(NonNullable<SetOrderCustomFieldsMutation['setOrderCustomFields']>), { __typename?: 'Order' }>)['customFields']>);
}

export namespace MarkOrderAsInactive {
  export type Variables = MarkOrderAsInactiveMutationVariables;
  export type Mutation = MarkOrderAsInactiveMutation;
}

export namespace RequestOrderComplaint {
  export type Variables = RequestOrderComplaintMutationVariables;
  export type Mutation = RequestOrderComplaintMutation;
}

export namespace SavedPaymentMethods {
  export type Variables = SavedPaymentMethodsQueryVariables;
  export type Query = SavedPaymentMethodsQuery;
  export type SavedPaymentMethods = NonNullable<(NonNullable<SavedPaymentMethodsQuery['savedPaymentMethods']>)[number]>;
  export type Billing_Details = (NonNullable<NonNullable<(NonNullable<SavedPaymentMethodsQuery['savedPaymentMethods']>)[number]>['billing_details']>);
  export type Card = (NonNullable<NonNullable<(NonNullable<SavedPaymentMethodsQuery['savedPaymentMethods']>)[number]>['card']>);
  export type Sepa_Debit = (NonNullable<NonNullable<(NonNullable<SavedPaymentMethodsQuery['savedPaymentMethods']>)[number]>['sepa_debit']>);
}

export namespace DeleteSavedPaymentMethod {
  export type Variables = DeleteSavedPaymentMethodMutationVariables;
  export type Mutation = DeleteSavedPaymentMethodMutation;
}

export namespace Producer {
  export type Variables = ProducerQueryVariables;
  export type Query = ProducerQuery;
  export type Producer = (NonNullable<ProducerQuery['producer']>);
  export type FeaturedAsset = (NonNullable<(NonNullable<ProducerQuery['producer']>)['featuredAsset']>);
  export type Assets = NonNullable<(NonNullable<(NonNullable<ProducerQuery['producer']>)['assets']>)[number]>;
  export type Address = (NonNullable<(NonNullable<ProducerQuery['producer']>)['address']>);
}

export namespace Producers {
  export type Variables = ProducersQueryVariables;
  export type Query = ProducersQuery;
  export type Producers = (NonNullable<ProducersQuery['producers']>);
  export type Items = NonNullable<(NonNullable<(NonNullable<ProducersQuery['producers']>)['items']>)[number]>;
  export type FeaturedAsset = (NonNullable<NonNullable<(NonNullable<(NonNullable<ProducersQuery['producers']>)['items']>)[number]>['featuredAsset']>);
}

export namespace ProducersProductVariants {
  export type Variables = ProducersProductVariantsQueryVariables;
  export type Query = ProducersProductVariantsQuery;
  export type ProducersProductVariants = (NonNullable<ProducersProductVariantsQuery['producersProductVariants']>);
  export type Items = NonNullable<(NonNullable<(NonNullable<ProducersProductVariantsQuery['producersProductVariants']>)['items']>)[number]>;
}

export namespace ProductVariant {
  export type Variables = ProductVariantQueryVariables;
  export type Query = ProductVariantQuery;
  export type ProductVariant = (NonNullable<ProductVariantQuery['productVariant']>);
}

export namespace SearchProducts {
  export type Variables = SearchProductsQueryVariables;
  export type Query = SearchProductsQuery;
  export type SearchProducts = (NonNullable<SearchProductsQuery['searchProducts']>);
  export type Items = NonNullable<(NonNullable<(NonNullable<SearchProductsQuery['searchProducts']>)['items']>)[number]>;
  export type FeaturedAsset = (NonNullable<NonNullable<(NonNullable<(NonNullable<SearchProductsQuery['searchProducts']>)['items']>)[number]>['featuredAsset']>);
  export type Product = (NonNullable<NonNullable<(NonNullable<(NonNullable<SearchProductsQuery['searchProducts']>)['items']>)[number]>['product']>);
  export type FacetValues = NonNullable<(NonNullable<(NonNullable<NonNullable<(NonNullable<(NonNullable<SearchProductsQuery['searchProducts']>)['items']>)[number]>['product']>)['facetValues']>)[number]>;
  export type Facet = (NonNullable<NonNullable<(NonNullable<(NonNullable<NonNullable<(NonNullable<(NonNullable<SearchProductsQuery['searchProducts']>)['items']>)[number]>['product']>)['facetValues']>)[number]>['facet']>);
}

export namespace CreateProductSuggestion {
  export type Variables = CreateProductSuggestionMutationVariables;
  export type Mutation = CreateProductSuggestionMutation;
}

export namespace UpSellingProductVariants {
  export type Variables = UpSellingProductVariantsQueryVariables;
  export type Query = UpSellingProductVariantsQuery;
  export type UpSellingProductVariants = (NonNullable<UpSellingProductVariantsQuery['upSellingProductVariants']>);
  export type Items = NonNullable<(NonNullable<(NonNullable<UpSellingProductVariantsQuery['upSellingProductVariants']>)['items']>)[number]>;
}

export namespace RandomCollectionProductVariants {
  export type Variables = RandomCollectionProductVariantsQueryVariables;
  export type Query = RandomCollectionProductVariantsQuery;
  export type RandomCollectionProductVariants = NonNullable<(NonNullable<RandomCollectionProductVariantsQuery['randomCollectionProductVariants']>)[number]>;
}

export namespace Recipes {
  export type Variables = RecipesQueryVariables;
  export type Query = RecipesQuery;
  export type Recipes = (NonNullable<RecipesQuery['recipes']>);
  export type Items = NonNullable<(NonNullable<(NonNullable<RecipesQuery['recipes']>)['items']>)[number]>;
  export type FeaturedAsset = (NonNullable<NonNullable<(NonNullable<(NonNullable<RecipesQuery['recipes']>)['items']>)[number]>['featuredAsset']>);
}

export namespace RecipeDetails {
  export type Variables = RecipeDetailsQueryVariables;
  export type Query = RecipeDetailsQuery;
  export type Recipe = (NonNullable<RecipeDetailsQuery['recipe']>);
  export type Assets = NonNullable<(NonNullable<(NonNullable<RecipeDetailsQuery['recipe']>)['assets']>)[number]>;
  export type ProductVariants = NonNullable<(NonNullable<(NonNullable<RecipeDetailsQuery['recipe']>)['productVariants']>)[number]>;
}

export namespace Specials {
  export type Variables = SpecialsQueryVariables;
  export type Query = SpecialsQuery;
  export type Specials = (NonNullable<SpecialsQuery['specials']>);
  export type Items = NonNullable<(NonNullable<(NonNullable<SpecialsQuery['specials']>)['items']>)[number]>;
  export type FeaturedAsset = (NonNullable<NonNullable<(NonNullable<(NonNullable<SpecialsQuery['specials']>)['items']>)[number]>['featuredAsset']>);
}

export namespace Special {
  export type Variables = SpecialQueryVariables;
  export type Query = SpecialQuery;
  export type Special = (NonNullable<SpecialQuery['special']>);
  export type FeaturedAsset = (NonNullable<(NonNullable<SpecialQuery['special']>)['featuredAsset']>);
  export type ProductVariants = NonNullable<(NonNullable<(NonNullable<SpecialQuery['special']>)['productVariants']>)[number]>;
}

export namespace GetWalletTotal {
  export type Variables = GetWalletTotalQueryVariables;
  export type Query = GetWalletTotalQuery;
  export type Wallet = (NonNullable<GetWalletTotalQuery['wallet']>);
}

export namespace GetWalletDetails {
  export type Variables = GetWalletDetailsQueryVariables;
  export type Query = GetWalletDetailsQuery;
  export type Wallet = (NonNullable<GetWalletDetailsQuery['wallet']>);
  export type WalletItems = NonNullable<(NonNullable<(NonNullable<GetWalletDetailsQuery['wallet']>)['walletItems']>)[number]>;
}

export namespace AddGiftCouponToWallet {
  export type Variables = AddGiftCouponToWalletMutationVariables;
  export type Mutation = AddGiftCouponToWalletMutation;
  export type AddGiftCouponToWallet = (NonNullable<AddGiftCouponToWalletMutation['addGiftCouponToWallet']>);
}

export namespace RequestPayout {
  export type Variables = RequestPayoutMutationVariables;
  export type Mutation = RequestPayoutMutation;
}

export namespace ApplyWalletTotal {
  export type Variables = ApplyWalletTotalMutationVariables;
  export type Mutation = ApplyWalletTotalMutation;
  export type ApplyWalletTotal = (NonNullable<ApplyWalletTotalMutation['applyWalletTotal']>);
  export type CustomFields = (NonNullable<(NonNullable<ApplyWalletTotalMutation['applyWalletTotal']>)['customFields']>);
}

export namespace RemoveWalletTotal {
  export type Variables = RemoveWalletTotalMutationVariables;
  export type Mutation = RemoveWalletTotalMutation;
  export type RemoveWalletTotal = (NonNullable<RemoveWalletTotalMutation['removeWalletTotal']>);
  export type CustomFields = (NonNullable<(NonNullable<RemoveWalletTotalMutation['removeWalletTotal']>)['customFields']>);
}

export namespace BaseAddress {
  export type Fragment = BaseAddressFragment;
  export type Country = (NonNullable<BaseAddressFragment['country']>);
}

export namespace BaseCountry {
  export type Fragment = BaseCountryFragment;
}

export namespace OrderCustomFields {
  export type Fragment = OrderCustomFieldsFragment;
  export type DeliveryDate = (NonNullable<OrderCustomFieldsFragment['deliveryDate']>);
}

export namespace BaseOrder {
  export type Fragment = BaseOrderFragment;
  export type CustomFields = (NonNullable<BaseOrderFragment['customFields']>);
  export type ShippingAddress = (NonNullable<BaseOrderFragment['shippingAddress']>);
}

export namespace Discount {
  export type Fragment = DiscountFragment;
}

export namespace ExtendedOrder {
  export type Fragment = ExtendedOrderFragment;
  export type Customer = (NonNullable<ExtendedOrderFragment['customer']>);
  export type Discounts = NonNullable<(NonNullable<ExtendedOrderFragment['discounts']>)[number]>;
  export type Surcharges = NonNullable<(NonNullable<ExtendedOrderFragment['surcharges']>)[number]>;
  export type Lines = NonNullable<(NonNullable<ExtendedOrderFragment['lines']>)[number]>;
  export type ProductVariant = (NonNullable<NonNullable<(NonNullable<ExtendedOrderFragment['lines']>)[number]>['productVariant']>);
}

export namespace OrderReturnValue {
  export type Fragment = OrderReturnValueFragment;
  export type Discounts = NonNullable<(NonNullable<OrderReturnValueFragment['discounts']>)[number]>;
  export type Surcharges = NonNullable<(NonNullable<OrderReturnValueFragment['surcharges']>)[number]>;
  export type CustomFields = (NonNullable<OrderReturnValueFragment['customFields']>);
  export type Lines = NonNullable<(NonNullable<OrderReturnValueFragment['lines']>)[number]>;
  export type ProductVariant = (NonNullable<NonNullable<(NonNullable<OrderReturnValueFragment['lines']>)[number]>['productVariant']>);
}

export namespace OrderStatus {
  export type Fragment = OrderStatusFragment;
  export type OrderInlineFragment = (DiscriminateUnion<OrderStatusFragment, { __typename?: 'Order' }>);
  export type InsufficientStockErrorInlineFragment = (DiscriminateUnion<OrderStatusFragment, { __typename?: 'InsufficientStockError' }>);
}

export namespace ProductVariantFragment {
  export type Fragment = ProductVariantFragmentFragment;
  export type CustomFields = (NonNullable<ProductVariantFragmentFragment['customFields']>);
  export type FeaturedAsset = (NonNullable<ProductVariantFragmentFragment['featuredAsset']>);
  export type Product = (NonNullable<ProductVariantFragmentFragment['product']>);
  export type _FeaturedAsset = (NonNullable<(NonNullable<ProductVariantFragmentFragment['product']>)['featuredAsset']>);
  export type FacetValues = NonNullable<(NonNullable<(NonNullable<ProductVariantFragmentFragment['product']>)['facetValues']>)[number]>;
  export type Facet = (NonNullable<NonNullable<(NonNullable<(NonNullable<ProductVariantFragmentFragment['product']>)['facetValues']>)[number]>['facet']>);
  export type _CustomFields = (NonNullable<(NonNullable<ProductVariantFragmentFragment['product']>)['customFields']>);
}

export namespace ExtendedProductVariantFragment {
  export type Fragment = ExtendedProductVariantFragmentFragment;
  export type CustomFields = (NonNullable<ExtendedProductVariantFragmentFragment['customFields']>);
  export type Assets = NonNullable<(NonNullable<ExtendedProductVariantFragmentFragment['assets']>)[number]>;
  export type Product = (NonNullable<ExtendedProductVariantFragmentFragment['product']>);
  export type _Assets = NonNullable<(NonNullable<(NonNullable<ExtendedProductVariantFragmentFragment['product']>)['assets']>)[number]>;
  export type Collections = NonNullable<(NonNullable<(NonNullable<ExtendedProductVariantFragmentFragment['product']>)['collections']>)[number]>;
  export type Parent = (NonNullable<NonNullable<(NonNullable<(NonNullable<ExtendedProductVariantFragmentFragment['product']>)['collections']>)[number]>['parent']>);
  export type FacetValues = NonNullable<(NonNullable<(NonNullable<ExtendedProductVariantFragmentFragment['product']>)['facetValues']>)[number]>;
  export type Facet = (NonNullable<NonNullable<(NonNullable<(NonNullable<ExtendedProductVariantFragmentFragment['product']>)['facetValues']>)[number]>['facet']>);
  export type _CustomFields = (NonNullable<(NonNullable<ExtendedProductVariantFragmentFragment['product']>)['customFields']>);
  export type Producer = (NonNullable<(NonNullable<(NonNullable<ExtendedProductVariantFragmentFragment['product']>)['customFields']>)['producer']>);
  export type Address = (NonNullable<(NonNullable<(NonNullable<(NonNullable<ExtendedProductVariantFragmentFragment['product']>)['customFields']>)['producer']>)['address']>);
}

export type AutoCompleteQueryVariables = Exact<{
  input: Scalars['String'];
}>;


export type AutoCompleteQuery = { __typename?: 'Query', autoComplete: Array<{ __typename?: 'AddressAutoCompletion', isInArea?: boolean | null, address?: { __typename?: 'AddressFormat', countryCode?: string | null, name?: string | null, country?: string | null, city?: string | null, province?: string | null, postalCode?: string | null, street?: string | null, streetNumber?: string | null, placeId?: string | null, latitude?: string | null, longitude?: string | null } | null } | null> };

export type CreateCustomerAddressMutationVariables = Exact<{
  input: CreateAddressInput;
}>;


export type CreateCustomerAddressMutation = { __typename?: 'Mutation', createCustomerAddress: { __typename?: 'Address', id: string, fullName?: string | null, streetLine1: string, city?: string | null, postalCode?: string | null, country: { __typename?: 'Country', code: string } } };

export type GetCustomerAddressesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCustomerAddressesQuery = { __typename?: 'Query', activeCustomer?: { __typename?: 'Customer', id: string, addresses?: Array<{ __typename?: 'Address', id: string, fullName?: string | null, company?: string | null, streetLine1: string, streetLine2?: string | null, city?: string | null, province?: string | null, postalCode?: string | null, phoneNumber?: string | null, defaultShippingAddress?: boolean | null, defaultBillingAddress?: boolean | null, country: { __typename?: 'Country', id: string, code: string, name: string } }> | null } | null };

export type UpdateCustomerAddressMutationVariables = Exact<{
  input: UpdateAddressInput;
}>;


export type UpdateCustomerAddressMutation = { __typename?: 'Mutation', updateCustomerAddress: { __typename?: 'Address', id: string, fullName?: string | null, company?: string | null, streetLine1: string, streetLine2?: string | null, city?: string | null, province?: string | null, postalCode?: string | null, phoneNumber?: string | null, defaultShippingAddress?: boolean | null, defaultBillingAddress?: boolean | null, country: { __typename?: 'Country', id: string, code: string, name: string } } };

export type DeleteCustomerAddressMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteCustomerAddressMutation = { __typename?: 'Mutation', deleteCustomerAddress: { __typename?: 'Success', success: boolean } };

export type RegisterCustomerAccountMutationVariables = Exact<{
  input: RegisterCustomerInput;
}>;


export type RegisterCustomerAccountMutation = { __typename?: 'Mutation', registerCustomerAccount: { __typename?: 'MissingPasswordError' } | { __typename?: 'NativeAuthStrategyError' } | { __typename?: 'PasswordValidationError' } | { __typename?: 'Success', success: boolean } };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'CurrentUser', id: string, identifier: string } | { __typename?: 'InvalidCredentialsError', message: string } | { __typename?: 'NativeAuthStrategyError' } | { __typename?: 'NotVerifiedError' } };

export type LogoutCustomerMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutCustomerMutation = { __typename?: 'Mutation', logoutCustomer: { __typename?: 'Success', success: boolean } };

export type FacebookAuthenticateMutationVariables = Exact<{
  input?: InputMaybe<FacebookAuthInput>;
}>;


export type FacebookAuthenticateMutation = { __typename?: 'Mutation', authenticate: { __typename?: 'CurrentUser', id: string, identifier: string } | { __typename?: 'InvalidCredentialsError' } | { __typename?: 'NotVerifiedError' } };

export type GoogleAuthenticateMutationVariables = Exact<{
  input?: InputMaybe<GoogleAuthInput>;
}>;


export type GoogleAuthenticateMutation = { __typename?: 'Mutation', authenticate: { __typename?: 'CurrentUser', id: string, identifier: string } | { __typename?: 'InvalidCredentialsError' } | { __typename?: 'NotVerifiedError' } };

export type AppleAuthenticateMutationVariables = Exact<{
  input?: InputMaybe<AppleAuthData>;
}>;


export type AppleAuthenticateMutation = { __typename?: 'Mutation', authenticate: { __typename?: 'CurrentUser', id: string, identifier: string } | { __typename?: 'InvalidCredentialsError' } | { __typename?: 'NotVerifiedError' } };

export type CreateWaitingListMutationVariables = Exact<{
  email: Scalars['String'];
  postalCode: Scalars['String'];
}>;


export type CreateWaitingListMutation = { __typename?: 'Mutation', createWaitingList: { __typename?: 'WaitingList', id: string } };

export type RequestPasswordResetMutationVariables = Exact<{
  emailAddress: Scalars['String'];
}>;


export type RequestPasswordResetMutation = { __typename?: 'Mutation', requestPasswordReset?: { __typename: 'NativeAuthStrategyError' } | { __typename: 'Success' } | null };

export type ResetPasswordMutationVariables = Exact<{
  token: Scalars['String'];
  password: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'CurrentUser', id: string, identifier: string } | { __typename?: 'NativeAuthStrategyError' } | { __typename?: 'NotVerifiedError' } | { __typename?: 'PasswordResetTokenExpiredError', message: string } | { __typename?: 'PasswordResetTokenInvalidError', message: string } | { __typename?: 'PasswordValidationError' } };

export type ChannelsQueryVariables = Exact<{ [key: string]: never; }>;


export type ChannelsQuery = { __typename?: 'Query', channels: Array<{ __typename?: 'Channel', id: string, code: string, token: string }> };

export type ActiveChannelQueryVariables = Exact<{ [key: string]: never; }>;


export type ActiveChannelQuery = { __typename?: 'Query', activeChannel: { __typename?: 'Channel', id: string, code: string } };

export type CreatePaypalPaymentMutationVariables = Exact<{ [key: string]: never; }>;


export type CreatePaypalPaymentMutation = { __typename?: 'Mutation', createPaypalPayment?: string | null };

export type CreatePaymentIntentMutationVariables = Exact<{ [key: string]: never; }>;


export type CreatePaymentIntentMutation = { __typename?: 'Mutation', createStripePaymentIntent?: string | null };

export type CreateSetupIntentMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateSetupIntentMutation = { __typename?: 'Mutation', createSetupIntent: { __typename?: 'SetupIntent', clientSecret: string, setupIntentId: string } };

export type TransitionOrderToStateMutationVariables = Exact<{
  state: Scalars['String'];
}>;


export type TransitionOrderToStateMutation = { __typename?: 'Mutation', transitionOrderToState?: { __typename: 'Order', id: string } | { __typename: 'OrderStateTransitionError', errorCode: ErrorCode, message: string, transitionError: string } | null };

export type AddPaymentToOrderMutationVariables = Exact<{
  method: Scalars['String'];
}>;


export type AddPaymentToOrderMutation = { __typename?: 'Mutation', addPaymentToOrder: { __typename?: 'IneligiblePaymentMethodError' } | { __typename?: 'NoActiveOrderError' } | { __typename?: 'Order', id: string } | { __typename?: 'OrderPaymentStateError' } | { __typename?: 'OrderStateTransitionError' } | { __typename?: 'PaymentDeclinedError' } | { __typename?: 'PaymentFailedError' } };

export type ApplyGiftCouponCodeMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type ApplyGiftCouponCodeMutation = { __typename?: 'Mutation', applyGiftCouponCode: { __typename?: 'Order', id: string, totalQuantity: number, totalWithTax: number, missingAmountToMOV?: number | null, missingAmountToFreeShipping?: number | null, shippingWithTax: number, subTotalNoDiscounts?: number | null, discounts: Array<{ __typename?: 'Discount', description: string, amountWithTax: number, initialValue?: number | null }>, surcharges: Array<{ __typename?: 'Surcharge', sku?: string | null, priceWithTax: number }>, customFields?: { __typename?: 'OrderCustomFields', usedWalletValue?: number | null } | null, lines: Array<{ __typename?: 'OrderLine', id: string, quantity: number, productVariant: { __typename?: 'ProductVariant', stock?: number | null, id: string, displayName?: string | null, priceWithTax: number, pricePerUnit?: string | null, stockLevel: string, discountPercentage?: number | null, displayDeposit?: string | null, enabled?: boolean | null, deletedAt?: any | null, customFields?: { __typename?: 'ProductVariantCustomFields', isAlcoholic?: boolean | null } | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, product: { __typename?: 'Product', id: string, enabled?: boolean | null, deletedAt?: any | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, facetValues: Array<{ __typename?: 'FacetValue', name: string, code: string, facet: { __typename?: 'Facet', code: string } }>, customFields?: { __typename?: 'ProductCustomFields', isFreshProduct?: boolean | null } | null } } }> } };

export type RemoveGiftCouponCodeMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type RemoveGiftCouponCodeMutation = { __typename?: 'Mutation', removeGiftCouponCode: { __typename?: 'Order', id: string, totalQuantity: number, totalWithTax: number, missingAmountToMOV?: number | null, missingAmountToFreeShipping?: number | null, shippingWithTax: number, subTotalNoDiscounts?: number | null, discounts: Array<{ __typename?: 'Discount', description: string, amountWithTax: number, initialValue?: number | null }>, surcharges: Array<{ __typename?: 'Surcharge', sku?: string | null, priceWithTax: number }>, customFields?: { __typename?: 'OrderCustomFields', usedWalletValue?: number | null } | null, lines: Array<{ __typename?: 'OrderLine', id: string, quantity: number, productVariant: { __typename?: 'ProductVariant', stock?: number | null, id: string, displayName?: string | null, priceWithTax: number, pricePerUnit?: string | null, stockLevel: string, discountPercentage?: number | null, displayDeposit?: string | null, enabled?: boolean | null, deletedAt?: any | null, customFields?: { __typename?: 'ProductVariantCustomFields', isAlcoholic?: boolean | null } | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, product: { __typename?: 'Product', id: string, enabled?: boolean | null, deletedAt?: any | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, facetValues: Array<{ __typename?: 'FacetValue', name: string, code: string, facet: { __typename?: 'Facet', code: string } }>, customFields?: { __typename?: 'ProductCustomFields', isFreshProduct?: boolean | null } | null } } }> } };

export type ApplyCouponCodeMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type ApplyCouponCodeMutation = { __typename?: 'Mutation', applyCouponCode: { __typename?: 'CouponCodeExpiredError' } | { __typename?: 'CouponCodeInvalidError' } | { __typename?: 'CouponCodeLimitError' } | { __typename?: 'Order', id: string, totalQuantity: number, totalWithTax: number, missingAmountToMOV?: number | null, missingAmountToFreeShipping?: number | null, shippingWithTax: number, subTotalNoDiscounts?: number | null, discounts: Array<{ __typename?: 'Discount', description: string, amountWithTax: number, initialValue?: number | null }>, surcharges: Array<{ __typename?: 'Surcharge', sku?: string | null, priceWithTax: number }>, customFields?: { __typename?: 'OrderCustomFields', usedWalletValue?: number | null } | null, lines: Array<{ __typename?: 'OrderLine', id: string, quantity: number, productVariant: { __typename?: 'ProductVariant', stock?: number | null, id: string, displayName?: string | null, priceWithTax: number, pricePerUnit?: string | null, stockLevel: string, discountPercentage?: number | null, displayDeposit?: string | null, enabled?: boolean | null, deletedAt?: any | null, customFields?: { __typename?: 'ProductVariantCustomFields', isAlcoholic?: boolean | null } | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, product: { __typename?: 'Product', id: string, enabled?: boolean | null, deletedAt?: any | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, facetValues: Array<{ __typename?: 'FacetValue', name: string, code: string, facet: { __typename?: 'Facet', code: string } }>, customFields?: { __typename?: 'ProductCustomFields', isFreshProduct?: boolean | null } | null } } }> } };

export type RemoveCouponCodeMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type RemoveCouponCodeMutation = { __typename?: 'Mutation', removeCouponCode?: { __typename?: 'Order', id: string, totalQuantity: number, totalWithTax: number, missingAmountToMOV?: number | null, missingAmountToFreeShipping?: number | null, shippingWithTax: number, subTotalNoDiscounts?: number | null, discounts: Array<{ __typename?: 'Discount', description: string, amountWithTax: number, initialValue?: number | null }>, surcharges: Array<{ __typename?: 'Surcharge', sku?: string | null, priceWithTax: number }>, customFields?: { __typename?: 'OrderCustomFields', usedWalletValue?: number | null } | null, lines: Array<{ __typename?: 'OrderLine', id: string, quantity: number, productVariant: { __typename?: 'ProductVariant', stock?: number | null, id: string, displayName?: string | null, priceWithTax: number, pricePerUnit?: string | null, stockLevel: string, discountPercentage?: number | null, displayDeposit?: string | null, enabled?: boolean | null, deletedAt?: any | null, customFields?: { __typename?: 'ProductVariantCustomFields', isAlcoholic?: boolean | null } | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, product: { __typename?: 'Product', id: string, enabled?: boolean | null, deletedAt?: any | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, facetValues: Array<{ __typename?: 'FacetValue', name: string, code: string, facet: { __typename?: 'Facet', code: string } }>, customFields?: { __typename?: 'ProductCustomFields', isFreshProduct?: boolean | null } | null } } }> } | null };

export type RootCollectionsQueryVariables = Exact<{ [key: string]: never; }>;


export type RootCollectionsQuery = { __typename?: 'Query', rootCollections: { __typename?: 'CollectionList', items: Array<{ __typename?: 'Collection', id: string, name: string, slug: string, description: string, featuredAsset?: { __typename?: 'Asset', preview: string } | null, children?: Array<{ __typename?: 'Collection', id: string, name: string }> | null }> } };

export type CollectionsFullDataQueryVariables = Exact<{ [key: string]: never; }>;


export type CollectionsFullDataQuery = { __typename?: 'Query', rootCollections: { __typename?: 'CollectionList', items: Array<{ __typename?: 'Collection', id: string, name: string, slug: string, children?: Array<{ __typename?: 'Collection', id: string, name: string, productVariants: { __typename?: 'ProductVariantList', items: Array<{ __typename?: 'ProductVariant', id: string, displayName?: string | null, priceWithTax: number, pricePerUnit?: string | null, stockLevel: string, displayDeposit?: string | null, customFields?: { __typename?: 'ProductVariantCustomFields', isAlcoholic?: boolean | null } | null }> } }> | null }> } };

export type GetCollectionContentsQueryVariables = Exact<{
  id: Scalars['ID'];
  options?: InputMaybe<ProductVariantListOptions>;
}>;


export type GetCollectionContentsQuery = { __typename?: 'Query', collection?: { __typename?: 'Collection', id: string, name: string, slug: string, productVariants: { __typename?: 'ProductVariantList', items: Array<{ __typename?: 'ProductVariant', id: string, stockLevel: string, displayDeposit?: string | null, discountPercentage?: number | null, customFields?: { __typename?: 'ProductVariantCustomFields', isAlcoholic?: boolean | null } | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, product: { __typename?: 'Product', id: string, featuredAsset?: { __typename?: 'Asset', preview: string } | null, facetValues: Array<{ __typename?: 'FacetValue', name: string, code: string, facet: { __typename?: 'Facet', code: string } }>, customFields?: { __typename?: 'ProductCustomFields', isFreshProduct?: boolean | null } | null } }> } } | null };

export type ActiveCustomerQueryVariables = Exact<{ [key: string]: never; }>;


export type ActiveCustomerQuery = { __typename?: 'Query', activeCustomer?: { __typename?: 'Customer', id: string, firstName: string, lastName: string, emailAddress: string, phoneNumber?: string | null, customFields?: { __typename?: 'CustomerCustomFields', isOfLegalAge?: boolean | null, activeChannel?: { __typename?: 'Channel', id: string, token: string, code: string } | null } | null, user?: { __typename?: 'User', authenticationMethods: Array<{ __typename?: 'AuthenticationMethod', strategy: string }> } | null } | null };

export type CustomerGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type CustomerGroupsQuery = { __typename?: 'Query', customerGroups?: Array<{ __typename?: 'CustomerGroup', id: string, name: string }> | null };

export type UpdateCustomerMutationVariables = Exact<{
  input: UpdateCustomerInput;
}>;


export type UpdateCustomerMutation = { __typename?: 'Mutation', updateCustomer: { __typename?: 'Customer', firstName: string, lastName: string, phoneNumber?: string | null, emailAddress: string, customFields?: { __typename?: 'CustomerCustomFields', isOfLegalAge?: boolean | null } | null } };

export type DeleteCustomerMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteCustomerMutation = { __typename?: 'Mutation', deleteCustomer: { __typename?: 'DeletionResponse', result: DeletionResult, message?: string | null } };

export type CheckIsSubscribedToNewsletterQueryVariables = Exact<{ [key: string]: never; }>;


export type CheckIsSubscribedToNewsletterQuery = { __typename?: 'Query', checkIsSubscribedToNewsletter: boolean };

export type SubscribeToNewsletterMutationVariables = Exact<{ [key: string]: never; }>;


export type SubscribeToNewsletterMutation = { __typename?: 'Mutation', subscribeToNewsletter?: boolean | null };

export type UnsubscribeFromNewsletterMutationVariables = Exact<{ [key: string]: never; }>;


export type UnsubscribeFromNewsletterMutation = { __typename?: 'Mutation', unsubscribeFromNewsletter?: boolean | null };

export type UpdateCustomerPasswordMutationVariables = Exact<{
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type UpdateCustomerPasswordMutation = { __typename?: 'Mutation', updateCustomerPassword: { __typename?: 'InvalidCredentialsError' } | { __typename?: 'NativeAuthStrategyError' } | { __typename?: 'PasswordValidationError' } | { __typename?: 'Success', success: boolean } };

export type RequestUpdateCustomerEmailAddressMutationVariables = Exact<{
  password: Scalars['String'];
  newEmailAddress: Scalars['String'];
}>;


export type RequestUpdateCustomerEmailAddressMutation = { __typename?: 'Mutation', requestUpdateCustomerEmailAddress: { __typename?: 'EmailAddressConflictError' } | { __typename?: 'InvalidCredentialsError' } | { __typename?: 'NativeAuthStrategyError' } | { __typename?: 'Success', success: boolean } };

export type ToggleFavoriteMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type ToggleFavoriteMutation = { __typename?: 'Mutation', toggleFavorite?: boolean | null };

export type FavoriteCollectionsQueryVariables = Exact<{ [key: string]: never; }>;


export type FavoriteCollectionsQuery = { __typename?: 'Query', favoriteCollections: { __typename?: 'CollectionList', items: Array<{ __typename?: 'Collection', id: string, name: string }> } };

export type FavoritesQueryVariables = Exact<{
  options?: InputMaybe<FavoriteListOptions>;
}>;


export type FavoritesQuery = { __typename?: 'Query', favorites: { __typename?: 'FavoriteList', items: Array<{ __typename?: 'Favorite', productVariant: { __typename?: 'ProductVariant', id: string, displayName?: string | null, priceWithTax: number, pricePerUnit?: string | null, stockLevel: string, discountPercentage?: number | null, displayDeposit?: string | null, enabled?: boolean | null, deletedAt?: any | null, customFields?: { __typename?: 'ProductVariantCustomFields', isAlcoholic?: boolean | null } | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, product: { __typename?: 'Product', id: string, enabled?: boolean | null, deletedAt?: any | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, facetValues: Array<{ __typename?: 'FacetValue', name: string, code: string, facet: { __typename?: 'Facet', code: string } }>, customFields?: { __typename?: 'ProductCustomFields', isFreshProduct?: boolean | null } | null } } }> } };

export type FreshProductRestockTimeQueryVariables = Exact<{ [key: string]: never; }>;


export type FreshProductRestockTimeQuery = { __typename?: 'Query', freshProductRestockTime?: string | null };

export type PublicHolidaysQueryVariables = Exact<{
  options?: InputMaybe<HolidayQueryOptions>;
}>;


export type PublicHolidaysQuery = { __typename?: 'Query', publicHolidays: Array<{ __typename?: 'Holiday', id: string, startsAt: any, endsAt: any, isFullDay: boolean }> };

export type GetCustomerOrdersQueryVariables = Exact<{
  options: OrderListOptions;
}>;


export type GetCustomerOrdersQuery = { __typename?: 'Query', activeCustomer?: { __typename?: 'Customer', id: string, orders: { __typename?: 'OrderList', totalItems: number, items: Array<{ __typename?: 'Order', id: string, code: string, state: string, totalQuantity: number, totalWithTax: number, customer?: { __typename?: 'Customer', firstName: string, lastName: string, phoneNumber?: string | null } | null, customFields?: { __typename?: 'OrderCustomFields', usedWalletValue?: number | null, orderByTimeDate?: any | null, earliestDeliveryTime?: any | null, latestDeliveryTime?: any | null, doNotRing?: boolean | null, canDropOrder?: boolean | null, notes?: string | null, deliveryDate?: { __typename?: 'DeliveryDate', id: string } | null } | null, shippingAddress?: { __typename?: 'OrderAddress', fullName?: string | null, streetLine1?: string | null, postalCode?: string | null, city?: string | null } | null }> } } | null };

export type GetActiveOrderQueryVariables = Exact<{ [key: string]: never; }>;


export type GetActiveOrderQuery = { __typename?: 'Query', activeOrder?: { __typename?: 'Order', missingAmountToMOV?: number | null, missingAmountToFreeShipping?: number | null, shippingWithTax: number, subTotalNoDiscounts?: number | null, id: string, code: string, state: string, totalQuantity: number, totalWithTax: number, customer?: { __typename?: 'Customer', firstName: string, lastName: string, phoneNumber?: string | null } | null, discounts: Array<{ __typename?: 'Discount', description: string, amountWithTax: number, initialValue?: number | null }>, surcharges: Array<{ __typename?: 'Surcharge', sku?: string | null, priceWithTax: number }>, lines: Array<{ __typename?: 'OrderLine', id: string, quantity: number, productVariant: { __typename?: 'ProductVariant', stock?: number | null, id: string, displayName?: string | null, priceWithTax: number, pricePerUnit?: string | null, stockLevel: string, discountPercentage?: number | null, displayDeposit?: string | null, enabled?: boolean | null, deletedAt?: any | null, customFields?: { __typename?: 'ProductVariantCustomFields', isAlcoholic?: boolean | null } | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, product: { __typename?: 'Product', id: string, enabled?: boolean | null, deletedAt?: any | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, facetValues: Array<{ __typename?: 'FacetValue', name: string, code: string, facet: { __typename?: 'Facet', code: string } }>, customFields?: { __typename?: 'ProductCustomFields', isFreshProduct?: boolean | null } | null } } }>, customFields?: { __typename?: 'OrderCustomFields', usedWalletValue?: number | null, orderByTimeDate?: any | null, earliestDeliveryTime?: any | null, latestDeliveryTime?: any | null, doNotRing?: boolean | null, canDropOrder?: boolean | null, notes?: string | null, deliveryDate?: { __typename?: 'DeliveryDate', id: string } | null } | null, shippingAddress?: { __typename?: 'OrderAddress', fullName?: string | null, streetLine1?: string | null, postalCode?: string | null, city?: string | null } | null } | null };

export type GetOrderShippingLinesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrderShippingLinesQuery = { __typename?: 'Query', activeOrder?: { __typename?: 'Order', shippingLines: Array<{ __typename?: 'ShippingLine', shippingMethod: { __typename?: 'ShippingMethod', id: string, customFields?: { __typename?: 'ShippingMethodCustomFields', deliveryDates?: Array<{ __typename?: 'DeliveryDate', id: string, deliveryWeekday: number, earliestDeliveryTime: string, latestDeliveryTime: string, orderByDay: number, orderByTimeDate?: any | null, hasCapacity?: boolean | null }> | null } | null } }> } | null };

export type GetSingleOrderQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetSingleOrderQuery = { __typename?: 'Query', order?: { __typename?: 'Order', orderPlacedAt?: any | null, subTotalNoDiscounts?: number | null, shippingWithTax: number, id: string, code: string, state: string, totalQuantity: number, totalWithTax: number, discounts: Array<{ __typename?: 'Discount', description: string, amountWithTax: number, initialValue?: number | null }>, surcharges: Array<{ __typename?: 'Surcharge', sku?: string | null, priceWithTax: number }>, customer?: { __typename?: 'Customer', firstName: string, lastName: string, phoneNumber?: string | null } | null, lines: Array<{ __typename?: 'OrderLine', id: string, unitPriceWithTax: number, pricePerUnit?: string | null, quantity: number, productVariant: { __typename?: 'ProductVariant', id: string, displayName?: string | null, priceWithTax: number, pricePerUnit?: string | null, stockLevel: string, discountPercentage?: number | null, displayDeposit?: string | null, enabled?: boolean | null, deletedAt?: any | null, customFields?: { __typename?: 'ProductVariantCustomFields', isAlcoholic?: boolean | null } | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, product: { __typename?: 'Product', id: string, enabled?: boolean | null, deletedAt?: any | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, facetValues: Array<{ __typename?: 'FacetValue', name: string, code: string, facet: { __typename?: 'Facet', code: string } }>, customFields?: { __typename?: 'ProductCustomFields', isFreshProduct?: boolean | null } | null } } }>, customFields?: { __typename?: 'OrderCustomFields', usedWalletValue?: number | null, orderByTimeDate?: any | null, earliestDeliveryTime?: any | null, latestDeliveryTime?: any | null, doNotRing?: boolean | null, canDropOrder?: boolean | null, notes?: string | null, deliveryDate?: { __typename?: 'DeliveryDate', id: string } | null } | null, shippingAddress?: { __typename?: 'OrderAddress', fullName?: string | null, streetLine1?: string | null, postalCode?: string | null, city?: string | null } | null } | null };

export type AddItemToOrderMutationVariables = Exact<{
  productVariantId: Scalars['ID'];
  quantity: Scalars['Int'];
}>;


export type AddItemToOrderMutation = { __typename?: 'Mutation', addItemToOrder: { __typename?: 'InsufficientStockError', message: string } | { __typename?: 'NegativeQuantityError' } | { __typename?: 'Order', id: string, totalQuantity: number, totalWithTax: number, missingAmountToMOV?: number | null, missingAmountToFreeShipping?: number | null, shippingWithTax: number, subTotalNoDiscounts?: number | null, discounts: Array<{ __typename?: 'Discount', description: string, amountWithTax: number, initialValue?: number | null }>, surcharges: Array<{ __typename?: 'Surcharge', sku?: string | null, priceWithTax: number }>, customFields?: { __typename?: 'OrderCustomFields', usedWalletValue?: number | null } | null, lines: Array<{ __typename?: 'OrderLine', id: string, quantity: number, productVariant: { __typename?: 'ProductVariant', stock?: number | null, id: string, displayName?: string | null, priceWithTax: number, pricePerUnit?: string | null, stockLevel: string, discountPercentage?: number | null, displayDeposit?: string | null, enabled?: boolean | null, deletedAt?: any | null, customFields?: { __typename?: 'ProductVariantCustomFields', isAlcoholic?: boolean | null } | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, product: { __typename?: 'Product', id: string, enabled?: boolean | null, deletedAt?: any | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, facetValues: Array<{ __typename?: 'FacetValue', name: string, code: string, facet: { __typename?: 'Facet', code: string } }>, customFields?: { __typename?: 'ProductCustomFields', isFreshProduct?: boolean | null } | null } } }> } | { __typename?: 'OrderLimitError' } | { __typename?: 'OrderModificationError' } };

export type AddItemsToOrderMutationVariables = Exact<{
  items: Array<AddItemsToOrderInput> | AddItemsToOrderInput;
}>;


export type AddItemsToOrderMutation = { __typename?: 'Mutation', addItemsToOrder: { __typename?: 'InsufficientStockError', message: string } | { __typename?: 'NegativeQuantityError' } | { __typename?: 'Order', id: string, totalQuantity: number, totalWithTax: number, missingAmountToMOV?: number | null, missingAmountToFreeShipping?: number | null, shippingWithTax: number, subTotalNoDiscounts?: number | null, discounts: Array<{ __typename?: 'Discount', description: string, amountWithTax: number, initialValue?: number | null }>, surcharges: Array<{ __typename?: 'Surcharge', sku?: string | null, priceWithTax: number }>, customFields?: { __typename?: 'OrderCustomFields', usedWalletValue?: number | null } | null, lines: Array<{ __typename?: 'OrderLine', id: string, quantity: number, productVariant: { __typename?: 'ProductVariant', stock?: number | null, id: string, displayName?: string | null, priceWithTax: number, pricePerUnit?: string | null, stockLevel: string, discountPercentage?: number | null, displayDeposit?: string | null, enabled?: boolean | null, deletedAt?: any | null, customFields?: { __typename?: 'ProductVariantCustomFields', isAlcoholic?: boolean | null } | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, product: { __typename?: 'Product', id: string, enabled?: boolean | null, deletedAt?: any | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, facetValues: Array<{ __typename?: 'FacetValue', name: string, code: string, facet: { __typename?: 'Facet', code: string } }>, customFields?: { __typename?: 'ProductCustomFields', isFreshProduct?: boolean | null } | null } } }> } | { __typename?: 'OrderLimitError' } | { __typename?: 'OrderModificationError' } };

export type AdjustOrderLineMutationVariables = Exact<{
  orderLineId: Scalars['ID'];
  quantity: Scalars['Int'];
}>;


export type AdjustOrderLineMutation = { __typename?: 'Mutation', adjustOrderLine: { __typename?: 'InsufficientStockError', message: string } | { __typename?: 'NegativeQuantityError' } | { __typename?: 'Order', id: string, totalQuantity: number, totalWithTax: number, missingAmountToMOV?: number | null, missingAmountToFreeShipping?: number | null, shippingWithTax: number, subTotalNoDiscounts?: number | null, discounts: Array<{ __typename?: 'Discount', description: string, amountWithTax: number, initialValue?: number | null }>, surcharges: Array<{ __typename?: 'Surcharge', sku?: string | null, priceWithTax: number }>, customFields?: { __typename?: 'OrderCustomFields', usedWalletValue?: number | null } | null, lines: Array<{ __typename?: 'OrderLine', id: string, quantity: number, productVariant: { __typename?: 'ProductVariant', stock?: number | null, id: string, displayName?: string | null, priceWithTax: number, pricePerUnit?: string | null, stockLevel: string, discountPercentage?: number | null, displayDeposit?: string | null, enabled?: boolean | null, deletedAt?: any | null, customFields?: { __typename?: 'ProductVariantCustomFields', isAlcoholic?: boolean | null } | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, product: { __typename?: 'Product', id: string, enabled?: boolean | null, deletedAt?: any | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, facetValues: Array<{ __typename?: 'FacetValue', name: string, code: string, facet: { __typename?: 'Facet', code: string } }>, customFields?: { __typename?: 'ProductCustomFields', isFreshProduct?: boolean | null } | null } } }> } | { __typename?: 'OrderLimitError' } | { __typename?: 'OrderModificationError' } };

export type AdjustOrderLinesMutationVariables = Exact<{
  items: Array<AdjustOrderLineInput> | AdjustOrderLineInput;
}>;


export type AdjustOrderLinesMutation = { __typename?: 'Mutation', adjustOrderLines: { __typename?: 'InsufficientStockError', message: string } | { __typename?: 'NegativeQuantityError' } | { __typename?: 'Order', id: string, totalQuantity: number, totalWithTax: number, missingAmountToMOV?: number | null, missingAmountToFreeShipping?: number | null, shippingWithTax: number, subTotalNoDiscounts?: number | null, discounts: Array<{ __typename?: 'Discount', description: string, amountWithTax: number, initialValue?: number | null }>, surcharges: Array<{ __typename?: 'Surcharge', sku?: string | null, priceWithTax: number }>, customFields?: { __typename?: 'OrderCustomFields', usedWalletValue?: number | null } | null, lines: Array<{ __typename?: 'OrderLine', id: string, quantity: number, productVariant: { __typename?: 'ProductVariant', stock?: number | null, id: string, displayName?: string | null, priceWithTax: number, pricePerUnit?: string | null, stockLevel: string, discountPercentage?: number | null, displayDeposit?: string | null, enabled?: boolean | null, deletedAt?: any | null, customFields?: { __typename?: 'ProductVariantCustomFields', isAlcoholic?: boolean | null } | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, product: { __typename?: 'Product', id: string, enabled?: boolean | null, deletedAt?: any | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, facetValues: Array<{ __typename?: 'FacetValue', name: string, code: string, facet: { __typename?: 'Facet', code: string } }>, customFields?: { __typename?: 'ProductCustomFields', isFreshProduct?: boolean | null } | null } } }> } | { __typename?: 'OrderLimitError' } | { __typename?: 'OrderModificationError' } };

export type AdjustProductVariantInOrderMutationVariables = Exact<{
  productVariantId: Scalars['ID'];
  quantity: Scalars['Int'];
}>;


export type AdjustProductVariantInOrderMutation = { __typename?: 'Mutation', adjustProductVariantInOrder: { __typename?: 'InsufficientStockError', message: string } | { __typename?: 'NegativeQuantityError' } | { __typename?: 'Order', id: string, totalQuantity: number, totalWithTax: number, missingAmountToMOV?: number | null, missingAmountToFreeShipping?: number | null, shippingWithTax: number, subTotalNoDiscounts?: number | null, discounts: Array<{ __typename?: 'Discount', description: string, amountWithTax: number, initialValue?: number | null }>, surcharges: Array<{ __typename?: 'Surcharge', sku?: string | null, priceWithTax: number }>, customFields?: { __typename?: 'OrderCustomFields', usedWalletValue?: number | null } | null, lines: Array<{ __typename?: 'OrderLine', id: string, quantity: number, productVariant: { __typename?: 'ProductVariant', stock?: number | null, id: string, displayName?: string | null, priceWithTax: number, pricePerUnit?: string | null, stockLevel: string, discountPercentage?: number | null, displayDeposit?: string | null, enabled?: boolean | null, deletedAt?: any | null, customFields?: { __typename?: 'ProductVariantCustomFields', isAlcoholic?: boolean | null } | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, product: { __typename?: 'Product', id: string, enabled?: boolean | null, deletedAt?: any | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, facetValues: Array<{ __typename?: 'FacetValue', name: string, code: string, facet: { __typename?: 'Facet', code: string } }>, customFields?: { __typename?: 'ProductCustomFields', isFreshProduct?: boolean | null } | null } } }> } | { __typename?: 'OrderLimitError' } | { __typename?: 'OrderModificationError' } };

export type RemoveItemFromOrderMutationVariables = Exact<{
  productVariantId: Scalars['ID'];
  quantity: Scalars['Int'];
}>;


export type RemoveItemFromOrderMutation = { __typename?: 'Mutation', removeItemFromOrder: { __typename?: 'InsufficientStockError', message: string } | { __typename?: 'NegativeQuantityError' } | { __typename?: 'Order', id: string, totalQuantity: number, totalWithTax: number, missingAmountToMOV?: number | null, missingAmountToFreeShipping?: number | null, shippingWithTax: number, subTotalNoDiscounts?: number | null, discounts: Array<{ __typename?: 'Discount', description: string, amountWithTax: number, initialValue?: number | null }>, surcharges: Array<{ __typename?: 'Surcharge', sku?: string | null, priceWithTax: number }>, customFields?: { __typename?: 'OrderCustomFields', usedWalletValue?: number | null } | null, lines: Array<{ __typename?: 'OrderLine', id: string, quantity: number, productVariant: { __typename?: 'ProductVariant', stock?: number | null, id: string, displayName?: string | null, priceWithTax: number, pricePerUnit?: string | null, stockLevel: string, discountPercentage?: number | null, displayDeposit?: string | null, enabled?: boolean | null, deletedAt?: any | null, customFields?: { __typename?: 'ProductVariantCustomFields', isAlcoholic?: boolean | null } | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, product: { __typename?: 'Product', id: string, enabled?: boolean | null, deletedAt?: any | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, facetValues: Array<{ __typename?: 'FacetValue', name: string, code: string, facet: { __typename?: 'Facet', code: string } }>, customFields?: { __typename?: 'ProductCustomFields', isFreshProduct?: boolean | null } | null } } }> } | { __typename?: 'OrderLimitError' } | { __typename?: 'OrderModificationError' } };

export type RemoveAllOrderLinesMutationVariables = Exact<{ [key: string]: never; }>;


export type RemoveAllOrderLinesMutation = { __typename?: 'Mutation', removeAllOrderLines: { __typename?: 'Order', missingAmountToMOV?: number | null, missingAmountToFreeShipping?: number | null, shippingWithTax: number, subTotalNoDiscounts?: number | null, id: string, code: string, state: string, totalQuantity: number, totalWithTax: number, customer?: { __typename?: 'Customer', firstName: string, lastName: string, phoneNumber?: string | null } | null, discounts: Array<{ __typename?: 'Discount', description: string, amountWithTax: number, initialValue?: number | null }>, surcharges: Array<{ __typename?: 'Surcharge', sku?: string | null, priceWithTax: number }>, lines: Array<{ __typename?: 'OrderLine', id: string, quantity: number, productVariant: { __typename?: 'ProductVariant', stock?: number | null, id: string, displayName?: string | null, priceWithTax: number, pricePerUnit?: string | null, stockLevel: string, discountPercentage?: number | null, displayDeposit?: string | null, enabled?: boolean | null, deletedAt?: any | null, customFields?: { __typename?: 'ProductVariantCustomFields', isAlcoholic?: boolean | null } | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, product: { __typename?: 'Product', id: string, enabled?: boolean | null, deletedAt?: any | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, facetValues: Array<{ __typename?: 'FacetValue', name: string, code: string, facet: { __typename?: 'Facet', code: string } }>, customFields?: { __typename?: 'ProductCustomFields', isFreshProduct?: boolean | null } | null } } }>, customFields?: { __typename?: 'OrderCustomFields', usedWalletValue?: number | null, orderByTimeDate?: any | null, earliestDeliveryTime?: any | null, latestDeliveryTime?: any | null, doNotRing?: boolean | null, canDropOrder?: boolean | null, notes?: string | null, deliveryDate?: { __typename?: 'DeliveryDate', id: string } | null } | null, shippingAddress?: { __typename?: 'OrderAddress', fullName?: string | null, streetLine1?: string | null, postalCode?: string | null, city?: string | null } | null } | { __typename?: 'OrderModificationError' } };

export type UpdateOrderDeliveryDateMutationVariables = Exact<{
  deliveryDateId: Scalars['ID'];
}>;


export type UpdateOrderDeliveryDateMutation = { __typename?: 'Mutation', updateOrderDeliveryDate: { __typename?: 'Order', id: string, customFields?: { __typename?: 'OrderCustomFields', usedWalletValue?: number | null, orderByTimeDate?: any | null, earliestDeliveryTime?: any | null, latestDeliveryTime?: any | null, doNotRing?: boolean | null, canDropOrder?: boolean | null, notes?: string | null, deliveryDate?: { __typename?: 'DeliveryDate', id: string } | null } | null } };

export type UpdateOrderShippingAddressMutationVariables = Exact<{
  input: CreateAddressInput;
}>;


export type UpdateOrderShippingAddressMutation = { __typename?: 'Mutation', setOrderShippingAddress: { __typename: 'NoActiveOrderError' } | { __typename: 'Order', id: string, code: string, state: string, totalQuantity: number, totalWithTax: number, shippingLines: Array<{ __typename?: 'ShippingLine', shippingMethod: { __typename?: 'ShippingMethod', id: string, customFields?: { __typename?: 'ShippingMethodCustomFields', deliveryDates?: Array<{ __typename?: 'DeliveryDate', id: string, deliveryWeekday: number, earliestDeliveryTime: string, latestDeliveryTime: string, orderByTimeDate?: any | null, hasCapacity?: boolean | null }> | null } | null } }>, customFields?: { __typename?: 'OrderCustomFields', usedWalletValue?: number | null, orderByTimeDate?: any | null, earliestDeliveryTime?: any | null, latestDeliveryTime?: any | null, doNotRing?: boolean | null, canDropOrder?: boolean | null, notes?: string | null, deliveryDate?: { __typename?: 'DeliveryDate', id: string } | null } | null, shippingAddress?: { __typename?: 'OrderAddress', fullName?: string | null, streetLine1?: string | null, postalCode?: string | null, city?: string | null } | null } };

export type SetOrderCustomFieldsMutationVariables = Exact<{
  customFields?: InputMaybe<UpdateOrderCustomFieldsInput>;
}>;


export type SetOrderCustomFieldsMutation = { __typename?: 'Mutation', setOrderCustomFields: { __typename?: 'NoActiveOrderError' } | { __typename?: 'Order', customFields?: { __typename?: 'OrderCustomFields', doNotRing?: boolean | null, canDropOrder?: boolean | null, notes?: string | null } | null } };

export type MarkOrderAsInactiveMutationVariables = Exact<{ [key: string]: never; }>;


export type MarkOrderAsInactiveMutation = { __typename?: 'Mutation', markOrderAsInactive?: boolean | null };

export type RequestOrderComplaintMutationVariables = Exact<{
  input: RequestOrderComplaintInput;
}>;


export type RequestOrderComplaintMutation = { __typename?: 'Mutation', requestOrderComplaint?: boolean | null };

export type SavedPaymentMethodsQueryVariables = Exact<{
  type?: InputMaybe<Scalars['String']>;
}>;


export type SavedPaymentMethodsQuery = { __typename?: 'Query', savedPaymentMethods: Array<{ __typename?: 'PartialStripePaymentMethod', id?: string | null, type: string, billing_details?: { __typename?: 'PartialStripeBillingDetails', name?: string | null } | null, card?: { __typename?: 'PartialStripePaymentMethodCard', brand: string, exp_month: number, exp_year: number, last4: string } | null, sepa_debit?: { __typename?: 'PartialStripePaymentMethodSepaDebit', country?: string | null, last4?: string | null } | null }> };

export type DeleteSavedPaymentMethodMutationVariables = Exact<{
  paymentMethodId: Scalars['String'];
}>;


export type DeleteSavedPaymentMethodMutation = { __typename?: 'Mutation', deleteSavedPaymentMethod?: boolean | null };

export type ProducerQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ProducerQuery = { __typename?: 'Query', producer?: { __typename?: 'Producer', id: string, hasDetailsPage?: boolean | null, description?: string | null, name: string, distance?: number | null, featuredAsset?: { __typename?: 'Asset', source: string } | null, assets?: Array<{ __typename?: 'Asset', source: string }> | null, address?: { __typename?: 'Address', fullName?: string | null, streetLine1: string, streetLine2?: string | null, city?: string | null, province?: string | null, postalCode?: string | null } | null } | null };

export type ProducersQueryVariables = Exact<{ [key: string]: never; }>;


export type ProducersQuery = { __typename?: 'Query', producers: { __typename?: 'ProducerList', items: Array<{ __typename?: 'Producer', id: string, name: string, featuredAsset?: { __typename?: 'Asset', source: string } | null }> } };

export type ProducersProductVariantsQueryVariables = Exact<{
  id: Scalars['ID'];
  options?: InputMaybe<ProductVariantListOptions>;
}>;


export type ProducersProductVariantsQuery = { __typename?: 'Query', producersProductVariants: { __typename?: 'ProductVariantList', totalItems: number, items: Array<{ __typename?: 'ProductVariant', id: string, displayName?: string | null, priceWithTax: number, pricePerUnit?: string | null, stockLevel: string, discountPercentage?: number | null, displayDeposit?: string | null, enabled?: boolean | null, deletedAt?: any | null, customFields?: { __typename?: 'ProductVariantCustomFields', isAlcoholic?: boolean | null } | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, product: { __typename?: 'Product', id: string, enabled?: boolean | null, deletedAt?: any | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, facetValues: Array<{ __typename?: 'FacetValue', name: string, code: string, facet: { __typename?: 'Facet', code: string } }>, customFields?: { __typename?: 'ProductCustomFields', isFreshProduct?: boolean | null } | null } }> } };

export type ProductVariantQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ProductVariantQuery = { __typename?: 'Query', productVariant: { __typename?: 'ProductVariant', id: string, displayName?: string | null, priceWithTax: number, pricePerUnit?: string | null, stockLevel: string, discountPercentage?: number | null, displayDeposit?: string | null, isFavorite?: boolean | null, customFields?: { __typename?: 'ProductVariantCustomFields', isAlcoholic?: boolean | null } | null, assets: Array<{ __typename?: 'Asset', id: string, source: string }>, product: { __typename?: 'Product', id: string, description: string, assets: Array<{ __typename?: 'Asset', source: string }>, collections: Array<{ __typename?: 'Collection', id: string, parent?: { __typename?: 'Collection', name: string } | null }>, facetValues: Array<{ __typename?: 'FacetValue', name: string, code: string, facet: { __typename?: 'Facet', code: string } }>, customFields?: { __typename?: 'ProductCustomFields', isFreshProduct?: boolean | null, preparation?: string | null, storage?: string | null, ingredients?: string | null, additives?: string | null, allergens?: string | null, kJ?: number | null, kcal?: number | null, fat?: number | null, saturatedFat?: number | null, carbohydrate?: number | null, sugar?: number | null, protein?: number | null, salt?: number | null, producer?: { __typename?: 'Producer', id: string, distance?: number | null, hasDetailsPage?: boolean | null, name: string, address?: { __typename?: 'Address', id: string, fullName?: string | null, city?: string | null, province?: string | null, streetLine1: string, postalCode?: string | null } | null } | null } | null } } };

export type SearchProductsQueryVariables = Exact<{
  query: Scalars['String'];
}>;


export type SearchProductsQuery = { __typename?: 'Query', searchProducts?: { __typename?: 'ProductSearchResult', items: Array<{ __typename?: 'ProductVariantDocument', id?: string | null, displayName?: string | null, priceWithTax?: number | null, pricePerUnit?: string | null, productVariantId?: string | null, stockLevel?: string | null, discountPercentage?: string | null, displayDeposit?: string | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, product?: { __typename?: 'Product', facetValues: Array<{ __typename?: 'FacetValue', name: string, code: string, facet: { __typename?: 'Facet', code: string } }> } | null } | null> } | null };

export type CreateProductSuggestionMutationVariables = Exact<{
  productName: Scalars['String'];
}>;


export type CreateProductSuggestionMutation = { __typename?: 'Mutation', createProductSuggestion?: boolean | null };

export type UpSellingProductVariantsQueryVariables = Exact<{
  options?: InputMaybe<ProductVariantListOptions>;
}>;


export type UpSellingProductVariantsQuery = { __typename?: 'Query', upSellingProductVariants: { __typename?: 'ProductVariantList', items: Array<{ __typename?: 'ProductVariant', id: string, displayName?: string | null, priceWithTax: number, pricePerUnit?: string | null, stockLevel: string, discountPercentage?: number | null, displayDeposit?: string | null, enabled?: boolean | null, deletedAt?: any | null, customFields?: { __typename?: 'ProductVariantCustomFields', isAlcoholic?: boolean | null } | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, product: { __typename?: 'Product', id: string, enabled?: boolean | null, deletedAt?: any | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, facetValues: Array<{ __typename?: 'FacetValue', name: string, code: string, facet: { __typename?: 'Facet', code: string } }>, customFields?: { __typename?: 'ProductCustomFields', isFreshProduct?: boolean | null } | null } }> } };

export type RandomCollectionProductVariantsQueryVariables = Exact<{
  options: RandomCollectionProductVariantsOptions;
}>;


export type RandomCollectionProductVariantsQuery = { __typename?: 'Query', randomCollectionProductVariants: Array<{ __typename?: 'ProductVariant', id: string, displayName?: string | null, priceWithTax: number, pricePerUnit?: string | null, stockLevel: string, discountPercentage?: number | null, displayDeposit?: string | null, enabled?: boolean | null, deletedAt?: any | null, customFields?: { __typename?: 'ProductVariantCustomFields', isAlcoholic?: boolean | null } | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, product: { __typename?: 'Product', id: string, enabled?: boolean | null, deletedAt?: any | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, facetValues: Array<{ __typename?: 'FacetValue', name: string, code: string, facet: { __typename?: 'Facet', code: string } }>, customFields?: { __typename?: 'ProductCustomFields', isFreshProduct?: boolean | null } | null } }> };

export type RecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type RecipesQuery = { __typename?: 'Query', recipes: { __typename?: 'RecipeList', items: Array<{ __typename?: 'Recipe', id: string, name: string, featuredAsset?: { __typename?: 'Asset', preview: string } | null }> } };

export type RecipeDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RecipeDetailsQuery = { __typename?: 'Query', recipe?: { __typename?: 'Recipe', id: string, name: string, description?: string | null, ingredients?: string | null, cookTime?: number | null, cookLevel?: string | null, assets?: Array<{ __typename?: 'Asset', id: string, source: string }> | null, productVariants?: Array<{ __typename?: 'ProductVariant', id: string, displayName?: string | null, priceWithTax: number, pricePerUnit?: string | null, stockLevel: string, discountPercentage?: number | null, displayDeposit?: string | null, enabled?: boolean | null, deletedAt?: any | null, customFields?: { __typename?: 'ProductVariantCustomFields', isAlcoholic?: boolean | null } | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, product: { __typename?: 'Product', id: string, enabled?: boolean | null, deletedAt?: any | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, facetValues: Array<{ __typename?: 'FacetValue', name: string, code: string, facet: { __typename?: 'Facet', code: string } }>, customFields?: { __typename?: 'ProductCustomFields', isFreshProduct?: boolean | null } | null } }> | null } | null };

export type SpecialsQueryVariables = Exact<{
  options?: InputMaybe<SpecialListOptions>;
}>;


export type SpecialsQuery = { __typename?: 'Query', specials: { __typename?: 'SpecialList', items: Array<{ __typename?: 'Special', id: string, category?: string | null, title?: string | null, externalLink?: string | null, internalLink?: string | null, featuredAsset?: { __typename?: 'Asset', source: string } | null }> } };

export type SpecialQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type SpecialQuery = { __typename?: 'Query', special?: { __typename?: 'Special', id: string, category?: string | null, title?: string | null, description?: string | null, featuredAsset?: { __typename?: 'Asset', source: string } | null, productVariants?: Array<{ __typename?: 'ProductVariant', id: string, displayName?: string | null, priceWithTax: number, pricePerUnit?: string | null, stockLevel: string, discountPercentage?: number | null, displayDeposit?: string | null, enabled?: boolean | null, deletedAt?: any | null, customFields?: { __typename?: 'ProductVariantCustomFields', isAlcoholic?: boolean | null } | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, product: { __typename?: 'Product', id: string, enabled?: boolean | null, deletedAt?: any | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, facetValues: Array<{ __typename?: 'FacetValue', name: string, code: string, facet: { __typename?: 'Facet', code: string } }>, customFields?: { __typename?: 'ProductCustomFields', isFreshProduct?: boolean | null } | null } }> | null } | null };

export type GetWalletTotalQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWalletTotalQuery = { __typename?: 'Query', wallet: { __typename?: 'Wallet', id: string, payoutTotal: number, nonPayoutTotal: number } };

export type GetWalletDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWalletDetailsQuery = { __typename?: 'Query', wallet: { __typename?: 'Wallet', id: string, payoutTotal: number, nonPayoutTotal: number, walletItems?: Array<{ __typename?: 'WalletItem', id: string, createdAt: any, description?: string | null, activity: string, total: number, isPayoutPossible: boolean }> | null } };

export type AddGiftCouponToWalletMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type AddGiftCouponToWalletMutation = { __typename?: 'Mutation', addGiftCouponToWallet: { __typename: 'Wallet' } };

export type RequestPayoutMutationVariables = Exact<{
  amount: Scalars['Int'];
}>;


export type RequestPayoutMutation = { __typename?: 'Mutation', requestWalletPayout?: boolean | null };

export type ApplyWalletTotalMutationVariables = Exact<{ [key: string]: never; }>;


export type ApplyWalletTotalMutation = { __typename?: 'Mutation', applyWalletTotal: { __typename?: 'Order', id: string, customFields?: { __typename?: 'OrderCustomFields', usedWalletValue?: number | null, orderByTimeDate?: any | null, earliestDeliveryTime?: any | null, latestDeliveryTime?: any | null, doNotRing?: boolean | null, canDropOrder?: boolean | null, notes?: string | null, deliveryDate?: { __typename?: 'DeliveryDate', id: string } | null } | null } };

export type RemoveWalletTotalMutationVariables = Exact<{ [key: string]: never; }>;


export type RemoveWalletTotalMutation = { __typename?: 'Mutation', removeWalletTotal: { __typename?: 'Order', id: string, customFields?: { __typename?: 'OrderCustomFields', usedWalletValue?: number | null, orderByTimeDate?: any | null, earliestDeliveryTime?: any | null, latestDeliveryTime?: any | null, doNotRing?: boolean | null, canDropOrder?: boolean | null, notes?: string | null, deliveryDate?: { __typename?: 'DeliveryDate', id: string } | null } | null } };

export type BaseAddressFragment = { __typename?: 'Address', id: string, fullName?: string | null, company?: string | null, streetLine1: string, streetLine2?: string | null, city?: string | null, province?: string | null, postalCode?: string | null, phoneNumber?: string | null, defaultShippingAddress?: boolean | null, defaultBillingAddress?: boolean | null, country: { __typename?: 'Country', id: string, code: string, name: string } };

export type BaseCountryFragment = { __typename?: 'Country', id: string, code: string, name: string };

export type OrderCustomFieldsFragment = { __typename?: 'OrderCustomFields', usedWalletValue?: number | null, orderByTimeDate?: any | null, earliestDeliveryTime?: any | null, latestDeliveryTime?: any | null, doNotRing?: boolean | null, canDropOrder?: boolean | null, notes?: string | null, deliveryDate?: { __typename?: 'DeliveryDate', id: string } | null };

export type BaseOrderFragment = { __typename?: 'Order', id: string, code: string, state: string, totalQuantity: number, totalWithTax: number, customFields?: { __typename?: 'OrderCustomFields', usedWalletValue?: number | null, orderByTimeDate?: any | null, earliestDeliveryTime?: any | null, latestDeliveryTime?: any | null, doNotRing?: boolean | null, canDropOrder?: boolean | null, notes?: string | null, deliveryDate?: { __typename?: 'DeliveryDate', id: string } | null } | null, shippingAddress?: { __typename?: 'OrderAddress', fullName?: string | null, streetLine1?: string | null, postalCode?: string | null, city?: string | null } | null };

export type DiscountFragment = { __typename?: 'Discount', description: string, amountWithTax: number, initialValue?: number | null };

export type ExtendedOrderFragment = { __typename?: 'Order', missingAmountToMOV?: number | null, missingAmountToFreeShipping?: number | null, shippingWithTax: number, subTotalNoDiscounts?: number | null, id: string, code: string, state: string, totalQuantity: number, totalWithTax: number, customer?: { __typename?: 'Customer', firstName: string, lastName: string, phoneNumber?: string | null } | null, discounts: Array<{ __typename?: 'Discount', description: string, amountWithTax: number, initialValue?: number | null }>, surcharges: Array<{ __typename?: 'Surcharge', sku?: string | null, priceWithTax: number }>, lines: Array<{ __typename?: 'OrderLine', id: string, quantity: number, productVariant: { __typename?: 'ProductVariant', stock?: number | null, id: string, displayName?: string | null, priceWithTax: number, pricePerUnit?: string | null, stockLevel: string, discountPercentage?: number | null, displayDeposit?: string | null, enabled?: boolean | null, deletedAt?: any | null, customFields?: { __typename?: 'ProductVariantCustomFields', isAlcoholic?: boolean | null } | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, product: { __typename?: 'Product', id: string, enabled?: boolean | null, deletedAt?: any | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, facetValues: Array<{ __typename?: 'FacetValue', name: string, code: string, facet: { __typename?: 'Facet', code: string } }>, customFields?: { __typename?: 'ProductCustomFields', isFreshProduct?: boolean | null } | null } } }>, customFields?: { __typename?: 'OrderCustomFields', usedWalletValue?: number | null, orderByTimeDate?: any | null, earliestDeliveryTime?: any | null, latestDeliveryTime?: any | null, doNotRing?: boolean | null, canDropOrder?: boolean | null, notes?: string | null, deliveryDate?: { __typename?: 'DeliveryDate', id: string } | null } | null, shippingAddress?: { __typename?: 'OrderAddress', fullName?: string | null, streetLine1?: string | null, postalCode?: string | null, city?: string | null } | null };

export type OrderReturnValueFragment = { __typename?: 'Order', id: string, totalQuantity: number, totalWithTax: number, missingAmountToMOV?: number | null, missingAmountToFreeShipping?: number | null, shippingWithTax: number, subTotalNoDiscounts?: number | null, discounts: Array<{ __typename?: 'Discount', description: string, amountWithTax: number, initialValue?: number | null }>, surcharges: Array<{ __typename?: 'Surcharge', sku?: string | null, priceWithTax: number }>, customFields?: { __typename?: 'OrderCustomFields', usedWalletValue?: number | null } | null, lines: Array<{ __typename?: 'OrderLine', id: string, quantity: number, productVariant: { __typename?: 'ProductVariant', stock?: number | null, id: string, displayName?: string | null, priceWithTax: number, pricePerUnit?: string | null, stockLevel: string, discountPercentage?: number | null, displayDeposit?: string | null, enabled?: boolean | null, deletedAt?: any | null, customFields?: { __typename?: 'ProductVariantCustomFields', isAlcoholic?: boolean | null } | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, product: { __typename?: 'Product', id: string, enabled?: boolean | null, deletedAt?: any | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, facetValues: Array<{ __typename?: 'FacetValue', name: string, code: string, facet: { __typename?: 'Facet', code: string } }>, customFields?: { __typename?: 'ProductCustomFields', isFreshProduct?: boolean | null } | null } } }> };

type OrderStatus_InsufficientStockError_Fragment = { __typename?: 'InsufficientStockError', message: string };

type OrderStatus_NegativeQuantityError_Fragment = { __typename?: 'NegativeQuantityError' };

type OrderStatus_Order_Fragment = { __typename?: 'Order', id: string, totalQuantity: number, totalWithTax: number, missingAmountToMOV?: number | null, missingAmountToFreeShipping?: number | null, shippingWithTax: number, subTotalNoDiscounts?: number | null, discounts: Array<{ __typename?: 'Discount', description: string, amountWithTax: number, initialValue?: number | null }>, surcharges: Array<{ __typename?: 'Surcharge', sku?: string | null, priceWithTax: number }>, customFields?: { __typename?: 'OrderCustomFields', usedWalletValue?: number | null } | null, lines: Array<{ __typename?: 'OrderLine', id: string, quantity: number, productVariant: { __typename?: 'ProductVariant', stock?: number | null, id: string, displayName?: string | null, priceWithTax: number, pricePerUnit?: string | null, stockLevel: string, discountPercentage?: number | null, displayDeposit?: string | null, enabled?: boolean | null, deletedAt?: any | null, customFields?: { __typename?: 'ProductVariantCustomFields', isAlcoholic?: boolean | null } | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, product: { __typename?: 'Product', id: string, enabled?: boolean | null, deletedAt?: any | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, facetValues: Array<{ __typename?: 'FacetValue', name: string, code: string, facet: { __typename?: 'Facet', code: string } }>, customFields?: { __typename?: 'ProductCustomFields', isFreshProduct?: boolean | null } | null } } }> };

type OrderStatus_OrderLimitError_Fragment = { __typename?: 'OrderLimitError' };

type OrderStatus_OrderModificationError_Fragment = { __typename?: 'OrderModificationError' };

export type OrderStatusFragment = OrderStatus_InsufficientStockError_Fragment | OrderStatus_NegativeQuantityError_Fragment | OrderStatus_Order_Fragment | OrderStatus_OrderLimitError_Fragment | OrderStatus_OrderModificationError_Fragment;

export type ProductVariantFragmentFragment = { __typename?: 'ProductVariant', id: string, displayName?: string | null, priceWithTax: number, pricePerUnit?: string | null, stockLevel: string, discountPercentage?: number | null, displayDeposit?: string | null, enabled?: boolean | null, deletedAt?: any | null, customFields?: { __typename?: 'ProductVariantCustomFields', isAlcoholic?: boolean | null } | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, product: { __typename?: 'Product', id: string, enabled?: boolean | null, deletedAt?: any | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, facetValues: Array<{ __typename?: 'FacetValue', name: string, code: string, facet: { __typename?: 'Facet', code: string } }>, customFields?: { __typename?: 'ProductCustomFields', isFreshProduct?: boolean | null } | null } };

export type ExtendedProductVariantFragmentFragment = { __typename?: 'ProductVariant', id: string, displayName?: string | null, priceWithTax: number, pricePerUnit?: string | null, stockLevel: string, discountPercentage?: number | null, displayDeposit?: string | null, isFavorite?: boolean | null, customFields?: { __typename?: 'ProductVariantCustomFields', isAlcoholic?: boolean | null } | null, assets: Array<{ __typename?: 'Asset', id: string, source: string }>, product: { __typename?: 'Product', id: string, description: string, assets: Array<{ __typename?: 'Asset', source: string }>, collections: Array<{ __typename?: 'Collection', id: string, parent?: { __typename?: 'Collection', name: string } | null }>, facetValues: Array<{ __typename?: 'FacetValue', name: string, code: string, facet: { __typename?: 'Facet', code: string } }>, customFields?: { __typename?: 'ProductCustomFields', isFreshProduct?: boolean | null, preparation?: string | null, storage?: string | null, ingredients?: string | null, additives?: string | null, allergens?: string | null, kJ?: number | null, kcal?: number | null, fat?: number | null, saturatedFat?: number | null, carbohydrate?: number | null, sugar?: number | null, protein?: number | null, salt?: number | null, producer?: { __typename?: 'Producer', id: string, distance?: number | null, hasDetailsPage?: boolean | null, name: string, address?: { __typename?: 'Address', id: string, fullName?: string | null, city?: string | null, province?: string | null, streetLine1: string, postalCode?: string | null } | null } | null } | null } };
