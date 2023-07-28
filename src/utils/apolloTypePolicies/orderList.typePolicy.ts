import { FieldFunctionOptions } from '@apollo/client';
import { TypePolicy } from '@apollo/client/cache/inmemory/policies';

import { GetCustomerOrders, OrderListOptions } from '@types';

interface CacheRef {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __ref: string;
}

export const ORDER_LIST_TYPE_POLICY: TypePolicy = {
  fields: {
    items: {
      keyArgs: false,
      merge(
        existing: CacheRef[],
        incoming: CacheRef[],
        data: FieldFunctionOptions<unknown, Record<keyof GetCustomerOrders.Variables, OrderListOptions>>
      ): CacheRef[] {
        const merged = existing ? existing.slice(0) : [];

        const skip: number = data.variables?.options.skip ?? 0;
        const take: number | undefined = data.variables?.options.take as number;

        if (isNaN(take)) {
          // eslint-disable-next-line no-console
          console.error(`Invalid \`take\` parameter for order list query: ${take}`);
          return merged;
        }

        for (let i = skip; i < skip + take; ++i) {
          merged[i] = incoming[i - skip];
        }

        return merged;
      },
    },
  },
};
