import React, { useState, useEffect } from "react";
import { Card, Row, Col, Input, Spin } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetExchangeQuery } from "../services/exchangeApi";
import { Link } from "react-router-dom";
import { numToKorean } from "num-to-korean";
import classes from "./Cryptocurrencies.module.css";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const { data: exchangeData } = useGetExchangeQuery();
  const [cryptos, setCryptos] = useState(cryptoList?.data?.coins);
  const [searchCoin, setSearchCoin] = useState("");
  const koreanExchange = exchangeData?.rates?.KRW;

  useEffect(() => {
    const filteredData = cryptoList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchCoin.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptoList, searchCoin]);

  if (isFetching) return <Spin tip="loading..." />;

  return (
    <>
      {!simplified && (
        <div className={classes["crypto-search"]}>
          <Input
            placeholder="search coin"
            enterButton
            onChange={(e) => setSearchCoin(e.target.value)}
          />
        </div>
      )}

      <Row gutter={[32, 32]}>
        {cryptos?.map((crypto) => {
          return (
            <Col xs={24} sm={12} lg={6} key={crypto.uuid}>
              <Link to={`/crypto/${crypto.id}`}>
                <Card
                  hoverable
                  title={`${crypto.rank} ${crypto.name}`}
                  extra={
                    <img
                      src={crypto.iconUrl}
                      style={{ width: "30px" }}
                      alt={crypto.name}
                    />
                  }
                >
                  <p>
                    <strong>가격</strong> :{" "}
                    {numToKorean(
                      Math.floor(crypto.price * koreanExchange),
                      "mixed"
                    )}
                    원
                  </p>
                  <p>
                    <strong>시가총액</strong> :{" "}
                    {numToKorean(
                      Math.floor(crypto.marketCap * koreanExchange),
                      "mixed"
                    )}
                  </p>
                  <p>
                    <strong>가격 변화</strong> : {crypto.change}%
                  </p>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
