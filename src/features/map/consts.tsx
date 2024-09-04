import React from 'react'
import * as types from './common'
import CloudIcon from '@mui/icons-material/Cloud'
import FloodIcon from '@mui/icons-material/Flood'
import InfoIcon from '@mui/icons-material/Info'
import StormIcon from '@mui/icons-material/Storm'
import WaterIcon from '@mui/icons-material/Water'
import LandslideIcon from '@mui/icons-material/Landslide'
import SsidChartIcon from '@mui/icons-material/SsidChart'


export const StageForecastHours = process.env.REACT_APP_STAGE_FORECAST_HOURS !== undefined ? Number(process.env.REACT_APP_STAGE_FORECAST_HOURS) : 6

export const isHours6 = StageForecastHours === 6
export const isHours15 = StageForecastHours === 15

export const MapStyles: types.MapStyle[] = [
  {
    id: 'streets',
    name: '標準地図',
    url: 'mapbox://styles/iga56/clu6i1xig002101r62qlwa3le'
  },
  {
    id: 'satellite',
    name: '写真地図',
    url: 'mapbox://styles/iga56/clk3ijhf9004r01pxf7dqa9w6'
  },
  {
    id: 'light',
    name: '白地図',
    url: 'mapbox://styles/iga56/clk3inieu004s01pxciz3g6z4'
  },
  {
    id: 'dark',
    name: '黒地図',
    url: 'mapbox://styles/iga56/clk3j35m4004t01pxge14bqnm'
  },
  {
    id: '3d',
    name: '3D地図',
    url: 'mapbox://styles/iga56/clpt18d3q00et01r8fdjv4wuv'
  },
  {
    id: 'blank',
    name: '地図なし',
    url: 'mapbox://styles/iga56/clvylops301t201q1fy85h6nc'
  }
]

export const MenuItems: { id: string | types.MenuType, name: string, icon: React.ReactNode, visible: boolean, url?: string }[] = [
  {
    id: 'rain',
    name: '予測降雨',
    icon: <CloudIcon />,
    visible: true
  },
  {
    id: 'river-floods',
    name: '河川氾濫リスク',
    icon: <WaterIcon />,
    visible: isHours6
  },
  {
    id: 'river-floods-15h',
    name: '河川氾濫リスク',
    icon: <WaterIcon />,
    visible: isHours15
  },
  {
    id: 'riskline',
    name: '河川リスクライン',
    icon: <SsidChartIcon />,
    visible: isHours6
  },
  {
    id: 'dosya',
    name: '土砂キキクル',
    icon: <LandslideIcon />,
    visible: isHours6
  },
  {
    id: 'kouzui',
    name: '洪水キキクル',
    icon: <FloodIcon />,
    visible: isHours6
  },
  // {
  //   id: 'wind',
  //   name: '風',
  //   icon: <AirIcon />
  // },
]

export const IDs = {
  rainfall: {
    tileLayer: 'rainfall-tile-layer',
    tileSource: 'rainfall-tile-source',
    wideLayer: 'rainfall-wide-layer',
    wideSource: 'rainfall-wide-source'
  },
  observatory: {
    pointLayer: 'observatory-point-layer',
    pointSource: 'observatory-point-source',
    stageImage: 'observatory-stage-image',
    rainImage: 'observatory-rain-image',
    cameraImage: 'observatory-camera-image',
    tideImage: 'observatory-tide-image'
  },
  roadRegulation: {
    layer: 'road-regulation-layer',
    source: 'road-regulation-source'
  },
  geographic: {
    layer: 'geographic-layer',
    source: 'geographic-source'
  },
  riverFloods: {
    layer: 'river-floods-layer',
    source: 'river-floods-source'
  },
  riskline: {
    layer: 'riskline-layer',
    source: 'riskline-source'
  },
  dosya: {
    layer: 'dosya-layer',
    source: 'dosya-source'
  },
  kouzui: {
    layer: 'kouzui-layer',
    source: 'kouzui-source'
  },
  hazardMap: {
    layer: 'hazard-map-layer',
    source: 'hazard-map-source'
  },
  gsiVector: {
    layer: 'gsi-vector-layer',
    source: 'gsi-vector-source'
  },
  border: {
    city: {
      layer: 'border-city-layer',
      source: 'border-city-source'
    },
    river: {
      layer: 'border-river-layer',
      source: 'border-river-source'
    },
    tomoe: {
      layer: 'border-tomoe-layer',
      source: 'border-tomoe-source'
    }
  },
  composite: {
    buildingLayer: 'composite-building-layer'
  },
  plateau: {
    layer: 'plateau-layer',
    source: 'plateau-source'
  },
  wind: {
    layer: 'wind-layer',
    source: 'wind-source'
  }
}

export const StageAlertLevel = {
  OUTBREAK: {
    key: 'outbreak',
    label: '氾濫発生水位',
    color: '#000000'
  },
  FLOOD: {
    key: 'flood',
    label: '計画高水位',
    color: '#000000'
  },
  DANGEROUS: {
    key: 'dangerous',
    label: '氾濫危険水位',
    color: '#ad02ad'
  },
  EVACUATION: {
    key: 'evacuation',
    label: '避難判断水位',
    color: '#ff2800'
  },
  WARNING: {
    key: 'warning',
    label: '氾濫注意水位',
    color: '#f2e700'
  },
  STANDBY: {
    key: 'standby',
    label: '水防団待機水位',
    color: '#008000'
  },
  START: {
    key: 'start',
    label: '観測開始水位',
    color: '#22b022'
  },
  TIDEMAX: {
    key: 'tidemax',
    label: '過去最高潮位',
    color: '#ff2800'
  },
  NORMAL: {
    key: 'normal',
    label: '平常',
    color: '#ffffff'
  },
  DEFICIT: {
    key: 'deficit',
    label: '休止・欠測等',
    color: '#aaaaaa'
  }
}

