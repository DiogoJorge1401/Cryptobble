import { Col, Collapse, Row } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import CollapsePanel from 'antd/lib/collapse/CollapsePanel'
import Text from 'antd/lib/typography/Text'
import HTMLReactParser from 'html-react-parser'
import millify from 'millify'
import { useGetExchangesQuery } from '../services/cryptoAPI'
import { Loader } from './Loader'

export const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery('')
  const exchangesList = data?.data?.exchanges
  if (isFetching) return <Loader />
  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      {exchangesList?.map(
        (
          exchange: {
            uuid: string
            rank: number
            iconUrl: string
            name: string
            volume: number
            numberOfMarkets: number
            marketShare: number
            description: string
          },
          idx: number
        ) => (
          <Col key={idx}>
            <Collapse>
              <CollapsePanel
                key={exchange.uuid}
                showArrow={false}
                header={
                  <Row>
                    <Col span={6}>
                      <Text>
                        <strong>{exchange.rank}.</strong>
                      </Text>
                      <Avatar
                        className="exchange-image"
                        src={exchange.iconUrl}
                      />
                      <Text>
                        <strong>{exchange.name}</strong>
                      </Text>
                    </Col>
                    <Col span={6}>${millify(exchange.volume)}</Col>
                    <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col span={6}>{millify(exchange.marketShare)}%</Col>
                  </Row>
                }
              >
                {HTMLReactParser(exchange.description || '')}
              </CollapsePanel>
            </Collapse>
          </Col>
        )
      )}
    </>
  )
}
