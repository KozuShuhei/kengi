// // src/MapComponent.tsx
// import React, { useRef, useState, useEffect } from 'react';
// import mapboxgl, { Map, MapboxGeoJSONFeature, GeoJSONSourceRaw } from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import SearchRainfallData from '../search/SearchRainfallData'
// import LineComponent from '../lineGraph/LineComponent';

// interface PointData {
//   name: string;
//   coordinates: [number, number];
//   amount: number;
// }

// const pointData: PointData[] = [
//   { name: '長尾川', coordinates: [138.4165888, 35.060], amount: 400 },
//   { name: '平山', coordinates: [138.42212194444446, 35.06002897813725], amount: 230 },
//   { name: '北沼上', coordinates: [138.4165825, 35.02869291607192], amount: 190 },
//   { name: '梅ヶ谷', coordinates: [138.443591, 35.050076], amount: 150 },
//   { name: '田ヶ谷', coordinates: [138.42356751, 35.03476669], amount: 190 },
// ];

// const pointTestData = pointData.filter(data => data.amount >= 300);
// const pointMainData = pointData.filter(data => data.amount < 300);

// const MapRasterComponent: React.FC = () => {
//   const mapContainer = useRef<HTMLDivElement | null>(null);
//   const map = useRef<Map | null>(null);
//   const mapboxToken = 'pk.eyJ1Ijoic2h1aGVpa296dSIsImEiOiJjbHd5ZWFsNTgxYXFsMmpzYWdyZDlzbnp3In0.IOnweJMuRgEiaqfO47TeWw';
//   const time = new Date();
//   const [changeWidth, setChangeWidth] = useState<string>('100%');
//   const [selectedPoint, setSelectedPoint] = useState<MapboxGeoJSONFeature | null>(null);
//   const [openLine, setOpenLine] = useState<boolean>(false);
//   const sunlightHours = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

//   useEffect(() => {
//     if (map.current) return;

//     const hour = time.getHours();
//     const isSunlightHours = sunlightHours.includes(hour)
//       ? 'mapbox://styles/shuheikozu/clx8mo1gm01m901rba20pdd6l'
//       : 'mapbox://styles/mapbox/dark-v8';

//     mapboxgl.accessToken = mapboxToken;
//     map.current = new mapboxgl.Map({
//       container: mapContainer.current!,
//       style: isSunlightHours,
//       center: [138.44942, 35.05883],
//       zoom: 13,
//       pitch: 45,
//       bearing: -17.6,
//     });

//     map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

