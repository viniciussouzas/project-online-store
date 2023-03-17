export async function getCategories() {
  // Retorna um array de objetos com id e categoria
  const REQUEST_URL = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const RESPONSE = await REQUEST_URL.json();
  return RESPONSE;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  // Retorna um objetão com o item buscado
  const QUERY_URL = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  const QUERY_RESPONSE = await QUERY_URL.json();
  //
  const CATEGORY_URL = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
  const CATEGORY_RESPONSE = await CATEGORY_URL.json();
  return (
    QUERY_RESPONSE,
    CATEGORY_RESPONSE
  );
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
