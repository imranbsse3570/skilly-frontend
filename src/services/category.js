export const getCategories = async () => {
  const myHeaders = new Headers();

  const response = await fetch(
    "https://skilly-online.herokuapp.com/api/v1/categories?sort=title",
    {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    }
  );

  const result = await response.json();

  return result;
};

export const getCoursesByCategory = async (categoryId) => {
  var myHeaders = new Headers();

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(
    `https://skilly-online.herokuapp.com/api/v1/courses?category=${categoryId}`,
    requestOptions
  );

  const result = await response.json();

  return result;
};