//     map.current.on('load', () => {
//       const rainCoordinates: number[][] = [
//         [ 138.43247, 35.06202 ], [ 138.43416, 35.06184 ], [ 138.43499, 35.06131 ], [ 138.44038, 35.06017 ], [ 138.44298, 35.06042 ], [ 138.44372, 35.05971 ], [ 138.44477, 35.05975 ], [ 138.44584, 35.05907 ], [ 138.44794, 35.05922 ], [ 138.44942, 35.05883 ], [ 138.4501, 35.05901 ], [ 138.45072, 35.05987 ], [ 138.4519, 35.06059 ], [ 138.45286, 35.06186 ], [ 138.45564, 35.0635 ], [ 138.459, 35.06349 ], [ 138.45944, 35.06424 ], [ 138.4616, 35.06393 ], [ 138.46202, 35.06312 ], [ 138.46313, 35.06246 ], [ 138.46414, 35.0598 ], [ 138.46457, 35.0585 ], [ 138.46448, 35.05759 ], [ 138.46512, 35.05369 ], [ 138.46591, 35.05388 ], [ 138.46615, 35.05227 ], [ 138.46554, 35.05119 ], [ 138.46553, 35.04921 ], [ 138.46578, 35.0485 ], [ 138.46577, 35.04663 ], [ 138.46536, 35.04607 ], [ 138.46552, 35.04529 ], [ 138.46712, 35.04265 ], [ 138.46819, 35.04227 ], [ 138.46937, 35.04274 ], [ 138.47036, 35.04358 ], [ 138.47212, 35.04423 ], [ 138.4731, 35.04235 ], [ 138.47413, 35.04202 ], [ 138.47499, 35.04169 ], [ 138.47569, 35.04121 ], [ 138.47655, 35.04044 ], [ 138.47825, 35.0391 ], [ 138.4793, 35.0391 ], [ 138.47993, 35.03883 ], [ 138.48175, 35.03625 ], [ 138.48132, 35.03522 ], [ 138.48084, 35.03442 ], [ 138.48232, 35.03436 ], [ 138.48371, 35.03433 ], [ 138.48284, 35.03144 ], [ 138.48086, 35.03113 ], [ 138.48059, 35.0311 ], [ 138.48018, 35.03051 ], [ 138.47864, 35.03006 ], [ 138.47949, 35.02807 ], [ 138.47973, 35.02386 ], [ 138.48904, 35.02353 ], [ 138.48907, 35.02401 ], [ 138.4892, 35.02498 ], [ 138.49057, 35.02477 ], [ 138.49027, 35.02348 ], [ 138.49027, 35.02237 ], [ 138.49087, 35.02234 ], [ 138.4909, 35.01929 ], [ 138.49215, 35.0194 ], [ 138.49277, 35.01931 ], [ 138.49351, 35.01775 ], [ 138.49566, 35.01681 ], [ 138.49578, 35.01452 ], [ 138.49581, 35.01228 ], [ 138.49649, 35.0116 ], [ 138.49611, 35.01136 ], [ 138.49466, 35.01277 ], [ 138.49456, 35.0128 ], [ 138.4926, 35.01271 ], [ 138.49295, 35.01216 ], [ 138.49345, 35.01159 ], [ 138.49372, 35.01136 ], [ 138.49372, 35.01132 ], [ 138.49373, 35.01121 ], [ 138.49365, 35.01122 ], [ 138.4935, 35.0112 ], [ 138.49341, 35.01113 ], [ 138.49337, 35.01106 ], [ 138.49381, 35.01012 ], [ 138.49399, 35.01 ], [ 138.49411, 35.01002 ], [ 138.49454, 35.01069 ], [ 138.49553, 35.01031 ], [ 138.4955, 35.01025 ], [ 138.49546, 35.01026 ], [ 138.49501, 35.00943 ], [ 138.49517, 35.00908 ], [ 138.49475, 35.00891 ], [ 138.49495, 35.00855 ], [ 138.49539, 35.00846 ], [ 138.49541, 35.0085 ], [ 138.49547, 35.00849 ], [ 138.49624, 35.00983 ], [ 138.49714, 35.00984 ], [ 138.49716, 35.01023 ], [ 138.49725, 35.01023 ], [ 138.49725, 35.00881 ], [ 138.49729, 35.00556 ], [ 138.4973, 35.00432 ], [ 138.49731, 35.00381 ], [ 138.49731, 35.00325 ], [ 138.49744, 35.00231 ], [ 138.49734, 35.001 ], [ 138.49713, 35.00079 ], [ 138.49726, 35.00043 ], [ 138.49744, 34.99932 ], [ 138.49739, 34.99861 ], [ 138.49709, 34.99747 ], [ 138.49414, 34.99775 ], [ 138.49416, 34.99494 ], [ 138.49477, 34.99444 ], [ 138.49334, 34.9943 ], [ 138.49243, 34.99387 ], [ 138.49154, 34.9938 ], [ 138.49093, 34.99519 ], [ 138.49022, 34.99553 ], [ 138.48913, 34.99507 ], [ 138.4867, 34.99739 ], [ 138.48208, 34.99545 ], [ 138.47863, 34.99768 ], [ 138.47856, 34.99219 ], [ 138.47859, 34.99191 ], [ 138.47889, 34.99158 ], [ 138.47902, 34.99128 ], [ 138.47932, 34.98968 ], [ 138.47916, 34.98919 ], [ 138.4782, 34.98932 ], [ 138.47768, 34.98871 ], [ 138.47626, 34.98851 ], [ 138.47555, 34.9879 ], [ 138.47355, 34.9876 ], [ 138.47081, 34.98547 ], [ 138.4698, 34.98415 ], [ 138.46702, 34.98374 ], [ 138.46619, 34.9822 ], [ 138.46576, 34.98014 ], [ 138.46622, 34.97844 ], [ 138.46612, 34.97507 ], [ 138.46606, 34.97339 ], [ 138.46526, 34.97352 ], [ 138.463, 34.97118 ], [ 138.46231, 34.9711 ], [ 138.46157, 34.9689 ], [ 138.45889, 34.96915 ], [ 138.4587, 34.96671 ], [ 138.45756, 34.96646 ], [ 138.45578, 34.96666 ], [ 138.45507, 34.96509 ], [ 138.45485, 34.96395 ], [ 138.45291, 34.96479 ], [ 138.45215, 34.9642 ], [ 138.45218, 34.9624 ], [ 138.45131, 34.96215 ], [ 138.45079, 34.96195 ], [ 138.45088, 34.96121 ], [ 138.4502, 34.96103 ], [ 138.45024, 34.96037 ], [ 138.44777, 34.96045 ], [ 138.44552, 34.95964 ], [ 138.44451, 34.95867 ], [ 138.44439, 34.95743 ], [ 138.44211, 34.95542 ], [ 138.4414, 34.95489 ], [ 138.43989, 34.95494 ], [ 138.43946, 34.95377 ], [ 138.43703, 34.95309 ], [ 138.4357, 34.95251 ], [ 138.43245, 34.9515 ], [ 138.43076, 34.9514 ], [ 138.42936, 34.95058 ], [ 138.42832, 34.9489 ], [ 138.42837, 34.94728 ], [ 138.4276, 34.94709 ], [ 138.42693, 34.94677 ], [ 138.42641, 34.94658 ], [ 138.42374, 34.94675 ], [ 138.42329, 34.94781 ], [ 138.42246, 34.94798 ], [ 138.42002, 34.94765 ], [ 138.41889, 34.94728 ], [ 138.4176, 34.94706 ], [ 138.417, 34.94691 ], [ 138.41665, 34.94723 ], [ 138.41678, 34.94785 ], [ 138.41587, 34.94843 ], [ 138.41507, 34.94845 ], [ 138.4147, 34.94811 ], [ 138.41446, 34.94835 ], [ 138.41417, 34.94869 ], [ 138.41394, 34.94887 ], [ 138.41374, 34.94913 ], [ 138.41341, 34.94939 ], [ 138.41323, 34.94957 ], [ 138.41253, 34.95018 ], [ 138.4146, 34.95154 ], [ 138.41202, 34.95416 ], [ 138.41253, 34.95474 ], [ 138.41519, 34.9566 ], [ 138.41706, 34.9579 ], [ 138.41811, 34.95904 ], [ 138.41696, 34.95888 ], [ 138.41454, 34.96098 ], [ 138.41501, 34.96152 ], [ 138.41423, 34.96216 ], [ 138.4138, 34.96196 ], [ 138.41343, 34.96206 ], [ 138.41226, 34.96331 ], [ 138.41119, 34.96447 ], [ 138.41098, 34.96449 ], [ 138.40949, 34.96357 ], [ 138.40727, 34.96597 ], [ 138.40648, 34.96639 ], [ 138.40466, 34.96779 ], [ 138.40242, 34.96981 ], [ 138.40147, 34.97036 ], [ 138.40034, 34.97031 ], [ 138.3993, 34.971 ], [ 138.39744, 34.97121 ], [ 138.39573, 34.97239 ], [ 138.39508, 34.97306 ], [ 138.39427, 34.97404 ], [ 138.39362, 34.97474 ], [ 138.39149, 34.97712 ], [ 138.38965, 34.97826 ], [ 138.38819, 34.97933 ], [ 138.38761, 34.97998 ], [ 138.38685, 34.97751 ], [ 138.38604, 34.9757 ], [ 138.38541, 34.97498 ], [ 138.37765, 34.9781 ], [ 138.37584, 34.9807 ], [ 138.37505, 34.98312 ], [ 138.3745, 34.98444 ], [ 138.37484, 34.98518 ], [ 138.37472, 34.98688 ], [ 138.37385, 34.98937 ], [ 138.37345, 34.99209 ], [ 138.37364, 34.99379 ], [ 138.3749, 34.99493 ], [ 138.37367, 34.99724 ], [ 138.37419, 35.00041 ], [ 138.37558, 35.00156 ], [ 138.37607, 35.00325 ], [ 138.37609, 35.00325 ], [ 138.37634, 35.00365 ], [ 138.37634, 35.00529 ], [ 138.37758, 35.00605 ], [ 138.37774, 35.0075 ], [ 138.3783, 35.00846 ], [ 138.38034, 35.00942 ], [ 138.3804, 35.01018 ], [ 138.38031, 35.01061 ], [ 138.37954, 35.01213 ], [ 138.38017, 35.01309 ], [ 138.37964, 35.01451 ], [ 138.38068, 35.01831 ], [ 138.3804, 35.01965 ], [ 138.38124, 35.0211 ], [ 138.38232, 35.02213 ], [ 138.38307, 35.02444 ], [ 138.38289, 35.02692 ], [ 138.38497, 35.02872 ], [ 138.38494, 35.02968 ], [ 138.3846, 35.03039 ], [ 138.38467, 35.03297 ], [ 138.38656, 35.0334 ], [ 138.38721, 35.03505 ], [ 138.38737, 35.03654 ], [ 138.38845, 35.03907 ], [ 138.38809, 35.04014 ], [ 138.38963, 35.04099 ], [ 138.3889, 35.04269 ], [ 138.38891, 35.04548 ], [ 138.39058, 35.0469 ], [ 138.39049, 35.04773 ], [ 138.39183, 35.05173 ], [ 138.39254, 35.05262 ], [ 138.3926, 35.0536 ], [ 138.39502, 35.05686 ], [ 138.39663, 35.05919 ], [ 138.39507, 35.06272 ], [ 138.39541, 35.0636 ], [ 138.39526, 35.06472 ], [ 138.3957, 35.06639 ], [ 138.39512, 35.06802 ], [ 138.39556, 35.06943 ], [ 138.39664, 35.07065 ], [ 138.39751, 35.07434 ], [ 138.40002, 35.07803 ], [ 138.40025, 35.08115 ], [ 138.40137, 35.08332 ], [ 138.4014, 35.08373 ], [ 138.401, 35.08434 ], [ 138.40156, 35.08528 ], [ 138.4028, 35.08658 ], [ 138.4028, 35.08658 ], [ 138.40366, 35.08834 ], [ 138.40344, 35.08938 ], [ 138.40625, 35.08936 ], [ 138.40943, 35.09121 ], [ 138.41146, 35.09299 ], [ 138.4164, 35.09383 ], [ 138.41724, 35.09239 ], [ 138.41925, 35.09114 ], [ 138.41978, 35.08983 ], [ 138.4212, 35.08846 ], [ 138.42167, 35.08658 ], [ 138.42156, 35.08658 ], [ 138.42211, 35.08574 ], [ 138.4276, 35.08374 ], [ 138.4295, 35.08184 ], [ 138.43338, 35.07934 ], [ 138.43483, 35.07934 ], [ 138.43486, 35.07827 ], [ 138.43602, 35.07627 ], [ 138.435, 35.07546 ], [ 138.43426, 35.07422 ], [ 138.43385, 35.07299 ], [ 138.43243, 35.07205 ], [ 138.43094, 35.06973 ], [ 138.43319, 35.06734 ], [ 138.43331, 35.06554 ], [ 138.43246, 35.06331 ], [ 138.43247, 35.06202 ]
//       ];

