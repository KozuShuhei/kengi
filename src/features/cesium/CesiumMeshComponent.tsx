import React, { useRef, useState, useEffect, CSSProperties } from 'react'
import { Ion, Viewer, Cartesian3, Math as CesiumMath, createWorldTerrainAsync, Color, Entity, ColorMaterialProperty, JulianDate, CallbackProperty, ScreenSpaceEventHandler, Cartesian2, defined, ScreenSpaceEventType, ConstantProperty } from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";
import { Slider, IconButton, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import logo from '../map/logo.png'
import { useNavigate } from 'react-router-dom';
import { RainObservatoryLegend } from '../map/consts'
import { getColorByHeight } from './CesiumUtil';

import {
  LogoImg,
  LegendContents
} from '../map/style';

const CesiumMeshComponent: React.FC = () => {
  const cesiumContainer = useRef<HTMLDivElement | null>(null);
  const viewer = useRef<Viewer | null>(null);
  const entitiesMap = useRef<{ [key: string]: Entity }>({});
  const [hoveredHeight, setHoveredHeight] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number, y: number } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkYThiN2MwYS04ODQyLTRiYjgtYmM5MS04ODU5ZDU4ZTUxNzEiLCJpZCI6MjM3Njg1LCJpYXQiOjE3MjU0MTg1MTl9.v1aYNfrpXuFzyo1D_5MUAA6Xq3OKIWGeQ5SObK1gloc';
    window.CESIUM_BASE_URL = '/Cesium/';
    
    const initializeViewer = async () => {
      // Viewerがすでに存在する場合は初期化しない
      if (!viewer.current && cesiumContainer.current) {
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

    const handler = new ScreenSpaceEventHandler(viewer.current?.scene.canvas);

    handler.setInputAction((movement: { endPosition: Cartesian2; }) => {
      const pickedObject = viewer.current?.scene.pick(movement.endPosition);

      if (defined(pickedObject) && pickedObject.id && pickedObject.id.polygon) {
        const entity = pickedObject.id as Entity;
        const extrudedHeight = entity.polygon?.extrudedHeight?.getValue(JulianDate.now()) as number;
        setHoveredHeight(extrudedHeight / 200);
        setMousePosition({ x: movement.endPosition.x, y: movement.endPosition.y });
      } else {
        setHoveredHeight(null);
      }
    }, ScreenSpaceEventType.MOUSE_MOVE);

    return () => {
      if (viewer.current) {
        viewer.current.destroy();
        viewer.current = null;
      }
    };
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
          height: 0,
        }
      });
  
      if (entity) {
        entitiesMap.current[`${feature.properties.I} ${feature.properties.J}`] = entity;
      }
    });
  };

  const convertTimeFormat = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    return `${parseInt(hours, 10)}${minutes}`;
  };

  const setEntityProperties = (entity: Entity, height: number, newHeight: number, startTime: number) => {
    const material = getColorByHeight(height);
    const startHeight = entity.polygon?.extrudedHeight?.getValue(JulianDate.now()) as number || 0;

    if (entity.polygon) {
      entity.polygon.material = new ColorMaterialProperty(material);
      //entity.polygon.extrudedHeight = new ConstantProperty(newHeight);

      animateHeightChange(entity, startHeight, newHeight, startTime);
    }
  };

  const animateHeightChange = (
    entity: Entity,
    startHeight: number,
    endHeight: number,
    startTime: number,
    duration: number = 1000
  ) => {
    const callback = new CallbackProperty(() => {
      const elapsed = performance.now() - startTime;
      const t = Math.min(elapsed / duration, 1);
      return CesiumMath.lerp(startHeight, endHeight, t);
    }, false);
  
    entity.polygon!.extrudedHeight = callback;
  
    const updateHeight = () => {
      const elapsed = performance.now() - startTime;
      const t = Math.min(elapsed / duration, 1);
  
      if (t < 1) {
        requestAnimationFrame(updateHeight); // 次のフレームで更新を続ける
      } else {
        // アニメーション完了後にCallbackPropertyをConstantPropertyに切り替える
        entity.polygon!.extrudedHeight = new ConstantProperty(endHeight);
      }
    };
  
    requestAnimationFrame(updateHeight); // 初回呼び出し
  };
  

  interface TimeSliderProps {
    onTimeChange: (time: string) => void;
  }
  const TimeSlider = ({ onTimeChange }: TimeSliderProps) => {
    const [time, setTime] = useState(9);
    const [isPlay, setIsPlay] = useState(false);
    const isManualChange = useRef(false);  // 手動変更かどうかを追跡
  
    const handleSliderChange = (event: any, newValue: number | number[]) => {
      isManualChange.current = true;  // 手動変更であることを示す
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
            if (isManualChange.current) {
              isManualChange.current = false;  // 手動変更フラグをリセット
              return prevTime;
            }
            const newTime = prevTime < 12 ? prevTime + 1 : 9;
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

  return (
    <>
      <div ref={cesiumContainer} style={{ width: '100%', height: '100vh' }}>
        <LogoImg src={logo} alt="Logo" onClick={homeLink}/>
        {hoveredHeight !== null && mousePosition && (
          <div
            style={{
              position: 'absolute',
              top: mousePosition.y + 10,
              left: mousePosition.x + 10,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              padding: '5px',
              borderRadius: '5px',
              pointerEvents: 'none',
            }}
          >
            降水量: {hoveredHeight.toFixed(2)} m
          </div>
        )}
{/* 
        <LegendContents>
          <Stack direction={'column'}>
            {
              RainObservatoryLegend.colors !== undefined && RainObservatoryLegend.colors.map((c, index) => {
                return (
                  <Stack key={index} height={18} alignItems={'center'}
                    sx={{
                      fontSize: 11,
                      px: 1,
                      backgroundColor: c.color,
                      color: '#ffffff',
                      textShadow: '1px 1px 1px rgba(30, 30, 30, 1), 1px 1px 2px rgba(30, 30, 30, 0.8), -1px 0px 1px rgba(30, 30, 30, 0.6)',
                      fontWeight: 'bold'
                    }}>
                    {c.value}
                  </Stack>
                )
              })
            }
          </Stack>
        </LegendContents> */}
        <IconContents>
          <TimeSlider onTimeChange={handleTimeChange} />
        </IconContents>
      </div>
    </>
  );
};

export default CesiumMeshComponent;
