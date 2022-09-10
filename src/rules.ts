import type { Product } from './products';
import { products } from './products';

/**
 * Apple TV deal for the price of 2 for every 3 purchaces
 *
 * E.g.: If the customer buys 3 Apple TVs, the customer will only pay for price of 2
 */
function appleTvDeal(items: Product[]): Product[] {
  const appleTvs = items.filter(item => item.sku === 'atv');

  const totalItemsToApplyWithDiscount = Math.floor(appleTvs.length / 3);
  let totalAppliedDiscount = 0;

  return items.map(item => {
    if (
      item.sku === 'atv'
      && totalItemsToApplyWithDiscount > 0 
      && totalAppliedDiscount !== totalItemsToApplyWithDiscount
    ) {
      /**
       * Singifiy that discount has been applied.
       *
       * If found, increment the counter and add the discounted price.
       */
      totalAppliedDiscount++;

      return {...item, discountedPrice: 0 };
    }

    return item;
  });
}

/**
 * Bundle in VGA adapter for free of charge with every Macbook Pro sold
 */
function freeVgaOnMacbookPro(items: Product[]): Product[] {
  const macbookPros = items.filter(item => item.sku === 'mbp');
  const vgas = items.filter(item => item.sku === 'vga');

  if (macbookPros.length === vgas.length) {
    return items.map(item => item.sku === 'vga' ? {...item, discountedPrice: 0 } : item);
  }

  /**
   * For every Macbook Pro found, only add VGA adapter for its difference
   */
  if (macbookPros.length > vgas.length) {
    const freeVgas = [];
    const difference = macbookPros.length - vgas.length;

    for (let index = 0; index < difference; index++) {
      
      const vga = products.find(p => p.sku === 'vga');

      if (vga) {
        freeVgas.push({...vga, discountedPrice: 0});
      }
    }

    const itemsWithAppliedVgaDiscount = items.map(item =>
      item.sku === 'vga' ? {...item, discountedPrice: 0 } : item
    );

    return [...itemsWithAppliedVgaDiscount, ...freeVgas];
  }
  
  /**
   * For every VGAs in the cart and if its more than the Macbook Pro,
   * only apply discount that shall match the Macbook Pro purchase count.
   */
  if (vgas.length > macbookPros.length && macbookPros.length > 0) {
    // Apply discount based on the total number of Macbook Pro in the list of items
    const totalItemsToApplyWithDiscount = macbookPros.length;
    let totalAppliedDiscount = 0;

    return items.map(
      (item) => {
        if (
          item.sku === 'vga' &&
          totalAppliedDiscount !== totalItemsToApplyWithDiscount
        ) {
          /**
           * Singifiy that discount has been applied.
           *
           * If found, increment the counter and add the discounted price.
           */
          totalAppliedDiscount++;

          return { ...item, discountedPrice: 0 };
        }

        return item;
      }
    )
  }

  return items;
}

/**
 * Apply bulk discount on iPad if purchasing iPad for more than 4 quantities
 */
function bulkDiscountOnIpad(items: Product[]): Product[] {
  const ipads = items.filter(item => item.sku === 'ipd');

  if (ipads.length > 4) {
    return items.map(item => item.sku === 'ipd' ? { ...item, discountedPrice: 499.99 } : item)
  }

  return items;
}

export { appleTvDeal, bulkDiscountOnIpad, freeVgaOnMacbookPro };
