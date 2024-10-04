//import MapRasterComponent from './features/map/MapComponent';
import Header from './layouts/Header';
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MapComponent from './features/map/MapBarComponent';
import { Legend, ObservatoryType } from './features/map/common'
import MapRComponent from './features/map/MapBoxRComponent';
import MapBarComponent from './features/map/MapBarComponent';
import MapBoxGraph from './features/map/MapBoxGraph';
import MapBoxMeshComponent from './features/map/MapBoxMeshComponent';
import CesiumMapComponent from './features/cesium/CesiumMapComponent';
import CesiumBarComponent from './features/cesium/CesiumBarComponent';
import CesiumMeshComponent from './features/cesium/CesiumMeshComponent';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MapRComponent />} />
          {/* <Route path="/map" element={<MapComponent />} /> */}
          <Route path="/map" element={<MapBarComponent />} />
          <Route path="/graph" element={<MapBoxGraph />} />
          <Route path="/mesh" element={<MapBoxMeshComponent />} />
          <Route path="/cmesh" element={<CesiumMeshComponent />} />
          <Route path="/cesium" element={<CesiumMapComponent />} />
          <Route path="/cbar" element={<CesiumBarComponent />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
