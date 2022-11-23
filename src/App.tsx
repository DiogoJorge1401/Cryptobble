import { Layout, Typography, Space } from 'antd'
import {
  Navbar,
  Homepage,
  Exchanges,
  Cryptocurrencies,
  CryptoDetails,
  News,
} from './components'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'

export const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<Homepage />}></Route>
              <Route path="/exchanges" element={<Exchanges />} />
              <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: 'white', textAlign: 'center' }}
          >
            Cryptoblle <br />
            All rights reserved
          </Typography.Title>
          <Space>
            <Link to="/" children="Home" />
            <Link to="/exchanges" children="Exchanges" />
            <Link to="/news" children="News" />
          </Space>
        </div>
      </div>
    </div>
  )
}
