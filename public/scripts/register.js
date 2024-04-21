const selector = document.querySelector("#newUser");
// import Swal from "sweetalert2";
selector.addEventListener("click", async (event) => {
  event.preventDefault();
  try {
    const data = {
      name: document.querySelector("#name").value,
      surname: document.querySelector("#surname").value,
      photo: document.querySelector("#photo").value,
      email: document.querySelector("#emailRegister").value,
      password: document.querySelector("#passwordRegister").value,
    };
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let res = await fetch("/api/sessions/register", opts);
    res = await res.json();
    if (res.statusCode === 201) {
      alert(res.message);
      location.replace("/sessions/login");
    }
    res.statusCode === 401 && alert(res.message);
  } catch (error) {
    alert(error.message);
    // Swal.fire({
    //   icon: "error",
    //   title: "Oops...",
    //   text: error.message,
    // });
  }
});
