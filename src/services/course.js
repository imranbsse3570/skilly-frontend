export const getCourseData = async (slug) => {
  var myHeaders = new Headers();

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(
    `https://skilly-online.herokuapp.com/api/v1/courses?slug=${slug}`,
    requestOptions
  );

  const result = await response.json();

  return result;
};
