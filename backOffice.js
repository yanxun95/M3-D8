let productObj = {}
const eventId = new URLSearchParams(location.search).get("id")
const endpoint = eventId ? "https://striveschool-api.herokuapp.com/api/product/" + eventId : "https://striveschool-api.herokuapp.com/api/product/"
const method = eventId ? "PUT" : "POST"
const headers = new Headers({
    'Content-Type': 'application/json',
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjZiODJkNTI2MjAwMTViNmRjOTgiLCJpYXQiOjE2MjkyODgxMjAsImV4cCI6MTYzMDQ5NzcyMH0.XfRUnn6BFJPPRnEwvnQnjrk0oaXPSwwKyJlEGV6Wn9k"
})
const btnBackOfficeSubmit = document.querySelector(".btn.btn-primary.mt-2");
const container = document.querySelector(".container.mt-5");
const btnDelete = document.createElement("button");
btnDelete.classList.add("btn");
btnDelete.classList.add("btn-danger");
btnDelete.classList.add("mt-2");
btnDelete.setAttribute("id", "delete-btn");
btnDelete.setAttribute("onclick", "deleteProduct()");
btnDelete.innerText = "Delete";

window.onload = async () => {
    if (eventId) {
        btnBackOfficeSubmit.innerHTML = "Update"
        container.appendChild(btnDelete);

        const response = await fetch(endpoint, {
            headers
        })
        const productDetails = await response.json()

        document.getElementById("name").value = productDetails.name
        document.getElementById("description").value = productDetails.description
        document.getElementById("brand").value = productDetails.brand
        document.getElementById("imageUrl").value = productDetails.imageUrl
        document.getElementById("price").value = productDetails.price

    } else {
        btnBackOfficeSubmit.innerHTML = "Submit"
    }
}

const sendProduct = async () => {
    let response = await fetch(endpoint, {
        method,
        body: JSON.stringify(productObj),
        headers
    })
    if (response.ok) {
        // everything went well
        const respEvent = await response.json()

        if (eventId) {
            showAlert("success", "Appointment with an id of: " + respEvent._id + " got edited successfully")
            setTimeout(() => { window.location.assign("/") }, 3000)
        }
        else {
            showAlert("success", "Appointment created successfully with an id of " + respEvent._id)
            setTimeout(() => { window.location.assign("/") }, 3000)
        }
    } else {
        // something went wrong

        //since fetch will never throw an error except when there's no connection we can rely on response.ok being false and
        //deal with status codes by manually throw an exception that will be caught by the catch clause below
        if (response.status >= 400 && response.status < 500) {
            throw new Error("User generated error, verify the data that you are sending!")
        } else if (response.status >= 500 && response.status < 600) {
            throw new Error("Server generated error, contact the admin to fix this problem.")
        }
    }
}

const submitData = () => {
    let productName = document.getElementById("name").value;
    let description = document.getElementById("description").value;
    let brand = document.getElementById("brand").value;
    let imageUrl = document.getElementById("imageUrl").value;
    let price = document.getElementById("price").value;
    productObj = { name: productName, description: description, brand: brand, imageUrl: imageUrl, price: price }
    sendProduct();
}

const deleteProduct = async () => {
    try {
        const response = await fetch(endpoint, {
            method: "DELETE",
            headers
        })
        if (response.ok) {
            const deletedObj = await response.json()
            showAlert("success", "Event with id: " + deletedObj._id + " deleted successfully")
            setTimeout(() => { window.location.assign("/") }, 3000)
        } else {
            showAlert("danger", "Something went wrong in the deletion process")
        }
    } catch (err) {
        showAlert("danger", err.message)
    }
}

const showAlert = (type, msg) => {
    const alertContainer = document.getElementById("alert-box")

    alertContainer.innerHTML = `
            <div class="alert alert-${type}" role="alert">
                ${msg}
            </div>`


    setTimeout(() => {
        alertContainer.innerHTML = ""
    }, 3000)
}