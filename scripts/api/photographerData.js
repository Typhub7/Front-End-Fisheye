export async function fetchPhotographersData() {
  try {
    const response = await fetch('../data/photographers.json'); 

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données des photographes.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    const fallbackResponse = await import('../data/photographers.json'); // Only for Gh Page Working -- Remove When back end is ready
    return fallbackResponse; // Only for Gh Page Working -- only put return[] When back end is ready
  }
}
