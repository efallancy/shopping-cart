// Entrypoint execution served as example
import { Checkout } from './checkout';
import { appleTvDeal, bulkDiscountOnIpad, freeVgaOnMacbookPro } from './rules';

const pricingRules = [appleTvDeal, bulkDiscountOnIpad, freeVgaOnMacbookPro];
const checkout = new Checkout(pricingRules);

console.log('Scanning iPad');
checkout.scan('ipd');

console.log('Scanning Macbook Pro');
checkout.scan('mbp');

console.log('Scanning VGA adapter');
checkout.scan('vga');

console.log('SKUs scanned:', checkout.scanItems.map(item => item.sku).join(', '));
console.log(`Total price of scanned items: $${checkout.total()}`);
