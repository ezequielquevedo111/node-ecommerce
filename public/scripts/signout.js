import winston from "../../src/utils/logger/winston.utils.js";

fetch("/api/sessions/")
  .then((res) => res.json())
  .then((res) => {
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
          if (response.statusCode === 200) {
            alert(response.message);
            location.replace("/");
          }
        } catch (error) {
          winston.WARN(error);
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
