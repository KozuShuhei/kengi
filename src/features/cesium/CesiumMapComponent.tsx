import React, { useEffect, useRef } from 'react';
import { Ion, Viewer, Cartesian3, Math as CesiumMath, createOsmBuildingsAsync, createWorldTerrainAsync } from 'cesium';

const CesiumMapComponent: React.FC = () => {
  const cesiumContainer = useRef<HTMLDivElement | null>(null);
  const viewer = useRef<Viewer | null>(null);

  useEffect(() => {
    Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmMjZlNjk3Mi1kMTNmLTRlOWUtOGY1NC02ODYxOWM1YWI1MjMiLCJpZCI6MjM3Njg1LCJpYXQiOjE3MjQ4OTIxMTJ9.6bVbTYRNaPJgy2hMNSS5BThUvSs43z2ev_mCUWCTK6M';

    const initializeViewer = async () => {
      if (cesiumContainer.current && !viewer.current) {
        const terrainProvider = await createWorldTerrainAsync();

        viewer.current = new Viewer(cesiumContainer.current, {
          terrainProvider,
        });

        viewer.current.camera.flyTo({
          destination: Cartesian3.fromDegrees(-122.4175, 37.655, 400),
          orientation: {
            heading: CesiumMath.toRadians(0.0),
            pitch: CesiumMath.toRadians(-15.0),
          },
        });
      }
    };

    initializeViewer();
  }, []);

  return <div ref={cesiumContainer} style={{ width: '100%', height: '100vh' }} />;
};

export default CesiumMapComponent;
