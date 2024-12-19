// Fonction pour récupérer les coordonnées GPS à partir d'une adresse
async function getCoordinatesFromAddress(address) {
    const url = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(address)}&limit=1&format=json`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Vérifier si des résultats sont trouvés
        if (data.features && data.features.length > 0) {
            const coordinates = data.features[0].geometry.coordinates;
            const latitude = coordinates[1]; // latitude est le 2ème élément
            const longitude = coordinates[0]; // longitude est le 1er élément

            return { latitude, longitude };
        } else {
            throw new Error("Adresse non trouvée.");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des coordonnées : ", error);
        throw new Error("Erreur de géocodage.");
    }
}

// Fonction pour récupérer l'adresse à partir des coordonnées GPS
async function getAddressFromCoordinates(latitude, longitude) {
    const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${longitude}&lat=${latitude}&format=json`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Vérifier si des résultats sont trouvés
        if (data.features && data.features.length > 0) {
            return data.features[0].properties.label; // Retourne l'adresse complète
        } else {
            throw new Error("Adresse non trouvée.");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération de l'adresse : ", error);
        throw new Error("Erreur de récupération de l'adresse.");
    }
}
