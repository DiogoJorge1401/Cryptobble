import {
  BulbOutlined,
  FundOutlined,
  HomeOutlined,
  MenuOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Menu, Typography } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import icon from "../images/cryptocurrency.png";
export const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState<null | number>(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if ((screenSize as number) < 768) {
      setActiveMenu(false);
    } else setActiveMenu(true);
  }, [screenSize]);

  const menuItems = [
    {
      icon: <HomeOutlined />,
      key: 1,
      label: <Link to="/" children="Home" />,
    },
    {
      icon: <FundOutlined />,
      key: 2,
      label: <Link to="/cryptocurrencies" children="Cryptocurrencies" />,
    },
    {
      icon: <MoneyCollectOutlined />,
      key: 3,
      label: <Link to="/exchanges" children="Exchanges" />,
    },
    {
      icon: <BulbOutlined />,
      key: 4,
      label: <Link to="/news" children="News" />,
    },
  ];

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">Cryptoblle</Link>
        </Typography.Title>
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && <Menu theme="dark" items={menuItems} />}
    </div>
  );
};
