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

export const deleteCourse = async (courseId) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

  const response = await fetch(
    `https://skilly-online.herokuapp.com/api/v1/courses/${courseId}`,
    {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    }
  );

  if (response.status !== 204) {
    const result = await response.json();
    throw new Error(result.message);
  }
};
