import React, { useEffect, useRef, useState } from 'react';
import { Ion, Viewer, Cartesian3, Math as CesiumMath, createOsmBuildingsAsync, createWorldTerrainAsync, buildModuleUrl, Color, ColorMaterialProperty  } from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";
import logo from '../map/logo.png'
import { useNavigate } from 'react-router-dom';
import SearchRainfallData from '../search/SearchRainfallData';
import SeachClimateChangePrediction from '../search/SeachClimateChangePrediction';
import { Button, Dialog, DialogActions, DialogContent, FormControlLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, Typography } from '@mui/material'

import {
  LogoImg,
  SelectPlaceName,
  CloseButton,
  SelectedText,
  ExplanationText,
  SelectButton,
  SearchContents,
  SearchButton,
  TestContents,
  FutureSearchButton,
  IconContents,
  IconWrapper,
  Popup,
  SplitscreenIcon,
  StorageIcon,
  LogoutIcon,
} from './style';

const CesiumMapComponent: React.FC = () => {
  const cesiumContainer = useRef<HTMLDivElement | null>(null);
  const viewer = useRef<Viewer | null>(null);
  const navigate = useNavigate();
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);
  const [mapWidth, setMapWidth] = useState<string>('100%');
  const [openRainfall, setopenRainfall] = useState<boolean>(false);
  const [openClimateChangePrediction, setopenClimateChangePrediction] = useState<boolean>(false);
  const [draftDialog, setDraftDialog] = useState<boolean>(false)
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
  const [draftItems, setDraftItems] = useState<String[]>([])
  
  useEffect(() => {
  
    Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkYThiN2MwYS04ODQyLTRiYjgtYmM5MS04ODU5ZDU4ZTUxNzEiLCJpZCI6MjM3Njg1LCJpYXQiOjE3MjU0MTg1MTl9.v1aYNfrpXuFzyo1D_5MUAA6Xq3OKIWGeQ5SObK1gloc';
    window.CESIUM_BASE_URL = '/Cesium/';

    const initializeViewer = async () => {
      if (!cesiumContainer.current || !viewer.current) {
        const terrainProvider = await createWorldTerrainAsync();
        viewer.current = new Viewer(cesiumContainer.current!, {
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
          destination: Cartesian3.fromDegrees(136.3629244, 35.8659201, 1500000),
          orientation: {
            heading: CesiumMath.toRadians(0.0),
            pitch: CesiumMath.toRadians(-90.0),
          },
        });

          const response = await fetch('/watershed.geojson');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const geojson: GeoJSON.FeatureCollection = await response.json();
          const features = Array.isArray(geojson) ? geojson : geojson.features;
          
          features.forEach((feature: any) => {
            const coordinates = feature.geometry.coordinates;
            console.log(coordinates[0].flat().flat())

            const polygonHierarchy = Cartesian3.fromDegreesArray(coordinates[0].flat().flat());
            viewer.current?.entities.add({
              polygon: {
                hierarchy: polygonHierarchy,
                material: new ColorMaterialProperty(Color.fromCssColorString('#3cb371').withAlpha(0.6)),
                outline: false,
              },
            });
            viewer.current?.entities.add({
              polyline: {
                positions: Cartesian3.fromDegreesArray(coordinates[0].flat().flat()),
                width: 1,
                material: Color.BLACK,
              },
            });
          });

      }
    };

    initializeViewer();

    return () => {
      if (viewer.current) {
        viewer.current.destroy();
        viewer.current = null;
      }
    };
  }, []);

  const addSelectedPlaces = (info: string) => {
    const updatedPlaces = [...selectedPlaces, info];

    setSelectedPlaces(updatedPlaces);
  };

  const removeSelectedPlaces = () => {
    setDraftDialog(false);
    setDraftItems([]);
  };

  const closeDialog = () => {
    setDraftDialog(false);
    setDraftItems([]);
  }

  const closeConfirmDialog = () => {
    setConfirmDialog(false);
  };

  const openConfirmDialog = () => {
    setConfirmDialog(true);
  };

  const closeRainfall = () => {
    setopenRainfall(false);
    setMapWidth('100%');
  };

  const closeClimateChangePrediction = () => {
    setopenClimateChangePrediction(false);
    setMapWidth('100%');
  };

  const handleRainfall = () => {
    setopenClimateChangePrediction(false);
    setopenRainfall(true);
    setMapWidth('60%');
    setConfirmDialog(false);
  };

  const handleClimateChangePrediction = () => {
    setopenRainfall(false);
    setopenClimateChangePrediction(true);
    setMapWidth('60%');
    setConfirmDialog(false);
  };

  const clearSelection = async () => {
    setSelectedPlaces([]);
  };

  const homeLink = () => {
    navigate('/')
  }

  return (
    <div style={{ display: 'flex'}}>
      <div ref={cesiumContainer} style={{ width: mapWidth, height: '100vh' }}>
        <LogoImg src={logo} alt="Logo" onClick={homeLink}/>
        {!(openRainfall || openClimateChangePrediction) && selectedPlaces.length > 0 && (
          <SelectPlaceName>
            <CloseButton onClick={clearSelection}>×</CloseButton>
            {selectedPlaces.map((selectedPlace, index) => (
              <SelectedText key={index}>{selectedPlace}</SelectedText>
            ))}
            <SelectButton onClick={openConfirmDialog}>決定</SelectButton>
          </SelectPlaceName>
        )}
        {!(openRainfall || openClimateChangePrediction) && selectedPlaces.length == 0 && (
          <SelectPlaceName>
            <ExplanationText>調べたい地点をクリックしてください</ExplanationText>
          </SelectPlaceName>
        )}

        <IconContents openRainfall={openRainfall} openClimateChangePrediction={openClimateChangePrediction}>
          <IconWrapper>
            <StorageIcon />
            <Popup className="popup">保存済みデータ</Popup>
          </IconWrapper>
          <IconWrapper>
            <SplitscreenIcon />
            <Popup className="popup">2画面切り替え</Popup>
          </IconWrapper>
          <IconWrapper>
            <LogoutIcon />
            <Popup className="popup">ログアウト</Popup>
          </IconWrapper>
        </IconContents>

        <Dialog
          open={draftDialog}
          onClose={() => {closeDialog()}}
        >
          <DialogContent dividers  sx={{ pl: 0, pr: 0, py: 1, width: '300px' }}>
            <List dense disablePadding>
              {
                draftItems.map((item, i) => (
                  <ListItem disablePadding key={i}>
                    <ListItemText primary={`${item}`} />
                  </ListItem>
                ))
              }
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => closeDialog()} size='small'>
              キャンセル
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={confirmDialog}
          onClose={() => {closeConfirmDialog()}}
        >
          <DialogContent dividers  sx={{ pl: 0, pr: 0, py: 1, width: '300px' }}>
            <ListItemButton onClick={handleRainfall} sx={{pr: 4}}>
              <ListItemText primary={'実績降雨データ検索'} />
            </ListItemButton>
            <ListItemButton onClick={handleClimateChangePrediction} sx={{pr: 4}}>
              <ListItemText primary={'気候変動予測データ検索'} />
            </ListItemButton>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => closeConfirmDialog()} size='small'>
              キャンセル
            </Button>
          </DialogActions>
        </Dialog>

        <SearchContents openRainfall={openRainfall} openClimateChangePrediction={openClimateChangePrediction}>
          <SearchButton onClick={handleRainfall}>実績降雨データ検索</SearchButton>
          <FutureSearchButton onClick={handleClimateChangePrediction}>気候変動予測データ検索</FutureSearchButton>
        </SearchContents>
      </div>

      {openRainfall && (
        <div style={{ width: '40%', maxHeight: '100vh' }}>
          <SearchRainfallData selectedPlaces={selectedPlaces} closeRainfall={closeRainfall} />
        </div>
      )}
      {openClimateChangePrediction && (
        <div style={{ width: '40%', height: '100vh' }}>
          <SeachClimateChangePrediction selectedPlaces={selectedPlaces} closeClimateChangePrediction={closeClimateChangePrediction} />
        </div>
      )}
    </div>
  );
};

export default CesiumMapComponent;
