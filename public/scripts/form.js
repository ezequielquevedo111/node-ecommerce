const selector = document.querySelector("#newProduct");
// import Swal from "sweetalert2";
selector.addEventListener("click", async (event) => {
  event.preventDefault();
  try {
    const data = {
      title: document.querySelector("#title").value,
      photo: document.querySelector("#photo").value,
      price: document.querySelector("#price").value,
      stock: document.querySelector("#stock").value,
    };
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let res = await fetch("/api/products", opts);
    res = await res.json();
    console.log(res);

    if (res.statusCode === 201) {
      alert("PRODUCT CREATE WITH ID " + res.response);
      location.replace("/");
    }
    res.statusCode === 401 && alert(res.message);
    res.statusCode === 400 && alert(res.response);
  } catch (error) {
    alert(error.message);
    // Swal.fire({
    //   icon: "error",
    //   title: "Oops...",
    //   text: error.message,
    // });
  }
});
