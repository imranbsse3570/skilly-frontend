export const executeCode = async (language, scriptText) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      language,
      script: scriptText,
    }),
    redirect: "follow",
  };

  const response = await fetch(
    "https://skilly-online.herokuapp.com/api/v1/executeCode",
    requestOptions
  );
  const result = await response.json();

  if (result.status === "fail") {
    throw new Error(result.message);
  }

  return result;
};
