export async function fetchPhotographersData() {
  try {
    const response = await fetch('../data/photographers.json'); // https://raw.githubusercontent.com/{username}/{repo}/{branch}/{file}

    if (!response.ok) {
      const response = await import('../data/photographers.json'); // Only for gh-pages - Remove when back-end will be ok
      throw new Error('Erreur lors de la récupération des données des photographes.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
