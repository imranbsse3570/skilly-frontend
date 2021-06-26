export const login = async (email, password) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const promise = await fetch(
    "https://skilly-online.herokuapp.com/api/v1/users/login",
    {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        email,
        password,
      }),
      redirect: "follow",
    }
  );

  const result = await promise.json();
  return result;
};

export const signUp = async (name, email, password, confirmPassword, role) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const promise = await fetch(
    "https://skilly-online.herokuapp.com/api/v1/users/signup",
    {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword,
        role,
      }),
      redirect: "follow",
    }
  );

  const result = await promise.json();
  return result;
};

export const getMyProfileData = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

  const response = await fetch(
    `https://skilly-online.herokuapp.com/api/v1/users/myProfile`,
    {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    }
  );

  const result = await response.json();

  return result;
};

export const updateProfile = async (formData) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

  const promise = await fetch(
    "https://skilly-online.herokuapp.com/api/v1/users/updateMe",
    {
      method: "PATCH",
      headers: myHeaders,
      body: formData,
      redirect: "follow",
    }
  );

  const result = await promise.json();

  return result;
};

export const getMyCourses = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

  const response = await fetch(
    "https://skilly-online.herokuapp.com/api/v1/users/myCourses",
    {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    }
  );

  const result = await response.json();

  return result;
};