//       const rainPolygon: GeoJSON.Feature<GeoJSON.Polygon> = {
//         type: 'Feature',
//         geometry: {
//           type: 'Polygon',
//           coordinates: [rainCoordinates],
//         },
//         properties: {},
//       };

//       map.current!.addSource('rain-polygon', {
//         type: 'geojson',
//         data: rainPolygon,
//       });

//       map.current!.addLayer({
//         id: 'rain-layer',
//         type: 'line',
//         source: 'rain-polygon',
//         layout: {},
//         paint: {
//           'line-color': '#22ff00',
//           'line-width': 3,
//         },
//       });

//       map.current!.on('click', 'rain-layer', function (e) {
//         map.current!.jumpTo({
//           center: [138.43416, 35.06184],
//           zoom: 13,
//         });
//         new mapboxgl.Popup()
//           .setLngLat(e.lngLat)
//           .setHTML('<h3>Rain Polygon</h3><p>You clicked on the rain polygon!</p>')
//           .addTo(map.current!);
//       });

//       // Change cursor to pointer when hovering over the rain layer
//       map.current!.on('mouseenter', 'rain-layer', function () {
//         map.current!.getCanvas().style.cursor = 'pointer';
//       });

//       map.current!.on('mouseleave', 'rain-layer', function () {
//         map.current!.getCanvas().style.cursor = '';
//       });

