import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  BarElement,
  BarController,
  TimeScale,
  Tooltip,
  ChartOptions,
  ChartData
} from 'chart.js'
import { Chart, } from 'react-chartjs-2'
import annotationPlugin from 'chartjs-plugin-annotation'

import 'chartjs-adapter-moment'
import { ObservatoryValue, ObservatoryRow } from './common'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  BarElement,
  BarController,
  TimeScale,
  Tooltip,
  annotationPlugin
)

export const RainChart: React.FC = () => {
  const [rain, setRain] = React.useState<ObservatoryRow | null>(null)
  const [timeSeries, setTimeSeries] = React.useState<ObservatoryValue[]>([])
  const [forecastHours, setForecastHours] = React.useState<number>(6)
  const [timeInterval, setTimeInterval] = React.useState<number>(10)
  const [chartData, setChartData] = React.useState<ChartData>({labels: [], datasets: []})
  const [chartOptions, setChartOptions] = React.useState<ChartOptions>({})
  const chartRef = React.useRef<ChartJS>(null)

  React.useEffect(() => {
    const handleVisibilityChange = () => {
      chartRef.current?.update()
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  React.useEffect(() => {
    const sampleTimeSeries: ObservatoryValue[] = [
      { date: '2024/09/01 00:00', total: 10, min10: 1, min60: 2, type: 'real' },
      { date: '2024/09/01 01:00', total: 20, min10: 1.5, min60: 2.5, type: 'forecast' },
      { date: '2024/09/01 02:00', total: 30, min10: 1.2, min60: 3.0, type: 'real' },
      { date: '2024/09/01 03:00', total: 40, min10: 1.8, min60: 2.8, type: 'forecast' },
      { date: '2024/09/01 04:00', total: 40, min10: 2.1, min60: 3.2, type: 'real' },
      { date: '2024/09/01 05:00', total: 44, min10: 2.0, min60: 3.1, type: 'forecast' },
      { date: '2024/09/01 06:00', total: 42, min10: 1.9, min60: 2.6, type: 'real' },
      { date: '2024/09/01 07:00', total: 47, min10: 2.4, min60: 3.5, type: 'forecast' },
      { date: '2024/09/01 08:00', total: 48, min10: 2.3, min60: 3.4, type: 'real' },
      { date: '2024/09/01 09:00', total: 46, min10: 2.2, min60: 3.3, type: 'forecast' },
      { date: '2024/09/01 10:00', total: 48, min10: 2.5, min60: 3.7, type: 'real' },
      { date: '2024/09/01 11:00', total: 46, min10: 2.1, min60: 3.0, type: 'forecast' },
      { date: '2024/09/01 12:00', total: 44, min10: 2.0, min60: 3.2, type: 'real' },
      { date: '2024/09/01 13:00', total: 43, min10: 2.3, min60: 3.5, type: 'forecast' },
      { date: '2024/09/01 14:00', total: 42, min10: 2.2, min60: 3.4, type: 'real' },
      { date: '2024/09/01 15:00', total: 41, min10: 2.7, min60: 3.6, type: 'forecast' },
      { date: '2024/09/01 16:00', total: 45, min10: 2.6, min60: 3.8, type: 'real' },
      { date: '2024/09/01 17:00', total: 47, min10: 2.9, min60: 4.0, type: 'forecast' },
      { date: '2024/09/01 18:00', total: 49, min10: 3.0, min60: 4.2, type: 'real' },
      { date: '2024/09/01 19:00', total: 40, min10: 3.1, min60: 4.3, type: 'forecast' },
      { date: '2024/09/01 20:00', total: 48, min10: 3.2, min60: 4.5, type: 'real' },
      { date: '2024/09/01 21:00', total: 47, min10: 3.3, min60: 4.6, type: 'forecast' },
      { date: '2024/09/01 22:00', total: 45, min10: 3.4, min60: 4.7, type: 'real' },
      { date: '2024/09/01 23:00', total: 44, min10: 3.5, min60: 4.8, type: 'forecast' }
    ];
    setTimeSeries(sampleTimeSeries);
  }, []);

  React.useEffect(() => {
    loadTimeSeries()
  }, [timeSeries])

  const getMaxTotal = (): number => {
    let total = Math.max(...(timeSeries.map(ts => ts.total).filter(ts => ts !== null) as number[]))
    total = Math.ceil(total + 10)
    if (!total || total < 100) {
      total = 100
    }
    return total
  }

  const getMaxMinutesVal = (): number => {
    const fieldName = timeInterval === 60 ? 'min60' : 'min10'
    let minval = Math.max(...(timeSeries.map(ts => ts[fieldName]).filter(ts => ts !== undefined && ts !== null) as number[]))
    minval = Math.ceil(minval + 1)
    if (!minval || minval < 5) {
      minval = 5
    }
    return minval
  }

  const loadTimeSeries = () => {
    console.log('loadTimeSeries')
    const labels: string[] = []
    const totals: (number | null)[] = []
    const minValues: (number | null)[] = []

    timeSeries.forEach(ts => {
      labels.push(ts.date)
      if (timeInterval === 60) {
        minValues.push(ts.min60 === undefined ? null : Number(ts.min60.toFixed(2)))
      } else {
        minValues.push(ts.min10 === undefined ? null : Number(ts.min10.toFixed(2)))
      }
      totals.push(ts.total === undefined ? null : Number(ts.total.toFixed(2)))
    })

    if (timeSeries.length > 0 && timeSeries[0].date) {
      setChartOptions({
        responsive: false,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        scales: {
          xDate: {
            type: 'time',
            time: {
              tooltipFormat: 'MM/DD HH:mm',
              parser: 'YYYY/MM/DD HH:mm',
              unit: 'hour',
              minUnit: 'minute',
              displayFormats: {
                'hour': 'HH:mm',
              }
            },
            grid: {
              display: false
            },
            min: timeSeries[0].date,
            max: timeSeries.slice(-1)[0].date
          },
          yTotal: {
            position: 'right',
            ticks: {
              stepSize: 20
            },
            max: getMaxTotal(),
            beginAtZero: true
          },
          yMinVal: {
            position: 'left',
            ticks: {
              stepSize: 1
            },
            grid: {
              display: false
            },
            max: getMaxMinutesVal(),
            min: 0,
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label + ': ' || ''
                if (context.parsed.y !== null) {
                  label += context.parsed.y + ' mm'
                }
                return label
              }
            }
          },
          annotation: {
            annotations: {
              nowLine: {
                borderColor: '#FF0000',
                borderWidth: 1.5,
                type: 'line',
                scaleID: 'xDate',
                label: {
                  content: '現在',
                  position: 'start',
                  display: true
                }
              }
            }
          }
        }
      })

      setChartData({
        labels: labels,
        datasets: [
          {
            type: 'line' as const,
            label: '累加雨量',
            data: totals,
            order: 1,
            pointBackgroundColor: 'white',
            fill: false,
            xAxisID: 'xDate',
            yAxisID: 'yTotal',
            borderWidth: 2,
            borderColor: '#91C46C',
            backgroundColor: '#91C46C',
            pointBorderColor: '#91C46C',
            pointRadius: 2,
            pointHitRadius: 0,
            spanGaps: true
          },
          {
            type: 'bar' as const,
            label: `${timeInterval}分雨量`,
            data: minValues,
            order: 2,
            xAxisID: 'xDate',
            yAxisID: 'yMinVal',
            backgroundColor: '#1C344C',
            borderColor: '#1C344C',
            borderWidth: 0.5
          },
        ]
      })
    }

  }

  return <Chart ref={chartRef} type='bar' data={chartData} options={chartOptions} />
}
export default RainChart;
