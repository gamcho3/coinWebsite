import React, { Fragment } from "react";
import { Line } from "react-chartjs-2";
import { Typography, Row, Col } from "antd";
import { numToKorean } from "num-to-korean";
const { Title } = Typography;
const LineChart = ({ cryptoHistory, koreanExchange, currentPrice }) => {
  const { history, change } = cryptoHistory;

  const coinPrice = [];
  const coinTimestamp = [];
  for (let i = 0; i < history.length; i++) {
    coinPrice.push(history[i].price * koreanExchange);
    coinTimestamp.push(new Date(history[i].timestamp).toLocaleDateString());
  }

  //console.log(coinPrice, coinTimestamp);

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "원화 가격",
        data: coinPrice,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Fragment>
      <Row>
        <Col>
          <Title level={5}>변화 수치 : {change}%</Title>
          <Title level={5}>
            현재 가격 : ₩
            {numToKorean(Math.floor(currentPrice * koreanExchange), "mixed")}
          </Title>
        </Col>
      </Row>

      <Line data={data} options={options} />
    </Fragment>
  );
};

export default LineChart;
