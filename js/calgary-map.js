document.addEventListener('DOMContentLoaded', function () {
    mapboxgl.accessToken = 'pk.eyJ1IjoicmF5ZWhlIiwiYSI6ImNrbHZ5NHMyejBkdXcyc214OHlvNmhrZG0ifQ.KXVOh3T-0PdiPnVQ5iMCCQ';
    var map = new mapboxgl.Map({
container: 'mapid', // container id
style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
center: [-114.0719, 51.0447], // starting position
zoom: 12 // starting zoom
});
    $.getJSON('https://data.calgary.ca/resource/x34e-bcjz.geojson?$where=type%20=%20%27Hospital%27%20OR%20type%20=%20%27PHS%20Clinic%27', function(data) {
        map.addLayer({
            id: 'hospitals',
            type: 'symbol',
            source: {
                type: 'geojson',
                data: data
            },
            layout: {
                'icon-image': 'hospital-15',
                'icon-allow-overlap': true
            },
            paint: { }
        });

    });

    $.getJSON('https://data.calgary.ca/resource/fd9t-tdn2.geojson', function(data) {
        map.addLayer({
            id: 'schools',
            type: 'symbol',
            source: {
                type: 'geojson',
                data: data
            },
            layout: {
                'icon-image': 'library-15'
            },
            paint: { }
        });
    });

});