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
    console.log(productArr)
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
                <p>User ID: ${product.userId}</p>
                <p>Update at: ${product.updatedAt}</p>
              </p>
            </div>
          </div>
        </div>`
    });
}