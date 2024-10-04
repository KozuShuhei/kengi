import { Viewer, Cartesian3, Color, Entity, JulianDate, SampledProperty } from 'cesium';

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