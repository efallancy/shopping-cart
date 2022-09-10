interface Product {
  sku: string;
  name: string;
  price: number;
  // discountedPrice property shall only exist
  // if discount is applied
  discountedPrice?: number;
}

const products = [
  {
    sku: 'ipd',
    name: 'Super iPad',
    price: 549.99
  },
  {
    sku: 'mbp',
    name: 'Macbook Pro',
    price: 1399.99
  },
  {
    sku: 'atv',
    name: 'Apple TV',
    price: 109.50
  },
  {
    sku: 'vga',
    name: 'VGA adapter',
    price: 30.00
  },
];

export { Product, products };
