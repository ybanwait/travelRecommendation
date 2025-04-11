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
document.getElementById("dest_search").addEventListener('onreset', clearElements);

function showResults(data){
    let key=Object.keys(data);
    if(key.length>0){
        list=[];
        data[key].forEach((dest) => {
            dest.forEach((dest2) =>{
                if(dest2.name.length>0){
                    list.push(`<li>
                        <div class="d-inline-block search-image"><img src="static/destinations/${dest2.imageUrl}" class="w-100"></div>
                        <div class="d-inline-block search-desc">
                            <h5>${dest2.name}</h5>
                            <p>${dest2.description}</p>
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