import React from "react";
import { useParams } from "react-router-dom";
import { useGetCoinQuery } from "../services/cryptoApi";
import { useGetExchangeQuery } from "../services/exchangeApi";
import { Spin, Typography, Row, Col, Avatar } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  TrademarkOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
  LineChartOutlined,
  ExclamationCircleOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import classes from "./CryptoDetails.module.css";
import { numToKorean } from "num-to-korean";
import { v4 as uuidv4 } from "uuid";
import HTMLReactParser from "html-react-parser";

const { Title, Text } = Typography;
const CryptoDetails = () => {
  const { coinId } = useParams();
  const { data, isFetching } = useGetCoinQuery(coinId);
  const { data: exchangeData } = useGetExchangeQuery();
  const koreanExchange = exchangeData?.rates?.KRW;
  const coinData = data?.data?.coin;

  //console.log(coinData.description);

  if (isFetching) return <Spin tip="loading..." />;

  let stats;
  let genericStats;
  stats = [
    {
      title: "가격",
      icon: <DollarCircleOutlined />,
      value: numToKorean(Math.floor(coinData.price * koreanExchange), "mixed"),
    },
    { title: "순위", icon: <TrademarkOutlined />, value: coinData.rank },
    {
      title: "하루 거래량",
      icon: <ThunderboltOutlined />,
      value: numToKorean(Math.floor(coinData.volume * koreanExchange), "mixed"),
    },
    {
      title: "시가총액",
      icon: <MoneyCollectOutlined />,
      value: numToKorean(
        Math.floor(coinData.marketCap * koreanExchange),
        "mixed"
      ),
    },
    {
      title: "최고치 가격",
      icon: <TrophyOutlined />,
      value: numToKorean(
        Math.floor(coinData.allTimeHigh.price * koreanExchange),
        "mixed"
      ),
    },
  ];

  genericStats = [
    {
      title: "마켓 수",
      icon: <LineChartOutlined />,
      value: coinData.numberOfMarkets,
    },
    {
      title: "교환량",
      icon: <TrademarkOutlined />,
      value: coinData.numberOfExchanges,
    },
    {
      title: "공급 승인",
      icon: <ExclamationCircleOutlined />,
      value: coinData.approvedSupply ? <CheckOutlined /> : <CloseOutlined />,
    },
    {
      title: "총 공급량",
      icon: <ExclamationCircleOutlined />,
      value: coinData.totalSupply * koreanExchange,
    },
  ];

  return (
    <Col className={classes["coin-detail-container"]}>
      <Col className={classes["coin-heading-container"]}>
        <Title level={2} style={{ color: `rgb(69, 127, 252)` }}>
          {<Avatar src={coinData.iconUrl} />} {coinData.name} ({coinData.symbol}
          )
        </Title>
        <p>{coinData.name}의 가격과 시가총액을 확인하세요</p>
      </Col>
      {/* chart 넣기 */}
      <Col className={classes["stats-container"]}>
        <Col className={classes["coin-value-statistics"]}>
          <Col className={classes["stats-header"]}>
            <Title level={3}>{coinData.name} 통계량</Title>
            <p>an overview showing the stats of all cryptocurrencies</p>
          </Col>
          {stats.map((item) => (
            <Col className={classes["coin-stats"]} key={uuidv4()}>
              <Col className={classes["coin-stats-name"]}>
                <Text style={{ marginRight: "5px" }}>{item.icon}</Text>
                <Text>{item.title}</Text>
              </Col>
              <Text>{item.value}</Text>
            </Col>
          ))}
        </Col>
        <Col className={classes["other-stats-info"]}>
          <Col className={classes["stats-header"]}>
            <Title level={3}>다른 수치</Title>
            <p>an overview showing the stats of all cryptocurrencies</p>
          </Col>
          {genericStats.map((item) => (
            <Col className={classes["coin-stats"]} key={uuidv4()}>
              <Col className={classes["coin-stats-name"]}>
                <Text style={{ marginRight: "5px" }}>{item.icon}</Text>
                <Text>{item.title}</Text>
              </Col>
              <Text>{item.value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className={classes["coin-desc-link"]}>
        <Row className={classes["coin-desc"]}>
          <Title level={3} className={classes["coin-details-heading"]}>
            {coinData.name}은 무엇인가?
          </Title>
          {HTMLReactParser(coinData.description)}
        </Row>
        <Col className={classes["coin-links"]}>
          <Title level={3}>{coinData.name} links</Title>
          {coinData.links.map((link, idx) => (
            <Row key={idx} className={classes["coin-link"]}>
              <Title level={4}>{link.type}</Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
