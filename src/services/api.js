export async function getCategories() {
  // Retorna um array de objetos com id e categoria
  const REQUEST_URL = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const RESPONSE = await REQUEST_URL.json();
  return RESPONSE;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  // Retorna um objetão baseado no produto buscado
  const QUERY_URL = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  const QUERY_RESPONSE = await QUERY_URL.json();
  // Retorna um objetão baseado na categoria selecionada
  const CATEGORY_URL = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
  const CATEGORY_RESPONSE = await CATEGORY_URL.json();

  if (categoryId === '') {
    return QUERY_RESPONSE;
  }

  if (query === '') {
    return CATEGORY_RESPONSE;
  }

  return (
    CATEGORY_RESPONSE,
    QUERY_RESPONSE
  );
}

export async function getProductById(id) {
  const data = await (await fetch(`https://api.mercadolibre.com/items/${id}`)).json();
  return data;
}
