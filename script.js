let productArr = []
const row = document.querySelector(".row.all-product");

window.onload = async () => {

  await getProduct();
  displayProduct(productArr);
}

const getProduct = async () => {
  let response = await fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjZiODJkNTI2MjAwMTViNmRjOTgiLCJpYXQiOjE2MjkyODgxMjAsImV4cCI6MTYzMDQ5NzcyMH0.XfRUnn6BFJPPRnEwvnQnjrk0oaXPSwwKyJlEGV6Wn9k"
    }
  })
  let products = await response.json();
  productArr = products;
}

function displayProduct(productArr) {
  row.innerHTML = ""
  productArr.forEach(product => {
    row.innerHTML += `<div class="col-sm">
          <div class="card" style="width: 18rem">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">
                <p>Product ID: ${product._id}</p>
                <p>Description: ${product.description}</p>
                <p>Brand: ${product.brand}</p>
                <p>Img: <div class="img-class"><img src=${product.imageUrl}></div></p>
                <button type="button" class="btn btn-primary" id="${product._id}" onclick="detailsProduct(this)">Details</button>
              </p>
            </div>
          </div>
        </div>`
  });
}

const detailsProduct = (product) => {
  window.location.href = ("/details.html?id=" + product.id);
}