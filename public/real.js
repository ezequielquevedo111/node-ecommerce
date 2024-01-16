const socket = io();

console.log("conectado");

socket.on("products", (data) => {
  console.log(data);
  data = data
    .map(
      (product) => `
  <div class="card border-1 row-gap-5" style="width: 18rem;">
  <img src=${product.photo} class="card-img-top" alt="..." />
  <div class="card-body">
    <h5
      class="card-title fw-bold"
      style="color: #352D2D"
    >${product.title}</h5>
    <p class="card-text fw-semibold" style="color: #352D2D">$
      ${product.price}</p>
  </div>
</div>
  `
    )
    .join("");
  document.querySelector("#products").innerHTML = data;
});
