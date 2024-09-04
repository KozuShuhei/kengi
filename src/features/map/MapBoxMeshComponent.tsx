// src/MapComponent.tsx
import React, { useRef, useState, useEffect } from 'react';
//import maplibregl, { Map, MapGeoJSONFeature } from 'maplibre-gl';
import { styled } from '@mui/material/styles';
import mapboxgl, { Map } from 'mapbox-gl';
import { addFillExtrusionLayer, addPolygonDataLayer, removeAllLayersAndSources } from './MapUtil';
import { Slider } from '@mui/material';

const MapBarComponent: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("900");
  const mapboxToken = 'pk.eyJ1Ijoic2h1aGVpa296dSIsImEiOiJjbHd5ZWFsNTgxYXFsMmpzYWdyZDlzbnp3In0.IOnweJMuRgEiaqfO47TeWw';

  useEffect(() => {
    if (map.current) return;

    const initialize = async () => {
      mapboxgl.accessToken = mapboxToken;
      map.current = new mapboxgl.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/shuheikozu/clx8mo1gm01m901rba20pdd6l',
        center: [136.46932, 35.91040],
        zoom: 9,
        pitch: 45,
        bearing: -17.6,
      });

      map.current.on('load', () => {
        updateMapLayers(selectedTime);
      });
    }
    initialize();
  }, []);

  const updateMapLayers = async (time: string) => {
    const response = await fetch(`/HPB_m005_199107_P_19910724${time}_corrected.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responceFillExtrusion = await response.json();
    const responceFillExtrusions = Array.isArray(responceFillExtrusion) ? responceFillExtrusion : responceFillExtrusion.features;

    if (!map.current!.getSource('meshinfo_SI')) {
      try{
        const response = await fetch('/meshinfo_SI-CAT_86067.geojson');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const geojson: GeoJSON.FeatureCollection = await response.json();
        
        const features = Array.isArray(geojson) ? geojson : geojson.features;
        features.forEach((feature: any) => {
          const layerNameI = feature.properties.I
          const layerNameJ = feature.properties.J
          const layerId = 'geojson-layer-' + layerNameI + layerNameJ;
          // if (map.current!.getSource(layerId)) {
          //   addPolygonDataLayer(map.current!, layerId, feature, '#f0e68c', '#f0e68c', 0.4)
          // }
          const targetHeight = responceFillExtrusions.find((data:any) => data.properties.I === layerNameI && data.properties.J === layerNameJ).data

          if(targetHeight > 80){
            addFillExtrusionLayer(map.current!, layerId, feature, targetHeight, '#c7408e')
          } else if(targetHeight > 50){
            addFillExtrusionLayer(map.current!, layerId, feature, targetHeight, '#ff5e40')
          } else if(targetHeight > 30){
            addFillExtrusionLayer(map.current!, layerId, feature, targetHeight, '#ffb340')
          } else if(targetHeight > 20){
            addFillExtrusionLayer(map.current!, layerId, feature, targetHeight, '#fff840')
          } else if(targetHeight > 10){
            addFillExtrusionLayer(map.current!, layerId, feature, targetHeight, '#4071ff')
          } else if(targetHeight > 5){
            addFillExtrusionLayer(map.current!, layerId, feature, targetHeight, '#59a9ff')
          } else if(targetHeight !== 0){
            addFillExtrusionLayer(map.current!, layerId, feature, targetHeight, '#b8deff')
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  };

  const TimeSlider = ({ onTimeChange }: { onTimeChange: (time: string) => void }) => {
    const [time, setTime] = useState(9);
  
    const handleSliderChange = (event: any, newValue: number | number[]) => {
      const Time = `${Math.floor(newValue as number)}:00`
      setTime(newValue as number);
      const formattedTime = formatTime(newValue as number);
      onTimeChange(Time);
      updateMapLayers(formattedTime)
    };
  
    const formatTime = (value: number) => {
      return `${Math.floor(value)}00`;
    };
  
    return (
      <Slider
        value={time}
        min={9}
        max={11}
        step={1}
        marks
        valueLabelDisplay="auto"
        valueLabelFormat={formatTime}
        onChange={handleSliderChange}
      />
    );
  };

  const handleTimeChange = (time: string) => {
    console.log("Selected Time: ", time);
  };

  const IconContents = styled('div')({
    position: 'absolute',
    bottom: '50px',
    textAlign: 'center',
    width: '80%',
    margin: '10% 10% 0 10%',
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '10px',
    border: '1px solid gray',
    zIndex: '1000',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  });

  return (
    <div style={{ display: 'flex'}}>
      <link href='https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.css' rel='stylesheet' />
      <div ref={mapContainer} style={{ width: '100%', height: '100vh', position: 'relative' }}>
        <IconContents>
          <TimeSlider onTimeChange={handleTimeChange} />
        </IconContents>
      </div>
    </div>
  );
}

export default MapBarComponent;
