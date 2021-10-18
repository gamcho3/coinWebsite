import { Link } from "react-router-dom";
import { Avatar, Typography, Button, Menu } from "antd";
import React, { Fragment } from "react";
import icon from "../images/coin.png";
import classes from "./Navbar.module.css";
import {
  HomeOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
} from "@ant-design/icons";
const { Title } = Typography;
const Navbar = () => {
  return (
    <div className={classes["nav-container"]}>
      <div className={classes["logo-container"]}>
        <Avatar src={icon} size="large" />
        <Title className={classes.logo} level={2}>
          <Link to="/">bitcon</Link>
        </Title>
      </div>
      <Menu theme="dark" mode="horizontal">
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
