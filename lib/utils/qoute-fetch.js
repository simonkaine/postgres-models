import fetch from 'node-fetch';

export const fetchedData = async () => {
  const fetchedApi = await fetch('https://futuramaapi.herokuapp.com/api/quotes');
  const mungedData = await fetchedApi.json();
  
  return {
    'character': mungedData[0].character,
  };
};
