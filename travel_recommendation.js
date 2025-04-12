const apiUrl="travel_recommendation_api.json"

function showRecommendation(event){
    clr=clearElements();
    event.preventDefault()
    var keyword = document.getElementById("dest_search").value;
    if(keyword.length > 2){
        result=[]
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                Object.keys(data).forEach(function(key) {
                    if(key.includes(keyword)){
                        if(result[key] == undefined){
                            result[key]=[]
                            result[key].push(data[key])
                        }
                        
                    }
                });
                showResults(result)
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            })
    }        
    
}    

document.getElementById("dest_search").addEventListener('input', showRecommendation);
document.getElementById("search_form").addEventListener('reset', clearElements);

function showResults(data){
    let key=Object.keys(data);
    if(key.length>0){
        list=[];
        result=[]
        if(key=='countries'){
            cities=[]
            data[key].map((info) =>{
                //we return cities from a random country
                info.forEach((city) => {
                    cities.push(city["cities"]);  
                });
            });
            data[key] = cities
        }
                
        data[key].forEach((dest) => {
            dest.forEach((dest2) =>{
                //if there is data available to be shown
                if(dest2.name.length > 0){
                    list.push(`<li>
                        <div class="search-image mb-1 w-100"><img src="static/destinations/${dest2.imageUrl}" class="w-100"></div>
                        <div class="search-desc">
                            <h5>${dest2.name}</h5>
                            <p>${dest2.description}</p>
                        </div>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button class="btn btn-sm btn-success">View</button>
                        </div>    
                        <hr />
                    <li>`)
                }    
            })
        });
          
        parent = document.getElementById("navbarSupportedContent");       
        listDiv = document.createElement("div");
        listDiv.setAttribute("class", "position-absolute right-0 search-list");
        listDiv.setAttribute("id", "destlistwrap");
        listEle = document.createElement("ul");  
        listEle.setAttribute("class", "list-unstyled dest-list");
        listEle.innerHTML = list.join('');
        listDiv.append(listEle);
        parent.append(listDiv);
    }
}

function clearElements(){
    listWrap=document.getElementById("destlistwrap");
    if (listWrap !== null) {
        listWrap.remove()
    }
    return true;
}