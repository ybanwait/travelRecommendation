const apiUrl="travel_recommendation_api.json"

function showRecommendation(event){
    event.preventDefault()
    var keyword = document.getElementById("dest_search").value;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {

        }
            
    })
    .catch(error => {
        console.error("Error fetching data:", error)
    })          
}    

document.getElementById("search_form").addEventListener('submit', showRecommendation)