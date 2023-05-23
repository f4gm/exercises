const map = L.map('map', {
    center: [3.32668,-76.61064],
    zoom: 14,
    zoomSnap: 0.1,
    zoomDelta: 0.5,
    layers: [StadiaAlidadeSmoothDark, prediosWMS, sitios],
    maxBounds: corregimiento.getBounds()
});

var baseMap = {
    'Open Streets Maps': osm,
    'Esri World Imagery': esriWorldImagery,
    //'Google Streets': googleStreets,
    'Stadia OSM Bright': StadiaOSMBright,
    'Stadia Dark': StadiaAlidadeSmoothDark
};

var layers = {
    'Sitios de interés': sitios,
    'Veredas WMS': veredasWMS,
    'Predios WMS': prediosWMS,
    'Corregimiento Pance WMS': corregimientoWMS,
    'Corregimiento Pance': corregimiento,
};

// Utilities
L.control.layers(baseMap, layers, {
    collapsed: true
}).addTo(map);

//  Geocoding
L.Control.geocoder({
    position: 'topleft'
}).addTo(map);

//  Scalebar
L.control.graphicScale({
    fill: 'fill',
    doubleLine: false
}).addTo(map);

//  ScaleFactor
//  Not working
// L.control.scalefactor({
//     updateWhenIdle: true
// }).addTo(map);

//  User location
var loc = L.control.locate({
    flyTo: true,
    strings: {
        outsideMapBoundsMsg: 'Tu ubicación se encuentra fuera de los límites del mapa.',
        title: 'Ubicación'
    },
    locateOptions: {
        enableHighAccuracy: true
    }
}).addTo(map);

//  Zoom to layer
var magnifyingGlass = L.magnifyingGlass({
    layers: [googleStreets]
});
L.easyButton({
    states: [{
            stateName: 'open',
            icon: 'bi bi-plus-circle-dotted',
            title: 'Abrir lupa',
            onClick: function(btn, map) {
                map.addLayer(magnifyingGlass);
                btn.state('close');
            }
        }, {
            stateName: 'close',
            icon: 'bi bi-dash-circle-dotted',
            title: 'Cerrar lupa',
            onClick: function(btn, map) {
                map.removeLayer(magnifyingGlass);
                btn.state('open');
            }
    }],
    position: 'topright'
}).addTo(map);

// Graticule
new L.AutoGraticule().addTo(map);

// Set view
L.easyButton({
    states: [{
        icon: 'bi bi-house-door-fill',
        title: 'Restaurar vista',
        onClick: function(btn, map) {
            map.setView([3.32668,-76.61064], 14);
        }
    }],
    position: 'topright'
}).addTo(map);

// Heatmap
dataHeat = []
for (let index in data) {
    dataHeat.push([data[index].lat, data[index].lng, Math.random()]);
}
console.log(dataHeat);


var heatMap = L.heatLayer(dataHeat, {
    max: 0.5,
    radius: 50,
    gradient: {0.1: 'blue', 0.25: 'yellow', 0.5: 'red'}
});

L.easyButton({
    states: [
        {
            stateName: 'openHeat',
            icon: 'bi bi-lightbulb',
            title: 'Mostrar mapa de calor (Ver valores en la consola)',
            onClick: function(btn, map) {
                map.addLayer(heatMap);
                btn.state('closeHeat');
            }
        },
        {
            stateName: 'closeHeat',
            icon: 'bi bi-lightbulb-fill',
            title: 'Esconder mapa de calor (Ver valores en la consola)',
            onClick: function(btn, map) {
                map.removeLayer(heatMap);
                btn.state('openHeat');
            }
        }
    ],
    position: 'topright'
}).addTo(map);