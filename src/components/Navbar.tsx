import {
  BulbOutlined,
  FundOutlined,
  HomeOutlined,
  MenuOutlined,
  MoneyCollectOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Menu, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import icon from '../images/cryptocurrency.png'
export const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true)
  const [screenSize, setScreenSize] = useState<null | number>(null)

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth)
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  useEffect(() => {
    if ((screenSize as number) < 768) {
      setActiveMenu(false)
    } else setActiveMenu(true)
  }, [screenSize])

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">Cryptobble</Link>
        </Typography.Title>
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <Menu theme="dark">
          <Menu.Item icon={<HomeOutlined />} key={1}>
            <Link to="/" children="Home" />
          </Menu.Item>
          <Menu.Item icon={<FundOutlined />} key={2}>
            <Link to="/cryptocurrencies" children="Cryptocurrencies" />
          </Menu.Item>
          <Menu.Item icon={<MoneyCollectOutlined />} key={3}>
            <Link to="/exchanges" children="Exchanges" />
          </Menu.Item>
          <Menu.Item icon={<BulbOutlined />} key={4}>
            <Link to="/news" children="News" />
          </Menu.Item>
        </Menu>
      )}
    </div>
  )
}
