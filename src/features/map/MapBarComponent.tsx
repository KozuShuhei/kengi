// src/MapComponent.tsx
import React, { useRef, useState, useEffect } from 'react';
import mapboxgl, { Map } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxLanguage from '@mapbox/mapbox-gl-language';

interface PrecipitationData {
  coordinates: [number, number];
  amount: number;
}

const precipitationData: PrecipitationData[] = [
  { coordinates: [139.6917, 35.6895], amount: 400 },
  { coordinates: [139.700, 35.6895], amount: 230 },
  { coordinates: [139.703, 35.6895], amount: 190 },
  { coordinates: [139.703, 35.70], amount: 150 },
  { coordinates: [139.708, 35.6895], amount: 190 },
  { coordinates: [139.7105, 35.6895], amount: 230 },
  { coordinates: [139.7105, 35.6920], amount: 270 },
  { coordinates: [139.7105, 35.6950], amount: 300 },
  { coordinates: [139.713, 35.6895], amount: 230 },
  { coordinates: [139.713, 35.6920], amount: 270 },
  { coordinates: [139.713, 35.6950], amount: 150 },
  { coordinates: [139.7155, 35.6920], amount: 230 },
];

const MapBarComponent: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  const [zoom, setZoom] = useState<number | null>(null);
  const mapboxToken = 'pk.eyJ1Ijoic2h1aGVpa296dSIsImEiOiJjbHd5ZWFsNTgxYXFsMmpzYWdyZDlzbnp3In0.IOnweJMuRgEiaqfO47TeWw';
  
  useEffect(() => {
    if (map.current) return;
    mapboxgl.accessToken = mapboxToken;
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/shuheikozu/clyy70dzo00a201r5d0bl14bx',
      center: [139.6917, 35.6895],
      zoom: 11,
      pitch: 45,
      bearing: -17.6,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
  }, [mapboxToken]);

  return (
    <div>
      <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />
    </div>
  );
}

export default MapBarComponent;