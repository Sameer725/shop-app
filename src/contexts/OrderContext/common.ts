import { OrderLine } from '@types';

export interface Line extends OrderLine {
  prevQuantity: number;
}

export const mapOrderLines = (lines?: OrderLine[]) => {
  const res: Record<string, Line> = {};
  if (!lines || lines?.length === 0) {
    return res;
  }

  for (const line of lines) {
    res[line.productVariant.id] = { ...line, prevQuantity: line.quantity };
  }

  return res;
};
