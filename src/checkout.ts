import { products } from './products';
import { pipe } from './utils';

import type { Product } from './products';

class Checkout {
  public scanItems: Product[];
  private purchaseItems: Product[];
  private rules: Function[];

  constructor(rules?: Function[]) {
    this.scanItems = [];
    this.purchaseItems = [];
    this.rules = rules || [];
  }

  scan(sku: string) {
    const product = products.find(p => p.sku === sku);

    if (product) {
      this.scanItems.push(product);
    }
  }


  total() {
    this.purchaseItems = this.scanItems;

    if (this.rules.length > 0) {
      const applyDiscountRules = pipe(...this.rules);
      const itemsWithAppliedDiscount = applyDiscountRules(this.scanItems);

      this.purchaseItems = itemsWithAppliedDiscount;
    }

    return this.purchaseItems.reduce(
      (total, p) => {
        let finalPrice = p.price;

        if (
          p.discountedPrice !== undefined &&
          p.discountedPrice >= 0
        ) {
          finalPrice = p.discountedPrice;
        }

        return total + finalPrice;
      }, 0);
  }
}

export { Checkout };

