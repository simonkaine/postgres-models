import fetch from 'node-fetch';

export const fetchedData = async () => {
  const fetchedApi = await fetch('https://rickandmortyapi.com/api/episode');
  const mungedData = await fetchedApi.json();

  return {
    'name': mungedData.results[0].name,
    'episode': mungedData.results[0].episode
  };
};
