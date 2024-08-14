//import MapRasterComponent from './features/map/MapComponent';
import Header from './layouts/Header';
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MapComponent from './features/map/MapBarComponent';
import MapRComponent from './features/map/MapBoxRComponent';
import MapBarComponent from './features/map/MapBarComponent';
import SelectTable from './features/table/SelectTable'

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MapRComponent />} />
          {/* <Route path="/map" element={<MapComponent />} /> */}
          <Route path="/map" element={<MapBarComponent />} />
          <Route path="/List" element={<SelectTable />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
