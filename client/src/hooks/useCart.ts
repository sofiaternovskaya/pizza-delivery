import createPersistedState from "./usePersistedState";

const useCartState = createPersistedState("cart");

const useCart = (initialState: { [key: string]: number } = {}) => {
  const [cart, setCart] = useCartState(initialState);

  return {
    cart,
    addProductToCart: (id: string) =>
      setCart((currentCart: { [key: string]: number }) => {
        return {
          ...currentCart,
          [id]: currentCart[id] ? currentCart[id] + 1 : 1,
        };
      }),
    removeProductFromCart: (id: string) =>
      setCart((currentCart: { [key: string]: number }) => {
        if (currentCart[id] > 1) {
          return { ...currentCart, [id]: currentCart[id] - 1 };
        }

        const newValues = { ...currentCart };
        delete newValues[id];
        return newValues;
      }),
    clearCart: () => setCart({}),
  };
};

export default useCart;
