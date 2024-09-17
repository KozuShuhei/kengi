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
import { useNavigate } from 'react-router-dom';
import logo from './logo.png'

import {
  LogoImg,
} from './style';

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
  const navigate = useNavigate();

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

    const precipitationData = [
      {"年月日":"2004\/7\/17","時刻":"23:00","流域全体（深谷上流域）":0.0,"H-1-1":0.0,"H-1-2":0.0,"H-2-1":0.0,"H-2-2":0.0,"H-3":0.0,"H-4-1":0.0,"H-4-2":0.0,"H-5":0.0,"H-6":0.0,"H-7-1":0.0,"H-7-2":0.0},
      {"年月日":"2004\/7\/18","時刻":"0:00","流域全体（深谷上流域）":0.7,"H-1-1":0.0,"H-1-2":0.0,"H-2-1":0.0,"H-2-2":0.06,"H-3":0.01,"H-4-1":0.04,"H-4-2":0.0,"H-5":2.53,"H-6":0.24,"H-7-1":0.4,"H-7-2":1.39},
      {"年月日":"2004\/7\/18","時刻":"1:00","流域全体（深谷上流域）":5.43,"H-1-1":1.0,"H-1-2":1.0,"H-2-1":1.0,"H-2-2":1.11,"H-3":1.81,"H-4-1":2.23,"H-4-2":5.54,"H-5":4.28,"H-6":11.19,"H-7-1":5.06,"H-7-2":5.44},
      {"年月日":"2004\/7\/18","時刻":"2:00","流域全体（深谷上流域）":1.17,"H-1-1":0.0,"H-1-2":0.0,"H-2-1":0.0,"H-2-2":0.0,"H-3":0.0,"H-4-1":0.0,"H-4-2":0.24,"H-5":0.33,"H-6":1.57,"H-7-1":1.69,"H-7-2":null},
      {"年月日":"2004\/7\/18","時刻":"3:00","流域全体（深谷上流域）":0.87,"H-1-1":0.99,"H-1-2":1.0,"H-2-1":0.75,"H-2-2":0.22,"H-3":0.0,"H-4-1":0.0,"H-4-2":0.0,"H-5":0.41,"H-6":1.05,"H-7-1":1.51,"H-7-2":null},
      {"年月日":"2004\/7\/18","時刻":"4:00","流域全体（深谷上流域）":4.92,"H-1-1":3.98,"H-1-2":4.0,"H-2-1":3.49,"H-2-2":6.09,"H-3":3.28,"H-4-1":0.03,"H-4-2":0.03,"H-5":1.69,"H-6":2.17,"H-7-1":5.21,"H-7-2":1.58},
      {"年月日":"2004\/7\/18","時刻":"5:00","流域全体（深谷上流域）":19.63,"H-1-1":18.81,"H-1-2":19.0,"H-2-1":14.67,"H-2-2":7.91,"H-3":3.72,"H-4-1":4.43,"H-4-2":22.15,"H-5":27.64,"H-6":32.72,"H-7-1":16.99,"H-7-2":14.32},
      {"年月日":"2004\/7\/18","時刻":"6:00","流域全体（深谷上流域）":15.18,"H-1-1":0.02,"H-1-2":0.0,"H-2-1":0.51,"H-2-2":1.07,"H-3":0.52,"H-4-1":0.01,"H-4-2":0.0,"H-5":0.9,"H-6":7.78,"H-7-1":33.07,"H-7-2":28.23},
      {"年月日":"2004\/7\/18","時刻":"7:00","流域全体（深谷上流域）":16.28,"H-1-1":1.01,"H-1-2":1.0,"H-2-1":1.25,"H-2-2":2.75,"H-3":2.54,"H-4-1":2.19,"H-4-2":5.12,"H-5":10.68,"H-6":16.74,"H-7-1":23.5,"H-7-2":24.32},
      {"年月日":"2004\/7\/18","時刻":"8:00","流域全体（深谷上流域）":29.33,"H-1-1":5.07,"H-1-2":5.0,"H-2-1":6.53,"H-2-2":10.9,"H-3":12.9,"H-4-1":14.04,"H-4-2":15.43,"H-5":18.06,"H-6":30.94,"H-7-1":49.18,"H-7-2":48.16},
      {"年月日":"2004\/7\/18","時刻":"9:00","流域全体（深谷上流域）":43.63,"H-1-1":8.3,"H-1-2":8.0,"H-2-1":14.88,"H-2-2":21.47,"H-3":27.37,"H-4-1":30.28,"H-4-2":33.99,"H-5":52.96,"H-6":60.52,"H-7-1":58.27,"H-7-2":47.53},
      {"年月日":"2004\/7\/18","時刻":"10:00","流域全体（深谷上流域）":33.67,"H-1-1":29.03,"H-1-2":29.0,"H-2-1":29.76,"H-2-2":36.84,"H-3":28.59,"H-4-1":19.3,"H-4-2":39.37,"H-5":17.75,"H-6":42.64,"H-7-1":26.71,"H-7-2":5.95},
      {"年月日":"2004\/7\/18","時刻":"11:00","流域全体（深谷上流域）":7.5,"H-1-1":26.11,"H-1-2":26.0,"H-2-1":28.55,"H-2-2":24.81,"H-3":15.84,"H-4-1":6.62,"H-4-2":1.71,"H-5":0.4,"H-6":1.35,"H-7-1":0.52,"H-7-2":0.18},
      {"年月日":"2004\/7\/18","時刻":"12:00","流域全体（深谷上流域）":1.85,"H-1-1":0.02,"H-1-2":0.0,"H-2-1":0.51,"H-2-2":0.67,"H-3":0.92,"H-4-1":0.94,"H-4-2":0.22,"H-5":0.65,"H-6":2.09,"H-7-1":1.69,"H-7-2":0.86},
      {"年月日":"2004\/7\/18","時刻":"13:00","流域全体（深谷上流域）":2.3,"H-1-1":4.02,"H-1-2":4.0,"H-2-1":4.51,"H-2-2":6.41,"H-3":3.62,"H-4-1":0.0,"H-4-2":0.0,"H-5":0.0,"H-6":1.55,"H-7-1":0.0,"H-7-2":0.0},
      {"年月日":"2004\/7\/18","時刻":"14:00","流域全体（深谷上流域）":0.53,"H-1-1":0.02,"H-1-2":0.0,"H-2-1":0.51,"H-2-2":0.67,"H-3":0.44,"H-4-1":0.0,"H-4-2":0.0,"H-5":0.0,"H-6":0.05,"H-7-1":0.0,"H-7-2":0.0},
      {"年月日":"2004\/7\/18","時刻":"15:00","流域全体（深谷上流域）":0.54,"H-1-1":0.0,"H-1-2":0.0,"H-2-1":0.0,"H-2-2":0.0,"H-3":0.0,"H-4-1":0.0,"H-4-2":0.0,"H-5":0.0,"H-6":0.0,"H-7-1":0.0,"H-7-2":0.0},
      {"年月日":"2004\/7\/18","時刻":"16:00","流域全体（深谷上流域）":0.29,"H-1-1":0.0,"H-1-2":0.0,"H-2-1":0.0,"H-2-2":0.0,"H-3":0.0,"H-4-1":0.0,"H-4-2":0.0,"H-5":0.0,"H-6":0.0,"H-7-1":0.0,"H-7-2":0.0},
      {"年月日":"2004\/7\/18","時刻":"17:00","流域全体（深谷上流域）":0.13,"H-1-1":0.0,"H-1-2":0.0,"H-2-1":0.0,"H-2-2":0.0,"H-3":0.0,"H-4-1":0.0,"H-4-2":0.0,"H-5":0.0,"H-6":0.0,"H-7-1":0.0,"H-7-2":0.0},
      {"年月日":"2004\/7\/18","時刻":"18:00","流域全体（深谷上流域）":0.33,"H-1-1":0.0,"H-1-2":0.0,"H-2-1":0.0,"H-2-2":0.0,"H-3":0.0,"H-4-1":0.0,"H-4-2":0.0,"H-5":0.0,"H-6":0.0,"H-7-1":0.0,"H-7-2":0.0},
      {"年月日":"2004\/7\/18","時刻":"19:00","流域全体（深谷上流域）":0.14,"H-1-1":0.0,"H-1-2":0.0,"H-2-1":0.0,"H-2-2":0.0,"H-3":0.0,"H-4-1":0.0,"H-4-2":0.0,"H-5":0.0,"H-6":0.0,"H-7-1":0.0,"H-7-2":0.0},
      {"年月日":"2004\/7\/18","時刻":"20:00","流域全体（深谷上流域）":0.04,"H-1-1":0.0,"H-1-2":0.0,"H-2-1":0.0,"H-2-2":0.0,"H-3":0.0,"H-4-1":0.0,"H-4-2":0.0,"H-5":0.0,"H-6":0.0,"H-7-1":0.0,"H-7-2":0.0},
      {"年月日":"2004\/7\/18","時刻":"21:00","流域全体（深谷上流域）":0.0,"H-1-1":0.0,"H-1-2":0.0,"H-2-1":0.0,"H-2-2":0.0,"H-3":0.0,"H-4-1":0.0,"H-4-2":0.0,"H-5":0.0,"H-6":0.0,"H-7-1":0.0,"H-7-2":0.0},
      {"年月日":"2004\/7\/18","時刻":"22:00","流域全体（深谷上流域）":0.0,"H-1-1":0.0,"H-1-2":0.0,"H-2-1":0.0,"H-2-2":0.0,"H-3":0.0,"H-4-1":0.0,"H-4-2":0.0,"H-5":0.0,"H-6":0.0,"H-7-1":0.0,"H-7-2":0.0}
    ];

    const transformedData: ObservatoryValue[] = precipitationData.map((item) => ({
      date: `${item['年月日']} ${item['時刻']}`,
      total: item['流域全体（深谷上流域）'] || 0,
      min10: ((item["H-1-1"] || 0) + 
      (item["H-1-2"] || 0) + 
      (item["H-2-1"] || 0) + 
      (item["H-2-2"] || 0) + 
      (item["H-3"] || 0) + 
      (item["H-4-1"] || 0) + 
      (item["H-4-2"] || 0) + 
      (item["H-5"] || 0) + 
      (item["H-6"] || 0) + 
      (item["H-7-1"] || 0) + 
      (item["H-7-2"] || 0)) / 6,
      min60: item['流域全体（深谷上流域）'] || 0,
      type: 'forecast',
    }));
    setTimeSeries(transformedData);
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

  const homeLink = () => {
    navigate('/')
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

  return (
    <>
      <LogoImg src={logo} alt="Logo" onClick={homeLink}/>
      <Chart ref={chartRef} type='bar' data={chartData} options={chartOptions} />
    </>
  )
}
export default RainChart;
