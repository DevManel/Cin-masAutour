// Fonction pour récupérer les cinémas proches d'une adresse via l'API des cinémas
async function getCinemasNearby(latitude, longitude, distance) {
    const url = `https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/etablissements-cinematographiques/records?where=within_distance(geolocalisation%2C%20geom%27POINT(${longitude}%20${latitude})%27%2C%20${distance}km)&limit=20`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Vérifier s'il y a des cinémas trouvés
        if (data.records.length === 0) {
            throw new Error("Aucun cinéma trouvé dans ce rayon.");
        }

        // Mapper les résultats et calculer la distance pour chaque cinéma
        return data.records.map(record => {
            return {
                name: record.fields.nom,
                address: record.fields.adresse,
                distance: calculateDistance(latitude, longitude, record.fields.geolocalisation[0], record.fields.geolocalisation[1])
            };
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des cinémas : ", error);
        throw new Error("Aucun cinéma trouvé.");
    }
}

// Fonction pour calculer la distance entre deux points GPS
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
