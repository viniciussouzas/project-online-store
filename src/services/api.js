export async function getCategories() {
  // Retorna um array de objetos com id e categoria
  const REQUEST_URL = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const RESPONSE = await REQUEST_URL.json();
  return RESPONSE;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  let response;

  if (query && !categoryId) {
    // Retorna objeto com resultados do item buscado
    const QUERY_URL = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
    response = await QUERY_URL.json();
  } else if (!query && categoryId) {
    // Retorna objeto com id de categoria buscado se apenas a categoria foi passada
    const CATEGORY_URL = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
    response = await CATEGORY_URL.json();
  } else if (query && categoryId) {
    // Retorna os dois se ambos foram passados
    const QUERY_AND_CATEGORY_URL = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
    response = await QUERY_AND_CATEGORY_URL.json();
  }

  return response;
}

export async function getProductById(id) {
  const data = await (await fetch(`https://api.mercadolibre.com/items/${id}`)).json();
  return data;
}
