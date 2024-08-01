//import maplibregl, { Map } from 'maplibre-gl';
import mapboxgl, { Map, Popup } from 'mapbox-gl';
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

let popup: Popup | null = null;

export const addPopup = (map: Map, layerId: string, name: string) => {
  map.on('mouseenter', layerId, function (e) {
    // マウスポインタの形を変える
    map.getCanvas().style.cursor = 'pointer';
    
    // 既存のポップアップがあれば削除
    if (popup) {
      popup.remove();
    }

    // ポップアップの作成と設定
    popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    })
    .setLngLat((e as mapboxgl.MapMouseEvent).lngLat)
    .setHTML(`<strong>${name}</strong>`)
    .addTo(map);
  });

  map.on('mouseleave', `${layerId}-fill`, function () {
    map.getCanvas().style.cursor = '';
    if (popup) {
      popup.remove();
      popup = null;
    }
  });
}

export const removeAllLayersAndSources = (map: mapboxgl.Map) => {
  if (!map || !map.getStyle()) {
    return;
  }

  // レイヤーを逆順に削除（依存関係のため）
  const layers = map.getStyle()!.layers;
  if (layers) {
    for (let i = layers.length - 1; i >= 0; i--) {
      const layer = layers[i];
      if (layer.id) {
        map.removeLayer(layer.id);
      }
    }
  }
};