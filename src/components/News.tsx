import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import moment from 'moment'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'
import demoImage from '../images/th.jpeg'
import { useState } from 'react'
import { useGetCryptosQuery } from '../services/cryptoAPI'
import { Crypto } from '.'
import { Loader } from './Loader'

const { Text, Title } = Typography
const { Option } = Select

interface NewsProperties {
  simplified?: boolean
}
interface New {
  url: string
  name: string
  description: string
  datePublished: string
  provider: {
    image?: {
      thumbnail?: {
        contentUrl: string
      }
    }
    name?: string
  }[]
  image?: {
    thumbnail?: {
      contentUrl: string
    }
  }
}

export const News = ({ simplified }: NewsProperties) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  })
  const { data } = useGetCryptosQuery(100)
  if (!cryptoNews?.value || !data) return <Loader/>
  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(e) => setNewsCategory(e)}
            filterOption={(input, option) => {
              return (
                (option?.children as unknown as string)
                  ?.toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              )
            }}
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {(data?.data?.coins as Crypto[]).map((currency, idx) => (
              <Option value={currency.name} key={idx}>
                {currency.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}
      {(cryptoNews.value as New[]).map(
        (
          { url, name, image, description, provider, datePublished },
          index: number
        ) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card hoverable className="news-card">
              <a href={url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {name.length > 63 ? name.substring(0, 63) + ' ...' : name}
                  </Title>
                  <img
                    src={image?.thumbnail?.contentUrl || demoImage}
                    alt="new"
                    width="100px"
                    height="100px"
                  />
                </div>
                <p>
                  {description.length > 100
                    ? description.substring(0, 100) + ' ...'
                    : description}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar
                      src={
                        provider[0]?.image?.thumbnail?.contentUrl || demoImage
                      }
                      alt="news"
                    />
                    <Text className="provider-name"> {provider[0]?.name}</Text>
                  </div>
                  <Text>{moment(datePublished).startOf('s').fromNow()}</Text>
                </div>
              </a>
            </Card>
          </Col>
        )
      )}
    </Row>
  )
}
