// Fonction pour récupérer la position GPS de l'utilisateur
function getGeolocation() {
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                position => resolve(position),
                error => reject(error)
            );
        } else {
            reject(new Error("La géolocalisation n'est pas supportée par ce navigateur."));
        }
    });
}
