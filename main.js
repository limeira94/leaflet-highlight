// Mapa Principal
const map = L.map('map').setView([-15.7801, -47.9292], 4);

// Tile Layer do Mapa Principal
const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Estilo para os países no mapa principal
function style(feature) {
    return {
        fillColor: 'gray',
        weight: 1,
        opacity: 1,
        color: 'black',
        fillOpacity: 0.4
    };
}

// Destaque de país no mapa principal
function highlightFeature(e) {
    const layer = e.target;
    layer.setStyle({
        weight: 5,
        color: 'yellow',
        fillColor: 'yellow',
        dashArray: '',
        fillOpacity: 0.7
    });
}

// Resetar estilo no mapa principal
function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

// Zoom no país no mapa principal
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds(), { padding: [50, 50] });
}

// Eventos em cada feature no mapa principal
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

// Adiciona GeoJSON ao Mapa Principal
let geojson;
fetch('data/south-america.geojson')
    .then(response => response.json())
    .then(data => {
        geojson = L.geoJson(data, {
            style: style,
            onEachFeature: onEachFeature
        }).addTo(map);
    })
    .catch(error => {
        console.error('Erro ao carregar o GeoJSON no Mapa Principal:', error);
    });

// MiniMap Manual
const miniMap = L.map('miniMap', {
    attributionControl: false,
    zoomControl: false,
    dragging: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    keyboard: false,
    tap: false,
    touchZoom: true
}).setView([-15.7801, -47.9292], 2);

// Tile Layer do MiniMap
const miniTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(miniMap);

// Estilo para os países no minimap
function miniStyle(feature) {
    return {
        fillColor: 'gray',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.7
    };
}

// Destaque de país no minimap
function miniHighlightFeature(e) {
    const layer = e.target;
    layer.setStyle({
        weight: 5,
        color: 'yellow',
        fillColor: 'yellow',
        dashArray: '',
        fillOpacity: 0.7
    });
}

// Resetar estilo no minimap
function miniResetHighlight(e) {
    miniGeojson.resetStyle(e.target);
}

// Zoom no país a partir do minimap
function miniZoomToFeature(e) {
    map.fitBounds(e.target.getBounds(), { padding: [50, 50] });
}

// Eventos em cada feature no minimap
function miniOnEachFeature(feature, layer) {
    layer.on({
        mouseover: miniHighlightFeature,
        mouseout: miniResetHighlight,
        click: miniZoomToFeature
    });
}

// Adiciona GeoJSON ao MiniMap
let miniGeojson;
fetch('data/south-america.geojson')
    .then(response => response.json())
    .then(data => {
        miniGeojson = L.geoJson(data, {
            style: miniStyle,
            onEachFeature: miniOnEachFeature
        }).addTo(miniMap);
    })
    .catch(error => {
        console.error('Erro ao carregar o GeoJSON no MiniMap:', error);
    });

// Sincroniza o MiniMap com o Mapa Principal
map.on('moveend', function() {
    miniMap.setView(map.getCenter(), 2); // Ajuste o nível de zoom conforme necessário
});
