export async function fetchMediaData() {
    try {
      const response = await fetch('../data/photographers.json');
  
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données des photographes.');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  