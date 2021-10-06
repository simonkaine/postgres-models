import fetch from 'node-fetch';

export const fetchedData = async () => {
  const fetchedApi = await fetch('https://rickandmortyapi.com/api/character');
  const mungedData = await fetchedApi.json();
  return {
    'name': mungedData.results[0].name,
    'status': mungedData.results[0].status,
    'species': mungedData.results[0].species
  };
};
