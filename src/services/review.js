export const getReviewsForHomepage = async () => {
  const response = await fetch(
    "https://skilly-online.herokuapp.com/api/v1/information/reviews"
  );

  const result = await response.json();

  return result;
};
