import React from "react";
import { Typography, Row, Col, Statistic, Spin } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetExchangeQuery } from "../services/exchangeApi";
import { numToKorean } from "num-to-korean";
import { Link } from "react-router-dom";
const { Title } = Typography;
const HomePage = () => {
  const { data, isLoading, error } = useGetCryptosQuery();
  const { data: exchangeData } = useGetExchangeQuery();
  const globalStats = data?.data?.stats;
  const koreanExchange = exchangeData?.rates?.KRW;

  if (isLoading) return <Spin tip="loading..." />;

  return (
    <>
      <Title level={2}>Global crypto stats</Title>
      <Row>
        <Col span={12}>
          <Statistic title="총 화폐 종류" value={globalStats.total} />
        </Col>
        <Col span={12}>
          <Statistic title="총 마켓 수" value={globalStats.totalMarkets} />
        </Col>
        <Col span={12}>
          <Statistic title="총 환율" value={globalStats.totalExchanges} />
        </Col>
        <Col span={12}>
          <Statistic
            title="총 시가총액"
            value={numToKorean(
              Math.floor(globalStats.totalMarketCap * koreanExchange),
              "mixed"
            )}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="24시간 거래량"
            value={numToKorean(
              Math.floor(globalStats.total24hVolume * koreanExchange),
              "mixed"
            )}
          />
        </Col>
      </Row>
      <div>
        <Title level={2}>Top 10 cryptocurrencies in the world</Title>
        <Title level={2}>
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
    </>
  );
};

export default HomePage;