export const RainStatus = {
  VAL7: {
    key: '7',
    label: '80㎜以上',
    color: '#c7408e'
  },
  VAL6: {
    key: '6',
    label: '50㎜以上',
    color: '#ff5e40'
  },
  VAL5: {
    key: '5',
    label: '30㎜以上',
    color: '#ffb340'
  },
  VAL4: {
    key: '4',
    label: '20㎜以上',
    color: '#fff840'
  },
  VAL3: {
    key: '3',
    label: '10㎜以上',
    color: '#4071ff'
  },
  VAL2: {
    key: '2',
    label: '5㎜以上',
    color: '#59a9ff'
  },
  VAL1: {
    key: '1',
    label: '0㎜以上',
    color: '#b8deff'
  },
}

export const RainObservatoryLegend: types.Legend = {
  title: '凡例',
  colors: Object.values(RainStatus).map(level => {
    return { color: level.color, value: level.label }
  })
}

export const MenuLegends: { [key in types.MenuType]: types.Legend[] } = {
  'rain': [{
    title: 'レーダ・予測雨量\n(mm/h)',
    colors: [
      { color: '#ba206e', value: '80' },
      { color: '#ff3700', value: '50' },
      { color: '#ffa021', value: '30' },
      { color: '#fbf43c', value: '20' },
      { color: '#0041FF', value: '10' },
      { color: '#218CFF', value: '5' },
      { color: '#A0D2FF', value: '1' },
      { color: '#99FFFF', value: '0' }
    ]
  }],
  'river-floods': [
    {
      title: '浸水ﾘｽｸ(m)',
      colors: [
        { color: '#1B67FF', value: '2.0〜' },
        { color: '#39BDD6', value: '1.0～2.0' },
        { color: '#72FFDB', value: '0.5～1.0' },
        { color: '#4AFC0C', value: '0.2～0.5' },
        { color: '#FFFF1B', value: '0.1～0.2' },
      ]
    }
  ],
  'river-floods-15h': [
    {
      title: '浸水ﾘｽｸ(m)',
      colors: [
        { color: '#1B67FF', value: '2.0〜' },
        { color: '#39BDD6', value: '1.0～2.0' },
        { color: '#72FFDB', value: '0.5～1.0' },
        { color: '#4AFC0C', value: '0.2～0.5' },
        { color: '#FFFF1B', value: '0.1～0.2' },
      ]
    }
  ],
  'riskline': [
    {
      title: 'リスクライン',
      colors: [
        { color: '#212121', value: 'この時間で越水の恐れ' },
        { color: '#F44336', value: '3時間以内に越水の恐れ' },
        { color: '#FFEB3B', value: '6時間以内に越水の恐れ' },
      ]
    }
  ],
  'dosya': [{
    title: '土砂災害警戒判定値',
    colors: [
      { color: '#10000e', value: '災害切迫【５】' },
      { color: '#a5009c', value: '危険　　【４】' },
      { color: '#ff251b', value: '警戒　　【３】' },
      { color: '#f1e539', value: '注意　　【２】' },
      { color: '#ffffff', value: '今後の情報等に留意' }
    ]
  }],
  'kouzui': [
    {
      title: '洪水警報の危険度分布',
      colors: [
        { color: '#10000e', value: '災害切迫【５】' },
        { color: '#a5009c', value: '危険　　【４】' },
        { color: '#ff251b', value: '警戒　　【３】' },
        { color: '#f1e539', value: '注意　　【２】' },
        { color: '#00fffe', value: '今後の情報等に留意' }
      ]
    },
    {
      title: '指定河川洪水予報',
      colors: [
        { color: '#10000e', value: '氾濫発生情報【５】' },
        { color: '#a5009c', value: '氾濫危険情報【４】' },
        { color: '#ff251b', value: '氾濫警戒情報【３】' },
        { color: '#f1e539', value: '氾濫注意情報【２】' },
        { color: '#00fffe', value: '発表なし' }
      ]
    }
  ],
  'wind': [],
  '': []
}


export const Geographics: types.Geographic[] = [
  {
    id: 'evacuation_for_flood',
    label: '風水害緊急避難場所',
    sourceId: `${IDs.geographic.source}-evacuation_for_flood`,
    layerId: `${IDs.geographic.layer}-evacuation_for_flood`,
    url: 'https://s3.ap-northeast-1.amazonaws.com/ctie.shizuoka.web/static/evacuation_for_flood.geojson'
  },
  {
    id: 'special_consideration',
    label: '要配慮者施設',
    sourceId: `${IDs.geographic.source}-special_consideration`,
    layerId: `${IDs.geographic.layer}-special_consideration`,
    url: 'https://s3.ap-northeast-1.amazonaws.com/ctie.shizuoka.web/static/special_consideration.geojson'
  }
]

export const ForecastStages = ['5633_34', '5633_39', '5633_36', '99_22000_4_26', '5633_33', '5633_40', '5633_123', '99_22000_4_2', '5633_37', '5633_125']
