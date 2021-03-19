document.addEventListener('DOMContentLoaded', function () {
    mapboxgl.accessToken = 'pk.eyJ1IjoicmF5ZWhlIiwiYSI6ImNrbHZ5NHMyejBkdXcyc214OHlvNmhrZG0ifQ.KXVOh3T-0PdiPnVQ5iMCCQ';
    var map = new mapboxgl.Map({
        container: 'mapid', // container id
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [-114.0719, 51.0447], // starting position
        zoom: 12 // starting zoom
    });
    map.on('load', function() {
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
    map.addSource('nearest-hospital', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [
                    ]
                }
            });
            // Create a new circle layer from the 'nearest-school' data source
            map.addLayer({
                id: 'nearest-hospital',
                type: 'circle',
                source: 'nearest-hospital',
                paint: {
                    'circle-radius': 12,
                    'circle-color': '#486DE0'
                }
            }, 'hospitals');
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

    map.on('click', function(e) {
        // Return any features from the 'schools' layer whenever the map is clicked
        var libraryFeatures = map.queryRenderedFeatures(e.point, { layers: ['schools'] });
        if (!libraryFeatures.length) {
            return;
        }
        var libraryFeature = libraryFeatures[0];
        var hospitals = map.getSource('hospitals');
        console.log(hospitals);
        // Using Turf, find the nearest hospital to school clicked
        var nearestHospital = turf.nearest(libraryFeature, hospitals._data);

        // If a nearest schools is found
        if (nearestHospital !== null) {
        // Update the 'nearest-school' data source to include
        // the nearest school
        map.getSource('nearest-hospital').setData({
            type: 'FeatureCollection',
            features: [
                nearestHospital
            ]
        });
    }
});

});