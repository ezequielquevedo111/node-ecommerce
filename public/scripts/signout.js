document.querySelector("#signout").addEventListener("click", async (req) => {
  event.preventDefault();
  try {
    const token = localStorage.getItem("token");
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let response = await fetch("/api/sessions/signout", opts);
    response = await response.json();
    console.log(response);
    if (response.statusCode === 200) {
      alert("Signed out!");
      location.replace("/");
      // localStorage.setItem("token", response.token)
    } else {
      alert("Cannot signout!");
    }
  } catch (error) {
    console.log(error);
  }
});