//       const mainGeojsonData: GeoJSON.FeatureCollection<GeoJSON.Point> = {
//         type: 'FeatureCollection',
//         features: pointMainData.map(data => ({
//           type: 'Feature',
//           geometry: {
//             type: 'Point',
//             coordinates: data.coordinates,
//           },
//           properties: {
//             amount: data.amount,
//             name: data.name,
//           },
//         })),
//       };

//       const testGeojsonData: GeoJSON.FeatureCollection<GeoJSON.Point> = {
//         type: 'FeatureCollection',
//         features: pointTestData.map(data => ({
//           type: 'Feature',
//           geometry: {
//             type: 'Point',
//             coordinates: data.coordinates,
//           },
//           properties: {
//             amount: data.amount,
//             name: data.name,
//           },
//         })),
//       };

//       map.current!.addSource('points-main', {
//         type: 'geojson',
//         data: mainGeojsonData,
//       });

//       map.current!.addSource('points-test', {
//         type: 'geojson',
//         data: testGeojsonData,
//       });

//       map.current!.addLayer({
//         id: 'points-main',
//         type: 'circle',
//         source: 'points-main',
//         paint: {
//           'circle-radius': 6,
//           'circle-color': '#FF5722',
//           'circle-stroke-width': 2,
//           'circle-stroke-color': '#FFFFFF',
//         },
//       });

