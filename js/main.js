// Event listener pour mettre à jour la valeur affichée de la distance
document.getElementById("distance-range").addEventListener("input", function() {
    document.getElementById("distance-value").textContent = this.value + " km";
});

// Event listener pour le formulaire de recherche de cinémas
document.getElementById("cinema-search-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const address = document.getElementById("address-search").value;
    const distance = document.getElementById("distance-range").value;

    try {
        // Convertir l'adresse en coordonnées GPS
        const { latitude, longitude } = await getCoordinatesFromAddress(address);
        
        // Récupérer les cinémas à proximité
        const cinemas = await getCinemasNearby(latitude, longitude, distance);
        
        // Trier les cinémas par distance (du plus proche au plus éloigné)
        cinemas.sort((a, b) => a.distance - b.distance);
        
        // Afficher les résultats
        displayCinemas(cinemas);
    } catch (error) {
        document.getElementById("error-message").style.display = "block";
        document.getElementById("error-message").textContent = error.message;
    }
});


// Affichage des cinémas dans la liste
function displayCinemas(cinemas) {
    const cinemaList = document.getElementById("cinema-list");
    cinemaList.innerHTML = ''; // Réinitialiser la liste

    cinemas.forEach(cinema => {
        const listItem = document.createElement("li");
        listItem.textContent = `${cinema.name} - ${cinema.address} (à ${cinema.distance.toFixed(2)} km)`;
        cinemaList.appendChild(listItem);
    });
}

// Event listener pour le bouton de géolocalisation
document.getElementById("geolocate-button").addEventListener("click", async () => {
    try {
        const position = await getGeolocation();
        const { latitude, longitude } = position.coords;

        // Récupérer l'adresse avec l'API Adresse
        const address = await getAddressFromCoordinates(latitude, longitude);
        document.getElementById("address-search").value = address;

    } catch (error) {
        alert("Erreur de géolocalisation: " + error.message);
    }
});
