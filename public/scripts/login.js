const selector = document.querySelector("#login");
// import Swal from "sweetalert2";
selector.addEventListener("click", async (event) => {
  event.preventDefault();
  try {
    const data = {
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
    };
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let res = await fetch("/api/sessions/login", opts);
    res = await res.json();
    if (res.statusCode === 200) {
      alert(res.message);
      location.replace("/");
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
