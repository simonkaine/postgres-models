import fetch from 'node-fetch';

export const fetchedData = async () => {
  const fetchedApi = await fetch('https://rickandmortyapi.com/api/character/2');
  const mungedData = await fetchedApi.json();
  console.log('MUNGGGG', mungedData.name);
  return {
    'name': mungedData.name,
    'gender': mungedData.gender
  };
};
