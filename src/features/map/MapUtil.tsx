import mapboxgl, { Map } from 'mapbox-gl';

export const initializeMap = (container: HTMLDivElement, styleUrl: string, center: [number, number], zoom: number) => {
  const map = new mapboxgl.Map({
    container,
    style: styleUrl,
    center,
    zoom,
    pitch: 45,
    bearing: -17.6,
  });

  map.addControl(new mapboxgl.NavigationControl(), 'top-right');
  return map;
};

export const addPolygonLayer = (map: Map, layerId: string, coordinates: number[][], lineColor: string, fillColor: string, fillOpacity: number) => {
  const polygon: GeoJSON.Feature<GeoJSON.Polygon> = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [coordinates],
    },
    properties: {},
  };

  map.addSource(layerId, {
    type: 'geojson',
    data: polygon,
  });

  map.addLayer({
    id: `${layerId}-line`,
    type: 'line',
    source: layerId,
    layout: {},
    paint: {
      'line-color': lineColor,
      'line-width': 3,
    },
  });

  map.addLayer({
    id: `${layerId}-fill`,
    type: 'fill',
    source: layerId,
    layout: {},
    paint: {
      'fill-color': fillColor,
      'fill-opacity': fillOpacity,
    },
  });
};
