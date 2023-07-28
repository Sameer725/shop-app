import { TypePolicy } from '@apollo/client/cache/inmemory/policies';

interface CacheRef {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __ref: string;
}

export const ORDER_DISCOUNT_TYPE_POLICY: TypePolicy = {
  fields: {
    discounts: {
      merge(existing: CacheRef[], incoming: CacheRef[]): CacheRef[] {
        return incoming;
      },
    },
  },
};
