import { Checkout } from './checkout';
import { appleTvDeal, bulkDiscountOnIpad, freeVgaOnMacbookPro } from './rules';

describe('Checkout', () => {
  describe('without pricing rules', () => {
    it('should calculate total price without pricing rules applied', () => {
      const checkout = new Checkout();

      checkout.scan('ipd');
      checkout.scan('mbp');
      checkout.scan('vga');

      const total = checkout.total();

      expect(total).toEqual(1979.98);
    });
  });

  describe('with pricing rules', () => {
    it('should return total price with normal pricing when no pricing rules applied', () => {
      const rules = [appleTvDeal, bulkDiscountOnIpad, freeVgaOnMacbookPro];
      const checkout = new Checkout(rules);

      checkout.scan('ipd');
      checkout.scan('mbp');
      checkout.scan('atv');

      const total = checkout.total();

      expect(total).toEqual(2059.48);
    });

    it('should calculate total price with applied AppleTv pricing rule', () => {
      const rules = [appleTvDeal, bulkDiscountOnIpad, freeVgaOnMacbookPro];
      const checkout = new Checkout(rules);

      checkout.scan('atv');
      checkout.scan('atv');
      checkout.scan('atv');
      checkout.scan('vga');

      const total = checkout.total();

      expect(total).toEqual(249);
    });

    it('should calculate total price with applied iPad bundle pricing rule', () => {
      const rules = [appleTvDeal, bulkDiscountOnIpad, freeVgaOnMacbookPro];
      const checkout = new Checkout(rules);

      checkout.scan('atv');
      checkout.scan('ipd');
      checkout.scan('ipd');
      checkout.scan('atv');
      checkout.scan('ipd');
      checkout.scan('ipd');
      checkout.scan('ipd');

      const total = checkout.total();

      expect(total).toEqual(2718.95);
    });

    it('should calculate total price with free VGA bundle pricing rule', () => {
      const rules = [appleTvDeal, bulkDiscountOnIpad, freeVgaOnMacbookPro];
      const checkout = new Checkout(rules);

      checkout.scan('mbp');
      checkout.scan('vga');
      checkout.scan('ipd');

      const total = checkout.total();

      expect(total).toEqual(1949.98);
    });
  });
});

