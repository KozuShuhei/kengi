import { Viewer, Cartesian3, Color, Entity, PolygonHierarchy, CallbackProperty } from 'cesium';
import { JulianDate, SampledProperty } from 'cesium';

// 高さをアニメーションさせる関数
export const animateHeight = (viewer: Viewer, entity: Entity, targetHeight: number, duration: number = 2000) => {
  const start = viewer.clock.currentTime.clone();
  const stop = JulianDate.addSeconds(start, duration / 1000, new JulianDate());

  const heightProperty = new SampledProperty(Number);

  heightProperty.addSample(start, entity.polygon!.extrudedHeight!.getValue);
  heightProperty.addSample(stop, targetHeight);

  entity.polygon!.extrudedHeight = heightProperty;

  // Clockの範囲を設定して、アニメーションの時間範囲を調整
  viewer.clock.startTime = start.clone();
  viewer.clock.stopTime = stop.clone();
  viewer.clock.currentTime = start.clone();
  viewer.clock.shouldAnimate = true;
};

export const addFillExtrusionLayer = (
  viewer: Viewer,
  entitiesMap: any,
  feature: any,
  height: number,
  fillColor: string,
) => {
  const targetHeight = height * 200; // 目標高さ
  const duration = 1000; // アニメーションの持続時間（ミリ秒）

  // GeoJSONの座標データを取得し、緯度・経度を取り出す
  const coordinates = feature.geometry.coordinates[0].map((coord: number[]) => {
    // coordがオブジェクトでなく、[longitude, latitude]の配列かを確認
    if (Array.isArray(coord) && coord.length >= 2) {
      return Cartesian3.fromDegrees(coord[0], coord[1]); // 緯度・経度をCartesian3に変換
    } else {
      console.error('Invalid coordinate:', coord);
      throw new Error('Invalid coordinate data');
    }
  });

  // Entityの追加
  // let polygonEntity: Entity | undefined = viewer.entities.getById(layerId);

  // if (!polygonEntity) {
  //   // ポリゴンを新規作成
  //   polygonEntity = viewer.entities.add({
  //     polygon: {
  //       hierarchy: new PolygonHierarchy(coordinates),
  //       material: Color.fromCssColorString(fillColor).withAlpha(0.6), // 色の設定
  //       height: 0, // 初期高さを0に設定
  //       outline: true,
  //       outlineColor: Color.BLACK,
  //     },
  //   });
  // }

  // アニメーション関数
  // const animateHeight = (startTime: number, startHeight: number) => {
  //   const elapsed = performance.now() - startTime;
  //   const progress = Math.min(elapsed / duration, 1);
  //   const currentHeight = startHeight + (targetHeight - startHeight) * progress;

  //   // heightプロパティを動的に更新
  //   polygonEntity!.polygon!.height = new CallbackProperty(() => currentHeight, false);

  //   // アニメーションの終了チェック
  //   if (progress < 1) {
  //     requestAnimationFrame(() => animateHeight(startTime, startHeight));
  //   }
  // };

  // // 初期高さを取得
  // const startHeight = polygonEntity.polygon!.height instanceof CallbackProperty ? 0 : polygonEntity.polygon!.height;

  // アニメーションを開始
  // requestAnimationFrame(() => animateHeight(performance.now(), startHeight as number));
};
