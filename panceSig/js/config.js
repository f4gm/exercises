const map = L.map('map', {
    center: [3.32668,-76.61064],
    zoom: 14,
    // zoomSnap: 0.1,
    // zoomDelta: 0.5,
    layers: [osm],
    //maxBounds: corregimiento.getBounds()
});

var baseMap = {
    'Open Streets Maps': osm,
    'Google Streets': googleStreets
};

var layers = {
    'POT – Base clasificación del suelo – Hidrografía: Ríos': base_bcs_hid_rios,
    'Catastro: Construcciones': base_cat_bas_construcciones,
    'Planeación: Corregimientos': base_mc_corregimientos,
    'Planeación: Veredas': base_mc_veredas
};


// Utilities
// Set view
L.easyButton({
    states: [{
        icon: 'bi bi-house-door-fill',
        title: 'Restaurar vista',
        onClick: function(btn, map) {
            map.setView([3.32668,-76.61064], 14);
        }
    }],
    position: 'topleft'
}).addTo(map);

// Constrol layer
var controlLayer = L.control.layers(baseMap, layers, {
    collapsed: true
}).addTo(map);

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

//  Geocoding
L.Control.geocoder({
    position: 'topleft'
}).addTo(map);

//  Scalebar
L.control.graphicScale({
    fill: 'fill',
    doubleLine: false
}).addTo(map);

// WFS
$.ajax({
    url: wfsUrl + 'typeName=sig3t2:tema_amb_eep_nacimientos&outputFormat=json',
    success: function(data) {
        var tema_amb_eep_nacimientos = L.geoJson(data, {
            onEachFeature: function(feature, layer){
                atributes(feature, layer);
            }
        });
        controlLayer.addOverlay(tema_amb_eep_nacimientos, '	POT - Ambiental - Estructura ecológica principal: Nacimientos de agua');
    }
});

$.ajax({
    url: wfsUrl + 'typeName=sig3t2:tema_bcs_hid_quebradas&outputFormat=json',
    success: function(data) {
        var tema_bcs_hid_quebradas = L.geoJson(data, {
            onEachFeature: function(feature, layer){
                atributes(feature, layer);
            }
        });
        controlLayer.addOverlay(tema_bcs_hid_quebradas, 'POT - Base clasificación del suelo - Hidrografía: Quebradas');
    }
});

$.ajax({
    url: wfsUrl + 'typeName=sig3t2:tema_obs_agua_ica&outputFormat=json',
    success: function(data) {
        var tema_obs_agua_ica = L.geoJson(data, {
            onEachFeature: function(feature, layer){
                atributes(feature, layer);
            }
        });
        controlLayer.addOverlay(tema_obs_agua_ica, 'Dagma - Agua: ICA - Indice de Calidad del Agua');
    }
});

$.ajax({
    url: wfsUrl + 'typeName=sig3t2:tema_pgirs_grs_rso_gran_generador_rural&outputFormat=json',
    success: function(data) {
        var tema_pgirs_grs_rso_gran_generador_rural = L.geoJson(data, {
            onEachFeature: function(feature, layer){
                atributes(feature, layer);
            }
        });
        controlLayer.addOverlay(tema_pgirs_grs_rso_gran_generador_rural, 'Planeación - PGIRS - Generadores Residuos Sólidos: (GRS) Residuos Sólidos Orgánicos - Gran Generador Rural');
    }
});

$.ajax({
    url: wfsUrl + 'typeName=sig3t2:temad_areas_proteccion_ambiental&outputFormat=json',
    success: function(data) {
        var temad_areas_proteccion_ambiental = L.geoJson(data, {
            onEachFeature: function(feature, layer){
                atributes(feature, layer);
            }
        });
        controlLayer.addOverlay(temad_areas_proteccion_ambiental, 'Áreas de protección ambiental');
    }
});

$.ajax({
    url: wfsUrl + 'typeName=sig3t2:temad_corredor_verde&outputFormat=json',
    success: function(data) {
        var temad_corredor_verde = L.geoJson(data, {
            onEachFeature: function(feature, layer){
                atributes(feature, layer);
            }
        });
        controlLayer.addOverlay(temad_corredor_verde, 'Corredor Verde');
    }
});

$.ajax({
    url: wfsUrl + 'typeName=sig3t2:temad_punto_interes&outputFormat=json',
    success: function(data) {
        var temad_punto_interes = L.geoJson(data, {
            onEachFeature: function(feature, layer){
                atributes(feature, layer);
            }
        });
        controlLayer.addOverlay(temad_punto_interes, 'Sitios de interés');
    }
});
