import React from "react";
import classes from "./App.module.css";
import { Switch, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import {
  Navbar,
  HomePage,
  Exchanges,
  Cryptocurrencies,
  CryptoDetails,
  News,
} from "./components";
const { Header, Content, Footer } = Layout;
const App = () => {
  return (
    <div className={classes.app}>
      <Layout>
        <Header>
          <div className={classes.navbar}>
            <Navbar />
          </div>
        </Header>

        <div className={classes.main}>
          <Content>
            <div className={classes.routes}>
              <Switch>
                <Route exact path="/">
                  <HomePage />
                </Route>
                <Route exact path="/exchanges">
                  <Exchanges />
                </Route>
                <Route exact path="/cryptocurrencies">
                  <Cryptocurrencies />
                </Route>
                <Route exact path="/crypto/:coinId">
                  <CryptoDetails />
                </Route>
                <Route exact path="/news">
                  <News />
                </Route>
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: "center", backgroundColor: "black" }}>
            <Typography.Title
              level={5}
              style={{ color: "white", textAlign: "center" }}
            >
              Cryptoverse <br /> All right reserved
            </Typography.Title>
            <Space>
              <Link to="/exchanges">Exchanges</Link>
              <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            </Space>
          </Footer>
        </div>
      </Layout>
    </div>
  );
};

export default App;
