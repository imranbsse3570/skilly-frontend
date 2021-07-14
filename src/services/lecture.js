export const addNewLecture = async (formData, courseId) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

  const response = await fetch(
    `https://skilly-online.herokuapp.com/api/v1/courses/${courseId}/lectures`,
    {
      method: "POST",
      headers: myHeaders,
      body: formData,
      redirect: "follow",
    }
  );

  const result = await response.json();

  if (result.status.toLowerCase() !== "success") {
    throw new Error(result.message);
  }

  return result;
};

export const updateLecture = async (formdata, courseId, lectureId) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

  try {
    const response = await fetch(
      `http://localhost:8000/api/v1/courses/${courseId}/lectures/${lectureId}`,
      {
        method: "PATCH",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      }
    );
    const result = await response.json();

    if (result.status.toLowerCase() !== "success") {
      throw new Error(result.message);
    }

    return result;
  } catch (err) {
    console.log(err);
  }
};

export const deleteLecture = async (courseId, lectureId) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

  const response = await fetch(
    `https://skilly-online.herokuapp.com/api/v1/courses/${courseId}/lectures/${lectureId}`,
    {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    }
  );

  if (response.status !== 204) {
    const result = await response.json();
    console.log(result);
    throw new Error(result.message);
  }
};

export const viewLecture = async (courseId, lectureSource) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

  const response = await fetch(
    `https://skilly-online.herokuapp.com/files/${courseId}/lectures/${lectureSource}`,
    {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    }
  );

  const result = await response.blob();

  return result;
};
