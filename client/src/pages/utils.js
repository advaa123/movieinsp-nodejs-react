export const formSubmitHandler = (e, values, setError, setIsSubmitting, captureTry) => {
  e.preventDefault();
  if (!values.email.length || !values.password.length) {
    setError("All fields are required.");
    return;
  }

  if (
    values.email === captureTry.email &&
    values.password === captureTry.password
  )
    return;

  setIsSubmitting(true);

  const genericErrorMessage = "Something went wrong! Please try again later.";

  fetch(`${process.env.REACT_APP_AUTH_ENDPOINT}/users/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: values.email,
      password: values.password,
    }),
  })
    .then(async (response) => {
      setIsSubmitting(false);
      if (!response.ok) {
        if (response.status === 400) {
          setError("Please fill all the fields correctly!");
        } else if (response.status === 401) {
          setError("Invalid email and password combination.");
        } else {
          setError(genericErrorMessage);
        }
      } else {
        const data = await response.json();
        localStorage.setItem("refreshToken", data.refreshToken);
        window.location.reload();
      }
    })
    .catch((error) => {
      setIsSubmitting(false);
      setError(genericErrorMessage);
    });
};

export const demoSubmitHandler = (e, values, setError, setIsSubmittingDemo) => {
  e.preventDefault();
  setIsSubmittingDemo(true);
  const genericErrorMessage = "Something went wrong! Please try again later.";

  fetch(`${process.env.REACT_APP_AUTH_ENDPOINT}/users/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "demo",
      password: "demo",
    }),
  })
    .then(async (response) => {
      setIsSubmittingDemo(false);
      if (!response.ok) {
        setError(genericErrorMessage);
      } else {
        const data = await response.json();
        localStorage.setItem("refreshToken", data.refreshToken);
        window.location.reload();
      }
    })
    .catch((error) => {
      setIsSubmittingDemo(false);
      setError(genericErrorMessage);
    });
};
