// // src/MapComponent.tsx
// import React, { useRef, useState, useEffect } from 'react';
// import mapboxgl, { Map } from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import MapboxLanguage from '@mapbox/mapbox-gl-language';

// interface PrecipitationData {
//   coordinates: [number, number];
//   amount: number;
// }

// const precipitationData: PrecipitationData[] = [
//   { coordinates: [139.6917, 35.6895], amount: 400 },
//   { coordinates: [139.700, 35.6895], amount: 230 },
//   { coordinates: [139.703, 35.6895], amount: 190 },
//   { coordinates: [139.703, 35.70], amount: 150 },
//   { coordinates: [139.708, 35.6895], amount: 190 },
//   { coordinates: [139.7105, 35.6895], amount: 230 },
//   { coordinates: [139.7105, 35.6920], amount: 270 },
//   { coordinates: [139.7105, 35.6950], amount: 300 },
//   { coordinates: [139.713, 35.6895], amount: 230 },
//   { coordinates: [139.713, 35.6920], amount: 270 },
//   { coordinates: [139.713, 35.6950], amount: 150 },
//   { coordinates: [139.7155, 35.6920], amount: 230 },
// ];

// const MapBarComponent: React.FC = () => {
//   const mapContainer = useRef<HTMLDivElement | null>(null);
//   const map = useRef<Map | null>(null);
//   const [zoom, setZoom] = useState<number | null>(null);
//   const mapboxToken = 'pk.eyJ1Ijoic2h1aGVpa296dSIsImEiOiJjbHd5ZWFsNTgxYXFsMmpzYWdyZDlzbnp3In0.IOnweJMuRgEiaqfO47TeWw';
  
//   useEffect(() => {
//     if (map.current) return;
//     mapboxgl.accessToken = mapboxToken;
//     map.current = new mapboxgl.Map({
//       container: mapContainer.current!,
//       style: 'mapbox://styles/shuheikozu/clx8mo1gm01m901rba20pdd6l',
//       center: [139.6917, 35.6895],
//       zoom: 11,
//       pitch: 45,
//       bearing: -17.6,
//     });

//     map.current.addControl(new MapboxLanguage({
//       defaultLanguage: 'ja'
//     }));

//     map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

//     map.current.on('load', () => {
//       precipitationData.forEach((data) => {
//         const { coordinates, amount } = data;

//         const barHeight = amount * 10;
//         const polygon = [
//           [
//             [coordinates[0] - 0.001, coordinates[1] - 0.001],
//             [coordinates[0] + 0.001, coordinates[1] - 0.001],
//             [coordinates[0] + 0.001, coordinates[1] + 0.001],
//             [coordinates[0] - 0.001, coordinates[1] + 0.001],
//             [coordinates[0] - 0.001, coordinates[1] - 0.001]
//           ]
//         ];

//         map.current!.addLayer({
//           'id': `precipitation-bar-${coordinates.join('-')}`,
//           'type': 'fill-extrusion',
//           'source': {
//             'type': 'geojson',
//             'data': {
//               'type': 'Feature',
//               'geometry': {
//                 'type': 'Polygon',
//                 'coordinates': polygon
//               },
//               'properties': {
//                 'height': barHeight,
//               }
//             }
//           },
//           'paint': {
//             'fill-extrusion-color': '#0000ff',
//             'fill-extrusion-height': [
//               'interpolate',
//               ['linear'],
//               ['zoom'],
//               10, ['/', ['get', 'height'], 5],
//               15, ['*', ['get', 'height'], 5]
//             ],
//             'fill-extrusion-base': 1,
//             'fill-extrusion-opacity': 0.9
//           }
//         });
//       });
//     });

//     map.current.on('zoom', () => {
//       setZoom(map.current!.getZoom());
//     });
//   }, [mapboxToken]);

//   useEffect(() => {
//     console.log(zoom);
//   }, [zoom]);

//   return (
//     <div>
//       <div ref={mapContainer} style={{ width: '100%', height: '600px' }} />
//     </div>
//   );
// }

// export default MapBarComponent;
export {}