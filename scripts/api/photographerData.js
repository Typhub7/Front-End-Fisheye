/** Fetches the data of photographers from the JSON file.
 * @async
 * @function
 * @returns {Promise} A Promise that resolves to an array of photographer data.
 * @throws {Error} Throws an error if there's an issue with the data retrieval.
 */
export async function fetchPhotographersData() {
  try {
    const response = await fetch('data/photographers.json'); 

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données des photographes.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
