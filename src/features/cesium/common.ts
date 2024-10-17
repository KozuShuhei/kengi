export type HashMap = { [key: string]: any }

export type MapStyle = {
  id: string
  name: string
  url: string
}

export type BuildingType = 'None' | 'Mapbox' | 'Plateau'

type North = number
type West = number
type South = number
type East = number
export type Bounds = [[North, West], [South, East]]
export type Coordinates = number[][]

export type MenuType = 'rain' | 'river-floods' | 'river-floods-15h' | 'riskline' | 'dosya' | 'kouzui' | 'wind' | ''

export type RainType = 'nowcast' | 'forecast' | 'msm'

export type TimeSeriesRow = {
  date: string
  tense?: 'past' | 'present' | 'future'
  tileUrl?: string
  type?: RainType
  url: string
  geojson?: any
}

export enum ObservatoryType {
  Rain = 1,
  Stage = 4,
  Dam = 7,
  Tide = 12,
  Camera = 30,
}

export const ObservatoryTypeName = {
  [ObservatoryType.Rain]: '雨量',
  [ObservatoryType.Stage]: '水位',
  [ObservatoryType.Dam]: 'ダム',
  [ObservatoryType.Tide]: '潮位',
  [ObservatoryType.Camera]: 'カメラ',
}

export type ObservatoryRow = {
  type: ObservatoryType
  id: string
  name: string
  lat: number
  lng: number
  address: string

  kiki?: boolean
  dynamodb?: string
  bucket?: string
  prefix?: string

  status: string
  level?: number
  min10?: number
  total?: number

  landform?: [number, number][]
  outbreakLevel?: number
  dangerousLevel?: number
  evacuationLevel?: number
  warningLevel?: number
  standbyLevel?: number

  floodLevel?: number
  startLevel?: number

  maxExperiencedLevel?: number
  maxExperiencedLevelName?: string
}

export type ObservatoryValue = {
  date: string
  type: 'real' | 'forecast'
  level?: number
  min10?: number
  min60?: number
  total?: number
  url?: string
}

export type Legend = {
  title?: string
  colors?: {color: string, value: string}[]
  image?: string
}

export type HazardMap = {
  id: string
  label: string
  urls: string[]
  legends: Legend[]
}

export type Geographic = {
  id: string
  label: string
  sourceId: string
  layerId: string
  url: string
}
