const apiUrl="travel_recommendation_api.json"

fetch(apiUrl)
    .then(response => response.json())
    .then(data=>{
        console.log(data)
    })          