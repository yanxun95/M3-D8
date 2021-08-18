let productObj = {}
let productName = ""
let description = ""
let brand = ""
let imageUrl = ""
let price = ""

const postProdect = async () => {
    let response = await fetch('https://striveschool-api.herokuapp.com/api/product/', {
        method: 'POST',
        body: JSON.stringify(productName),
        headers: new Headers({
            'Content-Type': 'application/json',
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjZiODJkNTI2MjAwMTViNmRjOTgiLCJpYXQiOjE2MjkyODgxMjAsImV4cCI6MTYzMDQ5NzcyMH0.XfRUnn6BFJPPRnEwvnQnjrk0oaXPSwwKyJlEGV6Wn9k"

        })
    })
    let product = await response.json();
    console.log(product)
}

const getProductData = () => {
    productName = document.getElementById("name").value;
    description = document.getElementById("description").value;
    brand = document.getElementById("brand").value;
    imageUrl = document.getElementById("imageUrl").value;
    price = document.getElementById("price").value;
    productName = { name: productName, description: description, brand: brand, imageUrl: imageUrl, price: price }
    console.log(productName)
    postProdect();
}