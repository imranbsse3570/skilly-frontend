export const handleCheckout = async (id) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(
    `https://skilly-online.herokuapp.com/api/v1/courses/${id}/checkout`,
    requestOptions
  );

  const session = await response.json();

  return session;
};
