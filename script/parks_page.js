function addPark(parkTypeName, parkTypeSelect) {
    parkTypeSelect.appendChild(new Option(parkTypeName));
}
function addLocation(text, target) {
    target.appendChild(new Option(text));
}
function Park(parkObject){
    const card = document.createElement("div");
    card.classList.add("card", "mb-4");
    
    const cardBody = document.createElement("div")
    cardBody.classList.add("card-body");

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = parkObject.LocationName;

    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.innerHTML = `
        <strong>Address:</strong> ${parkObject.Address}<br>
        <strong>City:</strong> ${parkObject.City}, ${parkObject.State}<br>
        <strong>Zip Code:</strong> ${parkObject.ZipCode}<br>
        <strong>Phone:</strong> ${parkObject.Phone}<br>
        <strong>Fax:</strong> ${parkObject.Fax}<br>
        <strong>Coordinates:</strong> ${parkObject.Latitude}, ${parkObject.Longitude}
    `;

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);

    card.appendChild(cardBody);
    return card;


}
function renderParks(){
    const results = document.getElementById("results");
    const selectedType = parkTypeSelect.value;
    const selectedLocation = parkLocationSelect.value;
    results.innerHTML = "";
    let filtered = nationalParksArray;
    if(selectedType){
        filtered = filtered.filter(p=>p.LocationName.toLowerCase().includes(selectedType.toLowerCase()));
    }
    if(selectedLocation){
        filtered = filtered.filter(p=>p.State.toLowerCase() === selectedLocation.toLowerCase())
    }
    filtered.forEach( p => {
        const card = Park(p);
        results.appendChild(card);
    });
    
    if(filtered.length < 1){
        results.innerHTML = "No results found matching the filter.";
    }
}
function onContent() {
    const parkTypeSelect = document.getElementById("parkTypeSelect");
    const parkLocationSelect = document.getElementById("parkLocationSelect");
    const results = document.getElementById("results");
    const filterButton = document.getElementById("filterButton");

    parkTypesArray.forEach(parkTypeName => addPark(parkTypeName, parkTypeSelect));
    locationsArray.forEach(parkLocationName => addLocation(parkLocationName, parkLocationSelect));
    
    renderParks();

    filterButton.addEventListener("click", renderParks);
    // parkTypeSelect.addEventListener("change", renderParks);
    // parkLocationSelect.addEventListener("change", renderParks);
}

document.addEventListener("DOMContentLoaded", onContent);
