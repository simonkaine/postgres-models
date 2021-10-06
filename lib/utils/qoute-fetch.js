import fetch from 'node-fetch';

export const fetchedData = async () => {
  const fetchedApi = await fetch('https://futuramaapi.herokuapp.com/api/quotes');
  const mungedData = await fetchedApi.json();
  console.log('MUNGGGG', mungedData);
  return {
    'character': mungedData.character,
  };
};
