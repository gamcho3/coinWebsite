import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card, Spin, Input } from "antd";
import moment from "moment";
import { useGetNewsQuery } from "../services/newsApi";
import classes from "./News.module.css";

const { Text, Title } = Typography;
const { Option } = Select;
const { Search } = Input;
const demoImage =
  "https://images.unsplash.com/photo-1622020457014-aed1cc44f25e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGNyeXB0b2N1cnJlbmN5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("암호화폐");
  const [sortSearch, setSortSearch] = useState("");
  const { data: cryptoNews, isFetching } = useGetNewsQuery({
    topic: newsCategory,
    count: simplified ? 8 : 20,
    sort: sortSearch,
  });

  if (isFetching || !cryptoNews?.value) return <Spin tip="loading..." />;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col
          span={24}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Search
            placeholder="search coin"
            enterButton
            onSearch={(value) => setNewsCategory(value)}
            style={{ width: 250 }}
          />
          <Select
            style={{ width: 200 }}
            onChange={(value) => setSortSearch(value)}
            placeholder={sortSearch}
          >
            <Option value="date">최신순</Option>
            <Option value="relevance">관련순</Option>
          </Select>
        </Col>
      )}
      {cryptoNews?.value.map((news, idx) => (
        <Col xs={24} sm={12} lg={6} key={idx}>
          <a href={news.url} target="_blank" rel="noreferrer" alt="news">
            <Card
              hoverable
              cover={
                <img
                  src={news?.image?.thumbnail.contentUrl || demoImage}
                  alt="news"
                  style={{ width: "100%" }}
                />
              }
            >
              <div>
                <Title level={3}>{news.name}</Title>
              </div>
              <div className={classes["provider-container"]}>
                <div>
                  <Avatar
                    src={news.provider[0]?.image?.thumbnail?.contentUrl}
                    alt="news"
                  />
                  <Text className={classes["provider-name"]}>
                    {news.provider[0]?.name}
                  </Text>
                </div>
                <Text>
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </Text>
              </div>
            </Card>
          </a>
        </Col>
      ))}
    </Row>
  );
};

export default News;
