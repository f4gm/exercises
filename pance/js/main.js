// Classes
// Functions

// Mapbase
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var esriWorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var googleStreets = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

var StadiaOSMBright = L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});

var StadiaAlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});

// Layers
//  GeoJson
const corregimiento = L.geoJson(corregimiento_geoJson);
var data = [];
const sitios = L.geoJson(sitios_geoJson, {
    onEachFeature: function(feature, layer) {
        layer.bindPopup(`
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">` + feature.properties.id + `</th>
                        <td>` + feature.properties.tipo + `</td>
                        <td>` + feature.properties.nombre + `</td>
                    </tr>
                </tbody>
            </table>
        `);
    },
    pointToLayer: function(geoJsonPoint, latlng) {
        data.push(latlng);
        if (geoJsonPoint.properties.tipo == 'hostal') {
            return L.marker(latlng, {icon: L.icon.glyph({prefix: 'bi', glyph: 'bi-building'})});
        } else if (geoJsonPoint.properties.tipo == 'entretenimiento') {
            return L.marker(latlng, {icon: L.icon.glyph({prefix: 'bi', glyph: 'bi-heart-fill'})});
        }
    }
});

//  WMS
const corregimientoWMS = L.tileLayer.wms('http://ws-idesc.cali.gov.co:8081/geoserver/idesc/wms', {
    layers: 'mc_corregimientos',
    format: 'image/svg',
    styles: 'mc_corregimientos_fondo',
    transparent: true,
    CQL_FILTER: 'id_correg=53'
});

const veredasWMS = L.tileLayer.wms('http://ws-idesc.cali.gov.co:8081/geoserver/idesc/wms', {
    layers: 'mc_veredas',
    format: 'image/svg',
    transparent: true,
    CQL_FILTER: "corregimie='Pance'"
});

const prediosWMS = L.tileLayer.wms('http://ws-idesc.cali.gov.co:8081/geoserver/catastro/wms', {
    layers: 'cat_bas_construcciones',
    format: 'image/png',
    transparent: true,
    CQL_FILTER: "comuna=53",
    maxNativeZoom: 18
});