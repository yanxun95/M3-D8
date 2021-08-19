const eventId = new URLSearchParams(window.location.search).get("id")
console.log(eventId)

window.onload = async () => {
    try {

        const url = "https://striveschool-api.herokuapp.com/api/product/"

        const response = await fetch(url + eventId, {
            headers: new Headers({
                'Content-Type': 'application/json',
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjZiODJkNTI2MjAwMTViNmRjOTgiLCJpYXQiOjE2MjkyODgxMjAsImV4cCI6MTYzMDQ5NzcyMH0.XfRUnn6BFJPPRnEwvnQnjrk0oaXPSwwKyJlEGV6Wn9k"
            })
        })
        if (response.ok) {
            const eventData = await response.json()

            const eventContainer = document.getElementById("event-details")
            // console.log(eventData)
            eventContainer.innerHTML =
                ` <h1 class="font-weight-bolder mt-4">${eventData.name}</h1>
                            <h6 class="bg-light pl-2 py-3">Product Details</h6>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item pl-2"><strong>id: </strong>${eventData._id}</li>
                                <li class="list-group-item pl-2"><strong>createdAt: </strong>${eventData.createdAt}</li>
                                <li class="list-group-item pl-2"><strong>updatedAt: </strong>${eventData.updatedAt}</li>
                            </ul>`
        }
    } catch (err) {
        console.log(err)
    }
}

const handleEdit = () => {
    window.location.assign("/backoffice.html?id=" + eventId)
}