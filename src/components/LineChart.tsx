import { Col, Row, Typography } from 'antd'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { Loader } from './Loader'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface LineChartProps {
  coinHistory: any
  currentPrice: string
  coinName: string
}
export const LineChart = ({
  coinHistory,
  currentPrice,
  coinName,
}: LineChartProps) => {
  const coinPrice: any[] = []
  const coinTimestamp = []
  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    coinPrice.push(Number(coinHistory.data.history[i].price))
  }
  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    coinTimestamp.push(
      new Date(
        coinHistory?.data?.history[i].timestamp * 1000
      ).toLocaleDateString()
    )
  }
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  }

  if (!coinHistory) return <Loader />
  return (
    <>
      <Row className="chart-header">
        <Typography.Title level={2} className="chart-title">{coinName} Price Chart </Typography.Title>
        <Col className="price-container">
          <Typography.Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Typography.Title>
          <Typography.Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Typography.Title>
        </Col>
      </Row>
      <Line data={data} />
    </>
  )
}
