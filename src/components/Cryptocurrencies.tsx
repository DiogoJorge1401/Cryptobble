import { Card, Col, Input, Row } from 'antd'
import millify from 'millify'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetCryptosQuery } from '../services/cryptoAPI'
import { Loader } from './Loader'

interface CryptocurrenciesProperties {
  simplified?: boolean
}

export interface Crypto {
  name: string
  uuid: string
  rank: number
  iconUrl: string
  price: number
  marketCap: number
  change: number
}

export const Cryptocurrencies = ({
  simplified,
}: CryptocurrenciesProperties) => {
  const count = simplified ? 10 : 100
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count)
  const [cryptos, setCryptos] = useState<Crypto[] | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter(
      (item: { name: string }) => item.name.toLowerCase().includes(searchTerm)
    )
    setCryptos(filteredData)
  }, [cryptosList, searchTerm])
  if (isFetching || !cryptos) return <Loader />

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency, index: number) => (
          <Col key={index} xs={24} sm={12} lg={6}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
                className="crypto-card"
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}
