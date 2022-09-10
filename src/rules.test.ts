import { products } from './products';
import { appleTvDeal, bulkDiscountOnIpad, freeVgaOnMacbookPro } from './rules';

import type { Product } from './products';

function isAppleTv(product: Product): boolean {
  return product.sku === 'atv';
}

function isIpad(product: Product): boolean {
  return product.sku === 'ipd';
}

function isMacbookPro(product: Product): boolean {
  return product.sku === 'mbp';
}

function isVga(product: Product): boolean {
  return product.sku === 'vga';
}

function hasDiscountedPrice(product: Product): boolean {
  return product.discountedPrice !== undefined;
}

type GroupedResult = {
  withDiscountedPrice: Product[];
  withoutDiscountedPrice: Product[];
}
function groupByDiscountPriceProperty(xs: Product[]) {
  return xs.reduce<GroupedResult>(
    (obj, item) => {
      if (hasDiscountedPrice(item)) {
        return { ...obj, withDiscountedPrice: [...obj.withDiscountedPrice, item] }
      }

      return { ...obj, withoutDiscountedPrice: [...obj.withoutDiscountedPrice, item] };
    }
  , { withDiscountedPrice: [], withoutDiscountedPrice: [] });
}

describe('pricing rules', () => {
  describe('Apple Tv deal', () => {
    it('should apply pricing rule when condition is met', () => {
      const appleTv = products.find(isAppleTv);
      const ipad = products.find(isIpad);

      // Type checking prevents to proceed further and therefore, doing type guarding.
      if (!appleTv || !ipad) {
        throw new Error('Expecting product to exist');
      }

      const listOfAppleTvs = Array.from({ length: 5 }).fill(appleTv) as Product[];
      const listOfIpads = Array.from({ length: 2 }).fill(ipad) as Product[];

      // Generate list of items (or products) and apply the rule
      const assumedScanItems = [...listOfAppleTvs, ...listOfIpads];
      const itemsWithRuleApplied = appleTvDeal(assumedScanItems);

      const appleTvs = itemsWithRuleApplied.filter(isAppleTv);
      const nonAppleTvs = itemsWithRuleApplied.filter(item => !isAppleTv(item));

      const { withDiscountedPrice, withoutDiscountedPrice } = groupByDiscountPriceProperty(appleTvs);

      // Expect no such discount applied on all non Apple Tv and check its count in the list
      expect(nonAppleTvs.every(item => !hasDiscountedPrice(item))).toEqual(true);
      expect(nonAppleTvs.length).toEqual(2);

      expect(withDiscountedPrice.length).toEqual(1);
      expect(withoutDiscountedPrice.length).toEqual(4);

      // Check that the discounted price is set correctly
      const [discountedItem] = withDiscountedPrice;
      expect(discountedItem.discountedPrice).toEqual(0);
    });

    it('should not apply any pricing rule when condition is not met', () => {
      const appleTv = products.find(isAppleTv);
      const macbookPro = products.find(isMacbookPro);

      // Type checking prevents to proceed further and therefore, doing type guarding.
      if (!appleTv || !macbookPro) {
        throw new Error('Expecting product to exist');
      }

      const listOfAppleTvs = Array.from({ length: 2 }).fill(appleTv) as Product[];
      const listOfMacbookPros = Array.from({ length: 5 }).fill(macbookPro) as Product[];

      // Generate list of items (or products) and apply the rule
      const assumedScanItems = [...listOfAppleTvs, ...listOfMacbookPros];
      const itemsWithRuleApplied = appleTvDeal(assumedScanItems);

      const appleTvs = itemsWithRuleApplied.filter(isAppleTv);
      const nonAppleTvs = itemsWithRuleApplied.filter(item => !isAppleTv(item));

      // Expect no such discount applied to any items and check its count in the list
      expect(nonAppleTvs.every(item => !hasDiscountedPrice(item))).toEqual(true);
      expect(nonAppleTvs.length).toEqual(5);

      expect(appleTvs.every(item => !hasDiscountedPrice(item))).toEqual(true);
      expect(appleTvs.length).toEqual(2);
    });
  });

  describe('Bulk discount rule on iPad purchase', () => {
    it('should apply discount when condition is met', () => {
      const ipad = products.find(isIpad);
      const macbookPro = products.find(isMacbookPro);

      // Type checking prevents to proceed further and therefore, doing type guarding.
      if (!ipad || !macbookPro) {
        throw new Error('Expecting product to exist');
      }

      const listOfIpads = Array.from({ length: 8 }).fill(ipad) as Product[];
      const listOfMacbookPros = Array.from({ length: 2 }).fill(macbookPro) as Product[];

      // Generate list of items (or products) and apply the rule
      const assumedScanItems = [...listOfIpads, ...listOfMacbookPros];
      const itemsWithRuleApplied = bulkDiscountOnIpad(assumedScanItems);

      const ipads = itemsWithRuleApplied.filter(isIpad);
      const nonIpads = itemsWithRuleApplied.filter(item => !isIpad(item));

      // Expect no such discount applied to non iPad items and check its count in the list
      expect(nonIpads.every(item => !hasDiscountedPrice(item))).toEqual(true);
      expect(nonIpads.length).toEqual(2);

      // Expect all iPads applied with discount and check its count in the list
      expect(ipads.every(hasDiscountedPrice)).toEqual(true);
      expect(ipads.every(item => item.discountedPrice === 499.99)).toEqual(true);
      expect(ipads.length).toEqual(8);
    });

    it('should not apply discount when condition is  not met', () => {
      const ipad = products.find(isIpad);
      const vga = products.find(isVga);

      // Type checking prevents to proceed further and therefore, doing type guarding.
      if (!ipad || !vga) {
        throw new Error('Expecting product to exist');
      }

      const listOfIpads = Array.from({ length: 3 }).fill(ipad) as Product[];
      const listOfVgas = Array.from({ length: 2 }).fill(vga) as Product[];

      // Generate list of items (or products) and apply the rule
      const assumedScanItems = [...listOfIpads, ...listOfVgas];
      const itemsWithRuleApplied = bulkDiscountOnIpad(assumedScanItems);

      const ipads = itemsWithRuleApplied.filter(isIpad);
      const nonIpads = itemsWithRuleApplied.filter(item => !isIpad(item));

      // Expect no such discount applied to any items and check its count in the list
      expect(nonIpads.every(item => !hasDiscountedPrice(item))).toEqual(true);
      expect(nonIpads.length).toEqual(2);

      expect(ipads.every(item => !hasDiscountedPrice(item))).toEqual(true);
      expect(ipads.length).toEqual(3);
    });
  });

  describe('VGA bundle rule with every Macbook Pro sold', () => {
    it('should bundle VGA for every Macbook Pro', () => {
      const ipad = products.find(isIpad);
      const macbookPro = products.find(isMacbookPro);
      const vga = products.find(isVga);

      // Type checking prevents to proceed further and therefore, doing type guarding.
      if (!ipad || !macbookPro || !vga) {
        throw new Error('Expecting product to exist');
      }

      const listOfIpads = Array.from({ length: 3 }).fill(ipad) as Product[];
      const listOfMacbookPros = Array.from({ length: 2 }).fill(macbookPro) as Product[];
      const listOfVgas = Array.from({ length: 2 }).fill(vga) as Product[];

      // Generate list of items (or products) and apply the rule
      const assumedScanItems = [...listOfIpads, ...listOfMacbookPros, ...listOfVgas];
      const itemsWithRuleApplied = freeVgaOnMacbookPro(assumedScanItems);

      const macbookPros = itemsWithRuleApplied.filter(isMacbookPro);
      const vgas = itemsWithRuleApplied.filter(isVga);
      const ipads = itemsWithRuleApplied.filter(isIpad);

      // Expect no such discount applied non VGA items and check its count in the list
      expect(ipads.every(item => !hasDiscountedPrice(item))).toEqual(true);
      expect(ipads.length).toEqual(3);
      expect(macbookPros.every(item => !hasDiscountedPrice(item))).toEqual(true);
      expect(macbookPros.length).toEqual(2);

      // Expect all VGAs applied with discount and check its count in the list
      expect(vgas.every(hasDiscountedPrice)).toEqual(true);
      expect(vgas.every(item => item.discountedPrice === 0)).toEqual(true);
      expect(vgas.length).toEqual(2);
    });

    it('should only bundle free VGA based on Macbook Pro in the list', () => {
      const appleTv = products.find(isAppleTv);
      const macbookPro = products.find(isMacbookPro);
      const vga = products.find(isVga);

      // Type checking prevents to proceed further and therefore, doing type guarding.
      if (!appleTv || !macbookPro || !vga) {
        throw new Error('Expecting product to exist');
      }

      const listOfAppleTvs = Array.from({ length: 2 }).fill(appleTv) as Product[];
      const listOfMacbookPros = Array.from({ length: 2 }).fill(macbookPro) as Product[];
      const listOfVgas = Array.from({ length: 3 }).fill(vga) as Product[];

      // Generate list of items (or products) and apply the rule
      const assumedScanItems = [...listOfAppleTvs, ...listOfMacbookPros, ...listOfVgas];
      const itemsWithRuleApplied = freeVgaOnMacbookPro(assumedScanItems);

      const macbookPros = itemsWithRuleApplied.filter(isMacbookPro);
      const vgas = itemsWithRuleApplied.filter(isVga);
      const appleTvs = itemsWithRuleApplied.filter(isAppleTv);

      // Expect no such discount applied non VGA items and check its count in the list
      expect(appleTvs.every(item => !hasDiscountedPrice(item))).toEqual(true);
      expect(appleTvs.length).toEqual(2);
      expect(macbookPros.every(item => !hasDiscountedPrice(item))).toEqual(true);
      expect(macbookPros.length).toEqual(2);

      const { withDiscountedPrice, withoutDiscountedPrice } = groupByDiscountPriceProperty(vgas);

      // Expect a couple of VGAs applied with discount except for 1
      // as it should match with Macbook Pro in the list
      expect(withDiscountedPrice.length).toEqual(2);
      expect(withoutDiscountedPrice.length).toEqual(1);

      // Check that the discounted price is set correctly
      expect(withDiscountedPrice.every(hasDiscountedPrice)).toEqual(true);
      expect(withDiscountedPrice.every(item => item.discountedPrice === 0)).toEqual(true);

      const [undiscountedItem] = withoutDiscountedPrice;
      expect(undiscountedItem.discountedPrice).toBeUndefined();
    });

    it('should bundle VGA in the list for the difference of Macbook Pro sold', () => {
      const macbookPro = products.find(isMacbookPro);
      const vga = products.find(isVga);

      // Type checking prevents to proceed further and therefore, doing type guarding.
      if (!macbookPro || !vga) {
        throw new Error('Expecting product to exist');
      }

      const listOfMacbookPros = Array.from({ length: 2 }).fill(macbookPro) as Product[];
      const listOfVgas = Array.from({ length: 1 }).fill(vga) as Product[];

      // Generate list of items (or products) and apply the rule
      const assumedScanItems = [...listOfMacbookPros, ...listOfVgas];
      const itemsWithRuleApplied = freeVgaOnMacbookPro(assumedScanItems);

      const macbookPros = itemsWithRuleApplied.filter(isMacbookPro);
      const vgas = itemsWithRuleApplied.filter(isVga);

      // Expect no such discount applied non VGA items and check its count in the list
      expect(macbookPros.every(item => !hasDiscountedPrice(item))).toEqual(true);
      expect(macbookPros.length).toEqual(2);

      expect(vgas.every(hasDiscountedPrice)).toEqual(true);
      expect(vgas.every(item => item.discountedPrice === 0)).toEqual(true);

      // Expect another addition of VGA bundled together to make up the difference
      expect(vgas.length).toEqual(2);
    });
  });
});
