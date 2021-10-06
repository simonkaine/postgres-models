import fetch from 'node-fetch';

export const fetchedData = async () => {
  const fetchedApi = await fetch('https://rickandmortyapi.com/api/location');
  const mungedData = await fetchedApi.json();

  return {
    'name': mungedData.results[0].name,
    'type': mungedData.results[0].type,
    'dimension': mungedData.results[0].dimension,

    
  };
};