//       map.current!.addLayer({
//         id: 'points-test',
//         type: 'circle',
//         source: 'points-test',
//         paint: {
//           'circle-radius': 6,
//           'circle-color': '#FF5722',
//           'circle-stroke-width': 2,
//           'circle-stroke-color': '#FFFFFF',
//         },
//       });

//       map.current!.on('mouseenter', 'points-main', () => {
//         map.current!.setPaintProperty('points-main', 'circle-color', '#0000FF');
//         map.current!.getCanvas().style.cursor = 'pointer';
//       });

//       map.current!.on('mouseleave', 'points-main', () => {
//         map.current!.setPaintProperty('points-main', 'circle-color', '#FF5722');
//         map.current!.getCanvas().style.cursor = '';
//       });

//       map.current!.on('mouseenter', 'points-test', () => {
//         map.current!.setPaintProperty('points-test', 'circle-color', '#0000FF');
//         map.current!.getCanvas().style.cursor = 'pointer';
//       });

//       map.current!.on('mouseleave', 'points-test', () => {
//         map.current!.setPaintProperty('points-test', 'circle-color', '#FF5722');
//         map.current!.getCanvas().style.cursor = '';
//       });

//       map.current!.on('click', 'points-main', (e) => {
//         setOpenLine(true);
//         setSelectedPoint(e.features![0]);
//         setChangeWidth('60%');
//       });

//       map.current!.on('click', 'points-test', (e) => {
//         setOpenLine(true);
//         setSelectedPoint(e.features![0]);
//         setChangeWidth('60%');
//       });
//     });
//   }, []);

//   useEffect(() => {
//     if (selectedPoint && selectedPoint.geometry.type === 'Point') {
//       const coordinates: [number, number] = [selectedPoint.geometry.coordinates[0], selectedPoint.geometry.coordinates[1]];
//       map.current!.resize();
//       map.current!.flyTo({ center: coordinates });
//     }
//   }, [changeWidth, selectedPoint]);

//   const closeLine = () => {
//     setOpenLine(false);
//     setChangeWidth('100%');
//   };

//   const selectedPlaces = selectedPoint?.properties?.name || '';

//   return (
//     <div style={{ display: 'flex'}}>
//       <div ref={mapContainer} style={{ width: changeWidth, height: '550px' }} />
//       {openLine &&
//         <div style={{width: '40%', height: '100%'}}>
//           <SearchRainfallData selectedPlaces={selectedPlaces} closeLine={closeLine} />
//         </div>
//       }
//     </div>
//   );
// };

// export default MapRasterComponent;
export {}