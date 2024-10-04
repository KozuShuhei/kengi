import React, { useRef, useState, useEffect, CSSProperties } from 'react'
import { Ion, Viewer, Cartesian3, Math as CesiumMath, createWorldTerrainAsync, Color, Entity, ColorMaterialProperty, JulianDate, CallbackProperty, ScreenSpaceEventHandler, ScreenSpaceEventType, defined, ConstantProperty } from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";
import { Slider, IconButton  } from '@mui/material';
import { styled } from '@mui/material/styles';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import logo from '../map/logo.png'
import { useNavigate } from 'react-router-dom';
import { getColorByHeight } from './CesiumUtil';

import {
  LogoImg,
} from '../map/style';

const CesiumMeshComponent: React.FC = () => {
  const cesiumContainer = useRef<HTMLDivElement | null>(null);
  const viewer = useRef<Viewer | null>(null);
  const entitiesMap = useRef<{ [key: string]: Entity }>({});
  const navigate = useNavigate();

  useEffect(() => {
    Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkYThiN2MwYS04ODQyLTRiYjgtYmM5MS04ODU5ZDU4ZTUxNzEiLCJpZCI6MjM3Njg1LCJpYXQiOjE3MjU0MTg1MTl9.v1aYNfrpXuFzyo1D_5MUAA6Xq3OKIWGeQ5SObK1gloc';
    window.CESIUM_BASE_URL = '/Cesium/';
    const initializeViewer = async () => {
      if (cesiumContainer.current && !viewer.current) {
        const terrainProvider = await createWorldTerrainAsync();
        viewer.current = new Viewer(cesiumContainer.current, {
          terrainProvider,
          homeButton: false,
          sceneModePicker: false,
          baseLayerPicker: false,
          geocoder: false,
          navigationHelpButton: false,
          fullscreenButton: false,
          timeline: false,
          animation: false,
        });

        viewer.current.camera.flyTo({
          destination: Cartesian3.fromDegrees(136.16932, 35.31040, 60000),
          orientation: {
            heading: CesiumMath.toRadians(0.0),
            pitch: CesiumMath.toRadians(-45.0),
          },
        });

        createNewEntity();
        updateMapLayers('9:00');
      }
    };
  
    initializeViewer();
  
  }, []);

  const updateMapLayers = async (time: string) => {
    const convertTime = convertTimeFormat(time);
  
    try {
      const response = await fetch(`/HPB_m005_199107_P_19910724${convertTime}_corrected.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responceFillExtrusion = await response.json();
      const responceFillExtrusions = Array.isArray(responceFillExtrusion)
        ? responceFillExtrusion
        : responceFillExtrusion.features;

      console.log(responceFillExtrusions)

      const startTime = performance.now();
  
      viewer.current?.entities.values.forEach((ent: any) => {
        if (ent.properties.I) {
          const I = ent.properties.I._value;
          const J = ent.properties.J._value;
  
          const target = responceFillExtrusions.find((data: any) => {
            return data.properties.I === I && data.properties.J === J;
          });
  
          if (target) {
            const height = target.data;
            const ryuuikiNo = `${I} ${J}`;
            const newHeight = height * 200;

            if (height !== null && height !== undefined) {
              const entity = entitiesMap.current[ryuuikiNo];
              if (entity) {
                setEntityProperties(entity, height, newHeight, startTime);
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('エラーです:', error);
    }
  };

  const convertTimeFormat = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    return `${parseInt(hours, 10)}${minutes}`;
  };

  const setEntityProperties = (entity: Entity, height: number, newHeight: number, startTime: number) => {
    const material = getColorByHeight(height);
  
    //const duration = 1000; // アニメーションの持続時間（ミリ秒）
  
    if (entity.polygon) {
      entity.polygon.material = new ColorMaterialProperty(material);
      entity.polygon.extrudedHeight = new ConstantProperty(newHeight);
  
      // entity.polygon.extrudedHeight = new CallbackProperty(() => {
      //   const elapsed = performance.now() - startTime;
      //   const t = Math.min(elapsed / duration, 1);
      //   const interpolatedHeight = CesiumMath.lerp(height, newHeight, t);
      //   return t < 1 ? interpolatedHeight : newHeight;
      // }, false);
    }
  };

  const createNewEntity = async () => {
    const responseMesh = await fetch('/meshinfo_SI-CAT_86067.geojson');
    const responceFillExtrusionMesh = await responseMesh.json();
    const responceFillExtrusionsMesh = Array.isArray(responceFillExtrusionMesh)
      ? responceFillExtrusionMesh
      : responceFillExtrusionMesh.features;
  
    responceFillExtrusionsMesh.forEach((feature: any) => {
      const coordinates = feature.geometry.coordinates;
  
      const polygonPositions = Cartesian3.fromDegreesArray(
        coordinates[0][0].map((coord: any) => [coord[0], coord[1]]).flat()
      );
  
      const polylinePositions = Cartesian3.fromDegreesArray(coordinates[0].flat().flat());
  
      const entity = viewer.current?.entities.add({
        polygon: {
          hierarchy: polygonPositions,
          extrudedHeight: 0,
          material: new ColorMaterialProperty(getColorByHeight(0)),
        },
        polyline: {
          positions: polylinePositions,
          width: 1,
          material: new ColorMaterialProperty(Color.fromCssColorString('#000').withAlpha(1)),
        },
        properties: {
          I: feature.properties.I,
          J: feature.properties.J,
          height: 0,  // エンティティに高さをプロパティとして追加
        }
      });
  
      if (entity) {
        entitiesMap.current[`${feature.properties.I} ${feature.properties.J}`] = entity;
      }
    });
  };

  interface TimeSliderProps {
    onTimeChange: (time: string) => void;
  }
  const TimeSlider = ({ onTimeChange }: TimeSliderProps) => {
    const [time, setTime] = useState(0);
    const [isPlay, setIsPlay] = useState(false);
  
    const handleSliderChange = (event: any, newValue: number | number[]) => {
      const formattedTime = `${Math.floor(newValue as number)}:00`;
      setTime(newValue as number);
      onTimeChange(formattedTime);
      updateMapLayers(formattedTime);
    };
  
    useEffect(() => {
      let interval: NodeJS.Timeout | null = null;
  
      if (isPlay) {
        interval = setInterval(() => {
          setTime((prevTime) => {
            const newTime = prevTime < 23 ? prevTime + 1 : 0;
            const formattedTime = `${newTime}:00`;
            onTimeChange(formattedTime);
            updateMapLayers(formattedTime);
            return newTime;
          });
        }, 2000);
      }
  
      return () => {
        if (interval) clearInterval(interval);
      };
    }, [isPlay, onTimeChange]);

    const togglePlay = () => {
      setIsPlay(!isPlay);
    };

    return (
      <>
        <IconButton onClick={togglePlay}>
          {!isPlay ? <PlayArrowIcon /> : <StopIcon />}
        </IconButton>
        <div style={{ width: '90%'}}>
          <Slider
            value={time}
            min={9}
            max={11}
            step={1}
            marks
            valueLabelDisplay="on"
            valueLabelFormat={(value) => `${value}:00`}
            onChange={handleSliderChange}
          />
        </div>
      </>
    );
  };

  const homeLink = () => {
    navigate('/')
  }

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
    zIndex: '5000',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  });

  const popupStyle: CSSProperties = {
    position: 'absolute',
    display: 'none',
    background: 'white',
    padding: '5px',
    border: '1px solid black',
  };

  const Popup = () => (
    <div id="popup" style={popupStyle}>
      {/* ポップアップの内容 */}
    </div>
  );

  return (
    <>
      <div ref={cesiumContainer} style={{ width: '100%', height: '100vh' }}>
        <LogoImg src={logo} alt="Logo" onClick={homeLink}/>
        <Popup />

        <IconContents>
          <TimeSlider onTimeChange={handleTimeChange} />
        </IconContents>
      </div>
    </>
  );
};

export default CesiumMeshComponent;