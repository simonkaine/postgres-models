import fetch from 'node-fetch';

export const fetchedData = async () => {
  const fetchedApi = await fetch('https://ghibliapi.herokuapp.com/films');
  const mungedData = await fetchedApi.json();
 
  return mungedData[0];
};
