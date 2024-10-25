import { Viewer, Cartesian3, Color, Entity, JulianDate, SampledProperty, defined, ScreenSpaceEventHandler, Cartesian2, ScreenSpaceEventType } from 'cesium';
import triangleImage from './triangle.png';
import trapezoidImage from './trapezoid.png';

export const loadGeoJsonData = async (viewer :Viewer) => {
  let popupEntity: Entity | null = null;
  const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);

  try {
    const response = await fetch('/九頭竜ダム地点_修正.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const geojson = await response.json();
    geojson.features.forEach((feature: any) => {
      const [longitude, latitude] = feature.geometry.coordinates;

      viewer.entities.add({
        position: Cartesian3.fromDegrees(longitude, latitude), // 各座標に基づいて位置を設定
        billboard: {
          image: triangleImage,
          width: 25,
          height: 20,
          scale: 1.0,
        },
        properties: {
          観測所名称: feature.properties?.観測所名称 || "不明な観測所",
        },
      });
    });
  } catch (error) {
    console.error('Error loading GeoJSON:', error);
  }

  try {
    const response = await fetch('/九頭竜治水基準点.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const geojson = await response.json();
    geojson.features.forEach((feature: any) => {
      const [longitude, latitude] = feature.geometry.coordinates;

      viewer.entities.add({
        position: Cartesian3.fromDegrees(longitude, latitude), // 各座標に基づいて位置を設定
        billboard: {
          image: trapezoidImage,
          width: 25,
          height: 20,
          scale: 1.0,
        },
        properties: {
          観測所名称: feature.properties?.観測所名称 || "不明な観測所",
        },
      });
    });
  } catch (error) {
    console.error('Error loading GeoJSON:', error);
  }

  handler.setInputAction((movement: any) => {
    const pickedFeature = viewer.scene.pick(movement.endPosition);
    if (defined(pickedFeature) && pickedFeature.id instanceof Entity) {
      const entity = pickedFeature.id;
      const 観測所名称 = entity.properties.観測所名称;

      // すでにポップアップが存在すれば削除
      if (popupEntity) {
        viewer.entities.remove(popupEntity);
        popupEntity = null;
      }

      // 新しいポップアップを表示
      if (entity && entity.position && entity.position.getValue) {
        // 正常に position が取得できる場合
        popupEntity = viewer.entities.add({
          position: entity.position.getValue(viewer.clock.currentTime),
          label: {
            text: 観測所名称,
            font: '14px sans-serif',
            showBackground: true,
            backgroundColor: Color.BLACK,
            backgroundPadding: new Cartesian2(7, 5),
            pixelOffset: new Cartesian2(0, -40), // ピクセルオフセットでマーカーの上にポップアップを表示
          },
        });
      } else {
        console.error("Entity's position or getValue method is undefined.");
      }
    } else if (popupEntity) {
      // マウスがエンティティから離れたらポップアップを削除
      viewer.entities.remove(popupEntity);
      popupEntity = null;
    }
  }, ScreenSpaceEventType.MOUSE_MOVE);
};

// 高さに基づいて色を決定
export const getColorByHeight = (height: number) => {
  if (height > 80) return Color.fromCssColorString('#c7408e').withAlpha(0.6);
  if (height > 50) return Color.fromCssColorString('#ff5e40').withAlpha(0.6);
  if (height > 30) return Color.fromCssColorString('#ffb340').withAlpha(0.6);
  if (height > 20) return Color.fromCssColorString('#fff840').withAlpha(0.6);
  if (height > 10) return Color.fromCssColorString('#4071ff').withAlpha(0.6);
  if (height > 5) return Color.fromCssColorString('#59a9ff').withAlpha(0.6);
  return Color.fromCssColorString('#b8deff').withAlpha(0.6);
};

// export const calcAnimetion = (height: number, newHeight: number, startTime: number) => {
//   const elapsed = performance.now() - startTime;
//   const t = Math.min(elapsed / 1000, 1);
//   const interpolatedHeight = CesiumMath.lerp(height, newHeight, t);
//   return t < 1 ? interpolatedHeight : newHeight;
// }