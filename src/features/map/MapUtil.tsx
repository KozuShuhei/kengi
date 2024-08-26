//import maplibregl, { Map } from 'maplibre-gl';
import mapboxgl, { Map, Popup } from 'mapbox-gl';
import React, { useState, useEffect } from 'react';
import * as turf from '@turf/turf';
import { Feature, FeatureCollection, Geometry, Point, Polygon, GeoJsonProperties } from 'geojson';

// // Propsの型定義
// interface GeoJsonDifferenceMapProps {
//   geoJson1: FeatureCollection<Geometry>;
//   geoJson2: Feature<Geometry>;
// }

// export const GeoJsonDifferenceMap: React.FC<GeoJsonDifferenceMapProps> = ({ geoJson1, geoJson2 }) => {
//   const [differenceGeoJson, setDifferenceGeoJson] = useState<Feature<Geometry> | null>(null);
//   const [center, setCenter] = useState<Point | null>(null);

//   useEffect(() => {
//     if (geoJson1 && geoJson2) {
//       // geoJson1がFeatureCollectionである場合、最初のFeatureを取得
//       const feature1 = geoJson1.features[0] as Feature<Polygon, GeoJsonProperties>;
//       const feature2 = geoJson2 as Feature<Polygon, GeoJsonProperties>;

//       // 大きい領域から小さい領域を引いて差分を取得
//       const difference = turf.difference(feature1, feature2) as Feature<Geometry, GeoJsonProperties> | null;

//       setDifferenceGeoJson(difference as Feature<Geometry>);
//     }
//   }, [geoJson1, geoJson2]);

//   return differenceGeoJson;
// };

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

export const addPolygonDataLayer = (map: Map, layerId: string, feature: any, lineColor: string, fillColor: string, fillOpacity: number) => {
  
  map.addSource(layerId, {
    type: 'geojson',
    data: feature,
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

export const addFillExtrusionLayer = (
  map: mapboxgl.Map,
  layerId: string,
  feature: any,
  height: number,
  fillColor: string
) => {
  const polygon: GeoJSON.Feature<GeoJSON.Polygon> = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: feature.geometry.coordinates[0],
    },
    properties: {
      height: height * 200,
    },
  };

  // データキャッシュに保存
  const dataCache: { [key: string]: GeoJSON.Feature<GeoJSON.Polygon> } = {};
  dataCache[layerId] = polygon;

  // ソースの追加または更新
  if (map.getSource(layerId)) {
    const source = map.getSource(layerId) as mapboxgl.GeoJSONSource;
    source.setData(polygon);
  } else {
    map.addSource(layerId, {
      type: 'geojson',
      data: polygon,
    });
  }

  const targetHeight = polygon.properties!.height;
  const duration = 1000; // アニメーションの持続時間（ミリ秒）

  const animateHeight = (currentTime: number, startTime: number, startHeight: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const newHeight = startHeight + (targetHeight - startHeight) * progress;

    map.setPaintProperty(`${layerId}-fill`, 'fill-extrusion-height', newHeight);

    if (progress < 1) {
      requestAnimationFrame((time) => animateHeight(time, startTime, startHeight));
    }
  };

  // レイヤーが既に存在するかを確認し、存在しない場合は追加
  let startHeight = 0;

  if (map.getLayer(`${layerId}-fill`)) {
    const currentHeight = map.getPaintProperty(`${layerId}-fill`, 'fill-extrusion-height');
    if (typeof currentHeight === 'number') {
      startHeight = currentHeight;
    } else if (Array.isArray(currentHeight)) {
      startHeight = currentHeight.length > 0 ? currentHeight[0] : 0;
    }

    // もし targetHeight が 0 の場合でもアニメーションが正常に動作するように設定
    if (startHeight !== targetHeight) {
      requestAnimationFrame((time) => animateHeight(time, time, startHeight));
    }

    // ここで新しい色も設定します
    map.setPaintProperty(`${layerId}-fill`, 'fill-extrusion-color', fillColor);
  } else {
    // レイヤーが存在しない場合、新しく追加
    map.addLayer({
      id: `${layerId}-fill`,
      type: 'fill-extrusion',
      source: layerId,
      paint: {
        'fill-extrusion-color': fillColor,
        'fill-extrusion-height': 0, // 初期高さを0に設定
        'fill-extrusion-base': 0,
        'fill-extrusion-opacity': 0.6,
      },
    });

    // 初期高さを0としてアニメーション開始
    requestAnimationFrame((time) => animateHeight(time, time, 0));
  }

  // Lineレイヤーの追加
  if (!map.getLayer(`${layerId}-line`)) {
    map.addLayer({
      id: `${layerId}-line`,
      type: 'line',
      source: layerId,
      layout: {},
      paint: {
        'line-color': '#000',
        'line-width': 2,
      },
    });
  }
};

let popup: Popup | null = null;

export const addPopup = (map: Map, layerId: string, name: string) => {
  map.on('mouseenter', layerId, function (e) {
    
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

export const removeAllLayersAndSources = (map: mapboxgl.Map, startIndex: number = 85) => {
  if (!map || !map.getStyle()) {
    return;
  }
  
  // レイヤーを逆順に削除（依存関係のため）
  const layers = map.getStyle()!.layers;
  if (layers) {
    for (let i = layers.length - 1; i >= startIndex; i--) {
      const layer = layers[i];
      if (layer.id) {
        map.removeLayer(layer.id);
      }
    }
  }

  // レイヤー削除後にソースを削除
  const sources = map.getStyle()!.sources;
  for (const sourceId in sources) {
    if (sourceId.startsWith('geojson')) {
      map.removeSource(sourceId);
    }
  }
};