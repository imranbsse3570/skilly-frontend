export const getCourseData = async (slug) => {
  const response = await fetch(
    `https://skilly-online.herokuapp.com/api/v1/courses?slug=${slug}`
  );

  const result = await response.json();

  if (
    result.status.toLowerCase() === "error" ||
    result.status.toLowerCase() === "fail"
  ) {
    throw new Error(result.message);
  }
  return result;
};

export const createNewCourse = async (formData) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

  const response = await fetch(
    "https://skilly-online.herokuapp.com/api/v1/courses",
    {
      method: "POST",
      headers: myHeaders,
      body: formData,
      redirect: "follow",
    }
  );

  const result = await response.json();

  if (result.status === "fail" || result.status === "error") {
    throw new Error(result.message);
  }

  return result;
};

export const updateCourse = async (id, formData) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

  const response = await fetch(
    `https://skilly-online.herokuapp.com/api/v1/courses/${id}`,
    {
      method: "PATCH",
      headers: myHeaders,
      body: formData,
      redirect: "follow",
    }
  );

  const result = await response.json();

  if (
    result.status.toLowerCase() === "error" ||
    result.status.toLowerCase() === "fail"
  ) {
    throw new Error(result.message);
  }

  return result;
};

export const deleteCourse = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

  const response = await fetch(
    "https://skilly-online.herokuapp.com/api/v1/courses/60a64d85924ef72cbcba425d",
    {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    }
  );

  const result = await response.json();

  if (response.status !== 204) {
    throw new Error(result.message);
  }

  return result;
};
