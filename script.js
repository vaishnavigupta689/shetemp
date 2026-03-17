function navigateTo(pageId) {
    document.getElementById('dashboard-page').classList.add('hidden');
    document.getElementById('map-page').classList.add('hidden');

    document.getElementById(pageId).classList.remove('hidden');

    if (pageId === 'map-page') {
        setTimeout(initMap, 300);
    }
}

let map;

function initMap() {
    if (map) {
        map.invalidateSize();
        return;
    }

    map = L.map('map').setView([28.6139, 77.2090], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([28.6139, 77.2090])
        .addTo(map)
        .bindPopup('Default Location')
        .openPopup();
}

function getUserLocation() {
    if (!navigator.geolocation) {
        alert("Geolocation not supported");
        return;
    }

    // CLEAR + TRANSPARENT
    const confirmAccess = confirm(
        "We use your location only to display nearby safe zones.\nNo data is stored."
    );

    if (!confirmAccess) return;

    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const { latitude, longitude } = pos.coords;

            map.setView([latitude, longitude], 15);

            L.marker([latitude, longitude])
                .addTo(map)
                .bindPopup("Your Location")
                .openPopup();
        },
        () => {
            alert("Unable to fetch location.");
        }
    );
}
