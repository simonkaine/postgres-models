import fetch from 'node-fetch';

export const fetchedData = async () => {
  const fetchedApi = await fetch('https://rickandmortyapi.com/api/location');
  const mungedData = await fetchedApi.json();

  return mungedData.results;
};
