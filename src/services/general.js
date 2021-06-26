export const getStats = async () => {
  const response = await fetch(
    "https://skilly-online.herokuapp.com/api/v1/information/stats"
  );
  const result = await response.json();

  return result;
};
