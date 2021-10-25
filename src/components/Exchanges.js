import React from "react";
import { useGetExchangesQuery } from "../services/cryptoApi";
import { useGetExchangeQuery } from "../services/exchangeApi";
import { Spin, Table, Collapse } from "antd";
import { numToKorean } from "num-to-korean";
const { Panel } = Collapse;
const Exchanges = () => {
  const { data: exchanges, isFetching } = useGetExchangesQuery();
  const { data: exchangeData } = useGetExchangeQuery();
  const koreanExchange = exchangeData?.rates?.KRW;
  if (isFetching) return <Spin tip="loading..." />;

  const coinExchanges = exchanges?.data?.exchanges;
  console.log(coinExchanges);

  const columns = [
    { title: "이름", dataIndex: "name" },
    {
      title: "순위",
      dataIndex: "rank",
      sorter: { compare: (a, b) => a.rank - b.rank },
    },
    {
      title: "24H 거래금액(₩)",
      dataIndex: "volume",
      sorter: { compare: (a, b) => a.volume - b.volume },
    },
    {
      title: "마켓 수",
      dataIndex: "markets",
      sorter: { compare: (a, b) => a.markets - b.markets },
    },
    {
      title: "변동률",
      dataIndex: "exchange",
      sorter: { compare: (a, b) => a.exchange - b.exchange },
    },
  ];

  const data = coinExchanges.map((exchange) => ({
    key: exchange.id,
    name: (
      <p
        style={{ display: "flex", alignItems: "center", padding: 0, margin: 0 }}
      >
        <img
          src={exchange.iconUrl}
          alt={exchange.name}
          style={{ width: "20px", marginRight: "10px" }}
        />
        {exchange.name}
      </p>
    ),
    rank: exchange.rank,
    volume: exchange.volume * koreanExchange,
    markets: exchange.numberOfMarkets,
    exchange: `${exchange.marketShare}`,
  }));

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default Exchanges;
