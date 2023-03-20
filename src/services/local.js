// Pega os produtos do localStorage e garante que sempre volte algo que não seja undefined.
export const getProductLocalStorage = () => {
  const localItems = JSON.parse(localStorage.getItem('productsCart'));
  return localItems ?? [];
};

// Adciona o produto atual ao localStorage do carrinho
export const setProductLocalStorage = (productDetails) => {
  const localItems = getProductLocalStorage();
  localStorage.setItem('productsCart', JSON.stringify([...localItems, productDetails]));
};
