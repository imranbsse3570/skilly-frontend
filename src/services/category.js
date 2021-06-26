export const getCategories = async (limit) => {
  const myHeaders = new Headers();

  const response = await fetch(
    `https://skilly-online.herokuapp.com/api/v1/categories?sort=title&limit=${limit}`,
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

export const getRelatedCategories = async (currentCategory, limit) => {
  var myHeaders = new Headers();

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(
    `https://skilly-online.herokuapp.com/api/v1/categories?slug[ne]=${currentCategory}&limit=${limit}`,
    requestOptions
  );

  const result = await response.json();

  return result;
};

export const getCategoryBySlug = async (slug) => {
  var myHeaders = new Headers();

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(
    `https://skilly-online.herokuapp.com/api/v1/categories/slug/${slug}`,
    requestOptions
  );

  const result = await response.json();

  return result;
};

export const getRandomCategory = async () => {
  const response = await fetch(
    "https://skilly-online.herokuapp.com/api/v1/categories/random/category"
  );
  const result = await response.json();

  return result;
};
