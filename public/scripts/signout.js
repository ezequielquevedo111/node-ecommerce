<<<<<<< HEAD
=======
fetch("/api/sessions/")
  .then((res) => res.json())
  .then((res) => {
    //console.log(res);
    if (res.statusCode === 200) {
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#registerNav"));
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#loginNav"));
      document.querySelector("#signout").addEventListener("click", async () => {
        try {
          const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          };
          let response = await fetch("/api/sessions/signout", opts);
          response = await response.json();
          console.log(response);
          if (response.statusCode === 200) {
            alert(response.message);
            location.replace("/");
          }
        } catch (error) {
          console.log(error);
        }
      });
    } else {
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#formNav"));
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#ordersNav"));
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#signout"));
    }
    if (res.response?.role === 0) {
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#formNav"));
    } else if (res.response?.role === 1) {
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#ordersNav"));
    }
  });

>>>>>>> 61fffd5ffa944fa15b7a3d7c943a06ad5a7f694e
