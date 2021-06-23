export const login = async (email, password) => {
  var myHeaders = new Headers();
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
  var myHeaders = new Headers();
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
