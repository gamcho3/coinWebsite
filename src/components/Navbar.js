import { Link } from "react-router-dom";
import { Avatar, Typography, Menu } from "antd";
import React from "react";
import icon from "../images/coin.png";
import classes from "./Navbar.module.css";
import {
  HomeOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  MenuOutlined,
} from "@ant-design/icons";
const { Title } = Typography;
const Navbar = () => {
  return (
    <div className={classes["nav-container"]}>
      <div className={classes["logo-container"]}>
        <Avatar src={icon} size="large" />
        <Title className={classes.logo} level={2}>
          <Link to="/">Vitcoin</Link>
        </Title>
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        overflowedIndicator={
          <MenuOutlined style={{ fontSize: "1.5rem", padding: 0 }} />
        }
      >
        <Menu.Item icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item icon={<FundOutlined />}>
          <Link to="/cryptocurrencies">cryptocurrencies</Link>
        </Menu.Item>
        <Menu.Item icon={<MoneyCollectOutlined />}>
          <Link to="/exchanges">exchanges</Link>
        </Menu.Item>
        <Menu.Item icon={<BulbOutlined />}>
          <Link to="/news">News</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;
