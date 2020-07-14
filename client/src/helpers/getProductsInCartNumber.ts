export function getProductsInCartNumber(cart: { [key: string]: number }) {
  return Object.entries(cart).reduce((sum, [key, value]) => (sum += value), 0);
}
