map.on('load', async () => {
    map.addSource('search-results', {
        type: 'geojson',
        data: {
            "type": "FeatureCollection",
            "features": []
        }
    });
    map.addLayer({
        'id': 'point-result',
        'type': 'circle',
        'source': 'search-results',
        'paint': {
            'circle-radius': 8,
            'circle-color': '#B42222',
            'circle-opacity': 0.5
        },
        'filter': ['==', '$type', 'Point']
    });
});